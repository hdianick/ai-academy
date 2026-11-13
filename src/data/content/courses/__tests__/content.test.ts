import { courseLessons, courseQuizzes } from '@/features/courses/catalog';
import { LESSON_QUESTION_COUNT, type ExerciseStep } from '@/features/courses/types';
import { evaluateExercise } from '@/features/lessons/evaluate';
import { quizPool } from '@/features/lessons/session';

import { demoCourses } from '..';

const allQuestions = (): ExerciseStep[] =>
  demoCourses.flatMap((course) => [
    ...courseLessons(course).flatMap((lesson) => lesson.questions),
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
      ...demoCourses.flatMap((course) =>
        courseLessons(course).flatMap((l) => l.theory.map((t) => t.id)),
      ),
      ...allQuestions().map((s) => s.id),
    ];
    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(demoCourses.map((c) => [c.id, c] as const))(
    '%s: teoria approfondita e banche domande sufficienti',
    (_id, course) => {
      expect(course.modules.length).toBeGreaterThanOrEqual(3);
      for (const module of course.modules) {
        expect(module.lessons.length).toBeGreaterThanOrEqual(2);
        expect(quizPool(course, module.quiz).length).toBeGreaterThanOrEqual(module.quiz.drawCount);
        for (const lesson of module.lessons) {
          // Teoria: almeno 4 pagine, ognuna con contenuto sostanzioso.
          expect(lesson.theory.length).toBeGreaterThanOrEqual(4);
          for (const page of lesson.theory) {
            const words = page.paragraphs.join(' ').split(/\s+/).length;
            expect(words).toBeGreaterThanOrEqual(25);
          }
          // Domande: più di quelle estratte, così ogni tentativo è diverso.
          expect(lesson.questions.length).toBeGreaterThan(LESSON_QUESTION_COUNT);
        }
      }
      expect(quizPool(course, course.finalTest).length).toBeGreaterThanOrEqual(
        course.finalTest.drawCount,
      );
    },
  );

  it('ogni esercizio ha una risposta corretta valida e una spiegazione', () => {
    for (const step of allQuestions()) {
      switch (step.type) {
        case 'multipleChoice':
        case 'fillBlank':
          expect(step.options.length).toBeGreaterThanOrEqual(2);
          expect(step.correctIndex).toBeGreaterThanOrEqual(0);
          expect(step.correctIndex).toBeLessThan(step.options.length);
          expect(new Set(step.options).size).toBe(step.options.length);
          if (step.type === 'fillBlank') expect(step.sentence).toContain('___');
          break;
        case 'order':
          expect(step.items.length).toBeGreaterThanOrEqual(3);
          expect(new Set(step.items).size).toBe(step.items.length);
          break;
        case 'promptFix':
          expect(
            evaluateExercise(step, { type: 'promptFix', text: step.sampleAnswer }).correct,
          ).toBe(true);
          expect(evaluateExercise(step, { type: 'promptFix', text: step.weakPrompt }).correct).toBe(
            false,
          );
          break;
        default:
          break;
      }
      if ('explanation' in step) expect(step.explanation.length).toBeGreaterThan(0);
    }
  });
});
