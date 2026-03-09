import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import type { ContentItem } from '../types/content';
import { CATEGORIES } from '../constants/categories';
import { colors, fontSize, spacing, borderRadius, shadow } from '../constants/theme';

interface ContentCardProps {
  item: ContentItem;
  compact?: boolean;
}

export function ContentCard({ item, compact }: ContentCardProps) {
  const router = useRouter();
  const cat = CATEGORIES.find((c) => c.key === item.category);

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      onPress={() => router.push(`/content/${item.id}`)}
      activeOpacity={0.7}
    >
      {cat && (
        <View style={styles.categoryRow}>
          <Text style={styles.categoryIcon}>{cat.icon}</Text>
          <Text style={styles.categoryLabel}>{cat.label}</Text>
        </View>
      )}
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      {!compact && item.summary && (
        <Text style={styles.summary} numberOfLines={2}>
          {item.summary}
        </Text>
      )}
      <View style={styles.meta}>
        {item.type === 'announcement' && item.event_date && (
          <Text style={styles.metaText}>
            {new Date(item.event_date).toLocaleDateString()}
          </Text>
        )}
        {item.audience && item.audience !== 'all' && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.audience}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    ...shadow.sm,
  },
  cardCompact: {
    padding: spacing.sm + 4,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  categoryIcon: {
    fontSize: fontSize.sm,
    marginRight: spacing.xs,
  },
  categoryLabel: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  title: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  summary: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  metaText: {
    fontSize: fontSize.xs,
    color: colors.textLight,
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
});
