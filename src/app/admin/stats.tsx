import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, spacing } from '@/core/theme';
import { BarRow } from '@/features/admin/components/BarRow';
import { AdminShell } from '@/features/admin/components/AdminShell';
import { loadStats } from '@/features/admin/loaders';
import { appRoles } from '@/features/admin/types';
import { useAsyncData } from '@/features/admin/useAsyncData';
import { useAuthStore } from '@/features/auth/store';
import { tierOrder } from '@/features/entitlements/entitlements';
import { AppText, Card, ErrorState, LoadingState, StatTile } from '@/ui';

export default function AdminStatsScreen() {
  const { t } = useTranslation();
  const status = useAuthStore((s) => s.status);
  const { state, reload } = useAsyncData(loadStats, status === 'signedIn');

  return (
    <AdminShell
      title={t('admin.modules.stats')}
      subtitle={t('admin.descriptions.stats')}
      needsDatabase
      testID="screen-admin-stats"
    >
      {state.status === 'loading' ? <LoadingState /> : null}
      {state.status === 'error' ? (
        <ErrorState description={t('admin.loadError')} onRetry={reload} />
      ) : null}
      {state.status === 'ready'
        ? (() => {
            const { stats } = state.data;
            return (
              <>
                <View style={styles.grid}>
                  <StatTile
                    icon="people"
                    value={String(stats.totalUsers)}
                    label={t('admin.stats.users')}
                  />
                  <StatTile
                    icon="person-add"
                    value={String(stats.newUsers7d)}
                    label={t('admin.stats.newUsers')}
                    color={colors.success}
                  />
                  <StatTile
                    icon="pulse"
                    value={String(stats.activeUsers7d)}
                    label={t('admin.stats.activeUsers')}
                    color={colors.streak}
                  />
                </View>
                <View style={styles.grid}>
                  <StatTile
                    icon="flash"
                    value={String(stats.averageXp)}
                    label={t('admin.stats.averageXp')}
                    color={colors.xp}
                  />
                  <StatTile
                    icon="book"
                    value={String(stats.lessonsCompleted)}
                    label={t('admin.stats.lessons')}
                  />
                  <StatTile
                    icon="checkmark-done"
                    value={String(stats.quizzesPassed)}
                    label={t('admin.stats.quizzes')}
                  />
                </View>

                <Card>
                  <AppText variant="subheading">{t('admin.stats.byPlan')}</AppText>
                  {tierOrder.map((plan) => (
                    <BarRow
                      key={plan}
                      label={t(`tiers.${plan}`)}
                      value={stats.byPlan[plan]}
                      total={stats.totalUsers}
                    />
                  ))}
                </Card>

                <Card>
                  <AppText variant="subheading">{t('admin.stats.byRole')}</AppText>
                  {appRoles.map((role) => (
                    <BarRow
                      key={role}
                      label={t(`admin.roles.${role}`)}
                      value={stats.byRole[role]}
                      total={stats.totalUsers}
                    />
                  ))}
                </Card>

                <Card>
                  <AppText variant="subheading">{t('admin.stats.courseUsage')}</AppText>
                  {stats.courses.map((course) => (
                    <View key={course.courseId} style={styles.course}>
                      <BarRow
                        label={course.title}
                        value={course.started}
                        total={stats.totalUsers}
                      />
                      <AppText variant="caption" color="muted">
                        {t('admin.stats.courseLine', {
                          started: course.started,
                          completed: course.completed,
                        })}
                      </AppText>
                    </View>
                  ))}
                </Card>
              </>
            );
          })()
        : null}
    </AdminShell>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', gap: spacing.sm },
  course: { gap: spacing.xs },
});
