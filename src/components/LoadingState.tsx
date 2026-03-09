import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../constants/theme';
import { useLanguage } from '../hooks/useLanguage';

export function LoadingState() {
  const t = useLanguage((s) => s.t);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={styles.text}>{t('loading')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  text: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
});
