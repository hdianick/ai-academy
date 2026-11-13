/**
 * Calcolo dei progressi: funzioni pure, usate dallo store e dalle schermate.
 */
import { courseLessons, courseQuizzes } from '@/features/courses/catalog';
import type { Course } from '@/features/courses/types';
import { DEFAULT_DAILY_GOAL } from '@/features/gamification/badges';
import { emptyStreak, type StreakState } from '@/features/gamification/streak';

export interface LessonRecord {
  completedAt: string;
}

export interface QuizRecord {
  bestScore: number;
  passed: boolean;
  lastAttemptAt: string;
}

export interface ProgressState {
  lessons: Record<string, LessonRecord>;
  quizzes: Record<string, QuizRecord>;
  xp: number;
  lastActivity: { courseId: string; at: string } | null;
  /** XP guadagnati per giorno ("YYYY-MM-DD"). */
  dailyXp: Record<string, number>;
  streak: StreakState;
  /** Obiettivo giornaliero in XP. */
  dailyGoal: number;
  /** Giorni in cui l'obiettivo è stato raggiunto. */
  goalMetDays: Record<string, true>;
  /** Badge ottenuti: id → data. */
  badges: Record<string, string>;
  /** Quiz completati con il 100%. */
  perfectQuizzes: Record<string, true>;
  /** Attività del Practice Lab completate. */
  practice: Record<string, { completedAt: string; bestScore: number }>;
  /** Sfide giornaliere completate: giorno → punteggio. */
  dailyChallenges: Record<string, { score: number; completedAt: string }>;
  /** Bonus delle sfide settimanali riscattati: "<sfida>:<settimana>" → data. */
  weeklyClaims: Record<string, string>;
}

export const emptyProgress: ProgressState = {
  lessons: {},
  quizzes: {},
  xp: 0,
  lastActivity: null,
  dailyXp: {},
  streak: emptyStreak,
  dailyGoal: DEFAULT_DAILY_GOAL,
  goalMetDays: {},
  badges: {},
  perfectQuizzes: {},
  practice: {},
  dailyChallenges: {},
  weeklyClaims: {},
};

export interface CourseProgress {
  completedLessons: number;
  totalLessons: number;
  passedQuizzes: number;
  totalQuizzes: number;
  /** 0-1: lezioni e quiz pesano allo stesso modo per singola attività. */
  ratio: number;
  finalTestPassed: boolean;
  completed: boolean;
}

export function getCourseProgress(course: Course, state: ProgressState): CourseProgress {
  const lessons = courseLessons(course);
  const quizzes = courseQuizzes(course);
  const completedLessons = lessons.filter((lesson) => state.lessons[lesson.id]).length;
  const passedQuizzes = quizzes.filter((quiz) => state.quizzes[quiz.id]?.passed).length;
  const total = lessons.length + quizzes.length;
  const finalTestPassed = Boolean(state.quizzes[course.finalTest.id]?.passed);
  return {
    completedLessons,
    totalLessons: lessons.length,
    passedQuizzes,
    totalQuizzes: quizzes.length,
    ratio: total === 0 ? 0 : (completedLessons + passedQuizzes) / total,
    finalTestPassed,
    completed: completedLessons === lessons.length && passedQuizzes === quizzes.length,
  };
}

export type NextActivity =
  | { kind: 'lesson'; id: string; title: string }
  | { kind: 'quiz'; id: string; title: string }
  | null;

/** Prima attività non completata del corso, nell'ordine del percorso. */
export function getNextActivity(course: Course, state: ProgressState): NextActivity {
  for (const module of course.modules) {
    for (const lesson of module.lessons) {
      if (!state.lessons[lesson.id]) return { kind: 'lesson', id: lesson.id, title: lesson.title };
    }
    if (!state.quizzes[module.quiz.id]?.passed) {
      return { kind: 'quiz', id: module.quiz.id, title: module.quiz.title };
    }
  }
  if (!state.quizzes[course.finalTest.id]?.passed) {
    return { kind: 'quiz', id: course.finalTest.id, title: course.finalTest.title };
  }
  return null;
}

/** Corso da mostrare in "Continua": l'ultimo usato se non completato, altrimenti il primo iniziato. */
export function getContinueCourse(courses: Course[], state: ProgressState): Course | null {
  const last = state.lastActivity
    ? courses.find((course) => course.id === state.lastActivity?.courseId)
    : undefined;
  if (last && getNextActivity(last, state)) return last;
  return (
    courses.find((course) => {
      const progress = getCourseProgress(course, state);
      return progress.ratio > 0 && !progress.completed;
    }) ?? null
  );
}

/** XP guadagnati completando un quiz: solo la prima volta che viene superato. */
export function quizXpAward(previous: QuizRecord | undefined, passed: boolean, xp: number): number {
  return passed && !previous?.passed ? xp : 0;
}
