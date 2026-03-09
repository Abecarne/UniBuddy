import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ContentCard } from '../../src/components/ContentCard';
import { LoadingState } from '../../src/components/LoadingState';
import { ErrorState } from '../../src/components/ErrorState';
import { useContentDetail } from '../../src/hooks/useContent';
import { useSaved, useIsSaved } from '../../src/hooks/useSaved';
import { useLanguage } from '../../src/hooks/useLanguage';
import { useAuthStore } from '../../src/hooks/useAuth';
import { CATEGORIES } from '../../src/constants/categories';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../src/constants/theme';

export default function ContentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const t = useLanguage((s) => s.t);
  const session = useAuthStore((s) => s.session);
  const { item, related, loading, error } = useContentDetail(id);
  const { toggle } = useSaved();
  const isSaved = useIsSaved(id ?? '');

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;
  if (!item) return <ErrorState message="Content not found" />;

  const cat = CATEGORIES.find((c) => c.key === item.category);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {cat && (
        <View style={styles.categoryRow}>
          <Text style={styles.categoryIcon}>{cat.icon}</Text>
          <Text style={styles.categoryLabel}>{cat.label}</Text>
        </View>
      )}

      <Text style={styles.title}>{item.title}</Text>

      <View style={styles.meta}>
        {item.audience && item.audience !== 'all' && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.audience}</Text>
          </View>
        )}
        <Text style={styles.date}>
          {t('lastUpdated')}: {new Date(item.updated_at).toLocaleDateString()}
        </Text>
      </View>

      {session && (
        <TouchableOpacity
          style={[styles.saveButton, isSaved && styles.saveButtonActive]}
          onPress={() => toggle(item.id)}
        >
          <Text
            style={[
              styles.saveButtonText,
              isSaved && styles.saveButtonTextActive,
            ]}
          >
            {isSaved ? '🔖 Saved' : '🔖 Save'}
          </Text>
        </TouchableOpacity>
      )}

      {item.summary && (
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>{t('summary')}</Text>
          <Text style={styles.summaryText}>{item.summary}</Text>
        </View>
      )}

      {item.body && <Text style={styles.body}>{item.body}</Text>}

      {item.event_date && (
        <View style={styles.eventBox}>
          <Text style={styles.eventLabel}>Event Date</Text>
          <Text style={styles.eventDate}>
            {new Date(item.event_date).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
      )}

      {related.length > 0 && (
        <View style={styles.related}>
          <Text style={styles.relatedTitle}>{t('relatedGuides')}</Text>
          {related.map((r) => (
            <ContentCard key={r.id} item={r} compact />
          ))}
        </View>
      )}

      <View style={{ height: spacing.xxl }} />
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
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  categoryIcon: {
    fontSize: fontSize.md,
    marginRight: spacing.xs,
  },
  categoryLabel: {
    fontSize: fontSize.sm,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  badge: {
    backgroundColor: colors.primary + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: '500',
  },
  date: {
    fontSize: fontSize.xs,
    color: colors.textLight,
  },
  saveButton: {
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  saveButtonActive: {
    backgroundColor: colors.primary + '10',
  },
  saveButtonText: {
    color: colors.primary,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  saveButtonTextActive: {
    color: colors.primary,
  },
  summaryBox: {
    backgroundColor: colors.primary + '08',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary,
  },
  summaryLabel: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: '700',
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
  },
  summaryText: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 22,
  },
  body: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 26,
    marginBottom: spacing.lg,
  },
  eventBox: {
    backgroundColor: colors.secondary + '15',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  eventLabel: {
    fontSize: fontSize.xs,
    color: colors.secondary,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  eventDate: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '500',
  },
  related: {
    marginTop: spacing.md,
  },
  relatedTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
});
