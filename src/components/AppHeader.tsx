import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fontSize, spacing } from '../constants/theme';
import { useLanguage } from '../hooks/useLanguage';
import { LanguageSwitcher } from './LanguageSwitcher';

interface AppHeaderProps {
  showLanguageSwitcher?: boolean;
}

export function AppHeader({ showLanguageSwitcher = true }: AppHeaderProps) {
  const t = useLanguage((s) => s.t);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcome}>{t('welcome')}</Text>
        <Text style={styles.campus}>{t('campusName')}</Text>
      </View>
      {showLanguageSwitcher && <LanguageSwitcher />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.primary,
  },
  welcome: {
    fontSize: fontSize.sm,
    color: colors.white,
    opacity: 0.8,
  },
  campus: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.white,
  },
});
