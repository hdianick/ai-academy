import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { coursesRepository } from '@/data/repositories/courses';
import { nextActivityAfterLesson } from '@/features/courses/catalog';
import { RewardSummary } from '@/features/gamification/components/RewardSummary';
import type { Reward } from '@/features/gamification/rewards';
import { ActivityPlayer } from '@/features/lessons/components/ActivityPlayer';
import { ResultView } from '@/features/lessons/components/ResultView';
import { useProgressStore } from '@/features/progress/store';
import { EmptyState, Screen } from '@/ui';

interface Outcome {
  reward: Reward;
  correct: number;
  total: number;
}

export default function LessonScreen() {
  const { t } = useTranslation();
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const completeLesson = useProgressStore((state) => state.completeLesson);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const location = lessonId ? coursesRepository.findLesson(lessonId) : null;

  if (!location) {
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

  const { course, lesson } = location;
  const backToCourse = () =>
    router.replace({ pathname: '/course/[courseId]', params: { courseId: course.id } });

  if (outcome) {
    const next = nextActivityAfterLesson(course, lesson.id);
    return (
      <ResultView
        icon="sparkles"
        tone="success"
        title={t('player.lessonComplete')}
        highlight={
          outcome.reward.xp > 0 ? t('player.xpEarned', { xp: outcome.reward.xp }) : undefined
        }
        lines={[
          ...(outcome.total > 0
            ? [t('player.correctCount', { correct: outcome.correct, total: outcome.total })]
            : []),
          ...(outcome.reward.xp === 0 ? [t('player.xpAlready')] : []),
        ]}
        primary={
          next
            ? {
                label: next.kind === 'lesson' ? t('player.nextLesson') : t('player.goToQuiz'),
                testID: 'result-next',
                onPress: () =>
                  next.kind === 'lesson'
                    ? router.replace({
                        pathname: '/lesson/[lessonId]',
                        params: { lessonId: next.id },
                      })
                    : router.replace({ pathname: '/quiz/[quizId]', params: { quizId: next.id } }),
              }
            : { label: t('player.backToCourse'), onPress: backToCourse }
        }
        secondary={next ? { label: t('player.backToCourse'), onPress: backToCourse } : undefined}
      >
        <RewardSummary reward={outcome.reward} />
      </ResultView>
    );
  }

  return (
    <ActivityPlayer
      key={lesson.id}
      steps={lesson.steps}
      onClose={backToCourse}
      onComplete={(results) => {
        const reward = completeLesson({ courseId: course.id, lessonId: lesson.id, xp: lesson.xp });
        setOutcome({ reward, correct: results.filter(Boolean).length, total: results.length });
      }}
    />
  );
}
