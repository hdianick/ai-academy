import { DAILY_CHALLENGE_SIZE, DAILY_XP_PER_CORRECT } from '@/data/content/practice';
import { content } from '@/data/content/registry';
import { pickDailyQuestions } from '@/features/practice/challenges';

/** Practice Lab nella lingua attiva dell'app. */
export const practiceRepository = {
  list: () => content().practice.items,
  get: (id: string) => content().practice.items.find((item) => item.id === id) ?? null,
  dailyQuestions: (dateKey: string) =>
    pickDailyQuestions(content().practice.dailyPool, dateKey, DAILY_CHALLENGE_SIZE),
  dailyMaxXp: DAILY_CHALLENGE_SIZE * DAILY_XP_PER_CORRECT,
  dailySize: DAILY_CHALLENGE_SIZE,
  weekly: () => content().practice.weekly,
};
