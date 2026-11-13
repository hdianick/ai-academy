import type { Course, CourseCategory, CourseLevel, Lesson, Quiz } from './types';

export interface CourseFilters {
  query?: string;
  category?: CourseCategory | null;
  level?: CourseLevel | null;
  tool?: string | null;
}

function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

/** Filtra i corsi per testo libero, categoria, livello e strumento. */
export function filterCourses(courses: Course[], filters: CourseFilters): Course[] {
  const words = normalize(filters.query ?? '')
    .split(/\s+/)
    .filter(Boolean);

  return courses.filter((course) => {
    if (filters.category && course.category !== filters.category) return false;
    if (filters.level && course.level !== filters.level) return false;
    if (filters.tool && !course.tools.includes(filters.tool)) return false;
    if (words.length === 0) return true;

    const haystack = normalize(
      [course.title, course.subtitle, course.description, ...course.tools].join(' '),
    );
    return words.every((word) => haystack.includes(word));
  });
}

export function allTools(courses: Course[]): string[] {
  return [...new Set(courses.flatMap((course) => course.tools))].sort((a, b) => a.localeCompare(b));
}

export function courseLessons(course: Course): Lesson[] {
  return course.modules.flatMap((module) => module.lessons);
}

export function courseQuizzes(course: Course): Quiz[] {
  return [...course.modules.map((module) => module.quiz), course.finalTest];
}

export function courseDurationMinutes(course: Course): number {
  const lessonMinutes = courseLessons(course).reduce((sum, l) => sum + l.estimatedMinutes, 0);
  // Stima: ~40 secondi per domanda di quiz.
  const quizMinutes = courseQuizzes(course).reduce(
    (sum, quiz) => sum + Math.ceil((quiz.questions.length * 40) / 60),
    0,
  );
  return lessonMinutes + quizMinutes;
}

export interface LessonLocation {
  course: Course;
  moduleIndex: number;
  lessonIndex: number;
  lesson: Lesson;
}

export function findLesson(courses: Course[], lessonId: string): LessonLocation | null {
  for (const course of courses) {
    for (const [moduleIndex, module] of course.modules.entries()) {
      for (const [lessonIndex, lesson] of module.lessons.entries()) {
        if (lesson.id === lessonId) return { course, moduleIndex, lessonIndex, lesson };
      }
    }
  }
  return null;
}

export function findQuiz(courses: Course[], quizId: string): { course: Course; quiz: Quiz } | null {
  for (const course of courses) {
    const quiz = courseQuizzes(course).find((q) => q.id === quizId);
    if (quiz) return { course, quiz };
  }
  return null;
}

/** Attività successiva dopo una lezione: prossima lezione del modulo, oppure il quiz del modulo. */
export function nextActivityAfterLesson(
  course: Course,
  lessonId: string,
): { kind: 'lesson'; id: string } | { kind: 'quiz'; id: string } | null {
  for (const module of course.modules) {
    const index = module.lessons.findIndex((lesson) => lesson.id === lessonId);
    if (index === -1) continue;
    const next = module.lessons[index + 1];
    return next ? { kind: 'lesson', id: next.id } : { kind: 'quiz', id: module.quiz.id };
  }
  return null;
}
