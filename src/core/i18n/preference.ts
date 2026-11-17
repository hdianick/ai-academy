/**
 * Lingua scelta dall'utente: salvata sul dispositivo (e, con un account, nel profilo).
 * Senza una scelta si usa la lingua del dispositivo.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

import i18n, { isSupportedLanguage, type SupportedLanguage } from './index';

const STORAGE_KEY = 'ai-academy-language';

function syncDocumentLanguage(language: string) {
  if (Platform.OS === 'web' && typeof document !== 'undefined')
    document.documentElement.lang = language;
}

/** Applica la lingua salvata (da chiamare all'avvio). */
export async function loadLanguagePreference(): Promise<void> {
  try {
    const saved = await AsyncStorage.getItem(STORAGE_KEY);
    if (isSupportedLanguage(saved) && saved !== i18n.language) await i18n.changeLanguage(saved);
  } catch {
    // Nessuna preferenza leggibile: resta la lingua del dispositivo.
  }
  syncDocumentLanguage(i18n.language);
}

export async function setAppLanguage(language: SupportedLanguage): Promise<void> {
  await i18n.changeLanguage(language);
  syncDocumentLanguage(language);
  try {
    await AsyncStorage.setItem(STORAGE_KEY, language);
  } catch {
    // La lingua resta attiva per questa sessione anche se non si può salvare.
  }
}
