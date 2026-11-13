/**
 * Sessioni di domande: estrazione casuale, banche domande dei quiz e resoconto finale.
 * Funzioni pure.
 */
import type { Course, ExerciseStep, Quiz } from '@/features/courses/types';

import { evaluateExercise, shuffle, type EvaluationResult, type ExerciseAnswer } from './evaluate';

/**
 * Estrae `count` domande a caso dalla banca.
 * Al massimo `maxPromptFix` esercizi di scrittura per sessione, per tenere la sessione breve.
 */
export function drawQuestions(
  pool: ExerciseStep[],
  count: number,
  seed: number,
  maxPromptFix = 1,
): ExerciseStep[] {
  const picked: ExerciseStep[] = [];
  let promptFixCount = 0;
  for (const step of shuffle(pool, seed)) {
    if (picked.length >= count) break;
    if (step.type === 'promptFix') {
      if (promptFixCount >= maxPromptFix) continue;
      promptFixCount++;
    }
    picked.push(step);
  }
  return picked;
}

/** Banca domande di un quiz: domande del quiz + domande delle lezioni coperte (senza esercizi di scrittura). */
export function quizPool(course: Course, quiz: Quiz): ExerciseStep[] {
  const objective = (steps: ExerciseStep[]) => steps.filter((s) => s.type !== 'promptFix');
  if (quiz.kind === 'final') {
    return [
      ...quiz.questions,
      ...course.modules.flatMap((m) => [
        ...m.quiz.questions,
        ...m.lessons.flatMap((l) => objective(l.questions)),
      ]),
    ];
  }
  const module = course.modules.find((m) => m.quiz.id === quiz.id);
  return [
    ...quiz.questions,
    ...(module ? module.lessons.flatMap((l) => objective(l.questions)) : []),
  ];
}

export interface ReportItem {
  step: ExerciseStep;
  answer: ExerciseAnswer | null;
  result: EvaluationResult;
}

export interface SessionReport {
  items: ReportItem[];
  correct: number;
  total: number;
  /** 0-1 */
  score: number;
}

export function buildReport(
  steps: ExerciseStep[],
  answers: (ExerciseAnswer | null)[],
): SessionReport {
  const items = steps.map((step, index) => {
    const answer = answers[index] ?? null;
    return {
      step,
      answer,
      result: answer ? evaluateExercise(step, answer) : { correct: false },
    };
  });
  const correct = items.filter((item) => item.result.correct).length;
  return { items, correct, total: items.length, score: items.length ? correct / items.length : 0 };
}

/** Seed casuale per una nuova estrazione di domande. */
export function newSeed(): number {
  return Math.floor(Math.random() * 2_000_000_000) + 1;
}
