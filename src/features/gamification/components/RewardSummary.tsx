import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { getBadge } from '@/features/gamification/badges';
import type { Reward } from '@/features/gamification/rewards';
import { AppText, FadeIn, ProgressBar } from '@/ui';

type IconName = ComponentProps<typeof Ionicons>['name'];

function RewardRow({
  icon,
  color,
  text,
  delay,
  testID,
}: {
  icon: IconName;
  color: string;
  text: string;
  delay: number;
  testID?: string;
}) {
  return (
    <FadeIn delay={delay} style={styles.row}>
      <View style={[styles.icon, { borderColor: color }]} testID={testID}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <AppText variant="bodyStrong" style={styles.flex}>
        {text}
      </AppText>
    </FadeIn>
  );
}

/** Riepilogo animato delle ricompense ottenute con una lezione o un quiz. */
export function RewardSummary({ reward }: { reward: Reward }) {
  const { t } = useTranslation();

  const rows: { key: string; icon: IconName; color: string; text: string }[] = [
    ...(reward.levelAfter > reward.levelBefore
      ? [
          {
            key: 'reward-level-up',
            icon: 'trending-up' as IconName,
            color: colors.primary,
            text: t('gamification.levelUp', { level: reward.levelAfter }),
          },
        ]
      : []),
    ...(reward.streakExtended
      ? [
          {
            key: 'reward-streak',
            icon: 'flame' as IconName,
            color: colors.streak,
            text: t('gamification.streakExtended', { count: reward.streak }),
          },
        ]
      : []),
    ...reward.newBadges.map((id) => ({
      key: `reward-badge-${id}`,
      icon: (getBadge(id)?.icon ?? 'ribbon') as IconName,
      color: colors.xp,
      text: t('gamification.newBadge', {
        title: t(`badges.${id}.title` as 'badges.firstLesson.title'),
      }),
    })),
  ];

  const delayFor = (index: number) => 400 + index * 180;

  return (
    <View style={styles.container}>
      {rows.map((row, index) => (
        <RewardRow
          key={row.key}
          icon={row.icon}
          color={row.color}
          text={row.text}
          delay={delayFor(index)}
          testID={row.key}
        />
      ))}

      <FadeIn delay={delayFor(rows.length)} style={styles.goal}>
        <View style={styles.goalHeader}>
          <AppText variant="caption" color="muted">
            {reward.goalReachedNow ? t('gamification.goalReachedNow') : t('gamification.dailyGoal')}
          </AppText>
          <AppText
            variant="caption"
            color={reward.dailyXp >= reward.dailyGoal ? 'success' : 'muted'}
          >
            {t('gamification.dailyGoalProgress', { xp: reward.dailyXp, goal: reward.dailyGoal })}
          </AppText>
        </View>
        <ProgressBar
          progress={reward.dailyXp / reward.dailyGoal}
          color={colors.success}
          accessibilityLabel={t('gamification.dailyGoal')}
        />
      </FadeIn>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.sm, alignSelf: 'stretch', marginTop: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: { flex: 1 },
  goal: {
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
  },
  goalHeader: { flexDirection: 'row', justifyContent: 'space-between' },
});
