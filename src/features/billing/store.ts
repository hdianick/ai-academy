/**
 * Richiesta di abbonamento dell'utente (in attesa dei pagamenti veri).
 * Con un account si salva nel database; in modalità demo resta su questo dispositivo.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { useAuthStore } from '@/features/auth/store';

import {
  cancelSubscriptionRequest,
  getMySubscriptionRequest,
  saveSubscriptionRequest,
} from './api';
import type { BillingPeriod, PaidPlan } from './plans';

export interface LocalRequest {
  plan: PaidPlan;
  period: BillingPeriod;
  requestedAt: string;
}

interface BillingState {
  request: LocalRequest | null;
  /** Salva la richiesta; restituisce false se non è stato possibile registrarla online. */
  requestPlan: (plan: PaidPlan, period: BillingPeriod) => Promise<boolean>;
  cancel: () => Promise<boolean>;
  /** Allinea la richiesta con quella salvata nell'account. */
  sync: () => Promise<void>;
}

export const useBillingStore = create<BillingState>()(
  persist(
    (set) => ({
      request: null,
      requestPlan: async (plan, period) => {
        const auth = useAuthStore.getState();
        if (auth.status === 'signedIn' && auth.profile) {
          try {
            await saveSubscriptionRequest(auth.profile.id, plan, period);
          } catch {
            return false;
          }
        }
        set({ request: { plan, period, requestedAt: new Date().toISOString() } });
        return true;
      },
      cancel: async () => {
        const auth = useAuthStore.getState();
        if (auth.status === 'signedIn' && auth.profile) {
          try {
            await cancelSubscriptionRequest(auth.profile.id);
          } catch {
            return false;
          }
        }
        set({ request: null });
        return true;
      },
      sync: async () => {
        const auth = useAuthStore.getState();
        if (auth.status !== 'signedIn' || !auth.profile) return;
        try {
          const remote = await getMySubscriptionRequest(auth.profile.id);
          set({
            request: remote
              ? { plan: remote.plan, period: remote.period, requestedAt: remote.createdAt }
              : null,
          });
        } catch {
          // Offline: resta la copia locale.
        }
      },
    }),
    {
      name: 'ai-academy-billing',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ request: state.request }),
    },
  ),
);

// All'uscita dall'account la prenotazione locale viene dimenticata (dispositivi condivisi).
useAuthStore.subscribe((state, previous) => {
  if (previous.status === 'signedIn' && state.status !== 'signedIn')
    useBillingStore.setState({ request: null });
});
