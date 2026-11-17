import { courseLessons, courseQuizzes } from '@/features/courses/catalog';
import type { ExerciseStep, LessonStep } from '@/features/courses/types';

import { en as enLocale } from '@/locales/en';
import { createDemoTutor } from '@/features/tutor/demoTutor';
import { evaluatePromptChecks } from '@/features/lessons/evaluate';

import { contentByLanguage } from '../registry';

const itc = contentByLanguage.it;
const en = contentByLanguage.en;

/** Ciò che deve restare identico tra le lingue in una domanda (tipo e risposta corretta). */
function answerShape(step: LessonStep | ExerciseStep) {
  switch (step.type) {
    case 'theory':
      return {
        type: step.type,
        paragraphs: step.paragraphs.length,
        tip: !!step.tip,
        example: !!step.example,
      };
    case 'multipleChoice':
    case 'fillBlank':
      return { type: step.type, options: step.options.length, correct: step.correctIndex };
    case 'trueFalse':
      return { type: step.type, answer: step.answer };
    case 'order':
      return { type: step.type, items: step.items.length };
    case 'promptFix':
      return { type: step.type, checks: step.checks.length };
  }
}

describe('Italian and English content have the same structure', () => {
  it('courses, lessons and questions match one to one', () => {
    expect(en.courses.map((c) => c.id)).toEqual(itc.courses.map((c) => c.id));
    itc.courses.forEach((courseIt, i) => {
      const courseEn = en.courses[i]!;
      expect([courseEn.category, courseEn.level, courseEn.requiredTier]).toEqual([
        courseIt.category,
        courseIt.level,
        courseIt.requiredTier,
      ]);
      const lessonsIt = courseLessons(courseIt);
      const lessonsEn = courseLessons(courseEn);
      expect(lessonsEn.map((l) => l.id)).toEqual(lessonsIt.map((l) => l.id));
      lessonsIt.forEach((lessonIt, j) => {
        const lessonEn = lessonsEn[j]!;
        expect(lessonEn.theory.map(answerShape)).toEqual(lessonIt.theory.map(answerShape));
        expect(lessonEn.questions.map(answerShape)).toEqual(lessonIt.questions.map(answerShape));
      });
      const quizzesIt = courseQuizzes(courseIt);
      const quizzesEn = courseQuizzes(courseEn);
      expect(quizzesEn.map((q) => q.id)).toEqual(quizzesIt.map((q) => q.id));
      quizzesIt.forEach((quizIt, j) =>
        expect(quizzesEn[j]!.questions.map(answerShape)).toEqual(quizIt.questions.map(answerShape)),
      );
    });
  });

  it('tools match', () => {
    const shape = (t: (typeof itc.tools)[number]) => [
      t.id,
      t.website,
      t.status ?? 'active',
      t.categories,
      t.relatedCourseIds,
      t.lastReviewed,
      t.difficulty,
      t.features.length,
      t.useCases.length,
      !!t.statusNote,
    ];
    expect(en.tools.map(shape)).toEqual(itc.tools.map(shape));
  });

  it('practice lab matches', () => {
    expect(en.practice.items.map((p) => [p.id, p.kind, p.xp, p.steps.map(answerShape)])).toEqual(
      itc.practice.items.map((p) => [p.id, p.kind, p.xp, p.steps.map(answerShape)]),
    );
    expect(en.practice.dailyPool.map(answerShape)).toEqual(itc.practice.dailyPool.map(answerShape));
    expect(en.practice.weekly.map((w) => [w.id, w.metric, w.target])).toEqual(
      itc.practice.weekly.map((w) => [w.id, w.metric, w.target]),
    );
  });

  it('news and tutor match', () => {
    const news = (n: (typeof itc.news)[number]) => [n.id, n.date, n.kind, n.toolIds, n.source.url];
    expect(en.news.map(news)).toEqual(itc.news.map(news));
    expect(en.verifiedAt).toBe(itc.verifiedAt);
    expect(en.tutor.knowledge.map((k) => [k.id, k.lessonId ?? null])).toEqual(
      itc.tutor.knowledge.map((k) => [k.id, k.lessonId ?? null]),
    );
  });
});

/** Raccoglie tutte le stringhe di un oggetto (per cercare testo rimasto in italiano). */
function allStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === 'string') out.push(value);
  else if (Array.isArray(value)) value.forEach((v) => allStrings(v, out));
  else if (value instanceof Set) value.forEach((v) => allStrings(v, out));
  else if (value && typeof value === 'object')
    Object.values(value).forEach((v) => allStrings(v, out));
  return out;
}

const italianMarkers =
  /\b(della|delle|degli|sono|perché|anche|questo|questa|nella|essere|alla|uno strumento|lezione|domanda)\b/i;

describe('English content is really in English', () => {
  it('has no leftover Italian sentences', () => {
    const { tutor, ...rest } = en;
    const leftovers = allStrings({ ...rest, tutor: { knowledge: tutor.knowledge } }).filter(
      (text) => text.includes(' ') && italianMarkers.test(text),
    );
    expect(leftovers.slice(0, 5)).toEqual([]);
  });
});

describe('prompt exercises work in both languages', () => {
  it('the sample answer of every prompt exercise passes its own checks', () => {
    for (const bundle of [itc, en]) {
      const steps = [
        ...bundle.courses.flatMap((c) => [
          ...courseLessons(c).flatMap((l) => l.questions),
          ...courseQuizzes(c).flatMap((q) => q.questions),
        ]),
        ...bundle.practice.items.flatMap((p) => p.steps),
      ];
      for (const step of steps) {
        if (step.type !== 'promptFix') continue;
        const failed = evaluatePromptChecks(step.sampleAnswer, step.checks)
          .filter((r) => !r.passed)
          .map((r) => `${step.id}: ${r.label}`);
        expect(failed).toEqual([]);
      }
    }
  });
});

describe('English interface and tutor', () => {
  it('the English interface text has no leftover Italian', () => {
    const leftovers = allStrings(enLocale).filter(
      (text) => text.includes(' ') && italianMarkers.test(text),
    );
    expect(leftovers).toEqual([]);
  });

  it('the English tutor answers its own suggested questions', async () => {
    const tutor = createDemoTutor({
      knowledge: en.tutor.knowledge,
      courses: en.courses,
      tools: en.tools,
      stopWords: en.tutor.stopWords,
    });
    const questions = [
      ...en.tutor.knowledge.flatMap((k) => k.followUps ?? []),
      ...Object.entries(enLocale.tutor)
        .filter(([key]) => key.startsWith('suggestion') && key !== 'suggestionsTitle')
        .map(([, value]) => value as string),
    ];
    for (const question of questions) {
      const reply = await tutor.ask(question, []);
      expect([question, reply.isFallback]).toEqual([question, false]);
    }
  });
});
