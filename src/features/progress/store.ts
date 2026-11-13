/**
 * Store dei progressi in MODALITÀ DEMO: salvato solo sul dispositivo (AsyncStorage / localStorage).
 * Con Supabase attivo (Fase 7) verrà sincronizzato con il backend tramite un repository.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { coursesRepository } from '@/data/repositories/courses';
import { applyActivity, type Reward } from '@/features/gamification/rewards';
import { toDateKey } from '@/features/gamification/streak';
import { dailyChallengeXp } from '@/features/practice/challenges';

import { emptyProgress, quizXpAward, type ProgressState } from './progress';

interface ProgressActions {
  completeLesson: (input: { courseId: string; lessonId: string; xp: number }) => Reward;
  recordQuiz: (input: {
    courseId: string;
    quizId: string;
    score: number;
    passed: boolean;
    xp: number;
  }) => Reward;
  completePractice: (input: { practiceId: string; score: number; xp: number }) => Reward;
  completeDailyChallenge: (input: { dateKey: string; correct: number; total: number }) => Reward;
  claimWeekly: (input: { claimKey: string; xp: number }) => Reward | null;
  setDailyGoal: (xp: number) => void;
  reset: () => void;
}

export type ProgressStore = ProgressState & ProgressActions;

const stateKeys = Object.keys(emptyProgress) as (keyof ProgressState)[];

/** Estrae solo i dati (senza le azioni) dallo store. */
export function pickState(store: ProgressState): ProgressState {
  return Object.fromEntries(stateKeys.map((key) => [key, store[key]])) as unknown as ProgressState;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set, get) => {
      /** Registra l'attività, applica le ricompense e restituisce il riepilogo. */
      const commit = (
        update: (state: ProgressState, nowIso: string) => ProgressState,
        xp: number,
      ): Reward => {
        const now = new Date();
        const nowIso = now.toISOString();
        const before = pickState(get());
        const { state, reward } = applyActivity({
          before,
          after: update(before, nowIso),
          xp,
          today: toDateKey(now),
          nowIso,
          courses: coursesRepository.list(),
        });
        set(state);
        return reward;
      };

      return {
        ...emptyProgress,

        completeLesson: ({ courseId, lessonId, xp }) => {
          const alreadyDone = Boolean(get().lessons[lessonId]);
          return commit(
            (state, nowIso) => ({
              ...state,
              lessons: alreadyDone
                ? state.lessons
                : { ...state.lessons, [lessonId]: { completedAt: nowIso } },
              lastActivity: { courseId, at: nowIso },
            }),
            alreadyDone ? 0 : xp,
          );
        },

        recordQuiz: ({ courseId, quizId, score, passed, xp }) => {
          const previous = get().quizzes[quizId];
          return commit(
            (state, nowIso) => ({
              ...state,
              quizzes: {
                ...state.quizzes,
                [quizId]: {
                  bestScore: Math.max(previous?.bestScore ?? 0, score),
                  passed: Boolean(previous?.passed) || passed,
                  lastAttemptAt: nowIso,
                },
              },
              perfectQuizzes:
                score >= 1 ? { ...state.perfectQuizzes, [quizId]: true } : state.perfectQuizzes,
              lastActivity: { courseId, at: nowIso },
            }),
            quizXpAward(previous, passed, xp),
          );
        },

        completePractice: ({ practiceId, score, xp }) => {
          const previous = get().practice[practiceId];
          return commit(
            (state, nowIso) => ({
              ...state,
              practice: {
                ...state.practice,
                [practiceId]: {
                  completedAt: previous?.completedAt ?? nowIso,
                  bestScore: Math.max(previous?.bestScore ?? 0, score),
                },
              },
            }),
            previous ? 0 : xp,
          );
        },

        completeDailyChallenge: ({ dateKey, correct, total }) => {
          const alreadyDone = Boolean(get().dailyChallenges[dateKey]);
          return commit(
            (state, nowIso) => ({
              ...state,
              dailyChallenges: alreadyDone
                ? state.dailyChallenges
                : {
                    ...state.dailyChallenges,
                    [dateKey]: { score: total ? correct / total : 0, completedAt: nowIso },
                  },
            }),
            dailyChallengeXp(correct, alreadyDone),
          );
        },

        claimWeekly: ({ claimKey, xp }) => {
          if (get().weeklyClaims[claimKey]) return null;
          return commit(
            (state, nowIso) => ({
              ...state,
              weeklyClaims: { ...state.weeklyClaims, [claimKey]: nowIso },
            }),
            xp,
          );
        },

        setDailyGoal: (dailyGoal) => set({ dailyGoal }),

        reset: () => set({ ...emptyProgress }),
      };
    },
    {
      name: 'ai-academy/progress',
      version: 3,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (store) => pickState(store),
      // v1 → v2: gamification; v2 → v3: Practice Lab e sfide. I campi mancanti prendono i valori predefiniti.
      migrate: (persisted) => ({ ...emptyProgress, ...(persisted as Partial<ProgressState>) }),
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<ProgressState>),
      }),
    },
  ),
);
