/**
 * Repository dei corsi.
 * In modalità demo i corsi arrivano dai contenuti locali; con Supabase (Fase 7)
 * questa interfaccia avrà un'implementazione remota, senza cambiare le schermate.
 */
import { demoCourses } from '@/data/content/courses';
import { findLesson, findQuiz } from '@/features/courses/catalog';
import type { Course } from '@/features/courses/types';

export interface CoursesRepository {
  list(): Course[];
  get(courseId: string): Course | null;
  findLesson: (lessonId: string) => ReturnType<typeof findLesson>;
  findQuiz: (quizId: string) => ReturnType<typeof findQuiz>;
}

export const localCoursesRepository: CoursesRepository = {
  list: () => demoCourses,
  get: (courseId) => demoCourses.find((course) => course.id === courseId) ?? null,
  findLesson: (lessonId) => findLesson(demoCourses, lessonId),
  findQuiz: (quizId) => findQuiz(demoCourses, quizId),
};

export const coursesRepository: CoursesRepository = localCoursesRepository;
