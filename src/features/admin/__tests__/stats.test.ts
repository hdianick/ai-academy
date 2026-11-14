import { demoCourses } from '@/data/content/courses';
import { courseLessons } from '@/features/courses/catalog';

import { computeStats, contentStats, filterProfiles, questionAnswer, questionText } from '../stats';
import type { AdminProfile, ProgressRow } from '../types';

const now = new Date('2026-11-14T12:00:00Z');

const profiles: AdminProfile[] = [
  {
    id: 'a',
    displayName: 'Nicolò',
    email: 'n@example.com',
    role: 'admin',
    plan: 'pro',
    createdAt: '2026-11-14T09:00:00Z',
  },
  {
    id: 'b',
    displayName: 'Giulia',
    email: 'g@example.com',
    role: 'user',
    plan: 'free',
    createdAt: '2026-10-01T09:00:00Z',
  },
  {
    id: 'c',
    displayName: 'Marco',
    email: null,
    role: 'editor',
    plan: 'premium',
    createdAt: '2026-11-10T09:00:00Z',
  },
];

const firstCourse = demoCourses[0]!;
const firstLesson = courseLessons(firstCourse)[0]!;

const progress: ProgressRow[] = [
  {
    userId: 'a',
    updatedAt: '2026-11-14T10:00:00Z',
    data: {
      xp: 120,
      lessons: { [firstLesson.id]: { completedAt: '2026-11-14T10:00:00Z' } },
      quizzes: { q1: { bestScore: 1, passed: true, lastAttemptAt: '2026-11-14T10:00:00Z' } },
      dailyXp: { '2026-11-14': 120 },
    },
  },
  {
    userId: 'b',
    updatedAt: '2026-10-02T10:00:00Z',
    data: { xp: 30, dailyXp: { '2026-10-02': 30 } },
  },
  { userId: 'c', updatedAt: '2026-11-10T10:00:00Z', data: null },
];

describe('computeStats', () => {
  const stats = computeStats(profiles, progress, demoCourses, now);

  it('counts users, plans and roles', () => {
    expect(stats.totalUsers).toBe(3);
    expect(stats.newUsers7d).toBe(2);
    expect(stats.byPlan).toEqual({ free: 1, premium: 1, pro: 1 });
    expect(stats.byRole).toEqual({ user: 1, editor: 1, admin: 1 });
  });

  it('aggregates learning activity', () => {
    expect(stats.activeUsers7d).toBe(1);
    expect(stats.totalXp).toBe(150);
    expect(stats.averageXp).toBe(50);
    expect(stats.lessonsCompleted).toBe(1);
    expect(stats.quizzesPassed).toBe(1);
  });

  it('ranks courses by learners who started them', () => {
    expect(stats.courses[0]).toMatchObject({ courseId: firstCourse.id, started: 1, completed: 0 });
    expect(stats.courses).toHaveLength(demoCourses.length);
  });

  it('handles an empty database', () => {
    const empty = computeStats([], [], demoCourses, now);
    expect(empty.totalUsers).toBe(0);
    expect(empty.averageXp).toBe(0);
  });
});

describe('contentStats', () => {
  it('counts lessons, theory pages and questions', () => {
    const stats = contentStats(firstCourse);
    expect(stats.lessons).toBe(courseLessons(firstCourse).length);
    expect(stats.quizzes).toBe(firstCourse.modules.length + 1);
    expect(stats.theoryPages).toBeGreaterThan(stats.lessons);
    const typed = Object.values(stats.byType).reduce((a, b) => a + (b ?? 0), 0);
    expect(typed).toBe(stats.lessonQuestions + stats.quizQuestions);
  });
});

describe('question helpers', () => {
  it('returns a readable text and answer for every question', () => {
    for (const lesson of courseLessons(firstCourse)) {
      for (const question of lesson.questions) {
        expect(questionText(question).length).toBeGreaterThan(0);
        expect(questionAnswer(question, { yes: 'Vero', no: 'Falso' }).length).toBeGreaterThan(0);
      }
    }
  });
});

describe('filterProfiles', () => {
  it('searches by name or email', () => {
    expect(filterProfiles(profiles, 'giu').map((p) => p.id)).toEqual(['b']);
    expect(filterProfiles(profiles, 'N@EXAMPLE').map((p) => p.id)).toEqual(['a']);
    expect(filterProfiles(profiles, '  ')).toHaveLength(3);
  });
});
