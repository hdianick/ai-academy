/**
 * Stato dell'account.
 * - Modalità demo (nessun Supabase): status "demo", nessuna chiamata di rete.
 * - Con Supabase: registrazione, accesso, recupero password e sincronizzazione dei progressi.
 */
import type { Session } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { Platform } from 'react-native';
import { create } from 'zustand';

import { supabase } from '@/core/supabase/client';
import type { PlanTier } from '@/features/courses/types';
import { mergeProgress } from '@/features/progress/merge';
import { emptyProgress, type ProgressState } from '@/features/progress/progress';
import { pickState, useProgressStore } from '@/features/progress/store';

import { mapAuthError, type AuthServiceErrorKey } from './errors';

export type AppRole = 'user' | 'editor' | 'admin';

export interface Profile {
  id: string;
  displayName: string;
  role: AppRole;
  plan: PlanTier;
}

export type AuthStatus = 'demo' | 'loading' | 'signedOut' | 'signedIn';

type Result = { ok: true } | { ok: false; error: AuthServiceErrorKey };

interface AuthState {
  status: AuthStatus;
  email: string | null;
  profile: Profile | null;
  init: () => void;
  signIn: (email: string, password: string) => Promise<Result>;
  signUp: (input: {
    email: string;
    password: string;
    displayName: string;
  }) => Promise<Result & { needsConfirmation?: boolean }>;
  resetPassword: (email: string) => Promise<Result>;
  updatePassword: (password: string) => Promise<Result>;
  signOut: () => Promise<void>;
  /** Ricarica ruolo e piano (es. dopo una modifica dall'area admin). */
  refreshProfile: () => Promise<void>;
}

/** Indirizzo a cui Supabase rimanda dopo la conferma email o il recupero password (solo web). */
function authRedirectUrl(path = ''): string | undefined {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return undefined;
  const baseUrl = Constants.expoConfig?.experiments?.baseUrl ?? '';
  return `${window.location.origin}${baseUrl}/${path}`;
}

let initialized = false;
let unsubscribeProgress: (() => void) | null = null;
let uploadTimer: ReturnType<typeof setTimeout> | null = null;

async function loadProfile(userId: string): Promise<Profile | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name, role, plan')
    .eq('id', userId)
    .maybeSingle();
  if (error || !data) return null;
  return {
    id: data.id as string,
    displayName: (data.display_name as string | null) ?? '',
    role: data.role as AppRole,
    plan: data.plan as PlanTier,
  };
}

async function uploadProgress(userId: string, state: ProgressState) {
  if (!supabase) return;
  await supabase
    .from('user_progress')
    .upsert({ user_id: userId, data: state, schema_version: 3 }, { onConflict: 'user_id' });
}

/** Scarica i progressi online, li unisce a quelli locali e da qui in poi salva le modifiche. */
async function startProgressSync(userId: string) {
  if (!supabase) return;
  const { data } = await supabase
    .from('user_progress')
    .select('data')
    .eq('user_id', userId)
    .maybeSingle();

  const merged = mergeProgress(pickState(useProgressStore.getState()), data?.data ?? null);
  useProgressStore.setState(merged);
  await uploadProgress(userId, merged);

  unsubscribeProgress?.();
  unsubscribeProgress = useProgressStore.subscribe((state) => {
    if (uploadTimer) clearTimeout(uploadTimer);
    uploadTimer = setTimeout(() => void uploadProgress(userId, pickState(state)), 1500);
  });
}

function stopProgressSync() {
  unsubscribeProgress?.();
  unsubscribeProgress = null;
  if (uploadTimer) clearTimeout(uploadTimer);
  uploadTimer = null;
}

export const useAuthStore = create<AuthState>()((set, get) => {
  const applySession = async (session: Session | null) => {
    if (!session) {
      stopProgressSync();
      set({ status: 'signedOut', email: null, profile: null });
      return;
    }
    const profile = await loadProfile(session.user.id);
    set({ status: 'signedIn', email: session.user.email ?? null, profile });
    await startProgressSync(session.user.id);
  };

  return {
    status: supabase ? 'loading' : 'demo',
    email: null,
    profile: null,

    init: () => {
      if (initialized || !supabase) return;
      initialized = true;
      void supabase.auth.getSession().then(({ data }) => applySession(data.session));
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'PASSWORD_RECOVERY') {
          setTimeout(() => {
            void applySession(session);
            router.replace('/update-password');
          }, 0);
          return;
        }
        if (event === 'SIGNED_IN' || event === 'SIGNED_OUT' || event === 'USER_UPDATED') {
          // Rimandato per non eseguire chiamate dentro il callback di Supabase.
          setTimeout(() => void applySession(session), 0);
        }
      });
    },

    signIn: async (email, password) => {
      if (!supabase) return { ok: false, error: 'auth.errors.unknown' };
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      return error ? { ok: false, error: mapAuthError(error) } : { ok: true };
    },

    signUp: async ({ email, password, displayName }) => {
      if (!supabase) return { ok: false, error: 'auth.errors.unknown' };
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { display_name: displayName }, emailRedirectTo: authRedirectUrl() },
      });
      if (error) return { ok: false, error: mapAuthError(error) };
      // Senza sessione significa che è richiesta la conferma via email.
      return { ok: true, needsConfirmation: !data.session };
    },

    resetPassword: async (email) => {
      if (!supabase) return { ok: false, error: 'auth.errors.unknown' };
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: authRedirectUrl('update-password'),
      });
      return error ? { ok: false, error: mapAuthError(error) } : { ok: true };
    },

    refreshProfile: async () => {
      const id = get().profile?.id;
      if (!id) return;
      const profile = await loadProfile(id);
      if (profile) set({ profile });
    },

    updatePassword: async (password) => {
      if (!supabase) return { ok: false, error: 'auth.errors.unknown' };
      const { error } = await supabase.auth.updateUser({ password });
      return error ? { ok: false, error: mapAuthError(error) } : { ok: true };
    },

    signOut: async () => {
      if (!supabase) return;
      stopProgressSync();
      await supabase.auth.signOut();
      // I progressi di questo account non restano sul dispositivo dopo l'uscita.
      useProgressStore.setState({ ...emptyProgress });
    },
  };
});
