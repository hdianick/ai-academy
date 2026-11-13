import { demoCourses } from '@/data/content/courses';
import { courseLessons } from '@/features/courses/catalog';
import { emptyProgress, type ProgressState } from '@/features/progress/progress';

import { badgeDefinitions, findNewBadges, type LearnerStats } from '../badges';
import { getLevelInfo, getRank, xpForLevel } from '../levels';
import { applyActivity } from '../rewards';
import {
  addDays,
  daysBetween,
  getActiveStreak,
  isStreakAtRisk,
  lastDays,
  registerActivityDay,
  toDateKey,
} from '../streak';

describe('livelli', () => {
  it('segue la curva 0 / 100 / 300 / 600 / 1000', () => {
    expect([1, 2, 3, 4, 5].map(xpForLevel)).toEqual([0, 100, 300, 600, 1000]);
  });

  it('calcola livello e avanzamento', () => {
    expect(getLevelInfo(0)).toMatchObject({
      level: 1,
      xpIntoLevel: 0,
      xpForNext: 100,
      progress: 0,
    });
    expect(getLevelInfo(150)).toMatchObject({
      level: 2,
      xpIntoLevel: 50,
      xpForNext: 200,
      progress: 0.25,
    });
    expect(getLevelInfo(300).level).toBe(3);
    expect(getLevelInfo(-10).level).toBe(1);
  });

  it('assegna un titolo per fascia', () => {
    expect(getRank(1)).toBe('curious');
    expect(getRank(5)).toBe('apprentice');
    expect(getRank(25)).toBe('master');
  });
});

describe('streak', () => {
  it('gestisce le date locali e i giorni di differenza', () => {
    expect(toDateKey(new Date(2026, 0, 5, 23, 30))).toBe('2026-01-05');
    expect(daysBetween('2026-03-28', '2026-03-30')).toBe(2); // cambio ora legale
    expect(addDays('2026-12-31', 1)).toBe('2027-01-01');
  });

  it('aumenta con giorni consecutivi, non conta due volte lo stesso giorno, si azzera dopo una pausa', () => {
    let s = registerActivityDay({ current: 0, longest: 0, lastActiveDate: null }, '2026-11-10');
    expect(s).toEqual({ current: 1, longest: 1, lastActiveDate: '2026-11-10' });
    s = registerActivityDay(s, '2026-11-10');
    expect(s.current).toBe(1);
    s = registerActivityDay(s, '2026-11-11');
    s = registerActivityDay(s, '2026-11-12');
    expect(s).toMatchObject({ current: 3, longest: 3 });
    s = registerActivityDay(s, '2026-11-15');
    expect(s).toMatchObject({ current: 1, longest: 3 });
  });

  it('mostra lo streak attivo solo se l’ultima attività è di oggi o di ieri', () => {
    const s = { current: 4, longest: 4, lastActiveDate: '2026-11-12' };
    expect(getActiveStreak(s, '2026-11-12')).toBe(4);
    expect(getActiveStreak(s, '2026-11-13')).toBe(4);
    expect(isStreakAtRisk(s, '2026-11-13')).toBe(true);
    expect(getActiveStreak(s, '2026-11-14')).toBe(0);
  });

  it('restituisce gli ultimi 7 giorni in ordine', () => {
    const days = lastDays({ '2026-11-13': 40, '2026-11-10': 20 }, '2026-11-13');
    expect(days).toHaveLength(7);
    expect(days[0]?.date).toBe('2026-11-07');
    expect(days[6]).toEqual({ date: '2026-11-13', xp: 40 });
    expect(days[3]).toEqual({ date: '2026-11-10', xp: 20 });
  });
});

describe('badge', () => {
  const base: LearnerStats = {
    xp: 0,
    lessonsCompleted: 0,
    quizzesPassed: 0,
    perfectQuizzes: 0,
    coursesCompleted: 0,
    longestStreak: 0,
    dailyGoalsMet: 0,
  };

  it('hanno id unici', () => {
    const ids = badgeDefinitions.map((b) => b.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('assegna solo i badge nuovi', () => {
    expect(findNewBadges(base, {})).toEqual([]);
    expect(findNewBadges({ ...base, lessonsCompleted: 5 }, {})).toEqual([
      'firstLesson',
      'fiveLessons',
    ]);
    expect(findNewBadges({ ...base, lessonsCompleted: 5 }, { firstLesson: 'x' })).toEqual([
      'fiveLessons',
    ]);
  });
});

describe('ricompense', () => {
  const lesson = courseLessons(demoCourses[0]!)[0]!;
  const after = (state: ProgressState): ProgressState => ({
    ...state,
    lessons: { ...state.lessons, [lesson.id]: { completedAt: 'x' } },
  });

  it('prima lezione: XP, streak, badge e obiettivo', () => {
    const before = { ...emptyProgress, dailyGoal: 20 };
    const { state, reward } = applyActivity({
      before,
      after: after(before),
      xp: 20,
      today: '2026-11-13',
      nowIso: '2026-11-13T10:00:00Z',
      courses: demoCourses,
    });
    expect(state.xp).toBe(20);
    expect(state.dailyXp['2026-11-13']).toBe(20);
    expect(state.streak.current).toBe(1);
    expect(state.goalMetDays['2026-11-13']).toBe(true);
    expect(state.badges.firstLesson).toBe('2026-11-13T10:00:00Z');
    expect(reward).toMatchObject({
      xp: 20,
      newBadges: ['firstLesson'],
      streak: 1,
      streakExtended: true,
      goalReachedNow: true,
      levelBefore: 1,
      levelAfter: 1,
    });
  });

  it('rileva il passaggio di livello e non ripete obiettivo e streak nello stesso giorno', () => {
    const before: ProgressState = {
      ...emptyProgress,
      xp: 90,
      dailyGoal: 20,
      dailyXp: { '2026-11-13': 30 },
      goalMetDays: { '2026-11-13': true },
      streak: { current: 2, longest: 2, lastActiveDate: '2026-11-13' },
      badges: { firstLesson: 'x' },
    };
    const { reward } = applyActivity({
      before,
      after: after(before),
      xp: 20,
      today: '2026-11-13',
      nowIso: 'now',
      courses: demoCourses,
    });
    expect(reward).toMatchObject({
      levelBefore: 1,
      levelAfter: 2,
      goalReachedNow: false,
      streakExtended: false,
      streak: 2,
      dailyXp: 50,
    });
  });
});
