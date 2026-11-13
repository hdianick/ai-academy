import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/js-tabs';
import type { ComponentProps } from 'react';
import { Platform, type ColorValue } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, layout } from '@/core/theme';

type IconName = ComponentProps<typeof Ionicons>['name'];

function tabIcon(active: IconName, inactive: IconName) {
  function TabIcon({
    color,
    focused,
    size,
  }: {
    color: ColorValue;
    focused: boolean;
    size: number;
  }) {
    return (
      <Ionicons
        name={focused ? active : inactive}
        color={typeof color === 'string' ? color : colors.textMuted}
        size={size}
      />
    );
  }
  return TabIcon;
}

export default function TabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          // Su web non c'è safe area inferiore: diamo spazio sufficiente alle etichette.
          ...(Platform.OS === 'web' && { height: layout.tabBarHeight, paddingBottom: 8 }),
        },
        tabBarLabelStyle: { fontSize: 11, lineHeight: 14, fontWeight: '600' },
        sceneStyle: { backgroundColor: colors.background },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: t('tabs.home'), tabBarIcon: tabIcon('home', 'home-outline') }}
      />
      <Tabs.Screen
        name="academy"
        options={{ title: t('tabs.academy'), tabBarIcon: tabIcon('school', 'school-outline') }}
      />
      <Tabs.Screen
        name="practice"
        options={{ title: t('tabs.practice'), tabBarIcon: tabIcon('flask', 'flask-outline') }}
      />
      <Tabs.Screen
        name="tutor"
        options={{
          title: t('tabs.tutor'),
          tabBarIcon: tabIcon('chatbubbles', 'chatbubbles-outline'),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{ title: t('tabs.profile'), tabBarIcon: tabIcon('person', 'person-outline') }}
      />
    </Tabs>
  );
}
