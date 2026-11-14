import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { coursesRepository } from '@/data/repositories/courses';
import type { ExerciseStep } from '@/features/courses/types';
import { RewardSummary } from '@/features/gamification/components/RewardSummary';
import type { Reward } from '@/features/gamification/rewards';
import { initialAnswer } from '@/features/lessons/answers';
import { QuestionSession } from '@/features/lessons/components/QuestionSession';
import { SessionReportView } from '@/features/lessons/components/SessionReportView';
import type { ExerciseAnswer } from '@/features/lessons/evaluate';
import {
  buildReport,
  drawQuestions,
  newSeed,
  quizPool,
  type SessionReport,
} from '@/features/lessons/session';
import { useAccess } from '@/features/entitlements/hooks';
import { LockedContent } from '@/features/entitlements/LockedContent';
import { useProgressStore } from '@/features/progress/store';
import { AppText, Button, Card, EmptyState, IconButton, Screen } from '@/ui';

export default function QuizScreen() {
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  return <QuizFlow key={quizId ?? 'none'} quizId={quizId} />;
}

function QuizFlow({ quizId }: { quizId: string | undefined }) {
  const { t } = useTranslation();
  const recordQuiz = useProgressStore((state) => state.recordQuiz);
  const [phase, setPhase] = useState<'intro' | 'questions' | 'report'>('intro');
  const [questions, setQuestions] = useState<ExerciseStep[]>([]);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(ExerciseAnswer | null)[]>([]);
  const [result, setResult] = useState<{
    report: SessionReport;
    passed: boolean;
    reward: Reward;
  } | null>(null);

  const found = quizId ? coursesRepository.findQuiz(quizId) : null;
  const access = useAccess();

  if (!found) {
    return (
      <Screen scroll={false}>
        <EmptyState
          icon="alert-circle-outline"
          title={t('player.notFound')}
          actionLabel={t('common.backHome')}
          onAction={() => router.replace('/')}
        />
      </Screen>
    );
  }

  const { course, quiz } = found;
  if (!access.can(course.requiredTier)) return <LockedContent tier={course.requiredTier} />;
  const isFinal = quiz.kind === 'final';
  const passingPercent = Math.round(quiz.passingScore * 100);
  const pool = quizPool(course, quiz);
  const questionCount = Math.min(quiz.drawCount, pool.length);
  const backToCourse = () =>
    router.replace({ pathname: '/course/[courseId]', params: { courseId: course.id } });

  const start = () => {
    const drawn = drawQuestions(pool, questionCount, newSeed(), 0);
    setQuestions(drawn);
    setAnswers(drawn.map((q) => initialAnswer(q)));
    setIndex(0);
    setResult(null);
    setPhase('questions');
  };

  if (phase === 'questions') {
    return (
      <QuestionSession
        questions={questions}
        index={index}
        answers={answers}
        onIndexChange={setIndex}
        onAnswer={(i, answer) =>
          setAnswers((current) => current.map((a, idx) => (idx === i ? answer : a)))
        }
        onClose={backToCourse}
        onFinish={() => {
          const report = buildReport(questions, answers);
          const passed = report.score >= quiz.passingScore;
          const reward = recordQuiz({
            courseId: course.id,
            quizId: quiz.id,
            score: report.score,
            passed,
            xp: quiz.xp,
          });
          setResult({ report, passed, reward });
          setPhase('report');
        }}
      />
    );
  }

  if (phase === 'report' && result) {
    return (
      <SessionReportView
        report={result.report}
        icon={result.passed ? (isFinal ? 'trophy' : 'ribbon') : 'refresh'}
        title={
          result.passed
            ? isFinal
              ? t('quiz.finalPassedTitle')
              : t('quiz.passedTitle')
            : t('quiz.failedTitle')
        }
        highlight={
          result.reward.xp > 0 ? t('player.xpEarned', { xp: result.reward.xp }) : undefined
        }
        extraLines={
          result.passed
            ? []
            : [t('quiz.passingScore', { percent: passingPercent }), t('quiz.failedDescription')]
        }
        rewards={<RewardSummary reward={result.reward} />}
        primary={
          result.passed
            ? { label: t('player.backToCourse'), onPress: backToCourse, testID: 'result-next' }
            : { label: t('lesson.retryNew'), onPress: start, testID: 'result-retry' }
        }
        secondary={[
          result.passed
            ? { label: t('lesson.retryNew'), onPress: start, testID: 'result-retry' }
            : { label: t('player.backToCourse'), onPress: backToCourse, testID: 'result-next' },
        ]}
      />
    );
  }

  return (
    <Screen testID="screen-quiz-intro">
      <IconButton icon="arrow-back" onPress={backToCourse} accessibilityLabel={t('common.back')} />
      <View style={styles.center}>
        <View style={styles.iconWrap}>
          <Ionicons
            name={isFinal ? 'ribbon-outline' : 'help-circle-outline'}
            size={40}
            color={colors.primary}
          />
        </View>
        <AppText variant="overline" color="accent" align="center">
          {isFinal ? t('quiz.finalTitle') : t('quiz.moduleTitle')}
        </AppText>
        <AppText variant="title" align="center">
          {quiz.title}
        </AppText>
        <AppText color="muted" align="center">
          {course.title}
        </AppText>
      </View>
      <Card variant="elevated">
        <AppText variant="bodyStrong">
          {t('course.questions', { count: questionCount })} · {quiz.xp} XP
        </AppText>
        <AppText color="secondary">{t('quiz.passingScore', { percent: passingPercent })}</AppText>
        <AppText variant="caption" color="muted">
          {t('lesson.questionsIntro')}
        </AppText>
      </Card>
      <Button label={t('quiz.start')} fullWidth testID="quiz-start" onPress={start} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.xl },
  iconWrap: {
    width: 80,
    height: 80,
    borderRadius: radius.xxl,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
});
