/**
 * Calcolo delle ricompense dopo un'attività completata (lezione o quiz).
 * Funzione pura: riceve lo stato già aggiornato con la lezione/quiz e applica
 * XP giornalieri, streak, obiettivo del giorno e badge.
 */
import type { Course } from '@/features/courses/types';
import { getCourseProgress, type ProgressState } from '@/features/progress/progress';

import { findNewBadges, type LearnerStats } from './badges';
import { getLevelInfo } from './levels';
import { registerActivityDay } from './streak';

export interface Reward {
  xp: number;
  levelBefore: number;
  levelAfter: number;
  newBadges: string[];
  streak: number;
  /** Lo streak è aumentato con questa attività (prima attività del giorno). */
  streakExtended: boolean;
  dailyXp: number;
  dailyGoal: number;
  /** L'obiettivo giornaliero è stato raggiunto proprio con questa attività. */
  goalReachedNow: boolean;
}

export function computeStats(state: ProgressState, courses: Course[]): LearnerStats {
  return {
    xp: state.xp,
    lessonsCompleted: Object.keys(state.lessons).length,
    quizzesPassed: Object.values(state.quizzes).filter((q) => q.passed).length,
    perfectQuizzes: Object.keys(state.perfectQuizzes).length,
    coursesCompleted: courses.filter((c) => getCourseProgress(c, state).completed).length,
    longestStreak: state.streak.longest,
    dailyGoalsMet: Object.keys(state.goalMetDays).length,
  };
}

export interface ActivityInput {
  /** Stato precedente all'attività. */
  before: ProgressState;
  /** Stato con lezione/quiz già registrati (XP totali esclusi). */
  after: ProgressState;
  xp: number;
  today: string;
  nowIso: string;
  courses: Course[];
}

export function applyActivity({ before, after, xp, today, nowIso, courses }: ActivityInput): {
  state: ProgressState;
  reward: Reward;
} {
  const previousDaily = before.dailyXp[today] ?? 0;
  const dailyXp = previousDaily + xp;
  const streak = registerActivityDay(before.streak, today);
  const goalReachedNow = previousDaily < before.dailyGoal && dailyXp >= before.dailyGoal;

  let state: ProgressState = {
    ...after,
    xp: before.xp + xp,
    dailyXp: { ...before.dailyXp, [today]: dailyXp },
    streak,
    goalMetDays: goalReachedNow ? { ...before.goalMetDays, [today]: true } : before.goalMetDays,
  };

  const newBadges = findNewBadges(computeStats(state, courses), state.badges);
  if (newBadges.length > 0) {
    state = {
      ...state,
      badges: { ...state.badges, ...Object.fromEntries(newBadges.map((id) => [id, nowIso])) },
    };
  }

  return {
    state,
    reward: {
      xp,
      levelBefore: getLevelInfo(before.xp).level,
      levelAfter: getLevelInfo(state.xp).level,
      newBadges,
      streak: streak.current,
      streakExtended: before.streak.lastActiveDate !== today,
      dailyXp,
      dailyGoal: before.dailyGoal,
      goalReachedNow,
    },
  };
}
