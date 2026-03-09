import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { SearchBar } from '../../src/components/SearchBar';
import { ContentCard } from '../../src/components/ContentCard';
import { LoadingState } from '../../src/components/LoadingState';
import { ErrorState } from '../../src/components/ErrorState';
import { EmptyState } from '../../src/components/EmptyState';
import { useGuides } from '../../src/hooks/useGuides';
import { useLanguage } from '../../src/hooks/useLanguage';
import { CATEGORIES } from '../../src/constants/categories';
import { colors, fontSize, spacing, borderRadius } from '../../src/constants/theme';

export default function GuidesScreen() {
  const params = useLocalSearchParams<{ category?: string }>();
  const t = useLanguage((s) => s.t);
  const [selectedCategory, setSelectedCategory] = useState(
    params.category ?? ''
  );
  const [search, setSearch] = useState('');

  const { items, loading, error, refresh } = useGuides(
    selectedCategory || undefined
  );

  const filtered = search
    ? items.filter(
        (i) =>
          i.title.toLowerCase().includes(search.toLowerCase()) ||
          i.summary?.toLowerCase().includes(search.toLowerCase())
      )
    : items;

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>{t('guides')}</Text>
      </View>
      <SearchBar value={search} onChangeText={setSearch} />

      <View style={styles.chips}>
        <FlatList
          data={[{ key: '', label: t('allCategories'), icon: '' }, ...CATEGORIES]}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipList}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.chip,
                selectedCategory === item.key && styles.chipActive,
              ]}
              onPress={() => setSelectedCategory(item.key)}
            >
              {item.icon ? (
                <Text style={styles.chipIcon}>{item.icon}</Text>
              ) : null}
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === item.key && styles.chipTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.content}>
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={refresh} />
        ) : filtered.length === 0 ? (
          <EmptyState title={t('noResults')} />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <ContentCard item={item} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
  },
  chips: {
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
});
