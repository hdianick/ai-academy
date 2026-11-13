import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { practiceRepository } from '@/data/repositories/practice';
import { toDateKey } from '@/features/gamification/streak';
import { getWeeklyStatus, weeklyClaimKey } from '@/features/practice/challenges';
import type { PracticeItem, PracticeKind, WeeklyMetric } from '@/features/practice/types';
import { useProgressStore } from '@/features/progress/store';
import { AppText, Button, Card, Chip, FadeIn, ProgressBar, Screen, ScreenHeader } from '@/ui';

type IconName = ComponentProps<typeof Ionicons>['name'];

const weeklyLabelKey: Record<
  WeeklyMetric,
  'practice.weeklyXp' | 'practice.weeklyLessons' | 'practice.weeklyActiveDays'
> = {
  xp: 'practice.weeklyXp',
  lessons: 'practice.weeklyLessons',
  activeDays: 'practice.weeklyActiveDays',
};

const sections: {
  kind: PracticeKind;
  titleKey: 'practice.missionsTitle' | 'practice.comparisonsTitle' | 'practice.projectsTitle';
}[] = [
  { kind: 'mission', titleKey: 'practice.missionsTitle' },
  { kind: 'comparison', titleKey: 'practice.comparisonsTitle' },
  { kind: 'project', titleKey: 'practice.projectsTitle' },
];

function PracticeCard({ item, done }: { item: PracticeItem; done: boolean }) {
  const { t } = useTranslation();
  return (
    <Card
      onPress={() =>
        router.push({ pathname: '/practice/[practiceId]', params: { practiceId: item.id } })
      }
      accessibilityLabel={item.title}
      testID={`practice-card-${item.id}`}
    >
      <View style={styles.row}>
        <View style={[styles.icon, done && { backgroundColor: colors.successSoft }]}>
          <Ionicons
            name={(done ? 'checkmark' : item.icon) as IconName}
            size={20}
            color={done ? colors.success : colors.primary}
          />
        </View>
        <View style={styles.flex}>
          <AppText variant="subheading">{item.title}</AppText>
          <AppText variant="caption" color="secondary" numberOfLines={2}>
            {item.description}
          </AppText>
        </View>
      </View>
      <View style={styles.chips}>
        <Chip label={t(`levels.${item.difficulty}`)} tone="accent" />
        <Chip label={t('course.minutes', { count: item.estimatedMinutes })} />
        <Chip
          label={done ? t('practice.done') : `${item.xp} XP`}
          tone={done ? 'success' : 'default'}
        />
      </View>
    </Card>
  );
}

export default function PracticeScreen() {
  const { t } = useTranslation();
  const state = useProgressStore();
  const claimWeekly = useProgressStore((s) => s.claimWeekly);
  const [toast, setToast] = useState<string | null>(null);

  const today = toDateKey(new Date());
  const daily = state.dailyChallenges[today];
  const weekly = getWeeklyStatus(practiceRepository.weekly(), state, today);
  const items = practiceRepository.list();

  return (
    <Screen testID="screen-practice">
      <ScreenHeader title={t('practice.title')} subtitle={t('practice.subtitle')} />

      <Card variant="highlight" testID="daily-challenge-card">
        <View style={styles.row}>
          <View style={[styles.icon, { backgroundColor: colors.warningSoft }]}>
            <Ionicons name={daily ? 'trophy' : 'timer-outline'} size={22} color={colors.xp} />
          </View>
          <View style={styles.flex}>
            <AppText variant="overline" color="accent">
              {t('practice.dailyTitle')}
            </AppText>
            <AppText variant="subheading">
              {daily
                ? t('practice.dailyDone', {
                    correct: Math.round(daily.score * practiceRepository.dailySize),
                    total: practiceRepository.dailySize,
                  })
                : t('practice.dailyDescription', {
                    count: practiceRepository.dailySize,
                    xp: practiceRepository.dailyMaxXp,
                  })}
            </AppText>
          </View>
        </View>
        <Button
          label={daily ? t('practice.dailyRetry') : t('practice.dailyStart')}
          variant={daily ? 'secondary' : 'primary'}
          onPress={() => router.push('/challenge/daily')}
          testID="daily-start"
        />
      </Card>

      <AppText variant="heading">{t('practice.weeklyTitle')}</AppText>
      {toast ? (
        <FadeIn pop>
          <Chip label={toast} tone="success" />
        </FadeIn>
      ) : null}
      {weekly.map(({ challenge, value, progress, completed, claimed }) => (
        <Card key={challenge.id} testID={`weekly-${challenge.id}`}>
          <View style={styles.row}>
            <Ionicons name={challenge.icon as IconName} size={20} color={colors.primary} />
            <AppText variant="bodyStrong" style={styles.flex}>
              {t(weeklyLabelKey[challenge.metric], { target: challenge.target })}
            </AppText>
            <AppText variant="caption" color="muted">
              {t('practice.weeklyProgress', {
                value: Math.min(value, challenge.target),
                target: challenge.target,
              })}
            </AppText>
          </View>
          <ProgressBar
            progress={progress}
            color={completed ? colors.success : colors.primary}
            accessibilityLabel={t(weeklyLabelKey[challenge.metric], { target: challenge.target })}
          />
          {claimed ? (
            <Chip label={t('practice.claimed')} tone="success" />
          ) : completed ? (
            <Button
              label={t('practice.claim', { xp: challenge.bonusXp })}
              testID={`claim-${challenge.id}`}
              onPress={() => {
                const reward = claimWeekly({
                  claimKey: weeklyClaimKey(challenge.id, today),
                  xp: challenge.bonusXp,
                });
                if (reward) setToast(t('practice.claimedToast', { xp: reward.xp }));
              }}
            />
          ) : (
            <AppText variant="caption" color="muted">
              +{challenge.bonusXp} XP
            </AppText>
          )}
        </Card>
      ))}

      {sections.map(({ kind, titleKey }) => (
        <View key={kind} style={styles.section}>
          <AppText variant="heading">{t(titleKey)}</AppText>
          {items
            .filter((item) => item.kind === kind)
            .map((item) => (
              <PracticeCard key={item.id} item={item} done={Boolean(state.practice[item.id])} />
            ))}
        </View>
      ))}

      <Card>
        <View style={styles.row}>
          <Ionicons name="podium-outline" size={22} color={colors.textMuted} />
          <View style={styles.flex}>
            <AppText variant="subheading">{t('practice.leaderboardTitle')}</AppText>
            <AppText variant="caption" color="muted">
              {t('practice.leaderboardSoon')}
            </AppText>
          </View>
          <Chip label={t('common.comingSoon')} tone="warning" />
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  section: { gap: spacing.md },
});
