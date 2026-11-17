import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { create } from 'zustand';

import {
  CHECK_INTERVAL_MS,
  currentVersion,
  isNewVersion,
  isSafeToReload,
  shouldAutoReload,
  versionUrl,
} from './updates';

interface UpdateState {
  available: boolean;
  /** Avvia i controlli periodici (solo web pubblicato). */
  start: () => void;
  apply: () => void;
}

let started = false;
const TRIED_KEY = 'ai-academy:reload-tried';

function readTried(): string | null {
  try {
    return window.sessionStorage.getItem(TRIED_KEY);
  } catch {
    return null;
  }
}

function markTried(version: string) {
  try {
    window.sessionStorage.setItem(TRIED_KEY, version);
  } catch {
    // Storage non disponibile: nessun problema, si mostrerà l'avviso.
  }
}

function reload() {
  if (typeof window !== 'undefined') window.location.reload();
}

export const useUpdateStore = create<UpdateState>()((set, get) => {
  const check = async (autoApply: boolean) => {
    try {
      const url = versionUrl(
        window.location.origin,
        Constants.expoConfig?.experiments?.baseUrl ?? '',
      );
      const response = await fetch(`${url}?t=${Date.now()}`, { cache: 'no-store' });
      if (!response.ok) return;
      const body = (await response.json()) as { version?: unknown };
      if (!isNewVersion(currentVersion, body.version)) return;
      const remote = String(body.version).trim();
      if (
        autoApply &&
        isSafeToReload(window.location.pathname) &&
        shouldAutoReload(remote, readTried())
      ) {
        markTried(remote);
        reload();
      } else set({ available: true });
    } catch {
      // Offline o file non raggiungibile: si riprova al prossimo controllo.
    }
  };

  return {
    available: false,
    start: () => {
      if (started || Platform.OS !== 'web' || typeof window === 'undefined' || !currentVersion)
        return;
      started = true;
      void check(true);
      setInterval(() => void check(false), CHECK_INTERVAL_MS);
      // Quando l'utente torna sull'app (tab o icona sulla Home) si aggiorna subito se possibile.
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') void check(true);
      });
    },
    apply: () => {
      if (get().available) reload();
    },
  };
});
