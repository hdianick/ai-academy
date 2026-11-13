import {
  DAILY_CHALLENGE_SIZE,
  DAILY_XP_PER_CORRECT,
  dailyChallengePool,
  practiceItems,
  weeklyChallenges,
} from '@/data/content/practice';
import { pickDailyQuestions } from '@/features/practice/challenges';

export const practiceRepository = {
  list: () => practiceItems,
  get: (id: string) => practiceItems.find((item) => item.id === id) ?? null,
  dailyQuestions: (dateKey: string) =>
    pickDailyQuestions(dailyChallengePool, dateKey, DAILY_CHALLENGE_SIZE),
  dailyMaxXp: DAILY_CHALLENGE_SIZE * DAILY_XP_PER_CORRECT,
  dailySize: DAILY_CHALLENGE_SIZE,
  weekly: () => weeklyChallenges,
};
