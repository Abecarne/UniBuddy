import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppHeader } from '../../src/components/AppHeader';
import { SearchBar } from '../../src/components/SearchBar';
import { CategoryCard } from '../../src/components/CategoryCard';
import { ContentCard } from '../../src/components/ContentCard';
import { LoadingState } from '../../src/components/LoadingState';
import { ErrorState } from '../../src/components/ErrorState';
import { useContent } from '../../src/hooks/useContent';
import { useLanguage } from '../../src/hooks/useLanguage';
import { CATEGORIES } from '../../src/constants/categories';
import { colors, fontSize, spacing } from '../../src/constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const t = useLanguage((s) => s.t);
  const [search, setSearch] = useState('');

  const { items: announcements, loading, error, refresh } = useContent({
    type: 'announcement',
    limit: 5,
    search: search || undefined,
  });

  const quickLinks = CATEGORIES.slice(0, 6);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <AppHeader />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <SearchBar value={search} onChangeText={setSearch} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('quickAccess')}</Text>
          <FlatList
            data={quickLinks}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryList}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <CategoryCard
                icon={item.icon}
                label={item.label}
                onPress={() =>
                  router.push(`/guides?category=${item.key}` as any)
                }
              />
            )}
            ItemSeparatorComponent={() => <View style={{ width: spacing.sm }} />}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('latestAnnouncements')}</Text>
          {loading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={refresh} />
          ) : (
            announcements.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))
          )}
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  categoryList: {
    paddingVertical: spacing.xs,
  },
});
