import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import type { PlanTier } from '@/features/courses/types';
import { AppText, Button, Screen } from '@/ui';

/** Schermata mostrata quando un contenuto richiede un piano superiore. */
export function LockedContent({ tier }: { tier: PlanTier }) {
  const { t } = useTranslation();
  const tierName = t(`tiers.${tier}`);
  return (
    <Screen scroll={false} testID="locked-content">
      <View style={styles.center}>
        <View style={styles.icon}>
          <Ionicons name="lock-closed" size={32} color={colors.xp} />
        </View>
        <AppText variant="title" align="center">
          {t('plans.lockedTitle', { tier: tierName })}
        </AppText>
        <AppText color="secondary" align="center">
          {t('plans.lockedDescription', { tier: tierName })}
        </AppText>
        <Button
          label={t('plans.seePlans')}
          onPress={() => router.push('/plans')}
          testID="see-plans"
        />
        <Button
          label={t('common.back')}
          variant="ghost"
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/academy'))}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: spacing.lg },
  icon: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
