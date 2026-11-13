import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps, ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { colors, layout, radius, spacing } from '@/core/theme';
import { describeAnswer, describeCorrect, questionText } from '@/features/lessons/answers';
import type { ReportItem, SessionReport } from '@/features/lessons/session';
import { AppText, Button, Card, Chip, FadeIn, ProgressBar } from '@/ui';

export interface ReportAction {
  label: string;
  onPress: () => void;
  testID?: string;
}

function ReportItemCard({ item, index }: { item: ReportItem; index: number }) {
  const { t } = useTranslation();
  const labels = { trueLabel: t('player.trueLabel'), falseLabel: t('player.falseLabel') };
  const correct = item.result.correct;
  const given = describeAnswer(item.step, item.answer, labels);
  const isPrompt = item.step.type === 'promptFix';

  return (
    <FadeIn delay={Math.min(index, 6) * 80}>
      <Card testID={`report-item-${index}`}>
        <View style={styles.itemHeader}>
          <View
            style={[
              styles.number,
              { backgroundColor: correct ? colors.successSoft : colors.dangerSoft },
            ]}
          >
            <Ionicons
              name={correct ? 'checkmark' : 'close'}
              size={16}
              color={correct ? colors.success : colors.danger}
            />
          </View>
          <AppText variant="caption" color="muted" style={styles.flex}>
            {index + 1}
          </AppText>
          <Chip
            label={correct ? t('lesson.correctBadge') : t('lesson.wrongBadge')}
            tone={correct ? 'success' : 'warning'}
          />
        </View>

        <AppText variant="subheading">{questionText(item.step)}</AppText>

        <View style={styles.answerBlock}>
          <AppText variant="overline" color="muted">
            {t('lesson.yourAnswer')}
          </AppText>
          <AppText color={given ? (correct ? 'success' : 'danger') : 'muted'}>
            {given ?? t('lesson.noAnswer')}
          </AppText>
        </View>

        {item.result.checks ? (
          <View style={styles.checks}>
            {item.result.checks.map((check) => (
              <View key={check.label} style={styles.checkRow}>
                <Ionicons
                  name={check.passed ? 'checkmark-circle' : 'close-circle'}
                  size={16}
                  color={check.passed ? colors.success : colors.danger}
                />
                <AppText variant="caption" color={check.passed ? 'success' : 'danger'}>
                  {check.label}
                </AppText>
              </View>
            ))}
          </View>
        ) : null}

        {!correct || isPrompt ? (
          <View style={styles.answerBlock}>
            <AppText variant="overline" color="accent">
              {isPrompt ? t('lesson.sampleAnswer') : t('lesson.correctAnswer')}
            </AppText>
            <AppText variant="bodyStrong">{describeCorrect(item.step, labels)}</AppText>
          </View>
        ) : null}

        {'explanation' in item.step ? (
          <View style={styles.explanation}>
            <Ionicons name="bulb-outline" size={16} color={colors.xp} />
            <AppText color="secondary" style={styles.flex}>
              {item.step.explanation}
            </AppText>
          </View>
        ) : null}
      </Card>
    </FadeIn>
  );
}

export interface SessionReportViewProps {
  report: SessionReport;
  title: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  /** Es. "+20 XP". */
  highlight?: string;
  extraLines?: string[];
  /** Ricompense (serie, badge, obiettivo). */
  rewards?: ReactNode;
  primary: ReportAction;
  secondary?: ReportAction[];
}

/** Resoconto finale: punteggio, ricompense e spiegazione di ogni domanda. */
export function SessionReportView({
  report,
  title,
  icon,
  highlight,
  extraLines = [],
  rewards,
  primary,
  secondary = [],
}: SessionReportViewProps) {
  const { t } = useTranslation();
  const percent = Math.round(report.score * 100);
  const grade =
    report.score >= 0.8
      ? t('lesson.gradeExcellent')
      : report.score >= 0.6
        ? t('lesson.gradeGood')
        : t('lesson.gradeReview');
  const tone = report.score >= 0.6 ? colors.success : colors.warning;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.inner}>
          <View style={styles.hero}>
            <FadeIn
              pop
              style={[
                styles.heroIcon,
                { backgroundColor: report.score >= 0.6 ? colors.successSoft : colors.warningSoft },
              ]}
            >
              <Ionicons name={icon} size={40} color={tone} />
            </FadeIn>
            <AppText variant="title" align="center" accessibilityRole="header">
              {title}
            </AppText>
            {highlight ? (
              <FadeIn pop delay={150}>
                <AppText variant="display" color="xp" align="center" testID="result-highlight">
                  {highlight}
                </AppText>
              </FadeIn>
            ) : null}
          </View>

          <Card variant="elevated" testID="report-summary">
            <View style={styles.scoreRow}>
              <AppText variant="heading">{grade}</AppText>
              <AppText variant="heading" style={{ color: tone }}>
                {percent}%
              </AppText>
            </View>
            <ProgressBar progress={report.score} color={tone} accessibilityLabel={`${percent}%`} />
            <AppText color="secondary">
              {t('lesson.reportScore', { correct: report.correct, total: report.total })}
            </AppText>
            {extraLines.map((line) => (
              <AppText key={line} variant="caption" color="muted">
                {line}
              </AppText>
            ))}
          </Card>

          {rewards}

          <View style={styles.actions}>
            <Button
              label={primary.label}
              onPress={primary.onPress}
              fullWidth
              testID={primary.testID}
            />
            {secondary.map((action) => (
              <Button
                key={action.label}
                label={action.label}
                onPress={action.onPress}
                variant="secondary"
                fullWidth
                testID={action.testID}
              />
            ))}
          </View>

          <AppText variant="heading">{t('lesson.reportTitle')}</AppText>
          {report.items.map((item, index) => (
            <ReportItemCard key={item.step.id} item={item} index={index} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingVertical: spacing.xl, paddingBottom: spacing.huge },
  inner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  flex: { flex: 1 },
  hero: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.md },
  heroIcon: {
    width: 84,
    height: 84,
    borderRadius: radius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actions: { gap: spacing.sm },
  itemHeader: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  number: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerBlock: { gap: spacing.xxs },
  checks: { gap: spacing.xs },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  explanation: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.warningSoft,
  },
});
