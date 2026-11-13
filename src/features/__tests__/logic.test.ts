import { demoCourses } from '@/data/content/courses';
import {
  courseLessons,
  filterCourses,
  findLesson,
  findQuiz,
  nextActivityAfterLesson,
} from '@/features/courses/catalog';
import type { OrderStep, PromptFixStep } from '@/features/courses/types';
import {
  evaluateExercise,
  scoreQuiz,
  shuffle,
  shuffleDifferent,
} from '@/features/lessons/evaluate';
import {
  emptyProgress,
  getContinueCourse,
  getCourseProgress,
  getNextActivity,
  quizXpAward,
  type ProgressState,
} from '@/features/progress/progress';

const [intro, chatgpt] = demoCourses as [(typeof demoCourses)[0], (typeof demoCourses)[0]];

describe('filterCourses', () => {
  it('cerca nel titolo ignorando maiuscole e accenti', () => {
    expect(filterCourses(demoCourses, { query: 'CHATGPT' }).map((c) => c.id)).toContain(
      'chatgpt-pro',
    );
    expect(filterCourses(demoCourses, { query: 'intelligenza' }).length).toBeGreaterThan(0);
  });

  it('filtra per livello, categoria e strumento', () => {
    expect(filterCourses(demoCourses, { level: 'advanced' }).map((c) => c.id)).toEqual([
      'prompt-engineering',
    ]);
    expect(filterCourses(demoCourses, { category: 'images' }).map((c) => c.id)).toEqual([
      'ai-images',
    ]);
    expect(filterCourses(demoCourses, { tool: 'n8n' }).map((c) => c.id)).toEqual([
      'automation-agents',
    ]);
  });

  it('restituisce lista vuota se nulla corrisponde', () => {
    expect(filterCourses(demoCourses, { query: 'parola-inesistente-xyz' })).toEqual([]);
  });
});

describe('evaluateExercise', () => {
  const orderStep: OrderStep = {
    type: 'order',
    id: 'o',
    instruction: '',
    items: ['A', 'B', 'C'],
    explanation: '',
  };
  const promptStep: PromptFixStep = {
    type: 'promptFix',
    id: 'p',
    instruction: '',
    weakPrompt: 'x',
    sampleAnswer: '',
    checks: [
      { label: 'tono', keywords: ['cortese'] },
      { label: 'destinatario', keywords: ['cliente'] },
      { label: 'formato', keywords: ['parole'] },
      { label: 'oggetto', keywords: ['ordine'] },
    ],
  };

  it('valuta l’ordinamento', () => {
    expect(evaluateExercise(orderStep, { type: 'order', items: ['A', 'B', 'C'] }).correct).toBe(
      true,
    );
    expect(evaluateExercise(orderStep, { type: 'order', items: ['B', 'A', 'C'] }).correct).toBe(
      false,
    );
  });

  it('valuta il prompt con soglia del 75% dei criteri, ignorando gli accenti', () => {
    const good = evaluateExercise(promptStep, {
      type: 'promptFix',
      text: 'Scrivi un’email CORTESE al cliente per il suo ordine in ritardo.',
    });
    expect(good.correct).toBe(true);
    expect(good.checks?.filter((c) => c.passed)).toHaveLength(3);

    const weak = evaluateExercise(promptStep, { type: 'promptFix', text: 'Email al cliente' });
    expect(weak.correct).toBe(false);
  });

  it('calcola il punteggio dei quiz', () => {
    expect(scoreQuiz([true, false, true, true])).toBe(0.75);
    expect(scoreQuiz([])).toBe(0);
  });

  it('mescola in modo deterministico e diverso dall’originale', () => {
    expect(shuffle([1, 2, 3, 4], 42)).toEqual(shuffle([1, 2, 3, 4], 42));
    for (let seed = 1; seed < 20; seed++) {
      expect(shuffleDifferent(['A', 'B', 'C'], seed)).not.toEqual(['A', 'B', 'C']);
    }
  });
});

describe('progressi', () => {
  const firstLesson = courseLessons(intro)[0]!;

  it('un corso nuovo è a 0% e la prossima attività è la prima lezione', () => {
    expect(getCourseProgress(intro, emptyProgress).ratio).toBe(0);
    expect(getNextActivity(intro, emptyProgress)).toMatchObject({
      kind: 'lesson',
      id: firstLesson.id,
    });
  });

  it('dopo le lezioni di un modulo la prossima attività è il quiz del modulo', () => {
    const module = intro.modules[0]!;
    const state: ProgressState = {
      ...emptyProgress,
      lessons: Object.fromEntries(module.lessons.map((l) => [l.id, { completedAt: 'x' }])),
    };
    expect(getNextActivity(intro, state)).toMatchObject({ kind: 'quiz', id: module.quiz.id });
    expect(getCourseProgress(intro, state).ratio).toBeGreaterThan(0);
  });

  it('“Continua” propone l’ultimo corso usato', () => {
    const state: ProgressState = {
      ...emptyProgress,
      lessons: { [courseLessons(chatgpt)[0]!.id]: { completedAt: 'x' } },
      lastActivity: { courseId: chatgpt.id, at: 'x' },
    };
    expect(getContinueCourse(demoCourses, state)?.id).toBe(chatgpt.id);
    expect(getContinueCourse(demoCourses, emptyProgress)).toBeNull();
  });

  it('assegna gli XP del quiz solo al primo superamento', () => {
    expect(quizXpAward(undefined, true, 30)).toBe(30);
    expect(quizXpAward(undefined, false, 30)).toBe(0);
    expect(quizXpAward({ bestScore: 1, passed: true, lastAttemptAt: 'x' }, true, 30)).toBe(0);
  });

  it('trova lezioni, quiz e l’attività successiva', () => {
    expect(findLesson(demoCourses, firstLesson.id)?.course.id).toBe(intro.id);
    expect(findQuiz(demoCourses, intro.finalTest.id)?.quiz.kind).toBe('final');
    const secondLesson = intro.modules[0]!.lessons[1]!;
    expect(nextActivityAfterLesson(intro, firstLesson.id)).toEqual({
      kind: 'lesson',
      id: secondLesson.id,
    });
    expect(nextActivityAfterLesson(intro, secondLesson.id)).toEqual({
      kind: 'quiz',
      id: intro.modules[0]!.quiz.id,
    });
  });
});
