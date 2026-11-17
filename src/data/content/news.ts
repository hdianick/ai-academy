/**
 * Novità sugli strumenti AI, verificate su fonti ufficiali o testate affidabili.
 * Aggiornate dal controllo settimanale automatico: aggiungere in cima, testo in parole
 * proprie (niente citazioni lunghe), sempre con data e fonte.
 */
import type { NewsItem } from '@/features/news/types';

/** Data dell'ultimo controllo dei contenuti (schede strumenti e novità). */
export const CONTENT_VERIFIED_AT = '2026-11-17';

export const newsItems: NewsItem[] = [
  {
    id: '2026-10-27-chatgpt-icloud',
    date: '2026-10-27',
    kind: 'change',
    title: 'ChatGPT si collega a Mail e Calendario di iCloud',
    summary:
      'ChatGPT può ora collegarsi alla posta e al calendario di iCloud tramite plugin, per cercare email e appuntamenti direttamente in chat. Disponibile per tutti i piani su web, app desktop e iPhone.',
    toolIds: ['chatgpt'],
    source: {
      name: 'OpenAI – note di rilascio',
      url: 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
    },
  },
  {
    id: '2026-09-30-gemini-4-argon',
    date: '2026-09-30',
    kind: 'launch',
    title: 'Google presenta Gemini 4 Argon',
    summary:
      'È il nuovo modello di punta di Google, pensato per lavori lunghi di programmazione, analisi e sicurezza informatica. All’inizio è riservato a un gruppo di partner della sicurezza, con un’apertura graduale agli abbonati e agli sviluppatori.',
    toolIds: ['gemini'],
    source: {
      name: 'Google Blog',
      url: 'https://blog.google/intl/en-mena/company-news/technology/gemini-4-argon-our-next-era-of-frontier-intelligence/',
    },
  },
  {
    id: '2026-09-24-sora-api',
    date: '2026-09-24',
    kind: 'closure',
    title: 'Sora chiude definitivamente',
    summary:
      'Dopo la chiusura di app e sito il 26 aprile 2026, OpenAI ha spento anche l’accesso per gli sviluppatori: con Sora non si possono più creare video. Le alternative nel catalogo sono Runway e Veo.',
    toolIds: ['sora', 'runway', 'veo'],
    source: {
      name: 'OpenAI – Centro assistenza',
      url: 'https://help.openai.com/en/articles/20001152',
    },
  },
  {
    id: '2026-09-22-claude-opus-5-5',
    date: '2026-09-22',
    kind: 'launch',
    title: 'Anthropic lancia Claude Opus 5.5',
    summary:
      'Primo modello della famiglia Claude 5.5: secondo Anthropic offre prestazioni simili al suo modello più potente con costi di utilizzo circa il 40% più bassi rispetto a Opus 5. Disponibile anche in Claude Code.',
    toolIds: ['claude', 'claude-code'],
    source: {
      name: 'TechCrunch',
      url: 'https://techcrunch.com/2026/09/22/anthropic-releases-opus-5-5-with-lower-prices-and-fable-level-performance/',
    },
  },
  {
    id: '2026-08-18-copilot-deep-research',
    date: '2026-08-18',
    kind: 'change',
    title: 'Copilot: la ricerca approfondita gratuita va in pensione',
    summary:
      'Microsoft ha iniziato a ritirare la funzione gratuita Deep Research di Copilot. Per i report di ricerca approfonditi serve ora l’abbonamento Microsoft 365 Premium con il nuovo strumento Researcher.',
    toolIds: ['copilot', 'perplexity'],
    source: {
      name: 'Tom’s Guide',
      url: 'https://www.tomsguide.com/ai/microsoft-copilots-free-deep-research-ai-tool-is-going-away-these-are-the-7-best-free-alternatives',
    },
  },
  {
    id: '2026-07-16-gemini-notebook',
    date: '2026-07-16',
    kind: 'change',
    title: 'NotebookLM cambia nome: ora è Gemini Notebook',
    summary:
      'Google ha rinominato NotebookLM in Gemini Notebook. Resta un prodotto a sé per studiare e fare ricerca sulle proprie fonti, ma i quaderni ora si sincronizzano anche con l’app Gemini.',
    toolIds: ['notebooklm', 'gemini'],
    source: {
      name: 'Google Blog',
      url: 'https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/',
    },
  },
];
