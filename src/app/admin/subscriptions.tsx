import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { listProfiles } from '@/features/admin/api';
import { formatDate } from '@/features/admin/format';
import { listSubscriptionRequests } from '@/features/billing/api';
import { formatPrice } from '@/features/billing/plans';
import { potentialMonthlyRevenue } from '@/features/billing/potential';
import { AdminShell, Notice } from '@/features/admin/components/AdminShell';
import { BarRow } from '@/features/admin/components/BarRow';
import { useAsyncData } from '@/features/admin/useAsyncData';
import { useAuthStore } from '@/features/auth/store';
import { tierOrder } from '@/features/entitlements/entitlements';
import { AppText, Button, Card, Chip, ErrorState, LoadingState } from '@/ui';

/** Profili e prenotazioni; se la tabella delle prenotazioni non c'è ancora, la sezione resta vuota. */
async function loadSubscriptions() {
  const [profiles, requests] = await Promise.all([
    listProfiles(),
    listSubscriptionRequests().catch(() => null),
  ]);
  return { profiles, requests };
}

export default function AdminSubscriptionsScreen() {
  const { t, i18n } = useTranslation();
  const status = useAuthStore((s) => s.status);
  const { state: loaded, reload } = useAsyncData(loadSubscriptions, status === 'signedIn');
  const state =
    loaded.status === 'ready' ? { status: 'ready' as const, data: loaded.data.profiles } : loaded;
  const requests = loaded.status === 'ready' ? loaded.data.requests : null;

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
          {requests ? (
            <>
              <AppText variant="heading">{t('admin.subscriptions.requests')}</AppText>
              {requests.length === 0 ? (
                <AppText color="secondary">{t('admin.subscriptions.requestsNone')}</AppText>
              ) : (
                <AppText color="success" variant="bodyStrong" testID="potential-revenue">
                  {t('admin.subscriptions.potential', {
                    monthly: formatPrice(potentialMonthlyRevenue(requests), i18n.language),
                  })}
                </AppText>
              )}
              {requests.map((request) => {
                const profile = state.data.find((p) => p.id === request.userId);
                return (
                  <Card key={request.userId} testID={`request-${request.userId}`}>
                    <AppText variant="bodyStrong">
                      {profile?.displayName || t('admin.users.noName')}
                    </AppText>
                    <AppText variant="caption" color="muted" selectable>
                      {profile?.email ?? t('admin.users.noEmail')}
                    </AppText>
                    <AppText variant="caption" color="accent">
                      {t('admin.subscriptions.requestLine', {
                        plan: t(`plans.${request.plan}.name`),
                        period: t(`plans.${request.period}`),
                        date: formatDate(request.createdAt),
                      })}
                    </AppText>
                  </Card>
                );
              })}
            </>
          ) : null}
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
