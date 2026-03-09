import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { MapLocation } from '../types/map';
import { MAP_CATEGORIES } from '../constants/categories';
import { colors, fontSize, spacing, borderRadius, shadow } from '../constants/theme';

interface MapBuildingCardProps {
  location: MapLocation;
  onPress: (location: MapLocation) => void;
}

export function MapBuildingCard({ location, onPress }: MapBuildingCardProps) {
  const cat = MAP_CATEGORIES.find((c) => c.key === location.category);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(location)}
      activeOpacity={0.7}
    >
      <Text style={styles.icon}>{cat?.icon ?? '📍'}</Text>
      <View style={styles.info}>
        <Text style={styles.name}>{location.name}</Text>
        {location.building_code && (
          <Text style={styles.code}>{location.building_code}</Text>
        )}
        {location.description && (
          <Text style={styles.description} numberOfLines={2}>
            {location.description}
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    ...shadow.sm,
  },
  icon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
  },
  code: {
    fontSize: fontSize.xs,
    color: colors.textLight,
    marginTop: 2,
  },
  description: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    lineHeight: 18,
  },
});
