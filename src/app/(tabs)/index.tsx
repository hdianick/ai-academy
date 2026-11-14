import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { coursesRepository } from '@/data/repositories/courses';
import { CourseCard } from '@/features/courses/components/CourseCard';
import {
  getContinueCourse,
  getCourseProgress,
  getNextActivity,
} from '@/features/progress/progress';
import {
  DailyGoalCard,
  LevelCard,
  StreakCard,
} from '@/features/gamification/components/GamificationCards';
import { useGamification } from '@/features/gamification/hooks';
import { AnnouncementsBanner } from '@/features/announcements/AnnouncementsBanner';
import { useAuthStore } from '@/features/auth/store';
import { useProgressStore } from '@/features/progress/store';
import { ToolsTeaser } from '@/features/tools/components/ToolsTeaser';
import { AppText, Button, Card, DemoBanner, ProgressBar, Screen } from '@/ui';

function openCourse(courseId: string) {
  router.push({ pathname: '/course/[courseId]', params: { courseId } });
}

export default function HomeScreen() {
  const { t } = useTranslation();
  const displayName = useAuthStore((s) => s.profile?.displayName);
  const progressState = useProgressStore();
  const game = useGamification();
  const courses = coursesRepository.list();

  const continueCourse = getContinueCourse(courses, progressState);
  const featured = continueCourse ?? courses[0] ?? null;
  const featuredProgress = featured ? getCourseProgress(featured, progressState) : null;
  const next = featured ? getNextActivity(featured, progressState) : null;

  const recommended = courses.filter((course) => course.id !== featured?.id).slice(0, 3);

  const openNext = () => {
    if (!featured) return;
    if (next?.kind === 'lesson')
      router.push({ pathname: '/lesson/[lessonId]', params: { lessonId: next.id } });
    else if (next?.kind === 'quiz')
      router.push({ pathname: '/quiz/[quizId]', params: { quizId: next.id } });
    else openCourse(featured.id);
  };

  return (
    <Screen testID="screen-home">
      <DemoBanner />

      <View style={styles.header}>
        <View style={styles.topRow}>
          <AppText variant="overline" color="accent">
            {t('app.payoff')}
          </AppText>
          <View style={styles.pills}>
            <View
              style={styles.pill}
              accessible
              accessibilityLabel={`${t('gamification.streakTitle')}: ${game.streak}`}
            >
              <Ionicons
                name="flame"
                size={16}
                color={game.streak > 0 ? colors.streak : colors.textMuted}
              />
              <AppText variant="bodyStrong">{game.streak}</AppText>
            </View>
            <View
              style={styles.pill}
              accessible
              accessibilityLabel={`${t('home.xpLabel')}: ${game.xp}`}
            >
              <Ionicons name="flash" size={16} color={colors.xp} />
              <AppText variant="bodyStrong">{game.xp}</AppText>
            </View>
          </View>
        </View>
        <AppText variant="title">
          {t('home.greeting', { name: displayName || t('home.guestName') })}
        </AppText>
        <AppText color="secondary">{t('home.subtitle')}</AppText>
      </View>

      <AnnouncementsBanner />

      <DailyGoalCard xpToday={game.xpToday} goal={game.dailyGoal} />

      {featured && featuredProgress ? (
        <Card variant="highlight" testID="home-featured">
          <AppText variant="overline" color="accent">
            {continueCourse ? t('home.continueTitle') : t('home.startTitle')}
          </AppText>
          <AppText variant="heading">{featured.title}</AppText>
          {continueCourse ? (
            <>
              <ProgressBar
                progress={featuredProgress.ratio}
                accessibilityLabel={t('course.progress', {
                  percent: Math.round(featuredProgress.ratio * 100),
                })}
              />
              <AppText variant="caption" color="muted">
                {t('course.progress', { percent: Math.round(featuredProgress.ratio * 100) })}
              </AppText>
            </>
          ) : (
            <AppText color="secondary">{t('home.startDescription')}</AppText>
          )}
          {next ? (
            <AppText variant="bodyStrong" color="secondary">
              {t('home.nextUp', { title: next.title })}
            </AppText>
          ) : null}
          <Button
            label={continueCourse ? t('course.continue') : t('course.start')}
            onPress={openNext}
            testID="home-continue"
          />
        </Card>
      ) : null}

      <StreakCard
        streak={game.streak}
        activeToday={game.activeToday}
        week={game.days.map((day) => ({ label: day.label, active: day.xp > 0 }))}
      />

      <LevelCard xp={game.xp} />

      <ToolsTeaser />

      <View style={styles.sectionHeader}>
        <AppText variant="heading">{t('home.recommendedTitle')}</AppText>
        <Pressable onPress={() => router.push('/academy')} accessibilityRole="link" hitSlop={8}>
          <View style={styles.seeAll}>
            <AppText variant="bodyStrong" color="accent">
              {t('home.seeAll')}
            </AppText>
            <Ionicons name="chevron-forward" size={16} color={colors.accent} />
          </View>
        </Pressable>
      </View>

      <View style={styles.list}>
        {recommended.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            compact
            progress={getCourseProgress(course, progressState).ratio}
            onPress={() => openCourse(course.id)}
          />
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: spacing.xs },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  pills: { flexDirection: 'row', gap: spacing.sm },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAll: { flexDirection: 'row', alignItems: 'center', gap: spacing.xxs },
  list: { gap: spacing.md },
});
