/**
 * Streak giornaliero e attività per giorno. Le date sono chiavi locali "YYYY-MM-DD".
 */

export interface StreakState {
  current: number;
  longest: number;
  /** Ultimo giorno con almeno un'attività completata. */
  lastActiveDate: string | null;
}

export const emptyStreak: StreakState = { current: 0, longest: 0, lastActiveDate: null };

/** Chiave del giorno nel fuso orario del dispositivo. */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseKey(key: string): Date {
  const [y, m, d] = key.split('-').map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1, 12);
}

/** Giorni di calendario tra due chiavi (b - a). Robusto ai cambi di ora legale. */
export function daysBetween(a: string, b: string): number {
  return Math.round((parseKey(b).getTime() - parseKey(a).getTime()) / 86_400_000);
}

export function addDays(key: string, days: number): string {
  const date = parseKey(key);
  date.setDate(date.getDate() + days);
  return toDateKey(date);
}

/** Aggiorna lo streak quando l'utente completa un'attività nel giorno `today`. */
export function registerActivityDay(state: StreakState, today: string): StreakState {
  if (state.lastActiveDate === today) return state;
  const gap = state.lastActiveDate ? daysBetween(state.lastActiveDate, today) : Infinity;
  const current = gap === 1 ? state.current + 1 : 1;
  return { current, longest: Math.max(state.longest, current), lastActiveDate: today };
}

/** Streak da mostrare oggi: resta valido se l'ultima attività è di oggi o di ieri. */
export function getActiveStreak(state: StreakState, today: string): number {
  if (!state.lastActiveDate) return 0;
  const gap = daysBetween(state.lastActiveDate, today);
  return gap <= 1 ? state.current : 0;
}

/** Vero se lo streak è ancora salvabile ma oggi non c'è ancora attività. */
export function isStreakAtRisk(state: StreakState, today: string): boolean {
  return (
    state.current > 0 &&
    state.lastActiveDate !== null &&
    daysBetween(state.lastActiveDate, today) === 1
  );
}

/** Ultimi `count` giorni (dal più vecchio a oggi) con gli XP guadagnati. */
export function lastDays(
  dailyXp: Record<string, number>,
  today: string,
  count = 7,
): { date: string; xp: number }[] {
  return Array.from({ length: count }, (_, i) => {
    const date = addDays(today, i - (count - 1));
    return { date, xp: dailyXp[date] ?? 0 };
  });
}
