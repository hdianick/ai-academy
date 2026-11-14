/**
 * Client Supabase. Esiste solo se le variabili d'ambiente sono configurate:
 * in modalità demo vale `null` e l'app non effettua chiamate di rete.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

import { appConfig } from '@/core/config/env';

function createSupabase(): SupabaseClient | null {
  if (!appConfig.supabase) return null;
  const isWeb = Platform.OS === 'web';
  return createClient(appConfig.supabase.url, appConfig.supabase.anonKey, {
    auth: {
      // Su web la sessione usa il localStorage del browser; su mobile AsyncStorage.
      ...(isWeb ? {} : { storage: AsyncStorage }),
      autoRefreshToken: true,
      persistSession: true,
      // Su web serve per completare i link di recupero password.
      detectSessionInUrl: isWeb,
    },
  });
}

export const supabase = createSupabase();

// Su mobile il rinnovo automatico del token va sospeso in background e ripreso al ritorno.
if (supabase && Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') void supabase.auth.startAutoRefresh();
    else void supabase.auth.stopAutoRefresh();
  });
}
