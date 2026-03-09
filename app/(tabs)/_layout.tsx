import React from 'react';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { colors, fontSize } from '../../src/constants/theme';
import { useLanguage } from '../../src/hooks/useLanguage';

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>{icon}</Text>
  );
}

export default function TabLayout() {
  const t = useLanguage((s) => s.t);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textLight,
        tabBarLabelStyle: { fontSize: fontSize.xs, fontWeight: '500' },
        tabBarStyle: { paddingBottom: 4, height: 56 },
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: t('home'),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🏠" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="guides"
        options={{
          title: t('guides'),
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="📖" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: t('map'),
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🗺️" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: t('saved'),
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="🔖" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('profile'),
          tabBarIcon: ({ focused }) => (
            <TabIcon icon="👤" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
