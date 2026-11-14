import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { coursesRepository } from '@/data/repositories/courses';
import { AdminShell, Notice } from '@/features/admin/components/AdminShell';
import { contentStats } from '@/features/admin/stats';
import { AppText, Card, Chip } from '@/ui';

export default function AdminCoursesScreen() {
  const { t } = useTranslation();
  const courses = coursesRepository.list();

  return (
    <AdminShell
      title={t('admin.modules.courses')}
      subtitle={t('admin.descriptions.courses')}
      testID="screen-admin-courses"
    >
      <Notice icon="code-slash-outline" text={t('admin.content.editNote')} />
      {courses.map((course) => {
        const stats = contentStats(course);
        return (
          <Card
            key={course.id}
            onPress={() =>
              router.push({ pathname: '/admin/course/[courseId]', params: { courseId: course.id } })
            }
            accessibilityLabel={course.title}
          >
            <AppText variant="subheading">{course.title}</AppText>
            <View style={styles.chips}>
              <Chip label={t(`categories.${course.category}`)} tone="accent" />
              <Chip label={t(`levels.${course.level}`)} />
              <Chip
                label={t(`tiers.${course.requiredTier}`)}
                tone={course.requiredTier === 'free' ? 'default' : 'warning'}
              />
            </View>
            <AppText variant="caption" color="muted">
              {t('admin.content.modules')}: {stats.modules} · {t('admin.content.lessons')}:{' '}
              {stats.lessons} · {t('admin.content.theoryPages')}: {stats.theoryPages} ·{' '}
              {t('admin.content.questions')}: {stats.lessonQuestions + stats.quizQuestions}
            </AppText>
          </Card>
        );
      })}
    </AdminShell>
  );
}

const styles = StyleSheet.create({
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
