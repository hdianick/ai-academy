import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { coursesRepository } from '@/data/repositories/courses';
import { useAuthStore } from '@/features/auth/store';
import { useIsStaff } from '@/features/entitlements/hooks';
import { badgeDefinitions, dailyGoalOptions } from '@/features/gamification/badges';
import {
  BadgeTile,
  LevelCard,
  WeeklyChart,
} from '@/features/gamification/components/GamificationCards';
import { useGamification } from '@/features/gamification/hooks';
import { getLevelInfo, getRank } from '@/features/gamification/levels';
import { getCourseProgress } from '@/features/progress/progress';
import { useProgressStore } from '@/features/progress/store';
import { AppText, Button, Card, Chip, DemoBanner, Screen, StatTile } from '@/ui';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const game = useGamification();
  const progressState = useProgressStore();
  const setDailyGoal = useProgressStore((s) => s.setDailyGoal);
  const reset = useProgressStore((s) => s.reset);
  const [confirmReset, setConfirmReset] = useState(false);
  const authStatus = useAuthStore((s) => s.status);
  const email = useAuthStore((s) => s.email);
  const profile = useAuthStore((s) => s.profile);
  const signOut = useAuthStore((s) => s.signOut);
  const isStaff = useIsStaff();
  const signedIn = authStatus === 'signedIn';

  const level = getLevelInfo(game.xp).level;
  const completedCourses = coursesRepository
    .list()
    .filter((course) => getCourseProgress(course, progressState).completed);
  const earnedCount = badgeDefinitions.filter((b) => game.badges[b.id]).length;

  return (
    <Screen testID="screen-profile">
      <DemoBanner />

      <View style={styles.identity}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={34} color={colors.textOnAccent} />
        </View>
        <View style={styles.flex}>
          <AppText variant="title">
            {signedIn && profile?.displayName ? profile.displayName : t('profile.guestName')}
          </AppText>
          <AppText color="accent" variant="bodyStrong">
            {t(`rank.${getRank(level)}`)} · {t('gamification.level', { level })}
          </AppText>
          <AppText variant="caption" color="muted">
            {signedIn && email
              ? t('auth.signedInAs', { email })
              : authStatus === 'demo'
                ? t('profile.demoAccount')
                : t('auth.accountSignedOut')}
          </AppText>
        </View>
      </View>

      <Card testID="account-card">
        <AppText variant="subheading">{t('auth.accountTitle')}</AppText>
        {signedIn ? (
          <>
            <AppText color="secondary">
              {t('plans.current')}: {t(`tiers.${profile?.plan ?? 'free'}`)}
            </AppText>
            <View style={styles.chips}>
              <Button
                label={t('plans.seePlans')}
                variant="secondary"
                onPress={() => router.push('/plans')}
              />
              {isStaff ? (
                <Button
                  label={t('admin.entry')}
                  variant="secondary"
                  onPress={() => router.push('/admin')}
                />
              ) : null}
              <Button
                label={t('auth.signOut')}
                variant="ghost"
                onPress={() => void signOut()}
                testID="sign-out"
              />
            </View>
          </>
        ) : (
          <>
            <AppText color="secondary">
              {authStatus === 'demo' ? t('auth.accountDemo') : t('auth.accountSignedOut')}
            </AppText>
            <View style={styles.chips}>
              <Button
                label={t('auth.signInOrUp')}
                onPress={() => router.push('/login')}
                testID="open-login"
              />
              <Button
                label={t('plans.seePlans')}
                variant="secondary"
                onPress={() => router.push('/plans')}
                testID="open-plans"
              />
            </View>
          </>
        )}
      </Card>

      <LevelCard xp={game.xp} />

      <AppText variant="heading">{t('profile.statsTitle')}</AppText>
      <View style={styles.grid}>
        <StatTile
          icon="flash"
          value={String(game.xp)}
          label={t('profile.statXp')}
          color={colors.xp}
        />
        <StatTile
          icon="flame"
          value={String(game.streak)}
          label={t('profile.statStreak')}
          color={colors.streak}
        />
        <StatTile
          icon="medal"
          value={String(game.longestStreak)}
          label={t('profile.statLongest')}
          color={colors.streak}
        />
      </View>
      <View style={styles.grid}>
        <StatTile
          icon="book"
          value={String(game.stats.lessonsCompleted)}
          label={t('profile.statLessons')}
        />
        <StatTile
          icon="checkmark-done"
          value={String(game.stats.quizzesPassed)}
          label={t('profile.statQuizzes')}
        />
        <StatTile
          icon="school"
          value={String(game.stats.coursesCompleted)}
          label={t('profile.statCourses')}
          color={colors.success}
        />
      </View>

      <Card>
        <AppText variant="subheading">{t('profile.activityTitle')}</AppText>
        <WeeklyChart
          goal={game.dailyGoal}
          days={game.days.map((day) => ({
            label: day.label,
            xp: day.xp,
            a11y: t('profile.activityA11y', { day: day.longLabel, xp: day.xp }),
          }))}
        />
      </Card>

      <View style={styles.sectionHeader}>
        <AppText variant="heading">{t('profile.badgesTitle')}</AppText>
        <AppText variant="caption" color="muted">
          {t('profile.badgesCount', { earned: earnedCount, total: badgeDefinitions.length })}
        </AppText>
      </View>
      <View style={styles.badges}>
        {badgeDefinitions.map((badge) => (
          <BadgeTile key={badge.id} id={badge.id} earned={Boolean(game.badges[badge.id])} />
        ))}
      </View>

      <AppText variant="heading">{t('profile.certificatesTitle')}</AppText>
      {completedCourses.length === 0 ? (
        <Card>
          <View style={styles.row}>
            <Ionicons name="ribbon-outline" size={22} color={colors.textMuted} />
            <AppText color="secondary" style={styles.flex}>
              {t('profile.noCertificates')}
            </AppText>
          </View>
        </Card>
      ) : (
        <>
          {completedCourses.map((course) => (
            <Card
              key={course.id}
              variant="highlight"
              onPress={() =>
                router.push({ pathname: '/course/[courseId]', params: { courseId: course.id } })
              }
              accessibilityLabel={course.title}
            >
              <View style={styles.row}>
                <Ionicons name="ribbon" size={26} color={colors.xp} />
                <View style={styles.flex}>
                  <AppText variant="subheading">{course.title}</AppText>
                  <AppText variant="caption" color="success">
                    {t('profile.certificateCompleted')}
                  </AppText>
                </View>
              </View>
            </Card>
          ))}
          <AppText variant="caption" color="muted">
            {t('profile.certificateNote')}
          </AppText>
        </>
      )}

      <Card>
        <AppText variant="subheading">{t('profile.goalTitle')}</AppText>
        <AppText variant="caption" color="muted">
          {t('profile.goalDescription')}
        </AppText>
        <View style={styles.chips}>
          {dailyGoalOptions.map((xp) => (
            <Chip
              key={xp}
              label={t('profile.goalOption', { xp })}
              selected={game.dailyGoal === xp}
              onPress={() => setDailyGoal(xp)}
              testID={`goal-${xp}`}
            />
          ))}
        </View>
      </Card>

      <Card>
        <AppText variant="subheading">{t('profile.resetTitle')}</AppText>
        <AppText variant="caption" color="muted">
          {confirmReset ? t('profile.resetQuestion') : t('profile.resetDescription')}
        </AppText>
        {confirmReset ? (
          <View style={styles.chips}>
            <Button
              label={t('profile.resetConfirm')}
              onPress={() => {
                reset();
                setConfirmReset(false);
              }}
              testID="reset-confirm"
            />
            <Button
              label={t('profile.resetCancel')}
              variant="ghost"
              onPress={() => setConfirmReset(false)}
            />
          </View>
        ) : (
          <Button
            label={t('profile.resetTitle')}
            variant="secondary"
            onPress={() => setConfirmReset(true)}
            testID="reset-start"
          />
        )}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  identity: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.secondary,
  },
  grid: { flexDirection: 'row', gap: spacing.sm },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  badges: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, alignItems: 'center' },
});
