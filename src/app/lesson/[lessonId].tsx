import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { coursesRepository } from '@/data/repositories/courses';
import { nextActivityAfterLesson } from '@/features/courses/catalog';
import { LESSON_QUESTION_COUNT, type ExerciseStep } from '@/features/courses/types';
import { RewardSummary } from '@/features/gamification/components/RewardSummary';
import type { Reward } from '@/features/gamification/rewards';
import { initialAnswer } from '@/features/lessons/answers';
import { QuestionSession } from '@/features/lessons/components/QuestionSession';
import { SessionReportView } from '@/features/lessons/components/SessionReportView';
import { TheoryReader } from '@/features/lessons/components/TheoryReader';
import type { ExerciseAnswer } from '@/features/lessons/evaluate';
import {
  buildReport,
  drawQuestions,
  newSeed,
  type SessionReport,
} from '@/features/lessons/session';
import { useAccess } from '@/features/entitlements/hooks';
import { LockedContent } from '@/features/entitlements/LockedContent';
import { useProgressStore } from '@/features/progress/store';
import { EmptyState, Screen } from '@/ui';

type Phase = 'theory' | 'questions' | 'report';
/** Dove tornare dopo aver riletto la teoria. */
type ReturnTo = 'questions' | 'report' | null;

export default function LessonScreen() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  // La chiave garantisce uno stato nuovo passando da una lezione alla successiva.
  return <LessonFlow key={lessonId ?? 'none'} lessonId={lessonId} />;
}

function LessonFlow({ lessonId }: { lessonId: string | undefined }) {
  const { t } = useTranslation();
  const completeLesson = useProgressStore((state) => state.completeLesson);
  const location = lessonId ? coursesRepository.findLesson(lessonId) : null;
  const access = useAccess();

  const [phase, setPhase] = useState<Phase>('theory');
  const [returnTo, setReturnTo] = useState<ReturnTo>(null);
  const [page, setPage] = useState(0);
  const [maxVisited, setMaxVisited] = useState(0);
  const [questions, setQuestions] = useState<ExerciseStep[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(ExerciseAnswer | null)[]>([]);
  const [result, setResult] = useState<{ report: SessionReport; reward: Reward } | null>(null);

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
  if (!access.can(course.requiredTier)) return <LockedContent tier={course.requiredTier} />;
  const backToCourse = () =>
    router.replace({ pathname: '/course/[courseId]', params: { courseId: course.id } });

  const startQuestions = () => {
    const drawn = drawQuestions(lesson.questions, LESSON_QUESTION_COUNT, newSeed());
    setQuestions(drawn);
    setAnswers(drawn.map((q) => initialAnswer(q)));
    setQuestionIndex(0);
    setResult(null);
    setReturnTo(null);
    setPhase('questions');
  };

  const goToPage = (next: number) => {
    setPage(next);
    setMaxVisited((current) => Math.max(current, next));
  };

  const reviewTheory = (from: Exclude<ReturnTo, null>) => {
    setReturnTo(from);
    setPage(0);
    setMaxVisited(lesson.theory.length - 1);
    setPhase('theory');
  };

  if (phase === 'theory') {
    return (
      <TheoryReader
        pages={lesson.theory}
        page={page}
        maxVisited={maxVisited}
        onPageChange={goToPage}
        onClose={backToCourse}
        onAskTutor={(q) => router.push({ pathname: '/tutor/ask', params: { q } })}
        finishLabel={
          returnTo === 'questions'
            ? t('lesson.backToQuestions')
            : returnTo === 'report'
              ? t('lesson.backToReport')
              : t('lesson.startQuestions')
        }
        onFinish={() => {
          if (returnTo) setPhase(returnTo);
          else startQuestions();
        }}
      />
    );
  }

  if (phase === 'questions') {
    return (
      <QuestionSession
        questions={questions}
        index={questionIndex}
        answers={answers}
        onIndexChange={setQuestionIndex}
        onAnswer={(i, answer) =>
          setAnswers((current) => current.map((a, idx) => (idx === i ? answer : a)))
        }
        onClose={backToCourse}
        onReviewTheory={() => reviewTheory('questions')}
        onFinish={() => {
          const report = buildReport(questions, answers);
          const reward = completeLesson({
            courseId: course.id,
            lessonId: lesson.id,
            xp: lesson.xp,
          });
          setResult({ report, reward });
          setReturnTo(null);
          setPhase('report');
        }}
      />
    );
  }

  if (!result) return null;
  const next = nextActivityAfterLesson(course, lesson.id);

  return (
    <SessionReportView
      report={result.report}
      title={t('player.lessonComplete')}
      icon="sparkles"
      highlight={result.reward.xp > 0 ? t('player.xpEarned', { xp: result.reward.xp }) : undefined}
      extraLines={result.reward.xp === 0 ? [t('player.xpAlready')] : []}
      rewards={<RewardSummary reward={result.reward} />}
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
          : { label: t('player.backToCourse'), onPress: backToCourse, testID: 'result-next' }
      }
      secondary={[
        { label: t('lesson.retryNew'), onPress: startQuestions, testID: 'result-retry' },
        {
          label: t('lesson.reviewTheory'),
          onPress: () => reviewTheory('report'),
          testID: 'result-review',
        },
        ...(next ? [{ label: t('player.backToCourse'), onPress: backToCourse }] : []),
      ]}
    />
  );
}
