import { useTranslation } from 'react-i18next';

import { coursesRepository } from '@/data/repositories/courses';
import { useProgressStore } from '@/features/progress/store';

import { computeStats } from './rewards';
import { getActiveStreak, lastDays, toDateKey } from './streak';

function weekdayLabel(dateKey: string, language: string, style: 'narrow' | 'short'): string {
  const [y, m, d] = dateKey.split('-').map(Number);
  const date = new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1, 12);
  try {
    return date.toLocaleDateString(language, { weekday: style });
  } catch {
    return dateKey.slice(8);
  }
}

/** Dati di gamification pronti per l'interfaccia. */
export function useGamification() {
  const { i18n } = useTranslation();
  const state = useProgressStore();
  const today = toDateKey(new Date());
  const days = lastDays(state.dailyXp, today, 7).map((day) => ({
    ...day,
    label: weekdayLabel(day.date, i18n.language, 'narrow').toUpperCase(),
    longLabel: weekdayLabel(day.date, i18n.language, 'short'),
  }));

  return {
    today,
    xp: state.xp,
    xpToday: state.dailyXp[today] ?? 0,
    dailyGoal: state.dailyGoal,
    streak: getActiveStreak(state.streak, today),
    longestStreak: state.streak.longest,
    activeToday: state.streak.lastActiveDate === today,
    days,
    badges: state.badges,
    stats: computeStats(state, coursesRepository.list()),
  };
}
