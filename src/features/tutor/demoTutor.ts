/**
 * Tutor in MODALITÀ DEMO: nessuna chiamata a modelli AI.
 * Abbina la domanda a una base di conoscenza locale, agli strumenti del catalogo
 * e alle lezioni dei corsi. Quando non sa rispondere lo dice chiaramente.
 */
import { stopWords } from '@/data/content/tutor-knowledge';
import { courseLessons, findLesson } from '@/features/courses/catalog';
import type { Course } from '@/features/courses/types';
import type { AiTool } from '@/features/tools/types';

import type { KnowledgeEntry, TutorLink, TutorProvider, TutorReply } from './types';

export function normalizeText(text: string): string {
  return ` ${text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’'"“”«»?!.,;:()[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()} `;
}

export interface TutorSources {
  knowledge: KnowledgeEntry[];
  courses: Course[];
  tools: AiTool[];
}

/** Voce della base di conoscenza più pertinente: vince chi ha le parole chiave più specifiche. */
export function matchKnowledge(
  question: string,
  knowledge: KnowledgeEntry[],
): { entry: KnowledgeEntry; score: number } | null {
  const q = normalizeText(question);
  let best: { entry: KnowledgeEntry; score: number } | null = null;
  for (const entry of knowledge) {
    const score = entry.keywords
      .map((k) => normalizeText(k).trim())
      .filter((k) => k.length > 0 && q.includes(k))
      .reduce((sum, k) => sum + k.length, 0);
    if (score > 0 && (!best || score > best.score)) best = { entry, score };
  }
  return best;
}

/** Strumento citato nella domanda (il nome più lungo vince: "Claude Code" prima di "Claude"). */
export function matchTool(question: string, tools: AiTool[]): AiTool | null {
  const q = normalizeText(question);
  const sorted = [...tools].sort((a, b) => b.name.length - a.name.length);
  return sorted.find((tool) => q.includes(normalizeText(tool.name))) ?? null;
}

/** Lezione con più parole in comune con la domanda (minimo 2 parole significative). */
export function matchLesson(
  question: string,
  courses: Course[],
): { id: string; title: string } | null {
  const words = normalizeText(question)
    .trim()
    .split(' ')
    .filter((w) => w.length >= 4 && !stopWords.has(w));
  if (words.length === 0) return null;

  let best: { id: string; title: string; score: number } | null = null;
  for (const course of courses) {
    for (const lesson of courseLessons(course)) {
      const text = normalizeText(
        [
          lesson.title,
          lesson.summary,
          ...lesson.theory.flatMap((page) => [page.title, ...page.paragraphs]),
        ].join(' '),
      );
      const score = words.filter((w) => text.includes(` ${w}`)).length;
      if (score >= 2 && (!best || score > best.score))
        best = { id: lesson.id, title: lesson.title, score };
    }
  }
  return best ? { id: best.id, title: best.title } : null;
}

const GREETINGS = ['ciao', 'buongiorno', 'buonasera', 'salve', 'hello', 'hi', 'hey'];

function lessonLink(courses: Course[], lessonId: string | undefined): TutorLink[] {
  if (!lessonId) return [];
  const found = findLesson(courses, lessonId);
  return found ? [{ kind: 'lesson', id: lessonId, title: found.lesson.title }] : [];
}

export function answerQuestion(question: string, sources: TutorSources): TutorReply {
  const q = normalizeText(question).trim();

  if (!q) {
    return { text: '', links: [], followUps: [], isFallback: true };
  }

  if (
    GREETINGS.includes(q) ||
    (q.split(' ').length <= 2 && GREETINGS.some((g) => q.startsWith(g)))
  ) {
    return {
      text: 'Ciao! Sono il Tutor di AI Academy (modalità demo). Chiedimi un concetto dei corsi o uno strumento AI: ti spiego in breve e ti indico la lezione per approfondire.',
      links: [],
      followUps: ['Come scrivo un buon prompt?', 'Cos’è un’allucinazione?', 'A cosa serve n8n?'],
      isFallback: false,
    };
  }

  const concept = matchKnowledge(question, sources.knowledge);
  const tool = matchTool(question, sources.tools);

  // Domanda su uno strumento (a meno che il concetto sia molto specifico, es. "prompt per Midjourney").
  if (tool && (!concept || concept.score < 10)) {
    const example = tool.useCases[0]?.example;
    return {
      text: `${tool.name} (di ${tool.company}): ${tool.tagline.toLowerCase()}. ${tool.description}${
        example ? `\n\nPuoi provare così: “${example}”` : ''
      }\n\nFunzioni e piani cambiano spesso: verifica sempre sul sito ufficiale.`,
      links: [{ kind: 'tool', id: tool.id, title: tool.name }],
      followUps: ['Come scrivo un buon prompt?'],
      isFallback: false,
    };
  }

  if (concept) {
    return {
      text: concept.entry.answer,
      links: [
        ...lessonLink(sources.courses, concept.entry.lessonId),
        ...(tool ? [{ kind: 'tool' as const, id: tool.id, title: tool.name }] : []),
      ],
      followUps: concept.entry.followUps,
      isFallback: false,
    };
  }

  const lesson = matchLesson(question, sources.courses);
  if (lesson) {
    return {
      text: `In modalità demo non ho una risposta preparata per questa domanda, ma l’argomento è trattato nella lezione “${lesson.title}”. Aprila per approfondire.`,
      links: [{ kind: 'lesson', id: lesson.id, title: lesson.title }],
      followUps: ['Cosa sai fare?'],
      isFallback: true,
    };
  }

  return {
    text: 'In modalità demo posso rispondere solo su argomenti dei corsi di AI Academy e sugli strumenti del catalogo, e su questa domanda non ho una risposta preparata. Prova a riformularla con una parola chiave (es. “prompt”, “allucinazioni”, “agente”, “Midjourney”).',
    links: [],
    followUps: ['Cosa sai fare?', 'Come scrivo un buon prompt?', 'Cos’è un agente AI?'],
    isFallback: true,
  };
}

export function createDemoTutor(sources: TutorSources): TutorProvider {
  return {
    mode: 'demo',
    ask: (question) => Promise.resolve(answerQuestion(question, sources)),
  };
}
