/**
 * Sfide giornaliere e settimanali: funzioni pure.
 */
import type { QuizQuestion } from '@/features/courses/types';
import { addDays, toDateKey } from '@/features/gamification/streak';
import { hashSeed, shuffle } from '@/features/lessons/evaluate';
import type { ProgressState } from '@/features/progress/progress';

import type { WeeklyChallenge } from './types';

/** Le stesse domande per tutti in un dato giorno, diverse da un giorno all'altro. */
export function pickDailyQuestions(
  pool: QuizQuestion[],
  dateKey: string,
  size: number,
): QuizQuestion[] {
  return shuffle(pool, hashSeed(`daily:${dateKey}`)).slice(0, size);
}

/** Lunedì della settimana che contiene `dateKey`. */
export function weekStart(dateKey: string): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1, 12);
  const offset = (date.getDay() + 6) % 7; // lunedì = 0
  return addDays(dateKey, -offset);
}

export function weekDays(dateKey: string): string[] {
  const start = weekStart(dateKey);
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
}

export function weeklyValue(
  challenge: WeeklyChallenge,
  state: ProgressState,
  today: string,
): number {
  const days = new Set(weekDays(today));
  switch (challenge.metric) {
    case 'xp':
      return [...days].reduce((sum, day) => sum + (state.dailyXp[day] ?? 0), 0);
    case 'activeDays':
      return [...days].filter((day) => (state.dailyXp[day] ?? 0) > 0 || state.dailyChallenges[day])
        .length;
    case 'lessons':
      return Object.values(state.lessons).filter((record) =>
        days.has(toDateKey(new Date(record.completedAt))),
      ).length;
  }
}

export function weeklyClaimKey(challengeId: string, today: string): string {
  return `${challengeId}:${weekStart(today)}`;
}

export interface WeeklyStatus {
  challenge: WeeklyChallenge;
  value: number;
  progress: number;
  completed: boolean;
  claimed: boolean;
}

export function getWeeklyStatus(
  challenges: WeeklyChallenge[],
  state: ProgressState,
  today: string,
): WeeklyStatus[] {
  return challenges.map((challenge) => {
    const value = weeklyValue(challenge, state, today);
    return {
      challenge,
      value,
      progress: Math.min(1, value / challenge.target),
      completed: value >= challenge.target,
      claimed: Boolean(state.weeklyClaims[weeklyClaimKey(challenge.id, today)]),
    };
  });
}

/** XP della sfida giornaliera: 5 per risposta corretta, solo al primo completamento del giorno. */
export function dailyChallengeXp(
  correct: number,
  alreadyDoneToday: boolean,
  xpPerCorrect = 5,
): number {
  return alreadyDoneToday ? 0 : correct * xpPerCorrect;
}
