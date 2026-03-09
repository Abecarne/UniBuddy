import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fontSize, spacing, borderRadius, shadow } from '../constants/theme';

interface CategoryCardProps {
  icon: string;
  label: string;
  onPress: () => void;
}

export function CategoryCard({ icon, label, onPress }: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.label} numberOfLines={2}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 90,
    ...shadow.sm,
  },
  icon: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: fontSize.xs,
    color: colors.text,
    fontWeight: '500',
    textAlign: 'center',
  },
});
