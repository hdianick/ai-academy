import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { listProfiles } from '@/features/admin/api';
import { AdminShell, Notice } from '@/features/admin/components/AdminShell';
import { BarRow } from '@/features/admin/components/BarRow';
import { useAsyncData } from '@/features/admin/useAsyncData';
import { useAuthStore } from '@/features/auth/store';
import { tierOrder } from '@/features/entitlements/entitlements';
import { AppText, Button, Card, Chip, ErrorState, LoadingState } from '@/ui';

export default function AdminSubscriptionsScreen() {
  const { t } = useTranslation();
  const status = useAuthStore((s) => s.status);
  const { state, reload } = useAsyncData(listProfiles, status === 'signedIn');

  return (
    <AdminShell
      title={t('admin.modules.subscriptions')}
      subtitle={t('admin.descriptions.subscriptions')}
      needsDatabase
      testID="screen-admin-subscriptions"
    >
      <Notice icon="time-outline" text={t('admin.subscriptions.paymentsOff')} />
      {state.status === 'loading' ? <LoadingState /> : null}
      {state.status === 'error' ? (
        <ErrorState description={t('admin.loadError')} onRetry={reload} />
      ) : null}
      {state.status === 'ready' ? (
        <>
          <Card>
            <AppText variant="subheading">{t('admin.subscriptions.distribution')}</AppText>
            {tierOrder.map((plan) => (
              <BarRow
                key={plan}
                label={t(`tiers.${plan}`)}
                value={state.data.filter((p) => p.plan === plan).length}
                total={state.data.length}
              />
            ))}
          </Card>
          <AppText variant="heading">{t('admin.subscriptions.subscribers')}</AppText>
          {state.data.filter((p) => p.plan !== 'free').length === 0 ? (
            <AppText color="secondary">{t('admin.subscriptions.none')}</AppText>
          ) : (
            state.data
              .filter((p) => p.plan !== 'free')
              .map((profile) => (
                <Card key={profile.id}>
                  <View style={styles.row}>
                    <View style={styles.flex}>
                      <AppText variant="bodyStrong">
                        {profile.displayName || t('admin.users.noName')}
                      </AppText>
                      <AppText variant="caption" color="muted">
                        {profile.email ?? t('admin.users.noEmail')}
                      </AppText>
                    </View>
                    <Chip label={t(`tiers.${profile.plan}`)} tone="warning" />
                  </View>
                </Card>
              ))
          )}
          <Button
            label={t('admin.subscriptions.manage')}
            variant="secondary"
            onPress={() => router.push('/admin/users')}
          />
        </>
      ) : null}
    </AdminShell>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
