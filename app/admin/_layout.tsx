import React from 'react';
import { Stack } from 'expo-router';
import { colors } from '../../src/constants/theme';
import { useAuthStore } from '../../src/hooks/useAuth';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function AdminLayout() {
  const { session, isAdmin, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!session || !isAdmin)) {
      router.replace('/auth/sign-in');
    }
  }, [session, isAdmin, loading, router]);

  if (!session || !isAdmin) return null;

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '600' },
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="dashboard" options={{ title: 'Admin Dashboard' }} />
      <Stack.Screen
        name="create-post"
        options={{ title: 'Create Announcement' }}
      />
      <Stack.Screen name="create-guide" options={{ title: 'Create Guide' }} />
      <Stack.Screen
        name="manage-content"
        options={{ title: 'Manage Content' }}
      />
    </Stack>
  );
}
