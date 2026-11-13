/**
 * Valutazione degli esercizi: funzioni pure, senza dipendenze dall'interfaccia.
 */
import type { ExerciseStep, PromptCheck } from '@/features/courses/types';

export type ExerciseAnswer =
  | { type: 'multipleChoice'; selectedIndex: number }
  | { type: 'fillBlank'; selectedIndex: number }
  | { type: 'trueFalse'; value: boolean }
  | { type: 'order'; items: string[] }
  | { type: 'promptFix'; text: string };

export interface PromptCheckResult {
  label: string;
  passed: boolean;
}

export interface EvaluationResult {
  correct: boolean;
  /** Solo per promptFix: dettaglio dei criteri. */
  checks?: PromptCheckResult[];
}

/** Quanti criteri devono essere soddisfatti per considerare valido un prompt riscritto. */
export const PROMPT_PASS_RATIO = 0.75;
export const PROMPT_MIN_LENGTH = 40;

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

export function evaluatePromptChecks(text: string, checks: PromptCheck[]): PromptCheckResult[] {
  const haystack = normalize(text);
  return checks.map((check) => ({
    label: check.label,
    passed: check.keywords.some((keyword) => haystack.includes(normalize(keyword))),
  }));
}

export function evaluateExercise(step: ExerciseStep, answer: ExerciseAnswer): EvaluationResult {
  switch (step.type) {
    case 'multipleChoice':
    case 'fillBlank':
      return {
        correct:
          (answer.type === 'multipleChoice' || answer.type === 'fillBlank') &&
          answer.selectedIndex === step.correctIndex,
      };
    case 'trueFalse':
      return { correct: answer.type === 'trueFalse' && answer.value === step.answer };
    case 'order':
      return {
        correct:
          answer.type === 'order' &&
          answer.items.length === step.items.length &&
          answer.items.every((item, index) => item === step.items[index]),
      };
    case 'promptFix': {
      if (answer.type !== 'promptFix') return { correct: false };
      const checks = evaluatePromptChecks(answer.text, step.checks);
      const passedCount = checks.filter((check) => check.passed).length;
      const longEnough = answer.text.trim().length >= PROMPT_MIN_LENGTH;
      const enoughChecks = passedCount >= Math.ceil(step.checks.length * PROMPT_PASS_RATIO);
      return { correct: longEnough && enoughChecks, checks };
    }
  }
}

/** Mescola un array in modo deterministico dato un seed (per test riproducibili). */
export function shuffle<T>(items: readonly T[], seed: number = Date.now()): T[] {
  const result = [...items];
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  const random = () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const current = result[i] as T;
    result[i] = result[j] as T;
    result[j] = current;
  }
  return result;
}

/** Mescola garantendo (se possibile) un ordine diverso da quello di partenza. */
export function shuffleDifferent<T>(items: readonly T[], seed?: number): T[] {
  if (items.length < 2) return [...items];
  let attempt = seed ?? Date.now();
  for (let i = 0; i < 10; i++) {
    const shuffled = shuffle(items, attempt + i);
    if (shuffled.some((item, index) => item !== items[index])) return shuffled;
  }
  return [...items].reverse();
}

export function scoreQuiz(results: boolean[]): number {
  if (results.length === 0) return 0;
  return results.filter(Boolean).length / results.length;
}
