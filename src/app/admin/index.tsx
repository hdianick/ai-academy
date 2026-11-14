import Ionicons from '@expo/vector-icons/Ionicons';
import { router, type Href } from 'expo-router';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { AdminShell } from '@/features/admin/components/AdminShell';
import { AppText, Card } from '@/ui';

type SectionKey =
  | 'stats'
  | 'users'
  | 'subscriptions'
  | 'notifications'
  | 'courses'
  | 'quizzes'
  | 'categories'
  | 'tools'
  | 'roles';

const sections: { key: SectionKey; icon: ComponentProps<typeof Ionicons>['name']; href: Href }[] = [
  { key: 'stats', icon: 'stats-chart', href: '/admin/stats' },
  { key: 'users', icon: 'people', href: '/admin/users' },
  { key: 'subscriptions', icon: 'card', href: '/admin/subscriptions' },
  { key: 'notifications', icon: 'notifications', href: '/admin/notifications' },
  { key: 'courses', icon: 'library', href: '/admin/courses' },
  { key: 'quizzes', icon: 'help-circle', href: '/admin/quizzes' },
  { key: 'categories', icon: 'pricetags', href: '/admin/categories' },
  { key: 'tools', icon: 'construct', href: '/admin/tools' },
  { key: 'roles', icon: 'key', href: '/admin/roles' },
];

/** Area amministrazione: visibile solo a editor e admin (verificati anche lato database). */
export default function AdminScreen() {
  const { t } = useTranslation();
  return (
    <AdminShell title={t('admin.title')} subtitle={t('admin.subtitle')} testID="screen-admin">
      {sections.map((section) => (
        <Card
          key={section.key}
          onPress={() => router.push(section.href)}
          accessibilityLabel={t(`admin.modules.${section.key}`)}
          testID={`admin-${section.key}`}
        >
          <View style={styles.row}>
            <View style={styles.icon}>
              <Ionicons name={section.icon} size={20} color={colors.textOnAccent} />
            </View>
            <View style={styles.flex}>
              <AppText variant="subheading">{t(`admin.modules.${section.key}`)}</AppText>
              <AppText variant="caption" color="muted">
                {t(`admin.descriptions.${section.key}`)}
              </AppText>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </View>
        </Card>
      ))}
    </AdminShell>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  icon: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
