import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { getBadge } from '@/features/gamification/badges';
import { getLevelInfo, getRank } from '@/features/gamification/levels';
import { AppText, Card, ProgressBar } from '@/ui';

type IconName = ComponentProps<typeof Ionicons>['name'];

/* ---------- Livello ---------- */

export function LevelCard({ xp }: { xp: number }) {
  const { t } = useTranslation();
  const info = getLevelInfo(xp);
  return (
    <Card variant="elevated" testID="level-card">
      <View style={styles.row}>
        <View style={styles.levelBadge}>
          <AppText variant="heading">{info.level}</AppText>
        </View>
        <View style={styles.flex}>
          <AppText variant="subheading">{t('gamification.level', { level: info.level })}</AppText>
          <AppText variant="caption" color="accent">
            {t(`rank.${getRank(info.level)}`)}
          </AppText>
        </View>
        <AppText variant="bodyStrong" color="xp">
          {xp} XP
        </AppText>
      </View>
      <ProgressBar
        progress={info.progress}
        color={colors.xp}
        accessibilityLabel={t('gamification.level', { level: info.level })}
      />
      <AppText variant="caption" color="muted">
        {info.isMax
          ? t('gamification.maxLevel')
          : t('gamification.xpToNext', {
              xp: info.xpForNext - info.xpIntoLevel,
              level: info.level + 1,
            })}
      </AppText>
    </Card>
  );
}

/* ---------- Streak ---------- */

export interface StreakCardProps {
  streak: number;
  activeToday: boolean;
  /** Ultimi 7 giorni: true se c'è stata attività. */
  week: { label: string; active: boolean }[];
}

export function StreakCard({ streak, activeToday, week }: StreakCardProps) {
  const { t } = useTranslation();
  const message =
    streak === 0
      ? t('gamification.streakStart')
      : activeToday
        ? t('gamification.streakSafe')
        : t('gamification.streakAtRisk');

  return (
    <Card testID="streak-card">
      <View style={styles.row}>
        <View style={[styles.iconCircle, { backgroundColor: colors.streakSoft }]}>
          <Ionicons name="flame" size={24} color={streak > 0 ? colors.streak : colors.textMuted} />
        </View>
        <View style={styles.flex}>
          <AppText variant="caption" color="muted">
            {t('gamification.streakTitle')}
          </AppText>
          <AppText variant="heading">{t('gamification.streakDays', { count: streak })}</AppText>
        </View>
      </View>
      <View style={styles.week}>
        {week.map((day, index) => (
          <View key={`${day.label}-${index}`} style={styles.day}>
            <View style={[styles.dayDot, day.active && styles.dayDotActive]}>
              {day.active ? (
                <Ionicons name="checkmark" size={12} color={colors.textOnAccent} />
              ) : null}
            </View>
            <AppText variant="caption" color="muted">
              {day.label}
            </AppText>
          </View>
        ))}
      </View>
      <AppText variant="caption" color={streak > 0 && !activeToday ? 'xp' : 'secondary'}>
        {message}
      </AppText>
    </Card>
  );
}

/* ---------- Obiettivo giornaliero ---------- */

export function DailyGoalCard({ xpToday, goal }: { xpToday: number; goal: number }) {
  const { t } = useTranslation();
  const reached = xpToday >= goal;
  return (
    <Card testID="daily-goal-card">
      <View style={styles.row}>
        <View style={[styles.iconCircle, { backgroundColor: colors.successSoft }]}>
          <Ionicons name={reached ? 'flag' : 'flag-outline'} size={22} color={colors.success} />
        </View>
        <View style={styles.flex}>
          <AppText variant="caption" color="muted">
            {t('gamification.dailyGoal')}
          </AppText>
          <AppText variant="subheading">
            {reached
              ? t('gamification.goalReached')
              : t('gamification.dailyGoalProgress', { xp: xpToday, goal })}
          </AppText>
        </View>
      </View>
      <ProgressBar
        progress={xpToday / goal}
        color={colors.success}
        accessibilityLabel={t('gamification.dailyGoalProgress', { xp: xpToday, goal })}
      />
    </Card>
  );
}

/* ---------- Badge ---------- */

export function BadgeTile({ id, earned }: { id: string; earned: boolean }) {
  const { t } = useTranslation();
  const badge = getBadge(id);
  if (!badge) return null;
  const tierColor =
    badge.tier === 'gold' ? colors.xp : badge.tier === 'silver' ? colors.accent : colors.streak;
  const title = t(`badges.${id}.title` as 'badges.firstLesson.title');
  const description = t(`badges.${id}.description` as 'badges.firstLesson.description');

  return (
    <View
      style={[styles.badgeTile, !earned && styles.badgeLocked]}
      accessible
      accessibilityLabel={`${title}. ${description}. ${earned ? '' : t('profile.badgeLocked')}`}
      testID={`badge-${id}`}
    >
      <View style={[styles.badgeIcon, { borderColor: earned ? tierColor : colors.border }]}>
        <Ionicons
          name={(earned ? badge.icon : 'lock-closed') as IconName}
          size={22}
          color={earned ? tierColor : colors.textMuted}
        />
      </View>
      <AppText variant="caption" align="center" numberOfLines={2} style={styles.badgeTitle}>
        {title}
      </AppText>
      <AppText variant="caption" color="muted" align="center" numberOfLines={3}>
        {description}
      </AppText>
    </View>
  );
}

/* ---------- Attività settimanale ---------- */

export function WeeklyChart({
  days,
  goal,
}: {
  days: { label: string; xp: number; a11y: string }[];
  goal: number;
}) {
  const max = Math.max(goal, ...days.map((d) => d.xp), 1);
  return (
    <View style={styles.chart}>
      {days.map((day, index) => (
        <View
          key={`${day.label}-${index}`}
          style={styles.chartCol}
          accessible
          accessibilityLabel={day.a11y}
        >
          <View style={styles.chartTrack}>
            <View
              style={[
                styles.chartBar,
                {
                  height: `${Math.max(4, (day.xp / max) * 100)}%`,
                  backgroundColor:
                    day.xp >= goal
                      ? colors.success
                      : day.xp > 0
                        ? colors.primary
                        : colors.surfacePressed,
                },
              ]}
            />
          </View>
          <AppText variant="caption" color="muted">
            {day.label}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  levelBadge: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  week: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.xs },
  day: { alignItems: 'center', gap: spacing.xs },
  dayDot: {
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    backgroundColor: colors.surfacePressed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayDotActive: { backgroundColor: colors.streak },
  badgeTile: {
    width: '31.5%',
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  badgeLocked: { opacity: 0.55 },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: radius.pill,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceElevated,
  },
  badgeTitle: { fontWeight: '700' },
  chart: { flexDirection: 'row', gap: spacing.sm, height: 120, alignItems: 'flex-end' },
  chartCol: { flex: 1, alignItems: 'center', gap: spacing.xs, height: '100%' },
  chartTrack: { flex: 1, width: '100%', justifyContent: 'flex-end' },
  chartBar: { width: '100%', borderRadius: radius.sm },
});
