/**
 * Lettura ad alta voce della teoria con la sintesi vocale del dispositivo.
 * Funzioni pure: cosa leggere e come dividerlo in pezzi brevi (alcuni browser
 * interrompono le frasi troppo lunghe).
 */
import type { TheoryStep } from '@/features/courses/types';

/** I contenuti dei corsi sono in italiano. */
export const NARRATION_LANGUAGE = 'it-IT';

export const narrationRates = [0.85, 1, 1.15, 1.3] as const;
export type NarrationRate = (typeof narrationRates)[number];

export function nextRate(rate: number): NarrationRate {
  const index = narrationRates.findIndex((r) => r === rate);
  return narrationRates[(index + 1) % narrationRates.length] ?? 1;
}

export function formatRate(rate: number): string {
  return `${String(rate).replace('.', ',')}×`;
}

const MAX_CHUNK = 220;

/** Toglie simboli che la voce leggerebbe male. */
export function cleanForSpeech(text: string): string {
  return text
    .replace(/[“”«»"]/g, '')
    .replace(/[…]/g, '.')
    .replace(/\s*[→>]\s*/g, ', poi ')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/[*_#`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Divide un testo in frasi, poi le raggruppa in pezzi brevi. */
export function splitIntoChunks(text: string, max = MAX_CHUNK): string[] {
  const clean = cleanForSpeech(text);
  if (!clean) return [];
  const sentences = clean.match(/[^.!?;:]+[.!?;:]*\s*/g) ?? [clean];
  const chunks: string[] = [];
  let current = '';
  for (const raw of sentences) {
    const sentence = raw.trim();
    if (!sentence) continue;
    if (sentence.length > max) {
      if (current) chunks.push(current);
      current = '';
      // Frase lunghissima: si spezza alle virgole o, al limite, a parole.
      let rest = sentence;
      while (rest.length > max) {
        const cut = Math.max(rest.lastIndexOf(',', max), rest.lastIndexOf(' ', max));
        const at = cut > max / 3 ? cut + 1 : max;
        chunks.push(rest.slice(0, at).trim());
        rest = rest.slice(at).trim();
      }
      current = rest;
      continue;
    }
    if ((current + ' ' + sentence).trim().length > max) {
      chunks.push(current);
      current = sentence;
    } else {
      current = (current + ' ' + sentence).trim();
    }
  }
  if (current) chunks.push(current);
  return chunks;
}

/** Testo da leggere per una pagina di teoria: titolo, paragrafi, consiglio ed esempio. */
export function theoryScript(step: TheoryStep, labels: { tip: string; example: string }): string[] {
  const parts = [`${step.title}.`, ...step.paragraphs];
  if (step.tip) parts.push(`${labels.tip}: ${step.tip}`);
  if (step.example) parts.push(`${labels.example}: ${step.example}`);
  return parts.flatMap((part) => splitIntoChunks(part));
}
