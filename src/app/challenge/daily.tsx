import { router } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { practiceRepository } from '@/data/repositories/practice';
import { RewardSummary } from '@/features/gamification/components/RewardSummary';
import type { Reward } from '@/features/gamification/rewards';
import { toDateKey } from '@/features/gamification/streak';
import { ActivityPlayer } from '@/features/lessons/components/ActivityPlayer';
import { ResultView } from '@/features/lessons/components/ResultView';
import { useProgressStore } from '@/features/progress/store';

export default function DailyChallengeScreen() {
  const { t } = useTranslation();
  const completeDailyChallenge = useProgressStore((s) => s.completeDailyChallenge);
  const [today] = useState(() => toDateKey(new Date()));
  const [questions] = useState(() => practiceRepository.dailyQuestions(today));
  const [outcome, setOutcome] = useState<{ reward: Reward; correct: number } | null>(null);

  const backToPractice = () => router.replace('/practice');

  if (outcome) {
    return (
      <ResultView
        icon="trophy"
        tone="success"
        title={t('practice.dailyComplete')}
        highlight={
          outcome.reward.xp > 0 ? t('player.xpEarned', { xp: outcome.reward.xp }) : undefined
        }
        lines={[t('player.correctCount', { correct: outcome.correct, total: questions.length })]}
        primary={{
          label: t('practice.backToPractice'),
          onPress: backToPractice,
          testID: 'result-next',
        }}
      >
        <RewardSummary reward={outcome.reward} />
      </ResultView>
    );
  }

  return (
    <ActivityPlayer
      steps={questions}
      onClose={backToPractice}
      onComplete={(results) => {
        const correct = results.filter(Boolean).length;
        const reward = completeDailyChallenge({ dateKey: today, correct, total: results.length });
        setOutcome({ reward, correct });
      }}
    />
  );
}
