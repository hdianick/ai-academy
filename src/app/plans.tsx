import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import type { PlanTier } from '@/features/courses/types';
import { tierOrder } from '@/features/entitlements/entitlements';
import { useAccess } from '@/features/entitlements/hooks';
import { AppText, Card, Chip, DemoBanner, IconButton, Screen, ScreenHeader } from '@/ui';

const tierIcon: Record<PlanTier, 'leaf' | 'diamond' | 'rocket'> = {
  free: 'leaf',
  premium: 'diamond',
  pro: 'rocket',
};

export default function PlansScreen() {
  const { t } = useTranslation();
  const access = useAccess();

  return (
    <Screen testID="screen-plans">
      <IconButton
        icon="arrow-back"
        accessibilityLabel={t('common.back')}
        onPress={() => (router.canGoBack() ? router.back() : router.replace('/profile'))}
      />
      <DemoBanner />
      <ScreenHeader title={t('plans.title')} subtitle={t('plans.subtitle')} />
      {access.demo ? (
        <AppText color="accent" variant="bodyStrong">
          {t('plans.demoAll')}
        </AppText>
      ) : null}

      {tierOrder.map((tier) => {
        const current = !access.demo && access.plan === tier;
        return (
          <Card
            key={tier}
            variant={tier === 'premium' ? 'highlight' : 'default'}
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
              {current ? <Chip label={t('plans.current')} tone="success" /> : null}
            </View>
            {(['f1', 'f2', 'f3'] as const).map((feature) => (
              <View key={feature} style={styles.feature}>
                <Ionicons name="checkmark" size={18} color={colors.success} />
                <AppText style={styles.flex}>{t(`plans.${tier}.${feature}`)}</AppText>
              </View>
            ))}
          </Card>
        );
      })}

      <Card>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={20} color={colors.warning} />
          <AppText variant="subheading" style={styles.flex}>
            {t('plans.paymentsSoon')}
          </AppText>
        </View>
        <AppText color="secondary">{t('plans.paymentsNote')}</AppText>
      </Card>
    </Screen>
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
});
