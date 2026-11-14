/** Statistiche dell'area amministrazione: funzioni pure, testate. */
import type { AppRole } from '@/features/auth/store';
import { courseLessons, courseQuizzes } from '@/features/courses/catalog';
import type { Course, ExerciseStep, PlanTier } from '@/features/courses/types';
import { getCourseProgress } from '@/features/progress/progress';
import { normalizeProgress } from '@/features/progress/merge';

import type { AdminProfile, ProgressRow } from './types';

const DAY = 24 * 60 * 60 * 1000;

export interface CourseUsage {
  courseId: string;
  title: string;
  started: number;
  completed: number;
}

export interface AdminStats {
  totalUsers: number;
  newUsers7d: number;
  activeUsers7d: number;
  byPlan: Record<PlanTier, number>;
  byRole: Record<AppRole, number>;
  totalXp: number;
  averageXp: number;
  lessonsCompleted: number;
  quizzesPassed: number;
  courses: CourseUsage[];
}

function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function computeStats(
  profiles: AdminProfile[],
  progress: ProgressRow[],
  courses: Course[],
  now: Date = new Date(),
): AdminStats {
  const weekAgo = now.getTime() - 7 * DAY;
  const recentDays = new Set(
    Array.from({ length: 7 }, (_, i) => dayKey(new Date(now.getTime() - i * DAY))),
  );

  const byPlan: Record<PlanTier, number> = { free: 0, premium: 0, pro: 0 };
  const byRole: Record<AppRole, number> = { user: 0, editor: 0, admin: 0 };
  for (const profile of profiles) {
    byPlan[profile.plan] += 1;
    byRole[profile.role] += 1;
  }

  const states = progress.map((row) => ({ row, state: normalizeProgress(row.data) }));
  let totalXp = 0;
  let lessonsCompleted = 0;
  let quizzesPassed = 0;
  let activeUsers7d = 0;
  for (const { state } of states) {
    totalXp += state.xp;
    lessonsCompleted += Object.keys(state.lessons).length;
    quizzesPassed += Object.values(state.quizzes).filter((q) => q.passed).length;
    if (Object.keys(state.dailyXp).some((day) => recentDays.has(day) && state.dailyXp[day]! > 0))
      activeUsers7d += 1;
  }

  const usage = courses.map((course) => {
    let started = 0;
    let completed = 0;
    for (const { state } of states) {
      const p = getCourseProgress(course, state);
      if (p.completed) completed += 1;
      if (p.ratio > 0) started += 1;
    }
    return { courseId: course.id, title: course.title, started, completed };
  });

  return {
    totalUsers: profiles.length,
    newUsers7d: profiles.filter((p) => new Date(p.createdAt).getTime() >= weekAgo).length,
    activeUsers7d,
    byPlan,
    byRole,
    totalXp,
    averageXp: states.length ? Math.round(totalXp / states.length) : 0,
    lessonsCompleted,
    quizzesPassed,
    courses: usage.sort((a, b) => b.started - a.started),
  };
}

export type QuestionType = ExerciseStep['type'];

export interface CourseContentStats {
  courseId: string;
  modules: number;
  lessons: number;
  theoryPages: number;
  lessonQuestions: number;
  quizQuestions: number;
  quizzes: number;
  byType: Partial<Record<QuestionType, number>>;
}

export function contentStats(course: Course): CourseContentStats {
  const lessons = courseLessons(course);
  const quizzes = courseQuizzes(course);
  const byType: Partial<Record<QuestionType, number>> = {};
  const count = (type: QuestionType) => {
    byType[type] = (byType[type] ?? 0) + 1;
  };
  for (const lesson of lessons) lesson.questions.forEach((q) => count(q.type));
  for (const quiz of quizzes) quiz.questions.forEach((q) => count(q.type));
  return {
    courseId: course.id,
    modules: course.modules.length,
    lessons: lessons.length,
    theoryPages: lessons.reduce((sum, l) => sum + l.theory.length, 0),
    lessonQuestions: lessons.reduce((sum, l) => sum + l.questions.length, 0),
    quizQuestions: quizzes.reduce((sum, q) => sum + q.questions.length, 0),
    quizzes: quizzes.length,
    byType,
  };
}

/** Testo principale di una domanda, per gli elenchi. */
export function questionText(step: ExerciseStep): string {
  switch (step.type) {
    case 'multipleChoice':
      return step.question;
    case 'trueFalse':
      return step.statement;
    case 'fillBlank':
      return step.sentence;
    case 'order':
    case 'promptFix':
      return step.instruction;
  }
}

/** Risposta corretta in forma leggibile. */
export function questionAnswer(step: ExerciseStep, labels: { yes: string; no: string }): string {
  switch (step.type) {
    case 'multipleChoice':
    case 'fillBlank':
      return step.options[step.correctIndex] ?? '';
    case 'trueFalse':
      return step.answer ? labels.yes : labels.no;
    case 'order':
      return step.items.join(' → ');
    case 'promptFix':
      return step.sampleAnswer;
  }
}

export function filterProfiles(profiles: AdminProfile[], query: string): AdminProfile[] {
  const q = query.trim().toLowerCase();
  if (!q) return profiles;
  return profiles.filter(
    (p) => p.displayName.toLowerCase().includes(q) || (p.email ?? '').toLowerCase().includes(q),
  );
}
