import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { LoadingState } from '../../src/components/LoadingState';
import { ErrorState } from '../../src/components/ErrorState';
import { EmptyState } from '../../src/components/EmptyState';
import { useAllContent } from '../../src/hooks/useContent';
import { useLanguage } from '../../src/hooks/useLanguage';
import {
  togglePublish,
  deleteContent,
} from '../../src/services/contentService';
import type { ContentItem } from '../../src/types/content';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../src/constants/theme';

export default function ManageContentScreen() {
  const t = useLanguage((s) => s.t);
  const { items, loading, error, refresh } = useAllContent();
  const [filter, setFilter] = useState<'all' | 'announcement' | 'guide'>(
    'all'
  );
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'published' | 'draft'
  >('all');

  const filtered = items.filter((item) => {
    if (filter !== 'all' && item.type !== filter) return false;
    if (statusFilter !== 'all' && item.status !== statusFilter) return false;
    return true;
  });

  const handleTogglePublish = async (item: ContentItem) => {
    try {
      await togglePublish(item);
      refresh();
    } catch (e: any) {
      Alert.alert('Error', e.message);
    }
  };

  const handleDelete = (item: ContentItem) => {
    Alert.alert('Delete', `Delete "${item.title}"?`, [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('delete'),
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteContent(item.id);
            refresh();
          } catch (e: any) {
            Alert.alert('Error', e.message);
          }
        },
      },
    ]);
  };

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={refresh} />;

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {(['all', 'announcement', 'guide'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}
            >
              {f === 'all' ? 'All' : f === 'announcement' ? 'Announcements' : 'Guides'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.filters}>
        {(['all', 'published', 'draft'] as const).map((s) => (
          <TouchableOpacity
            key={s}
            style={[
              styles.filterChip,
              statusFilter === s && styles.filterChipActive,
            ]}
            onPress={() => setStatusFilter(s)}
          >
            <Text
              style={[
                styles.filterText,
                statusFilter === s && styles.filterTextActive,
              ]}
            >
              {s === 'all' ? 'All Status' : s === 'published' ? t('published') : t('draft')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filtered.length === 0 ? (
        <EmptyState title={t('noResults')} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        item.status === 'published'
                          ? colors.success + '20'
                          : colors.warning + '20',
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          item.status === 'published'
                            ? colors.success
                            : colors.warning,
                      },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardMeta}>
                {item.type} · {item.language_code} · {item.category}
              </Text>
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => handleTogglePublish(item)}
                >
                  <Text style={styles.actionText}>
                    {item.status === 'published'
                      ? t('unpublish')
                      : t('publish')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionBtn, styles.deleteBtn]}
                  onPress={() => handleDelete(item)}
                >
                  <Text style={styles.deleteText}>{t('delete')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: fontSize.xs,
    color: colors.text,
  },
  filterTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
  list: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadow.sm,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  cardTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  statusText: {
    fontSize: fontSize.xs,
    fontWeight: '600',
  },
  cardMeta: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    marginBottom: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.primary + '10',
  },
  actionText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: '600',
  },
  deleteBtn: {
    backgroundColor: colors.error + '10',
  },
  deleteText: {
    fontSize: fontSize.xs,
    color: colors.error,
    fontWeight: '600',
  },
});
