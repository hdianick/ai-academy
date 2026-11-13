import { withIds, type DraftQuestion, type DraftStep } from '@/features/courses/builder';
import type { CourseLevel, LessonStep, QuizQuestion } from '@/features/courses/types';

export type PracticeKind = 'mission' | 'comparison' | 'project';

export interface PracticeItem {
  id: string;
  kind: PracticeKind;
  title: string;
  description: string;
  difficulty: CourseLevel;
  estimatedMinutes: number;
  xp: number;
  icon: string;
  tools: string[];
  steps: LessonStep[];
}

export type DraftPractice = Omit<PracticeItem, 'steps'> & { steps: DraftStep[] };

export function definePractice(draft: DraftPractice): PracticeItem {
  return { ...draft, steps: withIds(draft.steps, `practice.${draft.id}`) as LessonStep[] };
}

export function defineQuestionPool(prefix: string, questions: DraftQuestion[]): QuizQuestion[] {
  return withIds(questions, prefix) as QuizQuestion[];
}

export type WeeklyMetric = 'xp' | 'lessons' | 'activeDays';

export interface WeeklyChallenge {
  id: string;
  metric: WeeklyMetric;
  target: number;
  bonusXp: number;
  icon: string;
}
