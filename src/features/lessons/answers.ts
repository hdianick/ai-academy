/**
 * Utilità sulle risposte: stato iniziale, completezza e testo leggibile per il resoconto.
 */
import type { ExerciseStep, LessonStep } from '@/features/courses/types';

import { PROMPT_MIN_LENGTH, type ExerciseAnswer } from './evaluate';

export function initialAnswer(step: LessonStep): ExerciseAnswer | null {
  switch (step.type) {
    case 'order':
      return { type: 'order', items: [] };
    case 'promptFix':
      return { type: 'promptFix', text: '' };
    default:
      return null;
  }
}

export function isAnswerReady(step: LessonStep, answer: ExerciseAnswer | null): boolean {
  if (!answer) return false;
  switch (answer.type) {
    case 'order':
      return step.type === 'order' && answer.items.length === step.items.length;
    case 'promptFix':
      return answer.text.trim().length >= PROMPT_MIN_LENGTH;
    default:
      return true;
  }
}

/** Testo della domanda, per titoli e resoconto. */
export function questionText(step: ExerciseStep): string {
  switch (step.type) {
    case 'multipleChoice':
      return step.question;
    case 'trueFalse':
      return step.statement;
    case 'fillBlank':
      return step.sentence.replace('___', '_____');
    case 'order':
    case 'promptFix':
      return step.instruction;
  }
}

interface Labels {
  trueLabel: string;
  falseLabel: string;
}

/** Risposta data dall'utente in forma leggibile (null se assente). */
export function describeAnswer(
  step: ExerciseStep,
  answer: ExerciseAnswer | null,
  labels: Labels,
): string | null {
  if (!answer) return null;
  switch (answer.type) {
    case 'multipleChoice':
    case 'fillBlank':
      return step.type === 'multipleChoice' || step.type === 'fillBlank'
        ? (step.options[answer.selectedIndex] ?? null)
        : null;
    case 'trueFalse':
      return answer.value ? labels.trueLabel : labels.falseLabel;
    case 'order':
      return answer.items.length
        ? answer.items.map((item, i) => `${i + 1}. ${item}`).join('\n')
        : null;
    case 'promptFix':
      return answer.text.trim() || null;
  }
}

/** Risposta corretta in forma leggibile. */
export function describeCorrect(step: ExerciseStep, labels: Labels): string {
  switch (step.type) {
    case 'multipleChoice':
    case 'fillBlank':
      return step.options[step.correctIndex] ?? '';
    case 'trueFalse':
      return step.answer ? labels.trueLabel : labels.falseLabel;
    case 'order':
      return step.items.map((item, i) => `${i + 1}. ${item}`).join('\n');
    case 'promptFix':
      return step.sampleAnswer;
  }
}
