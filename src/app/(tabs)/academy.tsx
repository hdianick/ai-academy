import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { coursesRepository } from '@/data/repositories/courses';
import { allTools, filterCourses } from '@/features/courses/catalog';
import { CourseCard } from '@/features/courses/components/CourseCard';
import {
  courseCategories,
  courseLevels,
  type CourseCategory,
  type CourseLevel,
} from '@/features/courses/types';
import { getCourseProgress } from '@/features/progress/progress';
import { useProgressStore } from '@/features/progress/store';
import { ToolsTeaser } from '@/features/tools/components/ToolsTeaser';
import { AppText, Chip, EmptyState, Screen, ScreenHeader, SearchField } from '@/ui';

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.filterGroup}>
      <AppText variant="overline" color="muted">
        {label}
      </AppText>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {children}
      </ScrollView>
    </View>
  );
}

export default function AcademyScreen() {
  const { t } = useTranslation();
  const progressState = useProgressStore();
  const courses = coursesRepository.list();
  const tools = useMemo(() => allTools(courses), [courses]);

  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<CourseLevel | null>(null);
  const [category, setCategory] = useState<CourseCategory | null>(null);
  const [tool, setTool] = useState<string | null>(null);

  const results = filterCourses(courses, { query, level, category, tool });
  const hasFilters = Boolean(query || level || category || tool);

  const clearFilters = () => {
    setQuery('');
    setLevel(null);
    setCategory(null);
    setTool(null);
  };

  return (
    <Screen testID="screen-academy">
      <ScreenHeader title={t('academy.title')} subtitle={t('academy.subtitle')} />

      <ToolsTeaser />

      <SearchField
        value={query}
        onChangeText={setQuery}
        placeholder={t('academy.searchPlaceholder')}
        accessibilityLabel={t('academy.searchLabel')}
        clearLabel={t('academy.clearSearch')}
      />

      <FilterRow label={t('academy.filterLevel')}>
        <Chip label={t('academy.filterAll')} selected={!level} onPress={() => setLevel(null)} />
        {courseLevels.map((value) => (
          <Chip
            key={value}
            label={t(`levels.${value}`)}
            selected={level === value}
            onPress={() => setLevel(level === value ? null : value)}
          />
        ))}
      </FilterRow>

      <FilterRow label={t('academy.filterCategory')}>
        <Chip
          label={t('academy.filterAll')}
          selected={!category}
          onPress={() => setCategory(null)}
        />
        {courseCategories.map((value) => (
          <Chip
            key={value}
            label={t(`categories.${value}`)}
            selected={category === value}
            onPress={() => setCategory(category === value ? null : value)}
          />
        ))}
      </FilterRow>

      <FilterRow label={t('academy.filterTool')}>
        <Chip label={t('academy.filterAll')} selected={!tool} onPress={() => setTool(null)} />
        {tools.map((value) => (
          <Chip
            key={value}
            label={value}
            selected={tool === value}
            onPress={() => setTool(tool === value ? null : value)}
          />
        ))}
      </FilterRow>

      <AppText variant="caption" color="muted" accessibilityLiveRegion="polite">
        {t('academy.results', { count: results.length })}
      </AppText>

      {results.length === 0 ? (
        <EmptyState
          icon="search-outline"
          title={t('academy.noResultsTitle')}
          description={t('academy.noResultsDescription')}
          actionLabel={hasFilters ? t('academy.clearFilters') : undefined}
          onAction={hasFilters ? clearFilters : undefined}
        />
      ) : (
        <View style={styles.list}>
          {results.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              progress={getCourseProgress(course, progressState).ratio}
              onPress={() =>
                router.push({ pathname: '/course/[courseId]', params: { courseId: course.id } })
              }
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  filterGroup: { gap: spacing.xs },
  chipRow: { gap: spacing.xs, paddingRight: spacing.xl },
  list: { gap: spacing.md },
});
