/**
 * Configurazione runtime.
 *
 * L'app funziona in due modalità:
 * - `demo`: nessun backend configurato, dati e progressi salvati solo sul dispositivo.
 * - `supabase`: autenticazione e dati reali su Supabase.
 *
 * La modalità si decide SOLO dalle variabili d'ambiente: nessuna credenziale nel codice.
 */

export type AppMode = 'demo' | 'supabase';

export interface AppConfig {
  mode: AppMode;
  supabase: { url: string; anonKey: string } | null;
}

export interface RawEnv {
  EXPO_PUBLIC_SUPABASE_URL?: string;
  /** Nome attuale della chiave client di Supabase. */
  EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
  /** Nome storico della stessa chiave (progetti meno recenti). */
  EXPO_PUBLIC_SUPABASE_ANON_KEY?: string;
}

function isValidHttpsUrl(value: string): boolean {
  return /^https:\/\/[^\s/$.?#].[^\s]*$/i.test(value);
}

export function resolveConfig(env: RawEnv): AppConfig {
  const url = env.EXPO_PUBLIC_SUPABASE_URL?.trim() ?? '';
  const anonKey = (
    env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
    ''
  ).trim();

  if (url && anonKey && isValidHttpsUrl(url)) {
    return { mode: 'supabase', supabase: { url, anonKey } };
  }

  if ((url || anonKey) && __DEV__) {
    console.warn(
      '[config] Configurazione Supabase incompleta o non valida: avvio in modalità demo.',
    );
  }

  return { mode: 'demo', supabase: null };
}

// Expo sostituisce staticamente solo gli accessi diretti `process.env.EXPO_PUBLIC_*`.
export const appConfig: AppConfig = resolveConfig({
  EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
});

export const isDemoMode = appConfig.mode === 'demo';
