import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { courseDurationMinutes, courseLessons } from '@/features/courses/catalog';
import type { Course } from '@/features/courses/types';
import { AppText, Card, Chip, ProgressBar } from '@/ui';

export interface CourseCardProps {
  course: Course;
  /** 0-1, se non definito la barra non viene mostrata. */
  progress?: number;
  onPress: () => void;
  compact?: boolean;
}

export function CourseCard({ course, progress, onPress, compact = false }: CourseCardProps) {
  const { t } = useTranslation();
  const lessons = courseLessons(course).length;
  const percent = Math.round((progress ?? 0) * 100);

  return (
    <Card onPress={onPress} accessibilityLabel={course.title} testID={`course-card-${course.id}`}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons
            name={course.icon as ComponentProps<typeof Ionicons>['name']}
            size={22}
            color={colors.primary}
          />
        </View>
        <View style={styles.headerText}>
          <AppText variant="subheading" numberOfLines={2}>
            {course.title}
          </AppText>
          {!compact ? (
            <AppText variant="caption" color="secondary" numberOfLines={2}>
              {course.subtitle}
            </AppText>
          ) : null}
        </View>
      </View>

      <View style={styles.meta}>
        <Chip label={t(`levels.${course.level}`)} tone="accent" />
        <Chip label={t('course.lessons', { count: lessons })} />
        <Chip label={t('course.minutes', { count: courseDurationMinutes(course) })} />
        {course.requiredTier !== 'free' ? (
          <Chip label={t(`tiers.${course.requiredTier}`)} tone="warning" />
        ) : null}
      </View>

      {progress !== undefined && progress > 0 ? (
        <View style={styles.progress}>
          <ProgressBar progress={progress} accessibilityLabel={t('course.progress', { percent })} />
          <AppText variant="caption" color="muted">
            {t('course.progress', { percent })}
          </AppText>
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', gap: spacing.md, alignItems: 'flex-start' },
  headerText: { flex: 1, gap: spacing.xxs },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs, marginTop: spacing.xs },
  progress: { gap: spacing.xs, marginTop: spacing.xs },
});
