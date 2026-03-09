import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ContentCard } from '../../src/components/ContentCard';
import { LoadingState } from '../../src/components/LoadingState';
import { ErrorState } from '../../src/components/ErrorState';
import { EmptyState } from '../../src/components/EmptyState';
import { useSaved } from '../../src/hooks/useSaved';
import { useLanguage } from '../../src/hooks/useLanguage';
import { useAuthStore } from '../../src/hooks/useAuth';
import { colors, spacing } from '../../src/constants/theme';

export default function SavedScreen() {
  const t = useLanguage((s) => s.t);
  const session = useAuthStore((s) => s.session);
  const { items, loading, error, refresh } = useSaved();

  if (!session) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <EmptyState
          title={t('signIn')}
          message="Sign in to save guides and announcements."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={refresh} />
      ) : items.length === 0 ? (
        <EmptyState title={t('noSaved')} message={t('saveHint')} />
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) =>
            item.content_items ? (
              <ContentCard item={item.content_items} />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
});
