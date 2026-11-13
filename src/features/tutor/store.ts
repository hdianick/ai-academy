/**
 * Conversazione con il Tutor. In modalità demo resta solo in memoria (non viene salvata).
 */
import { create } from 'zustand';

import i18n from '@/core/i18n';
import { tutorKnowledge } from '@/data/content/tutor-knowledge';
import { coursesRepository } from '@/data/repositories/courses';
import { toolsRepository } from '@/data/repositories/tools';

import { createDemoTutor } from './demoTutor';
import type { TutorMessage, TutorProvider } from './types';

// Punto unico in cui scegliere il provider: in futuro, con un backend configurato,
// qui verrà creato il provider remoto (chiamata a una funzione lato server).
export const tutorProvider: TutorProvider = createDemoTutor({
  knowledge: tutorKnowledge,
  courses: coursesRepository.list(),
  tools: toolsRepository.list(),
});

interface TutorState {
  messages: TutorMessage[];
  pending: boolean;
  send: (question: string) => Promise<void>;
  clear: () => void;
}

let counter = 0;
const nextId = () => `m${Date.now()}-${counter++}`;

export const useTutorStore = create<TutorState>()((set, get) => ({
  messages: [],
  pending: false,

  send: async (question) => {
    const text = question.trim();
    if (!text || get().pending) return;
    const userMessage: TutorMessage = { id: nextId(), role: 'user', text };
    set((state) => ({ messages: [...state.messages, userMessage], pending: true }));
    try {
      const reply = await tutorProvider.ask(text, get().messages);
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: nextId(),
            role: 'tutor',
            text: reply.text,
            links: reply.links,
            followUps: reply.followUps,
            isFallback: reply.isFallback,
          },
        ],
      }));
    } catch {
      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: nextId(),
            role: 'tutor',
            text: i18n.t('common.errorDescription'),
            isFallback: true,
          },
        ],
      }));
    } finally {
      set({ pending: false });
    }
  },

  clear: () => set({ messages: [], pending: false }),
}));
