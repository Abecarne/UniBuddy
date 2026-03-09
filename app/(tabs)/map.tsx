import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SearchBar } from '../../src/components/SearchBar';
import { MapBuildingCard } from '../../src/components/MapBuildingCard';
import { LoadingState } from '../../src/components/LoadingState';
import { ErrorState } from '../../src/components/ErrorState';
import { EmptyState } from '../../src/components/EmptyState';
import { fetchMapLocations } from '../../src/services/mapService';
import { useLanguage } from '../../src/hooks/useLanguage';
import { MAP_CATEGORIES } from '../../src/constants/categories';
import type { MapLocation } from '../../src/types/map';
import { colors, fontSize, spacing, borderRadius } from '../../src/constants/theme';

export default function MapScreen() {
  const t = useLanguage((s) => s.t);
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(
    null
  );

  useEffect(() => {
    setLoading(true);
    fetchMapLocations('keimyung')
      .then(setLocations)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = locations.filter((loc) => {
    const matchesSearch =
      !search || loc.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      !selectedCategory || loc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={setSearch} />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipList}
        style={styles.chipScroll}
      >
        <TouchableOpacity
          style={[styles.chip, !selectedCategory && styles.chipActive]}
          onPress={() => setSelectedCategory('')}
        >
          <Text
            style={[styles.chipText, !selectedCategory && styles.chipTextActive]}
          >
            {t('allCategories')}
          </Text>
        </TouchableOpacity>
        {MAP_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.key}
            style={[
              styles.chip,
              selectedCategory === cat.key && styles.chipActive,
            ]}
            onPress={() => setSelectedCategory(cat.key)}
          >
            <Text style={styles.chipIcon}>{cat.icon}</Text>
            <Text
              style={[
                styles.chipText,
                selectedCategory === cat.key && styles.chipTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.content}>
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} />
        ) : filtered.length === 0 ? (
          <EmptyState title={t('noResults')} />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <MapBuildingCard
                location={item}
                onPress={setSelectedLocation}
              />
            )}
          />
        )}
      </View>

      <Modal
        visible={!!selectedLocation}
        transparent
        animationType="slide"
      >
        <Pressable
          style={styles.overlay}
          onPress={() => setSelectedLocation(null)}
        >
          <View style={styles.detailCard}>
            {selectedLocation && (
              <>
                <Text style={styles.detailName}>
                  {selectedLocation.name}
                </Text>
                {selectedLocation.building_code && (
                  <Text style={styles.detailCode}>
                    Building: {selectedLocation.building_code}
                  </Text>
                )}
                {selectedLocation.description && (
                  <Text style={styles.detailDesc}>
                    {selectedLocation.description}
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setSelectedLocation(null)}
                >
                  <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  chipScroll: {
    maxHeight: 48,
    marginBottom: spacing.sm,
  },
  chipList: {
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipIcon: {
    fontSize: fontSize.sm,
    marginRight: spacing.xs,
  },
  chipText: {
    fontSize: fontSize.sm,
    color: colors.text,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  detailCard: {
    backgroundColor: colors.white,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  detailName: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  detailCode: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  detailDesc: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  closeButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm + 4,
    alignItems: 'center',
  },
  closeText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
});
