import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { coursesRepository } from '@/data/repositories/courses';
import { courseDurationMinutes, courseLessons } from '@/features/courses/catalog';
import { ActivityRow, type ActivityStatus } from '@/features/courses/components/ActivityRow';
import { getCourseProgress, getNextActivity } from '@/features/progress/progress';
import { useAccess } from '@/features/entitlements/hooks';
import { useProgressStore } from '@/features/progress/store';
import { AppText, Button, Card, Chip, EmptyState, IconButton, ProgressBar, Screen } from '@/ui';

function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/academy');
}

export default function CourseScreen() {
  const { t } = useTranslation();
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const progressState = useProgressStore();
  const access = useAccess();
  const course = courseId ? coursesRepository.get(courseId) : null;

  if (!course) {
    return (
      <Screen scroll={false}>
        <EmptyState
          icon="alert-circle-outline"
          title={t('course.notFound')}
          actionLabel={t('common.backHome')}
          onAction={() => router.replace('/')}
        />
      </Screen>
    );
  }

  const progress = getCourseProgress(course, progressState);
  const next = getNextActivity(course, progressState);
  const percent = Math.round(progress.ratio * 100);

  const locked = !access.can(course.requiredTier);
  const openActivity = (kind: 'lesson' | 'quiz', id: string) => {
    if (locked) {
      router.push('/plans');
      return;
    }
    if (kind === 'lesson')
      router.push({ pathname: '/lesson/[lessonId]', params: { lessonId: id } });
    else router.push({ pathname: '/quiz/[quizId]', params: { quizId: id } });
  };

  const statusFor = (kind: 'lesson' | 'quiz', id: string): ActivityStatus => {
    const done = kind === 'lesson' ? progressState.lessons[id] : progressState.quizzes[id]?.passed;
    if (done) return 'done';
    return next?.id === id ? 'next' : 'todo';
  };

  const quizSubtitle = (quizId: string, questions: number) => {
    const record = progressState.quizzes[quizId];
    if (record?.passed) return t('course.passed');
    if (record) return t('course.bestScore', { percent: Math.round(record.bestScore * 100) });
    return t('course.questions', { count: questions });
  };

  const ctaLabel = progress.completed
    ? t('course.review')
    : progress.ratio > 0
      ? t('course.continue')
      : t('course.start');

  const firstLessonId = courseLessons(course)[0]?.id;

  return (
    <Screen testID="screen-course">
      <IconButton icon="arrow-back" onPress={goBack} accessibilityLabel={t('common.back')} />

      <View style={styles.hero}>
        <View style={styles.heroIcon}>
          <Ionicons
            name={course.icon as ComponentProps<typeof Ionicons>['name']}
            size={30}
            color={colors.primary}
          />
        </View>
        <AppText variant="overline" color="accent">
          {t(`categories.${course.category}`)}
        </AppText>
        <AppText variant="title">{course.title}</AppText>
        <AppText color="secondary">{course.description}</AppText>
        <View style={styles.chips}>
          <Chip label={t(`levels.${course.level}`)} tone="accent" />
          <Chip label={t('course.modules', { count: course.modules.length })} />
          <Chip label={t('course.lessons', { count: courseLessons(course).length })} />
          <Chip label={t('course.minutes', { count: courseDurationMinutes(course) })} />
        </View>
        {course.requiredTier !== 'free' ? (
          <Chip
            tone="warning"
            label={
              access.demo
                ? t('tiers.demoUnlocked', { tier: t(`tiers.${course.requiredTier}`) })
                : t(`tiers.${course.requiredTier}`)
            }
          />
        ) : null}
      </View>

      <Card variant="elevated">
        <View style={styles.progressHeader}>
          <AppText variant="bodyStrong">
            {progress.completed ? t('course.completed') : t('course.progress', { percent })}
          </AppText>
          {progress.completed ? <Ionicons name="trophy" size={20} color={colors.xp} /> : null}
        </View>
        <ProgressBar
          progress={progress.ratio}
          accessibilityLabel={t('course.progress', { percent })}
        />
        <Button
          label={locked ? t('plans.seePlans') : ctaLabel}
          fullWidth
          testID="course-cta"
          onPress={() => {
            if (next) openActivity(next.kind, next.id);
            else if (firstLessonId) openActivity('lesson', firstLessonId);
          }}
        />
      </Card>

      <View style={styles.section}>
        <AppText variant="heading">{t('course.outcomesTitle')}</AppText>
        {course.outcomes.map((outcome) => (
          <View key={outcome} style={styles.outcome}>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
            <AppText color="secondary" style={styles.flex}>
              {outcome}
            </AppText>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <AppText variant="heading">{t('course.toolsTitle')}</AppText>
        <View style={styles.chips}>
          {course.tools.map((tool) => (
            <Chip key={tool} label={tool} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <AppText variant="heading">{t('course.programTitle')}</AppText>
        {course.modules.map((module, moduleIndex) => (
          <Card key={module.id}>
            <AppText variant="overline" color="accent">
              {t('course.moduleLabel', { index: moduleIndex + 1 })}
            </AppText>
            <AppText variant="subheading">{module.title}</AppText>
            <AppText variant="caption" color="muted">
              {module.description}
            </AppText>
            <View style={styles.activities}>
              {module.lessons.map((lesson) => (
                <ActivityRow
                  key={lesson.id}
                  icon="book-outline"
                  title={lesson.title}
                  subtitle={`${t('course.minutes', { count: lesson.estimatedMinutes })} · ${t('lesson.theoryPages', { count: lesson.theory.length })} · ${lesson.xp} XP`}
                  status={statusFor('lesson', lesson.id)}
                  onPress={() => openActivity('lesson', lesson.id)}
                  testID={`lesson-row-${lesson.id}`}
                />
              ))}
              <ActivityRow
                icon="help-circle-outline"
                title={t('course.moduleQuiz')}
                subtitle={quizSubtitle(module.quiz.id, module.quiz.questions.length)}
                status={statusFor('quiz', module.quiz.id)}
                onPress={() => openActivity('quiz', module.quiz.id)}
              />
            </View>
          </Card>
        ))}

        <Card variant="highlight">
          <ActivityRow
            icon="ribbon-outline"
            title={t('course.finalTest')}
            subtitle={quizSubtitle(course.finalTest.id, course.finalTest.questions.length)}
            status={statusFor('quiz', course.finalTest.id)}
            onPress={() => openActivity('quiz', course.finalTest.id)}
          />
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: spacing.sm },
  heroIcon: {
    width: 60,
    height: 60,
    borderRadius: radius.xl,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  section: { gap: spacing.md },
  outcome: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  flex: { flex: 1 },
  activities: { gap: spacing.xxs, marginTop: spacing.sm, marginHorizontal: -spacing.sm },
});
