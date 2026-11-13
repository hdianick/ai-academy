/**
 * Livelli utente. Curva crescente: ogni livello richiede 100 XP in più del precedente.
 * Livello 1: 0 XP · 2: 100 · 3: 300 · 4: 600 · 5: 1000 · 6: 1500 …
 */

export const MAX_LEVEL = 50;

/** XP totali necessari per raggiungere un livello. */
export function xpForLevel(level: number): number {
  const l = Math.max(1, Math.min(level, MAX_LEVEL));
  return 50 * (l - 1) * l;
}

export interface LevelInfo {
  level: number;
  /** XP accumulati dentro il livello corrente. */
  xpIntoLevel: number;
  /** XP necessari per passare dal livello corrente al successivo (0 al livello massimo). */
  xpForNext: number;
  /** 0-1 avanzamento verso il livello successivo. */
  progress: number;
  isMax: boolean;
}

export function getLevelInfo(totalXp: number): LevelInfo {
  const xp = Math.max(0, Math.floor(totalXp));
  let level = 1;
  while (level < MAX_LEVEL && xp >= xpForLevel(level + 1)) level++;
  const isMax = level >= MAX_LEVEL;
  const base = xpForLevel(level);
  const xpForNext = isMax ? 0 : xpForLevel(level + 1) - base;
  const xpIntoLevel = xp - base;
  return {
    level,
    xpIntoLevel,
    xpForNext,
    progress: isMax ? 1 : xpIntoLevel / xpForNext,
    isMax,
  };
}

/** Titoli per fascia di livello (chiave i18n `rank.<id>`). */
export const rankIds = [
  'curious',
  'explorer',
  'apprentice',
  'practitioner',
  'expert',
  'master',
] as const;
export type RankId = (typeof rankIds)[number];

export function getRank(level: number): RankId {
  if (level >= 20) return 'master';
  if (level >= 12) return 'expert';
  if (level >= 8) return 'practitioner';
  if (level >= 5) return 'apprentice';
  if (level >= 3) return 'explorer';
  return 'curious';
}
