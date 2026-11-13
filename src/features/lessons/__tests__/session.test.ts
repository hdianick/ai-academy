import { demoCourses } from '@/data/content/courses';
import type { ExerciseStep } from '@/features/courses/types';

import { buildReport, drawQuestions, quizPool } from '../session';

const mc = (id: string): ExerciseStep => ({
  type: 'multipleChoice',
  id,
  question: id,
  options: ['a', 'b'],
  correctIndex: 0,
  explanation: '',
});
const pf = (id: string): ExerciseStep => ({
  type: 'promptFix',
  id,
  instruction: '',
  weakPrompt: '',
  sampleAnswer: '',
  checks: [{ label: 'x', keywords: ['x'] }],
});

describe('estrazione domande', () => {
  const pool = [mc('1'), mc('2'), mc('3'), mc('4'), mc('5'), mc('6'), pf('p1'), pf('p2')];

  it('estrae il numero richiesto, senza duplicati', () => {
    const drawn = drawQuestions(pool, 5, 42);
    expect(drawn).toHaveLength(5);
    expect(new Set(drawn.map((q) => q.id)).size).toBe(5);
  });

  it('include al massimo un esercizio di scrittura', () => {
    for (let seed = 1; seed < 40; seed++) {
      expect(
        drawQuestions(pool, 5, seed).filter((q) => q.type === 'promptFix').length,
      ).toBeLessThanOrEqual(1);
    }
  });

  it('cambia ordine e selezione tra un tentativo e l’altro', () => {
    const results = new Set(
      [1, 2, 3, 4, 5].map((seed) =>
        drawQuestions(pool, 5, seed)
          .map((q) => q.id)
          .join(),
      ),
    );
    expect(results.size).toBeGreaterThan(1);
  });
});

describe('banche domande dei quiz', () => {
  const course = demoCourses[0]!;
  const module = course.modules[0]!;

  it('il quiz di modulo usa le domande delle sue lezioni (senza scrittura)', () => {
    const pool = quizPool(course, module.quiz);
    const lessonIds = module.lessons.flatMap((l) => l.questions.map((q) => q.id));
    expect(pool.some((q) => lessonIds.includes(q.id))).toBe(true);
    expect(pool.every((q) => q.type !== 'promptFix')).toBe(true);
    expect(pool.length).toBeGreaterThanOrEqual(module.quiz.drawCount);
  });

  it('il test finale copre tutto il corso', () => {
    const pool = quizPool(course, course.finalTest);
    expect(pool.length).toBeGreaterThanOrEqual(course.finalTest.drawCount);
    const moduleIds = new Set(pool.map((q) => q.id.split('.')[1]));
    expect(moduleIds.size).toBeGreaterThanOrEqual(course.modules.length);
  });
});

describe('resoconto', () => {
  it('conta risposte corrette, sbagliate e non date', () => {
    const steps = [mc('a'), mc('b'), mc('c')];
    const report = buildReport(steps, [
      { type: 'multipleChoice', selectedIndex: 0 },
      { type: 'multipleChoice', selectedIndex: 1 },
      null,
    ]);
    expect(report).toMatchObject({ correct: 1, total: 3 });
    expect(report.score).toBeCloseTo(1 / 3);
    expect(report.items.map((i) => i.result.correct)).toEqual([true, false, false]);
  });
});
