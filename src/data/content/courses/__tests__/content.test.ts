import { courseLessons, courseQuizzes } from '@/features/courses/catalog';
import type { LessonStep, QuizQuestion } from '@/features/courses/types';
import { evaluateExercise } from '@/features/lessons/evaluate';

import { demoCourses } from '..';

const allSteps = (): (LessonStep | QuizQuestion)[] =>
  demoCourses.flatMap((course) => [
    ...courseLessons(course).flatMap((lesson) => lesson.steps),
    ...courseQuizzes(course).flatMap((quiz) => quiz.questions),
  ]);

describe('contenuti dimostrativi', () => {
  it('contiene i 5 corsi richiesti', () => {
    expect(demoCourses.map((course) => course.title)).toEqual([
      'Introduzione all’intelligenza artificiale',
      'ChatGPT da zero a professionista',
      'Prompt Engineering avanzato',
      'Creazione di immagini con AI',
      'Automazioni e agenti AI',
    ]);
  });

  it('ha id unici in tutto il catalogo', () => {
    const ids = [
      ...demoCourses.map((course) => course.id),
      ...demoCourses.flatMap((course) => course.modules.map((m) => m.id)),
      ...demoCourses.flatMap((course) => courseLessons(course).map((l) => l.id)),
      ...demoCourses.flatMap((course) => courseQuizzes(course).map((q) => q.id)),
      ...allSteps().map((s) => s.id),
    ];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(demoCourses.map((c) => [c.id, c] as const))(
    '%s: struttura completa (moduli, lezioni, quiz, test finale)',
    (_id, course) => {
      expect(course.modules.length).toBeGreaterThanOrEqual(3);
      expect(course.outcomes.length).toBeGreaterThanOrEqual(3);
      for (const module of course.modules) {
        expect(module.lessons.length).toBeGreaterThanOrEqual(2);
        expect(module.quiz.questions.length).toBeGreaterThanOrEqual(3);
        for (const lesson of module.lessons) {
          expect(lesson.steps.some((s) => s.type === 'theory')).toBe(true);
          expect(lesson.steps.some((s) => s.type !== 'theory')).toBe(true);
        }
      }
      expect(course.finalTest.questions.length).toBeGreaterThanOrEqual(6);
    },
  );

  it('ogni esercizio ha una risposta corretta valida', () => {
    for (const step of allSteps()) {
      switch (step.type) {
        case 'multipleChoice':
        case 'fillBlank':
          expect(step.options.length).toBeGreaterThanOrEqual(2);
          expect(step.correctIndex).toBeGreaterThanOrEqual(0);
          expect(step.correctIndex).toBeLessThan(step.options.length);
          expect(new Set(step.options).size).toBe(step.options.length);
          break;
        case 'order':
          expect(step.items.length).toBeGreaterThanOrEqual(3);
          expect(new Set(step.items).size).toBe(step.items.length);
          break;
        case 'promptFix':
          // La risposta d'esempio deve superare i criteri del proprio esercizio.
          expect(
            evaluateExercise(step, { type: 'promptFix', text: step.sampleAnswer }).correct,
          ).toBe(true);
          // Il prompt debole di partenza invece non deve superarli.
          expect(evaluateExercise(step, { type: 'promptFix', text: step.weakPrompt }).correct).toBe(
            false,
          );
          break;
        default:
          break;
      }
      if (step.type === 'fillBlank') expect(step.sentence).toContain('___');
      if ('explanation' in step) expect(step.explanation.length).toBeGreaterThan(0);
    }
  });
});
