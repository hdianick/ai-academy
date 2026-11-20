import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { useAuthStore } from '@/features/auth/store';
import {
  formatPrice,
  isBillingPeriod,
  isPaidPlan,
  PAYMENTS_ENABLED,
  priceFor,
} from '@/features/billing/plans';
import { useBillingStore } from '@/features/billing/store';
import { tierRank } from '@/features/entitlements/entitlements';
import { useAccess } from '@/features/entitlements/hooks';
import { AppText, Button, Card, IconButton, Screen, ScreenHeader } from '@/ui';

type Outcome = 'saved' | 'cancelled' | 'error' | null;

function goToPlans() {
  if (router.canGoBack()) router.back();
  else router.replace('/plans');
}

/**
 * Riepilogo dell'abbonamento. Finché i pagamenti non sono attivi (PAYMENTS_ENABLED = false)
 * non c'è nessun addebito: l'utente prenota il piano e viene avvisato al lancio.
 */
export default function CheckoutScreen() {
  const { t, i18n } = useTranslation();
  const params = useLocalSearchParams<{ plan?: string; period?: string }>();
  const status = useAuthStore((s) => s.status);
  const email = useAuthStore((s) => s.email);
  const access = useAccess();
  const request = useBillingStore((s) => s.request);
  const requestPlan = useBillingStore((s) => s.requestPlan);
  const cancel = useBillingStore((s) => s.cancel);
  const [outcome, setOutcome] = useState<Outcome>(null);
  const [busy, setBusy] = useState(false);

  const plan = isPaidPlan(params.plan) ? params.plan : null;
  const period = isBillingPeriod(params.period) ? params.period : 'monthly';

  if (!plan) {
    return (
      <Screen>
        <AppText>{t('checkout.invalid')}</AppText>
        <Button label={t('checkout.backToPlans')} onPress={() => router.replace('/plans')} />
      </Screen>
    );
  }

  const planName = t(`plans.${plan}.name`);
  const alreadyHas = !access.demo && tierRank(access.plan) >= tierRank(plan);
  const isReserved = request?.plan === plan && request.period === period;
  const price = formatPrice(priceFor(plan, period), i18n.language);

  const reserve = async () => {
    setBusy(true);
    const ok = await requestPlan(plan, period);
    setBusy(false);
    setOutcome(ok ? 'saved' : 'error');
  };

  const undo = async () => {
    setBusy(true);
    const ok = await cancel();
    setBusy(false);
    setOutcome(ok ? 'cancelled' : 'error');
  };

  return (
    <Screen testID="screen-checkout">
      <IconButton icon="arrow-back" accessibilityLabel={t('common.back')} onPress={goToPlans} />
      <ScreenHeader title={t('checkout.title')} subtitle={t('checkout.subtitle')} />

      <Card>
        <SummaryRow label={t('checkout.plan')} value={planName} />
        <SummaryRow label={t('checkout.period')} value={t(`plans.${period}`)} />
        <View style={styles.divider} />
        <SummaryRow label={t('checkout.total')} value={price} strong />
        <AppText variant="caption" color="muted">
          {period === 'monthly' ? t('checkout.renewsMonthly') : t('checkout.renewsYearly')} ·{' '}
          {t('plans.vatIncluded')}
        </AppText>
      </Card>

      {PAYMENTS_ENABLED ? null : (
        <View style={styles.notice} testID="checkout-no-charge">
          <Ionicons name="shield-checkmark-outline" size={20} color={colors.warning} />
          <View style={styles.flex}>
            <AppText variant="bodyStrong">{t('checkout.noChargeTitle')}</AppText>
            <AppText color="secondary">{t('checkout.noCharge')}</AppText>
          </View>
        </View>
      )}

      {outcome === 'saved' ? (
        <View
          style={[styles.notice, styles.success]}
          accessibilityRole="alert"
          testID="checkout-success"
        >
          <Ionicons name="checkmark-circle" size={20} color={colors.success} />
          <View style={styles.flex}>
            <AppText variant="bodyStrong">{t('checkout.successTitle')}</AppText>
            <AppText color="secondary">
              {status === 'signedIn' && email
                ? t('checkout.successSignedIn', { email })
                : t('checkout.successDemo')}
            </AppText>
          </View>
        </View>
      ) : null}
      {outcome === 'cancelled' ? (
        <AppText color="secondary" accessibilityRole="alert">
          {t('checkout.cancelled')}
        </AppText>
      ) : null}
      {outcome === 'error' ? (
        <AppText color="danger" accessibilityRole="alert">
          {t('checkout.error')}
        </AppText>
      ) : null}

      {alreadyHas ? (
        <AppText color="success" variant="bodyStrong">
          {t('checkout.alreadyHave', { plan: planName })}
        </AppText>
      ) : status === 'signedOut' ? (
        <>
          <AppText color="secondary">{t('checkout.signInFirst')}</AppText>
          <Button label={t('checkout.signIn')} onPress={() => router.push('/login')} fullWidth />
        </>
      ) : isReserved ? (
        <Button
          label={t('checkout.cancelRequest')}
          variant="ghost"
          onPress={() => void undo()}
          loading={busy}
          testID="checkout-cancel"
        />
      ) : (
        <Button
          label={t('checkout.confirm')}
          onPress={() => void reserve()}
          loading={busy}
          disabled={status === 'loading'}
          fullWidth
          testID="checkout-confirm"
        />
      )}

      <Button label={t('checkout.backToPlans')} variant="ghost" onPress={goToPlans} />
    </Screen>
  );
}

function SummaryRow({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <View style={styles.row}>
      <AppText color="secondary" style={styles.flex}>
        {label}
      </AppText>
      <AppText variant={strong ? 'heading' : 'bodyStrong'}>{value}</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.xs },
  notice: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.warningSoft,
    alignItems: 'flex-start',
  },
  success: { backgroundColor: colors.successSurface },
});
