import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { coursesRepository } from '@/data/repositories/courses';
import { AdminShell } from '@/features/admin/components/AdminShell';
import { AppText, Button, Card } from '@/ui';

export default function AdminCourseDetailScreen() {
  const { t } = useTranslation();
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const course = courseId ? coursesRepository.get(courseId) : null;

  if (!course) {
    return (
      <AdminShell title={t('admin.content.notFound')}>
        <AppText color="secondary">{t('admin.content.notFound')}</AppText>
      </AdminShell>
    );
  }

  return (
    <AdminShell title={course.title} subtitle={course.subtitle} testID="screen-admin-course">
      <Button
        label={t('admin.content.openInApp')}
        variant="secondary"
        onPress={() =>
          router.push({ pathname: '/course/[courseId]', params: { courseId: course.id } })
        }
      />
      {course.modules.map((module, index) => (
        <Card key={module.id}>
          <AppText variant="overline" color="accent">
            {t('admin.content.modules')} {index + 1}
          </AppText>
          <AppText variant="subheading">{module.title}</AppText>
          {module.lessons.map((lesson) => (
            <View key={lesson.id} style={styles.lesson}>
              <AppText variant="bodyStrong">{lesson.title}</AppText>
              <AppText variant="caption" color="muted">
                {t('admin.content.lessonLine', {
                  pages: lesson.theory.length,
                  questions: lesson.questions.length,
                })}
              </AppText>
            </View>
          ))}
          <View style={styles.lesson}>
            <AppText variant="bodyStrong">{module.quiz.title}</AppText>
            <AppText variant="caption" color="muted">
              {t('admin.quizzes.bank', { count: module.quiz.questions.length })}
            </AppText>
          </View>
        </Card>
      ))}
      <Card variant="highlight">
        <AppText variant="subheading">{course.finalTest.title}</AppText>
        <AppText variant="caption" color="muted">
          {t('admin.quizzes.bank', { count: course.finalTest.questions.length })}
        </AppText>
      </Card>
    </AdminShell>
  );
}

const styles = StyleSheet.create({
  lesson: { gap: 2, paddingTop: spacing.sm },
});
