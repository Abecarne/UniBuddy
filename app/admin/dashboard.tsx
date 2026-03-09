import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LoadingState } from '../../src/components/LoadingState';
import { ErrorState } from '../../src/components/ErrorState';
import { useAllContent } from '../../src/hooks/useContent';
import { useLanguage } from '../../src/hooks/useLanguage';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../src/constants/theme';

export default function AdminDashboard() {
  const router = useRouter();
  const t = useLanguage((s) => s.t);
  const { items, loading, error } = useAllContent();

  const announcements = items.filter((i) => i.type === 'announcement');
  const guides = items.filter((i) => i.type === 'guide');
  const published = items.filter((i) => i.status === 'published');
  const drafts = items.filter((i) => i.status === 'draft');

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{items.length}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{announcements.length}</Text>
          <Text style={styles.statLabel}>{t('announcements')}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{guides.length}</Text>
          <Text style={styles.statLabel}>{t('guides')}</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>{published.length}</Text>
          <Text style={styles.statLabel}>{t('published')}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => router.push('/admin/create-post')}
      >
        <Text style={styles.actionIcon}>📢</Text>
        <View>
          <Text style={styles.actionTitle}>{t('createAnnouncement')}</Text>
          <Text style={styles.actionSub}>Post a new campus announcement</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => router.push('/admin/create-guide')}
      >
        <Text style={styles.actionIcon}>📖</Text>
        <View>
          <Text style={styles.actionTitle}>{t('createGuide')}</Text>
          <Text style={styles.actionSub}>Write a practical student guide</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionButton}
        onPress={() => router.push('/admin/manage-content')}
      >
        <Text style={styles.actionIcon}>📋</Text>
        <View>
          <Text style={styles.actionTitle}>{t('manageContent')}</Text>
          <Text style={styles.actionSub}>
            {published.length} published, {drafts.length} drafts
          </Text>
        </View>
      </TouchableOpacity>

      {items.slice(0, 5).length > 0 && (
        <View style={styles.recent}>
          <Text style={styles.recentTitle}>Recent Content</Text>
          {items.slice(0, 5).map((item) => (
            <View key={item.id} style={styles.recentItem}>
              <Text style={styles.recentItemTitle} numberOfLines={1}>
                {item.title}
              </Text>
              <View style={styles.recentMeta}>
                <Text style={styles.recentType}>{item.type}</Text>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor:
                        item.status === 'published'
                          ? colors.success
                          : colors.warning,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  stat: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    ...shadow.sm,
  },
  statNumber: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  actionButton: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadow.sm,
  },
  actionIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  actionTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  actionSub: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  recent: {
    marginTop: spacing.lg,
  },
  recentTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  recentItem: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    padding: spacing.sm + 4,
    marginBottom: spacing.xs,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recentItemTitle: {
    fontSize: fontSize.sm,
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  recentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  recentType: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
