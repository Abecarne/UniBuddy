import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, fontSize, spacing, borderRadius } from '../constants/theme';
import { useLanguage } from '../hooks/useLanguage';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const t = useLanguage((s) => s.t);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('error')}</Text>
      {message && <Text style={styles.message}>{message}</Text>}
      {onRetry && (
        <TouchableOpacity style={styles.button} onPress={onRetry}>
          <Text style={styles.buttonText}>{t('retry')}</Text>
        </TouchableOpacity>
      )}
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
  title: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: colors.error,
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.md,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
});
