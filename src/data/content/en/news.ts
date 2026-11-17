/**
 * AI tool news (English). Same items, dates and sources as the Italian file
 * (`src/data/content/news.ts`): a test checks that the two stay aligned.
 */
import type { NewsItem } from '@/features/news/types';

/** Date of the last content check (tool cards and news). */
export const CONTENT_VERIFIED_AT = '2026-11-17';

export const newsItems: NewsItem[] = [
  {
    id: '2026-10-27-chatgpt-icloud',
    date: '2026-10-27',
    kind: 'change',
    title: 'ChatGPT connects to iCloud Mail and Calendar',
    summary:
      'ChatGPT can now connect to iCloud mail and calendar through plugins, to look up emails and appointments right in the chat. Available on all plans on the web, the desktop app and iPhone.',
    toolIds: ['chatgpt'],
    source: {
      name: 'OpenAI – release notes',
      url: 'https://help.openai.com/en/articles/6825453-chatgpt-release-notes',
    },
  },
  {
    id: '2026-09-30-gemini-4-argon',
    date: '2026-09-30',
    kind: 'launch',
    title: 'Google unveils Gemini 4 Argon',
    summary:
      'It is Google’s new flagship model, designed for long programming, analysis and cybersecurity jobs. At first it is reserved for a group of security partners, with a gradual rollout to subscribers and developers.',
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
    title: 'Sora shuts down for good',
    summary:
      'After closing the app and website on 26 April 2026, OpenAI has also switched off developer access: Sora can no longer be used to create videos. The alternatives in the catalog are Runway and Veo.',
    toolIds: ['sora', 'runway', 'veo'],
    source: {
      name: 'OpenAI – Help Center',
      url: 'https://help.openai.com/en/articles/20001152',
    },
  },
  {
    id: '2026-09-22-claude-opus-5-5',
    date: '2026-09-22',
    kind: 'launch',
    title: 'Anthropic launches Claude Opus 5.5',
    summary:
      'The first model in the Claude 5.5 family: according to Anthropic it performs close to its most powerful model while costing about 40% less to run than Opus 5. Also available in Claude Code.',
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
    title: 'Copilot: free deep research is being retired',
    summary:
      'Microsoft has started retiring Copilot’s free Deep Research feature. In-depth research reports now require a Microsoft 365 Premium subscription with the new Researcher tool.',
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
    title: 'NotebookLM gets a new name: Gemini Notebook',
    summary:
      'Google has renamed NotebookLM to Gemini Notebook. It remains a standalone product for studying and researching your own sources, but notebooks now also sync with the Gemini app.',
    toolIds: ['notebooklm', 'gemini'],
    source: {
      name: 'Google Blog',
      url: 'https://blog.google/innovation-and-ai/products/gemini-notebook/notebooklm-gemini-notebook/',
    },
  },
];
