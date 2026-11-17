import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { nextRate, type NarrationRate } from './narration';

interface AudioSettings {
  rate: NarrationRate;
  /** A fine pagina passa da solo alla successiva continuando a leggere. */
  autoAdvance: boolean;
  cycleRate: () => void;
}

export const useAudioSettings = create<AudioSettings>()(
  persist(
    (set, get) => ({
      rate: 1,
      autoAdvance: true,
      cycleRate: () => set({ rate: nextRate(get().rate) }),
    }),
    {
      name: 'ai-academy-audio',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ rate: state.rate, autoAdvance: state.autoAdvance }),
    },
  ),
);
