import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { practiceRepository } from '@/data/repositories/practice';
import { RewardSummary } from '@/features/gamification/components/RewardSummary';
import type { Reward } from '@/features/gamification/rewards';
import { ActivityPlayer } from '@/features/lessons/components/ActivityPlayer';
import { ResultView } from '@/features/lessons/components/ResultView';
import { scoreQuiz } from '@/features/lessons/evaluate';
import { useProgressStore } from '@/features/progress/store';
import { EmptyState, Screen } from '@/ui';

export default function PracticeActivityScreen() {
  const { t } = useTranslation();
  const { practiceId } = useLocalSearchParams<{ practiceId: string }>();
  const completePractice = useProgressStore((s) => s.completePractice);
  const [outcome, setOutcome] = useState<{ reward: Reward; correct: number; total: number } | null>(
    null,
  );
  const [attempt, setAttempt] = useState(1);

  const item = practiceId ? practiceRepository.get(practiceId) : null;
  const backToPractice = () => router.replace('/practice');

  if (!item) {
    return (
      <Screen scroll={false}>
        <EmptyState
          icon="alert-circle-outline"
          title={t('practice.notFound')}
          actionLabel={t('practice.backToPractice')}
          onAction={backToPractice}
        />
      </Screen>
    );
  }

  if (outcome) {
    return (
      <ResultView
        icon="rocket"
        tone="success"
        title={t('practice.practiceComplete')}
        highlight={
          outcome.reward.xp > 0 ? t('player.xpEarned', { xp: outcome.reward.xp }) : undefined
        }
        lines={[
          ...(outcome.total > 0
            ? [t('player.correctCount', { correct: outcome.correct, total: outcome.total })]
            : []),
        ]}
        primary={{
          label: t('practice.backToPractice'),
          onPress: backToPractice,
          testID: 'result-next',
        }}
        secondary={{
          label: t('quiz.retry'),
          onPress: () => {
            setOutcome(null);
            setAttempt((a) => a + 1);
          },
        }}
      >
        <RewardSummary reward={outcome.reward} />
      </ResultView>
    );
  }

  return (
    <ActivityPlayer
      key={`${item.id}-${attempt}`}
      steps={item.steps}
      onClose={backToPractice}
      onComplete={(results) => {
        const reward = completePractice({
          practiceId: item.id,
          score: scoreQuiz(results),
          xp: item.xp,
        });
        setOutcome({ reward, correct: results.filter(Boolean).length, total: results.length });
      }}
    />
  );
}
