import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LanguageSwitcher } from '../../src/components/LanguageSwitcher';
import { useAuthStore } from '../../src/hooks/useAuth';
import { useLanguage } from '../../src/hooks/useLanguage';
import { signOut } from '../../src/services/authService';
import { colors, fontSize, spacing, borderRadius, shadow } from '../../src/constants/theme';

export default function ProfileScreen() {
  const router = useRouter();
  const t = useLanguage((s) => s.t);
  const { session, profile, isAdmin } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    useAuthStore.getState().clear();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('settings')}</Text>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>{t('languagePreference')}</Text>
            <LanguageSwitcher />
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>{t('campus')}</Text>
            <Text style={styles.value}>{t('campusName')}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.label}>{t('studentStatus')}</Text>
            <Text style={styles.value}>
              {profile?.role === 'admin' ? 'Admin' : 'Student'}
            </Text>
          </View>
          {session && (
            <>
              <View style={styles.separator} />
              <View style={styles.row}>
                <Text style={styles.label}>{t('email')}</Text>
                <Text style={styles.value} numberOfLines={1}>
                  {session.user.email}
                </Text>
              </View>
            </>
          )}
        </View>

        {isAdmin && (
          <TouchableOpacity
            style={styles.adminButton}
            onPress={() => router.push('/admin/dashboard')}
          >
            <Text style={styles.adminButtonText}>{t('admin')} {t('dashboard')}</Text>
          </TouchableOpacity>
        )}

        {session ? (
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Text style={styles.signOutText}>{t('signOut')}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.signInButton}
            onPress={() => router.push('/auth/sign-in')}
          >
            <Text style={styles.signInText}>{t('signIn')}</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
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
  title: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    ...shadow.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '500',
  },
  value: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    maxWidth: '50%',
    textAlign: 'right',
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
  adminButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  adminButtonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  signOutButton: {
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  signOutText: {
    color: colors.error,
    fontSize: fontSize.md,
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  signInText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
});
