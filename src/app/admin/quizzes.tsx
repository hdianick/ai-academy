import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { coursesRepository } from '@/data/repositories/courses';
import { AdminShell } from '@/features/admin/components/AdminShell';
import {
  contentStats,
  questionAnswer,
  questionText,
  type QuestionType,
} from '@/features/admin/stats';
import { courseLessons, courseQuizzes } from '@/features/courses/catalog';
import type { Course, ExerciseStep } from '@/features/courses/types';
import { AppText, Button, Card, Chip } from '@/ui';

export default function AdminQuizzesScreen() {
  const { t } = useTranslation();
  return (
    <AdminShell
      title={t('admin.modules.quizzes')}
      subtitle={t('admin.descriptions.quizzes')}
      testID="screen-admin-quizzes"
    >
      {coursesRepository.list().map((course) => (
        <CourseQuestions key={course.id} course={course} />
      ))}
    </AdminShell>
  );
}

function CourseQuestions({ course }: { course: Course }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const stats = contentStats(course);
  const total = stats.lessonQuestions + stats.quizQuestions;

  const groups: { title: string; questions: ExerciseStep[] }[] = [
    ...courseLessons(course).map((lesson) => ({
      title: lesson.title,
      questions: lesson.questions,
    })),
    ...courseQuizzes(course).map((quiz) => ({ title: quiz.title, questions: quiz.questions })),
  ];

  return (
    <Card>
      <AppText variant="subheading">{course.title}</AppText>
      <AppText variant="caption" color="muted">
        {t('admin.quizzes.bank', { count: total })} · {t('admin.quizzes.fromLessons')}:{' '}
        {stats.lessonQuestions} · {t('admin.quizzes.fromQuizzes')}: {stats.quizQuestions}
      </AppText>
      <View style={styles.chips}>
        {(Object.entries(stats.byType) as [QuestionType, number][]).map(([type, count]) => (
          <Chip key={type} label={`${t(`admin.quizzes.types.${type}`)} · ${count}`} />
        ))}
      </View>
      <Button
        label={open ? t('admin.quizzes.hideQuestions') : t('admin.quizzes.showQuestions')}
        variant="ghost"
        onPress={() => setOpen((v) => !v)}
      />
      {open
        ? groups.map((group) => (
            <View key={group.title} style={styles.group}>
              <AppText variant="bodyStrong" color="accent">
                {group.title}
              </AppText>
              {group.questions.map((question) => (
                <View key={question.id} style={styles.question}>
                  <AppText variant="caption" color="muted">
                    {t(`admin.quizzes.types.${question.type}`)}
                  </AppText>
                  <AppText>{questionText(question)}</AppText>
                  <AppText variant="caption" color="success">
                    {t('admin.quizzes.answer')}:{' '}
                    {questionAnswer(question, {
                      yes: t('admin.quizzes.yes'),
                      no: t('admin.quizzes.no'),
                    })}
                  </AppText>
                </View>
              ))}
            </View>
          ))
        : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  group: { gap: spacing.sm, paddingTop: spacing.sm },
  question: {
    gap: 2,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
  },
});
