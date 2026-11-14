import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, spacing } from '@/core/theme';
import { useIsStaff } from '@/features/entitlements/hooks';
import { AppText, Card, Chip, EmptyState, IconButton, Screen, ScreenHeader } from '@/ui';

const modules: { key: string; icon: ComponentProps<typeof Ionicons>['name'] }[] = [
  { key: 'users', icon: 'people' },
  { key: 'courses', icon: 'library' },
  { key: 'quizzes', icon: 'help-circle' },
  { key: 'categories', icon: 'pricetags' },
  { key: 'tools', icon: 'construct' },
  { key: 'subscriptions', icon: 'card' },
  { key: 'stats', icon: 'stats-chart' },
  { key: 'notifications', icon: 'notifications' },
  { key: 'roles', icon: 'key' },
];

/** Area amministrazione: predisposta, visibile solo a editor e admin (verificati anche lato database). */
export default function AdminScreen() {
  const { t } = useTranslation();
  const isStaff = useIsStaff();

  if (!isStaff) {
    return (
      <Screen scroll={false} testID="admin-denied">
        <EmptyState
          icon="lock-closed-outline"
          title={t('admin.denied')}
          actionLabel={t('common.backHome')}
          onAction={() => router.replace('/')}
        />
      </Screen>
    );
  }

  return (
    <Screen testID="screen-admin">
      <IconButton
        icon="arrow-back"
        accessibilityLabel={t('common.back')}
        onPress={() => router.back()}
      />
      <ScreenHeader title={t('admin.title')} subtitle={t('admin.subtitle')} />
      {modules.map((module) => (
        <Card key={module.key}>
          <View style={styles.row}>
            <Ionicons name={module.icon} size={22} color={colors.accent} />
            <AppText variant="subheading" style={styles.flex}>
              {t(`admin.modules.${module.key}` as 'admin.modules.users')}
            </AppText>
            <Chip label={t('admin.soon')} />
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
