import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, spacing } from '@/core/theme';
import { coursesRepository } from '@/data/repositories/courses';
import { CourseCard } from '@/features/courses/components/CourseCard';
import {
  getContinueCourse,
  getCourseProgress,
  getNextActivity,
} from '@/features/progress/progress';
import { useProgressStore } from '@/features/progress/store';
import { AppText, Button, Card, DemoBanner, ProgressBar, Screen, StatTile } from '@/ui';

function openCourse(courseId: string) {
  router.push({ pathname: '/course/[courseId]', params: { courseId } });
}

export default function HomeScreen() {
  const { t } = useTranslation();
  const progressState = useProgressStore();
  const courses = coursesRepository.list();

  const continueCourse = getContinueCourse(courses, progressState);
  const featured = continueCourse ?? courses[0] ?? null;
  const featuredProgress = featured ? getCourseProgress(featured, progressState) : null;
  const next = featured ? getNextActivity(featured, progressState) : null;

  const lessonsDone = Object.keys(progressState.lessons).length;
  const coursesDone = courses.filter((c) => getCourseProgress(c, progressState).completed).length;
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
        <AppText variant="overline" color="accent">
          {t('app.payoff')}
        </AppText>
        <AppText variant="title">{t('home.greeting', { name: t('home.guestName') })}</AppText>
        <AppText color="secondary">{t('home.subtitle')}</AppText>
      </View>

      <View style={styles.stats}>
        <StatTile
          icon="flash"
          value={String(progressState.xp)}
          label={t('home.xpLabel')}
          color={colors.xp}
        />
        <StatTile icon="book" value={String(lessonsDone)} label={t('home.lessonsLabel')} />
        <StatTile
          icon="trophy"
          value={String(coursesDone)}
          label={t('home.coursesLabel')}
          color={colors.success}
        />
      </View>

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
  stats: { flexDirection: 'row', gap: spacing.sm },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  seeAll: { flexDirection: 'row', alignItems: 'center', gap: spacing.xxs },
  list: { gap: spacing.md },
});
