import { demoCourses } from '@/data/content/courses';
import { courseLessons } from '@/features/courses/catalog';

import { cleanForSpeech, formatRate, nextRate, splitIntoChunks, theoryScript } from '../narration';

const labels = { tip: 'Consiglio', example: 'Esempio' };

describe('narration', () => {
  it('removes symbols that sound bad when read aloud', () => {
    expect(cleanForSpeech('Scrivi “ciao”… vedi https://x.it **ora**')).toBe(
      'Scrivi ciao. vedi ora',
    );
    expect(cleanForSpeech('Bozza → revisione')).toBe('Bozza, revisione');
  });

  it('splits text into short chunks without losing words', () => {
    const text = 'Prima frase breve. '.repeat(30) + 'Fine!';
    const chunks = splitIntoChunks(text, 100);
    expect(chunks.every((c) => c.length <= 100)).toBe(true);
    expect(chunks.join(' ').replace(/\s+/g, ' ')).toBe(cleanForSpeech(text));
  });

  it('breaks very long sentences', () => {
    const long = Array.from({ length: 80 }, (_, i) => `parola${i}`).join(' ');
    const chunks = splitIntoChunks(long, 120);
    expect(chunks.length).toBeGreaterThan(1);
    expect(chunks.every((c) => c.length <= 120)).toBe(true);
    expect(chunks.join(' ')).toBe(long);
  });

  it('reads title, paragraphs, tip and example of every theory page', () => {
    for (const course of demoCourses) {
      for (const lesson of courseLessons(course)) {
        for (const page of lesson.theory) {
          const script = theoryScript(page, labels);
          expect(script.length).toBeGreaterThan(0);
          expect(script[0]).toContain(cleanForSpeech(page.title));
          if (page.tip) expect(script.some((c) => c.startsWith('Consiglio'))).toBe(true);
          expect(script.every((c) => c.length <= 220)).toBe(true);
        }
      }
    }
  });

  it('cycles the speed', () => {
    expect(nextRate(1)).toBe(1.15);
    expect(nextRate(1.3)).toBe(0.85);
    expect(nextRate(7)).toBe(0.85);
    expect(formatRate(1.15)).toBe('1,15×');
  });
});
