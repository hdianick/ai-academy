/**
 * Repository dei corsi.
 * In modalità demo i corsi arrivano dai contenuti locali; con Supabase (Fase 7)
 * questa interfaccia avrà un'implementazione remota, senza cambiare le schermate.
 */
import { content } from '@/data/content/registry';
import { findLesson, findQuiz } from '@/features/courses/catalog';
import type { Course } from '@/features/courses/types';

export interface CoursesRepository {
  list(): Course[];
  get(courseId: string): Course | null;
  findLesson: (lessonId: string) => ReturnType<typeof findLesson>;
  findQuiz: (quizId: string) => ReturnType<typeof findQuiz>;
}

/** Corsi nella lingua attiva dell'app (stessi id in tutte le lingue). */
export const localCoursesRepository: CoursesRepository = {
  list: () => content().courses,
  get: (courseId) => content().courses.find((course) => course.id === courseId) ?? null,
  findLesson: (lessonId) => findLesson(content().courses, lessonId),
  findQuiz: (quizId) => findQuiz(content().courses, quizId),
};

export const coursesRepository: CoursesRepository = localCoursesRepository;
