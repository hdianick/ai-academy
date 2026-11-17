/**
 * Conversazione con il Tutor. In modalità demo resta solo in memoria (non viene salvata).
 */
import { create } from 'zustand';

import i18n from '@/core/i18n';
import { content, contentLanguage } from '@/data/content/registry';

import { createDemoTutor } from './demoTutor';
import type { TutorMessage, TutorProvider } from './types';

// Punto unico in cui scegliere il provider: in futuro, con un backend configurato,
// qui verrà creato il provider remoto (chiamata a una funzione lato server).
const providers = new Map<string, TutorProvider>();

/** Tutor nella lingua attiva dell'app (uno per lingua, creato al primo uso). */
export function getTutorProvider(): TutorProvider {
  const language = contentLanguage();
  let provider = providers.get(language);
  if (!provider) {
    const bundle = content();
    provider = createDemoTutor({
      knowledge: bundle.tutor.knowledge,
      courses: bundle.courses,
      tools: bundle.tools,
      stopWords: bundle.tutor.stopWords,
    });
    providers.set(language, provider);
  }
  return provider;
}

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
      const reply = await getTutorProvider().ask(text, get().messages);
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
