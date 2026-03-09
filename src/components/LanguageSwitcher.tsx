import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import { LANGUAGES } from '../constants/languages';
import type { LanguageCode } from '../constants/languages';
import { useLanguage } from '../hooks/useLanguage';
import { colors, fontSize, spacing, borderRadius } from '../constants/theme';

export function LanguageSwitcher() {
  const [visible, setVisible] = useState(false);
  const language = useLanguage((s) => s.language);
  const setLanguage = useLanguage((s) => s.setLanguage);

  const current = LANGUAGES.find((l) => l.code === language);

  const handleSelect = (code: LanguageCode) => {
    setLanguage(code);
    setVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.trigger}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.triggerText}>
          {current?.nativeLabel ?? 'English'}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="fade">
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.menu}>
            <Text style={styles.menuTitle}>Language</Text>
            {LANGUAGES.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.option,
                  language === lang.code && styles.optionActive,
                ]}
                onPress={() => handleSelect(lang.code)}
              >
                <Text
                  style={[
                    styles.optionText,
                    language === lang.code && styles.optionTextActive,
                  ]}
                >
                  {lang.nativeLabel}
                </Text>
                <Text style={styles.optionLabel}>{lang.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
  },
  triggerText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    width: 260,
  },
  menuTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.xs,
  },
  optionActive: {
    backgroundColor: colors.primary + '10',
  },
  optionText: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '500',
  },
  optionTextActive: {
    color: colors.primary,
    fontWeight: '700',
  },
  optionLabel: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
});
