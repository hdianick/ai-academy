/**
 * Unione tra progressi locali e progressi salvati online.
 * Regola: non si perde mai nulla di già ottenuto (lezioni, quiz, badge) e gli XP non vengono sommati
 * due volte (si prende il valore più alto).
 */
import { emptyProgress, type ProgressState, type QuizRecord } from './progress';

function later(a: string | null | undefined, b: string | null | undefined): string | null {
  if (!a) return b ?? null;
  if (!b) return a;
  return a > b ? a : b;
}

function earlier(a: string, b: string): string {
  return a < b ? a : b;
}

function mergeRecords<T>(
  a: Record<string, T>,
  b: Record<string, T>,
  combine: (x: T, y: T) => T,
): Record<string, T> {
  const result: Record<string, T> = { ...a };
  for (const [key, value] of Object.entries(b)) {
    const existing = result[key];
    result[key] = existing === undefined ? value : combine(existing, value);
  }
  return result;
}

/** Completa uno stato parziale (es. salvato con una versione precedente) con i valori predefiniti. */
export function normalizeProgress(value: unknown): ProgressState {
  const partial = (value && typeof value === 'object' ? value : {}) as Partial<ProgressState>;
  return { ...emptyProgress, ...partial };
}

export function mergeProgress(localInput: ProgressState, remoteInput: unknown): ProgressState {
  const local = normalizeProgress(localInput);
  const remote = normalizeProgress(remoteInput);

  const streakSource =
    later(local.streak.lastActiveDate, remote.streak.lastActiveDate) === local.streak.lastActiveDate
      ? local.streak
      : remote.streak;

  const lastActivity =
    later(local.lastActivity?.at, remote.lastActivity?.at) === local.lastActivity?.at
      ? local.lastActivity
      : remote.lastActivity;

  return {
    lessons: mergeRecords(local.lessons, remote.lessons, (x, y) => ({
      completedAt: earlier(x.completedAt, y.completedAt),
    })),
    quizzes: mergeRecords<QuizRecord>(local.quizzes, remote.quizzes, (x, y) => ({
      bestScore: Math.max(x.bestScore, y.bestScore),
      passed: x.passed || y.passed,
      lastAttemptAt: later(x.lastAttemptAt, y.lastAttemptAt) ?? x.lastAttemptAt,
    })),
    xp: Math.max(local.xp, remote.xp),
    lastActivity: lastActivity ?? null,
    dailyXp: mergeRecords(local.dailyXp, remote.dailyXp, Math.max),
    streak: {
      ...streakSource,
      longest: Math.max(local.streak.longest, remote.streak.longest, streakSource.current),
    },
    dailyGoal: remote.dailyGoal || local.dailyGoal,
    goalMetDays: { ...remote.goalMetDays, ...local.goalMetDays },
    badges: mergeRecords(local.badges, remote.badges, earlier),
    perfectQuizzes: { ...remote.perfectQuizzes, ...local.perfectQuizzes },
    practice: mergeRecords(local.practice, remote.practice, (x, y) => ({
      completedAt: earlier(x.completedAt, y.completedAt),
      bestScore: Math.max(x.bestScore, y.bestScore),
    })),
    dailyChallenges: mergeRecords(local.dailyChallenges, remote.dailyChallenges, (x, y) =>
      x.score >= y.score ? x : y,
    ),
    weeklyClaims: mergeRecords(local.weeklyClaims, remote.weeklyClaims, earlier),
  };
}
