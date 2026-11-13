/**
 * Store dei progressi in MODALITÀ DEMO: salvato solo sul dispositivo (AsyncStorage / localStorage).
 * Con Supabase attivo (Fase 7) verrà sincronizzato con il backend tramite un repository.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { emptyProgress, quizXpAward, type ProgressState } from './progress';

interface ProgressActions {
  completeLesson: (input: { courseId: string; lessonId: string; xp: number }) => number;
  recordQuiz: (input: {
    courseId: string;
    quizId: string;
    score: number;
    passed: boolean;
    xp: number;
  }) => number;
  reset: () => void;
}

export type ProgressStore = ProgressState & ProgressActions;

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => ({
      ...emptyProgress,

      /** Restituisce gli XP assegnati (0 se la lezione era già completata). */
      completeLesson: ({ courseId, lessonId, xp }) => {
        const now = new Date().toISOString();
        const alreadyDone = Boolean(get().lessons[lessonId]);
        const awarded = alreadyDone ? 0 : xp;
        set((state) => ({
          lessons: alreadyDone
            ? state.lessons
            : { ...state.lessons, [lessonId]: { completedAt: now } },
          xp: state.xp + awarded,
          lastActivity: { courseId, at: now },
        }));
        return awarded;
      },

      recordQuiz: ({ courseId, quizId, score, passed, xp }) => {
        const now = new Date().toISOString();
        const previous = get().quizzes[quizId];
        const awarded = quizXpAward(previous, passed, xp);
        set((state) => ({
          quizzes: {
            ...state.quizzes,
            [quizId]: {
              bestScore: Math.max(previous?.bestScore ?? 0, score),
              passed: Boolean(previous?.passed) || passed,
              lastAttemptAt: now,
            },
          },
          xp: state.xp + awarded,
          lastActivity: { courseId, at: now },
        }));
        return awarded;
      },

      reset: () => set({ ...emptyProgress }),
    }),
    {
      name: 'ai-academy/progress',
      version: 1,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: ({ lessons, quizzes, xp, lastActivity }) => ({
        lessons,
        quizzes,
        xp,
        lastActivity,
      }),
    },
  ),
);
