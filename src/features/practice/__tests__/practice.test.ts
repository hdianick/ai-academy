import { demoCourses } from '@/data/content/courses';
import {
  DAILY_CHALLENGE_SIZE,
  dailyChallengePool,
  practiceItems,
  weeklyChallenges,
} from '@/data/content/practice';
import { demoTools } from '@/data/content/tools';
import { evaluateExercise } from '@/features/lessons/evaluate';
import { emptyProgress, type ProgressState } from '@/features/progress/progress';
import { filterTools } from '@/features/tools/catalog';
import { toolCategories } from '@/features/tools/types';

import {
  dailyChallengeXp,
  getWeeklyStatus,
  pickDailyQuestions,
  weekDays,
  weekStart,
  weeklyClaimKey,
} from '../challenges';

describe('catalogo strumenti', () => {
  it('ha almeno 15 strumenti, id unici e ogni categoria popolata', () => {
    expect(demoTools.length).toBeGreaterThanOrEqual(15);
    expect(new Set(demoTools.map((t) => t.id)).size).toBe(demoTools.length);
    for (const category of toolCategories) {
      expect(demoTools.some((t) => t.categories.includes(category))).toBe(true);
    }
  });

  it('collega solo corsi esistenti e ha schede complete', () => {
    const courseIds = new Set(demoCourses.map((c) => c.id));
    for (const tool of demoTools) {
      expect(tool.relatedCourseIds.every((id) => courseIds.has(id))).toBe(true);
      expect(tool.features.length).toBeGreaterThanOrEqual(3);
      expect(tool.useCases.length).toBeGreaterThanOrEqual(2);
      expect(tool.website).toMatch(/^https:\/\//);
    }
  });

  it('filtra per testo e categoria', () => {
    expect(filterTools(demoTools, { query: 'midjourney' }).map((t) => t.id)).toEqual([
      'midjourney',
    ]);
    expect(
      filterTools(demoTools, { category: 'video' })
        .map((t) => t.id)
        .sort(),
    ).toEqual(['runway', 'sora', 'veo']);
    expect(filterTools(demoTools, { query: 'fonti', category: 'research' }).length).toBeGreaterThan(
      0,
    );
  });
});

describe('practice lab', () => {
  it('ha missioni, confronti e progetti con id unici', () => {
    expect(new Set(practiceItems.map((p) => p.id)).size).toBe(practiceItems.length);
    for (const kind of ['mission', 'comparison', 'project'] as const) {
      expect(practiceItems.some((p) => p.kind === kind)).toBe(true);
    }
  });

  it('gli esercizi “migliora il prompt” sono risolvibili', () => {
    for (const item of practiceItems) {
      for (const step of item.steps) {
        if (step.type !== 'promptFix') continue;
        expect(evaluateExercise(step, { type: 'promptFix', text: step.sampleAnswer }).correct).toBe(
          true,
        );
        expect(evaluateExercise(step, { type: 'promptFix', text: step.weakPrompt }).correct).toBe(
          false,
        );
      }
    }
  });
});

describe('sfide', () => {
  it('la sfida giornaliera è stabile nello stesso giorno e varia tra giorni', () => {
    const a = pickDailyQuestions(dailyChallengePool, '2026-11-13', DAILY_CHALLENGE_SIZE);
    const b = pickDailyQuestions(dailyChallengePool, '2026-11-13', DAILY_CHALLENGE_SIZE);
    expect(a.map((q) => q.id)).toEqual(b.map((q) => q.id));
    expect(a).toHaveLength(DAILY_CHALLENGE_SIZE);
    const days = ['2026-11-14', '2026-11-15', '2026-11-16', '2026-11-17'].map((d) =>
      pickDailyQuestions(dailyChallengePool, d, DAILY_CHALLENGE_SIZE)
        .map((q) => q.id)
        .join(),
    );
    expect(new Set(days).size).toBeGreaterThan(1);
  });

  it('la settimana parte di lunedì', () => {
    expect(weekStart('2026-11-13')).toBe('2026-11-09'); // venerdì → lunedì
    expect(weekStart('2026-11-09')).toBe('2026-11-09');
    expect(weekStart('2026-11-15')).toBe('2026-11-09'); // domenica
    expect(weekDays('2026-11-13')).toHaveLength(7);
  });

  it('calcola avanzamento e riscatto delle sfide settimanali', () => {
    const state: ProgressState = {
      ...emptyProgress,
      dailyXp: { '2026-11-09': 100, '2026-11-12': 60, '2026-11-02': 500 },
      lessons: {
        a: { completedAt: new Date(2026, 10, 10, 10).toISOString() },
        b: { completedAt: new Date(2026, 10, 1, 10).toISOString() },
      },
      weeklyClaims: { [weeklyClaimKey('weekly-xp', '2026-11-13')]: 'x' },
    };
    const status = getWeeklyStatus(weeklyChallenges, state, '2026-11-13');
    const byId = Object.fromEntries(status.map((s) => [s.challenge.id, s]));
    expect(byId['weekly-xp']).toMatchObject({ value: 160, completed: true, claimed: true });
    expect(byId['weekly-lessons']).toMatchObject({ value: 1, completed: false, claimed: false });
    expect(byId['weekly-days']).toMatchObject({ value: 2 });
  });

  it('assegna XP alla sfida giornaliera solo la prima volta', () => {
    expect(dailyChallengeXp(3, false)).toBe(15);
    expect(dailyChallengeXp(3, true)).toBe(0);
  });
});
