import { getLocales } from 'expo-localization';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from '@/locales/en';
import { it } from '@/locales/it';

export const supportedLanguages = ['it', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
export const defaultLanguage: SupportedLanguage = 'it';

export const resources = {
  it: { translation: it },
  en: { translation: en },
} as const;

export function isSupportedLanguage(value: string | null | undefined): value is SupportedLanguage {
  return supportedLanguages.includes(value as SupportedLanguage);
}

/** Lingua del dispositivo se supportata, altrimenti italiano. */
export function detectLanguage(): SupportedLanguage {
  const deviceLanguage = getLocales()[0]?.languageCode;
  return isSupportedLanguage(deviceLanguage) ? deviceLanguage : defaultLanguage;
}

const i18n = createInstance();

void i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(),
  fallbackLng: defaultLanguage,
  interpolation: { escapeValue: false },
});

export default i18n;
