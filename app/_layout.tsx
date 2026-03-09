import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthListener } from '../src/hooks/useAuth';
import { useLanguage } from '../src/hooks/useLanguage';
import { colors } from '../src/constants/theme';

export default function RootLayout() {
  useAuthListener();
  const loadLanguage = useLanguage((s) => s.loadLanguage);

  useEffect(() => {
    loadLanguage();
  }, [loadLanguage]);

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.primary },
          headerTintColor: colors.white,
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="content/[id]"
          options={{ title: '', headerBackTitle: 'Back' }}
        />
        <Stack.Screen name="auth/sign-in" options={{ title: 'Sign In' }} />
        <Stack.Screen
          name="admin"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}
