import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { newsRepository } from '@/data/repositories/news';
import { coursesRepository } from '@/data/repositories/courses';
import { toolsRepository } from '@/data/repositories/tools';
import { CourseCard } from '@/features/courses/components/CourseCard';
import { NewsCard } from '@/features/news/components/NewsCard';
import { newsForTool } from '@/features/news/news';
import { getCourseProgress } from '@/features/progress/progress';
import { useProgressStore } from '@/features/progress/store';
import { ToolIcon } from '@/features/tools/components/ToolCard';
import { isDiscontinued } from '@/features/tools/types';
import { AppText, Card, Chip, EmptyState, IconButton, Screen } from '@/ui';

function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/tools');
}

function formatMonth(yearMonth: string, language: string): string {
  const [y, m] = yearMonth.split('-').map(Number);
  try {
    return new Date(y ?? 2026, (m ?? 1) - 1, 1).toLocaleDateString(language, {
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return yearMonth;
  }
}

export default function ToolScreen() {
  const { t, i18n } = useTranslation();
  const { toolId } = useLocalSearchParams<{ toolId: string }>();
  const progressState = useProgressStore();
  const tool = toolId ? toolsRepository.get(toolId) : null;

  if (!tool) {
    return (
      <Screen scroll={false}>
        <EmptyState
          icon="alert-circle-outline"
          title={t('tools.notFound')}
          actionLabel={t('common.backHome')}
          onAction={() => router.replace('/')}
        />
      </Screen>
    );
  }

  const discontinued = isDiscontinued(tool);
  const relatedNews = newsForTool(newsRepository.list(), tool.id);
  const relatedCourses = tool.relatedCourseIds
    .map((id) => coursesRepository.get(id))
    .filter((course) => course !== null);

  return (
    <Screen testID="screen-tool">
      <IconButton icon="arrow-back" onPress={goBack} accessibilityLabel={t('common.back')} />

      <View style={styles.hero}>
        <ToolIcon tool={tool} size={64} />
        <AppText variant="title">{tool.name}</AppText>
        <AppText color="muted">{t('tools.byCompany', { company: tool.company })}</AppText>
        <AppText variant="subheading" color="secondary">
          {tool.tagline}
        </AppText>
        <View style={styles.chips}>
          {tool.categories.map((category) => (
            <Chip key={category} label={t(`tools.categories.${category}`)} tone="accent" />
          ))}
          <Chip label={t('tools.difficulty', { level: t(`levels.${tool.difficulty}`) })} />
        </View>
      </View>

      {tool.statusNote ? (
        <View
          style={[styles.status, discontinued ? styles.statusClosed : styles.statusChanged]}
          accessibilityRole="alert"
          testID="tool-status"
        >
          <Ionicons
            name={discontinued ? 'close-circle' : 'information-circle'}
            size={20}
            color={discontinued ? colors.danger : colors.warning}
          />
          <View style={styles.flex}>
            <AppText variant="bodyStrong">
              {discontinued ? t('tools.discontinued') : t('tools.renamed')}
            </AppText>
            <AppText color="secondary">{tool.statusNote}</AppText>
          </View>
        </View>
      ) : null}

      <AppText>{tool.description}</AppText>

      <View style={styles.section}>
        <AppText variant="heading">{t('tools.featuresTitle')}</AppText>
        {tool.features.map((feature) => (
          <View key={feature} style={styles.feature}>
            <Ionicons
              name={discontinued ? 'information-circle' : 'checkmark-circle'}
              size={18}
              color={discontinued ? colors.textMuted : colors.success}
            />
            <AppText color="secondary" style={styles.flex}>
              {feature}
            </AppText>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <AppText variant="heading">{t('tools.useCasesTitle')}</AppText>
        {tool.useCases.map((useCase) => (
          <Card key={useCase.title}>
            <AppText variant="subheading">{useCase.title}</AppText>
            <View style={styles.example}>
              <AppText style={styles.mono} selectable>
                {useCase.example}
              </AppText>
            </View>
          </Card>
        ))}
      </View>

      {relatedNews.length > 0 ? (
        <View style={styles.section}>
          <AppText variant="heading">{t('news.related')}</AppText>
          {relatedNews.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </View>
      ) : null}

      {relatedCourses.length > 0 ? (
        <View style={styles.section}>
          <AppText variant="heading">{t('tools.relatedCoursesTitle')}</AppText>
          {relatedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              compact
              progress={getCourseProgress(course, progressState).ratio}
              onPress={() =>
                router.push({ pathname: '/course/[courseId]', params: { courseId: course.id } })
              }
            />
          ))}
        </View>
      ) : null}

      <Card variant="elevated">
        <Link
          href={tool.website as `https://${string}`}
          target="_blank"
          rel="noopener noreferrer"
          asChild
        >
          <View style={styles.linkRow} accessibilityRole="link">
            <Ionicons name="open-outline" size={18} color={colors.accent} />
            <View style={styles.flex}>
              <AppText variant="bodyStrong" color="accent">
                {t('tools.officialSite')}
              </AppText>
              <AppText variant="caption" color="muted">
                {tool.website.replace('https://', '')}
              </AppText>
            </View>
          </View>
        </Link>
        <AppText variant="caption" color="muted">
          {t('tools.reviewed', { date: formatMonth(tool.lastReviewed, i18n.language) })}
        </AppText>
        <AppText variant="caption" color="muted">
          {t('tools.trademark', { name: tool.name, company: tool.company })}
        </AppText>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: spacing.sm },
  status: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    alignItems: 'flex-start',
  },
  statusClosed: { backgroundColor: colors.dangerSurface },
  statusChanged: { backgroundColor: colors.warningSoft },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  section: { gap: spacing.md },
  feature: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  flex: { flex: 1 },
  example: {
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mono: { fontFamily: 'monospace', fontSize: 14, lineHeight: 21, color: colors.textSecondary },
  linkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
