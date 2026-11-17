import * as Speech from 'expo-speech';
import { Platform } from 'react-native';

import { NARRATION_LANGUAGE } from './narration';

/** Ogni nuova lettura annulla la precedente: i callback "vecchi" vengono ignorati. */
let token = 0;

export function isSpeechSupported(): boolean {
  if (Platform.OS !== 'web') return true;
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

/** true/false se il dispositivo ha (o no) una voce italiana; null se non si può sapere. */
export async function hasItalianVoice(): Promise<boolean | null> {
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    if (voices.length === 0) return null;
    return voices.some((voice) => voice.language.toLowerCase().startsWith('it'));
  } catch {
    return null;
  }
}

export function speakChunks(
  chunks: string[],
  options: { rate: number; onDone: () => void; onError?: () => void },
) {
  const mine = ++token;
  void Speech.stop();
  const next = (index: number) => {
    if (mine !== token) return;
    const text = chunks[index];
    if (text === undefined) {
      options.onDone();
      return;
    }
    Speech.speak(text, {
      language: NARRATION_LANGUAGE,
      rate: options.rate,
      onDone: () => next(index + 1),
      onError: () => {
        if (mine === token) options.onError?.();
      },
    });
  };
  next(0);
}

export function stopSpeaking() {
  token++;
  void Speech.stop();
}
