import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { coursesRepository } from '@/data/repositories/courses';
import { RewardSummary } from '@/features/gamification/components/RewardSummary';
import type { Reward } from '@/features/gamification/rewards';
import { ActivityPlayer } from '@/features/lessons/components/ActivityPlayer';
import { ResultView } from '@/features/lessons/components/ResultView';
import { scoreQuiz } from '@/features/lessons/evaluate';
import { useProgressStore } from '@/features/progress/store';
import { AppText, Button, Card, EmptyState, IconButton, Screen } from '@/ui';

type Phase =
  | { kind: 'intro' }
  | { kind: 'playing'; attempt: number }
  | { kind: 'result'; score: number; passed: boolean; reward: Reward; attempt: number };

export default function QuizScreen() {
  const { t } = useTranslation();
  const { quizId } = useLocalSearchParams<{ quizId: string }>();
  const recordQuiz = useProgressStore((state) => state.recordQuiz);
  const [phase, setPhase] = useState<Phase>({ kind: 'intro' });

  const found = quizId ? coursesRepository.findQuiz(quizId) : null;

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
  const isFinal = quiz.kind === 'final';
  const passingPercent = Math.round(quiz.passingScore * 100);
  const backToCourse = () =>
    router.replace({ pathname: '/course/[courseId]', params: { courseId: course.id } });

  if (phase.kind === 'playing') {
    return (
      <ActivityPlayer
        key={`${quiz.id}-${phase.attempt}`}
        steps={quiz.questions}
        onClose={backToCourse}
        onComplete={(results) => {
          const score = scoreQuiz(results);
          const passed = score >= quiz.passingScore;
          const reward = recordQuiz({
            courseId: course.id,
            quizId: quiz.id,
            score,
            passed,
            xp: quiz.xp,
          });
          setPhase({ kind: 'result', score, passed, reward, attempt: phase.attempt });
        }}
      />
    );
  }

  if (phase.kind === 'result') {
    const percent = Math.round(phase.score * 100);
    const retry = () => setPhase({ kind: 'playing', attempt: phase.attempt + 1 });
    return phase.passed ? (
      <ResultView
        icon={isFinal ? 'trophy' : 'ribbon'}
        tone="success"
        title={isFinal ? t('quiz.finalPassedTitle') : t('quiz.passedTitle')}
        highlight={phase.reward.xp > 0 ? t('player.xpEarned', { xp: phase.reward.xp }) : undefined}
        lines={[t('quiz.score', { percent })]}
        primary={{ label: t('player.backToCourse'), onPress: backToCourse, testID: 'result-next' }}
        secondary={{ label: t('quiz.retry'), onPress: retry }}
      >
        <RewardSummary reward={phase.reward} />
      </ResultView>
    ) : (
      <ResultView
        icon="refresh"
        tone="warning"
        title={t('quiz.failedTitle')}
        lines={[
          t('quiz.score', { percent }),
          t('quiz.passingScore', { percent: passingPercent }),
          t('quiz.failedDescription'),
        ]}
        primary={{ label: t('quiz.retry'), onPress: retry, testID: 'result-retry' }}
        secondary={{ label: t('player.backToCourse'), onPress: backToCourse }}
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
          {t('course.questions', { count: quiz.questions.length })} · {quiz.xp} XP
        </AppText>
        <AppText color="secondary">{t('quiz.passingScore', { percent: passingPercent })}</AppText>
      </Card>
      <Button
        label={t('quiz.start')}
        fullWidth
        testID="quiz-start"
        onPress={() => setPhase({ kind: 'playing', attempt: 1 })}
      />
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
