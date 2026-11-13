/**
 * Badge: definizioni e regole di assegnazione (funzioni pure).
 * Titoli e descrizioni sono in i18n: `badges.<id>.title` / `badges.<id>.description`.
 */

export interface LearnerStats {
  xp: number;
  lessonsCompleted: number;
  quizzesPassed: number;
  perfectQuizzes: number;
  coursesCompleted: number;
  longestStreak: number;
  dailyGoalsMet: number;
}

export interface BadgeDefinition {
  id: string;
  icon: string;
  tier: 'bronze' | 'silver' | 'gold';
  isEarned: (stats: LearnerStats) => boolean;
}

export const badgeDefinitions: BadgeDefinition[] = [
  {
    id: 'firstLesson',
    icon: 'footsteps',
    tier: 'bronze',
    isEarned: (s) => s.lessonsCompleted >= 1,
  },
  { id: 'fiveLessons', icon: 'book', tier: 'bronze', isEarned: (s) => s.lessonsCompleted >= 5 },
  {
    id: 'twentyLessons',
    icon: 'library',
    tier: 'silver',
    isEarned: (s) => s.lessonsCompleted >= 20,
  },
  {
    id: 'firstQuiz',
    icon: 'checkmark-done',
    tier: 'bronze',
    isEarned: (s) => s.quizzesPassed >= 1,
  },
  { id: 'perfectScore', icon: 'star', tier: 'silver', isEarned: (s) => s.perfectQuizzes >= 1 },
  { id: 'firstCourse', icon: 'school', tier: 'gold', isEarned: (s) => s.coursesCompleted >= 1 },
  { id: 'streak3', icon: 'flame', tier: 'bronze', isEarned: (s) => s.longestStreak >= 3 },
  { id: 'streak7', icon: 'bonfire', tier: 'silver', isEarned: (s) => s.longestStreak >= 7 },
  { id: 'goalCrusher', icon: 'flag', tier: 'silver', isEarned: (s) => s.dailyGoalsMet >= 5 },
  { id: 'xp1000', icon: 'flash', tier: 'gold', isEarned: (s) => s.xp >= 1000 },
];

/** Badge appena guadagnati (non presenti in `alreadyEarned`). */
export function findNewBadges(
  stats: LearnerStats,
  alreadyEarned: Record<string, string>,
): string[] {
  return badgeDefinitions
    .filter((badge) => !alreadyEarned[badge.id] && badge.isEarned(stats))
    .map((badge) => badge.id);
}

export function getBadge(id: string): BadgeDefinition | undefined {
  return badgeDefinitions.find((badge) => badge.id === id);
}

export const dailyGoalOptions = [20, 40, 60, 100] as const;
export const DEFAULT_DAILY_GOAL = 40;
