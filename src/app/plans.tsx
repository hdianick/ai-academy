import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import {
  billingPeriods,
  featuredPlan,
  formatPrice,
  monthlyEquivalent,
  paidPlans,
  priceFor,
  yearlySavingPercent,
  type BillingPeriod,
  type PaidPlan,
} from '@/features/billing/plans';
import { useBillingStore } from '@/features/billing/store';
import type { PlanTier } from '@/features/courses/types';
import { tierOrder, tierRank } from '@/features/entitlements/entitlements';
import { useAccess } from '@/features/entitlements/hooks';
import { AppText, Button, Card, Chip, DemoBanner, IconButton, Screen, ScreenHeader } from '@/ui';

const tierIcon: Record<PlanTier, 'leaf' | 'diamond' | 'rocket'> = {
  free: 'leaf',
  premium: 'diamond',
  pro: 'rocket',
};

export default function PlansScreen() {
  const { t, i18n } = useTranslation();
  const access = useAccess();
  const request = useBillingStore((s) => s.request);
  const sync = useBillingStore((s) => s.sync);
  const [period, setPeriod] = useState<BillingPeriod>('yearly');

  useEffect(() => {
    void sync();
  }, [sync]);

  const choose = (plan: PaidPlan) =>
    router.push({ pathname: '/checkout', params: { plan, period } });

  return (
    <Screen testID="screen-plans">
      <IconButton
        icon="arrow-back"
        accessibilityLabel={t('common.back')}
        onPress={() => (router.canGoBack() ? router.back() : router.replace('/profile'))}
      />
      <DemoBanner />
      <ScreenHeader title={t('plans.title')} subtitle={t('plans.subtitle')} />

      <View style={styles.notice} testID="payments-off">
        <Ionicons name="time-outline" size={20} color={colors.warning} />
        <View style={styles.flex}>
          <AppText variant="bodyStrong">{t('plans.paymentsSoon')}</AppText>
          <AppText color="secondary">{t('plans.paymentsNote')}</AppText>
        </View>
      </View>

      {access.demo ? (
        <AppText color="accent" variant="bodyStrong">
          {t('plans.demoAll')}
        </AppText>
      ) : null}
      {request ? (
        <AppText color="success" variant="bodyStrong" testID="plan-request">
          {t('plans.yourRequest', {
            plan: t(`plans.${request.plan}.name`),
            period: t(`plans.${request.period}`).toLowerCase(),
          })}
        </AppText>
      ) : null}

      <View
        style={styles.periods}
        accessibilityRole="radiogroup"
        accessibilityLabel={t('plans.periodLabel')}
      >
        {billingPeriods.map((value) => (
          <Chip
            key={value}
            label={
              value === 'yearly'
                ? `${t('plans.yearly')} · ${t('plans.saveUpTo', {
                    percent: Math.max(...paidPlans.map(yearlySavingPercent)),
                  })}`
                : t('plans.monthly')
            }
            selected={period === value}
            onPress={() => setPeriod(value)}
            testID={`period-${value}`}
          />
        ))}
      </View>

      {tierOrder.map((tier) => {
        const current = !access.demo && access.plan === tier;
        const included = !access.demo && tierRank(access.plan) > tierRank(tier);
        const paid = tier !== 'free';
        const reserved = request?.plan === tier;
        return (
          <Card
            key={tier}
            variant={tier === featuredPlan ? 'highlight' : 'default'}
            testID={`plan-${tier}`}
          >
            <View style={styles.row}>
              <View style={styles.icon}>
                <Ionicons name={tierIcon[tier]} size={22} color={colors.textOnAccent} />
              </View>
              <View style={styles.flex}>
                <AppText variant="heading">{t(`plans.${tier}.name`)}</AppText>
                <AppText color="secondary">{t(`plans.${tier}.tagline`)}</AppText>
              </View>
              {tier === featuredPlan ? <Chip label={t('plans.featured')} tone="accent" /> : null}
            </View>

            {paid ? (
              <PriceBlock plan={tier} period={period} language={i18n.language} />
            ) : (
              <View style={styles.price}>
                <AppText variant="title">{t('plans.freePrice')}</AppText>
                <AppText color="muted">{t('plans.freeForever')}</AppText>
              </View>
            )}

            {(['f1', 'f2', 'f3'] as const).map((feature) => (
              <View key={feature} style={styles.feature}>
                <Ionicons name="checkmark" size={18} color={colors.success} />
                <AppText style={styles.flex}>{t(`plans.${tier}.${feature}`)}</AppText>
              </View>
            ))}

            {current ? (
              <Chip label={t('plans.currentPlan')} tone="success" />
            ) : paid && !included ? (
              <Button
                label={
                  reserved
                    ? t('plans.requested')
                    : t('plans.choose', { plan: t(`plans.${tier}.name`) })
                }
                variant={tier === featuredPlan ? 'primary' : 'secondary'}
                onPress={() => choose(tier)}
                fullWidth
                testID={`choose-${tier}`}
              />
            ) : null}
          </Card>
        );
      })}

      <AppText variant="caption" color="muted">
        {t('plans.vatIncluded')}
      </AppText>
    </Screen>
  );
}

function PriceBlock({
  plan,
  period,
  language,
}: {
  plan: PaidPlan;
  period: BillingPeriod;
  language: string;
}) {
  const { t } = useTranslation();
  const price = formatPrice(priceFor(plan, period), language);
  return (
    <View>
      <View style={styles.price}>
        <AppText variant="title">{price}</AppText>
        <AppText color="muted">
          {period === 'monthly' ? t('plans.perMonth') : t('plans.perYear')}
        </AppText>
      </View>
      {period === 'yearly' ? (
        <AppText variant="caption" color="success">
          {t('plans.yearlyEquivalent', { price: formatPrice(monthlyEquivalent(plan), language) })}
          {' · '}
          {t('plans.save', { percent: yearlySavingPercent(plan) })}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feature: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  periods: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  price: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.xs },
  notice: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.warningSoft,
    alignItems: 'flex-start',
  },
});
