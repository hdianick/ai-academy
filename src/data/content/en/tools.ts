/**
 * AI tools catalog (English). Same tools, ids and links as the Italian catalog
 * (`src/data/content/tools.ts`): a test checks that the two stay aligned.
 */
import type { AiTool } from '@/features/tools/types';

const REVIEWED = '2026-11';
/** Cards checked in the last review (name change or closure). */
const VERIFIED = '2026-11';

export const demoTools: AiTool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    company: 'OpenAI',
    categories: ['chatbots', 'agents', 'productivity'],
    icon: 'chatbubbles-outline',
    tagline: 'The most widely used chat assistant',
    description:
      'General-purpose AI assistant for writing, analyzing, summarizing, coding and reasoning. Supports files, images, voice, web search and custom assistants.',
    features: [
      'Conversation that remembers the context',
      'Analysis of files, PDFs and spreadsheets',
      'Image generation and editing',
      'Web search with sources',
      'Custom assistants (GPTs) and projects',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Replying to customers',
        example:
          'Write a polite reply to this negative review, acknowledge the problem and offer a solution: …',
      },
      {
        title: 'Analyzing sales',
        example:
          'I am uploading the sales file. Find the 5 products that declined compared with last month and explain why it might be happening.',
      },
    ],
    relatedCourseIds: ['chatgpt-pro', 'prompt-engineering', 'intro-ai'],
    website: 'https://chatgpt.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'claude',
    name: 'Claude',
    company: 'Anthropic',
    categories: ['chatbots', 'productivity', 'coding'],
    icon: 'sparkles-outline',
    tagline: 'Polished writing, long documents and reasoning',
    description:
      'AI assistant known for the quality of its writing, its handling of long documents and its reasoning. Useful for analysis, drafting texts, code and working on projects with reference files.',
    features: [
      'Analysis of long documents and several files at once',
      'Projects with shared instructions and files',
      'Creating documents, pages and small tools',
      'Web search and connections to other apps',
      'Excellent support for programming',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Reviewing a contract',
        example:
          'Read the attached contract and list termination clauses, penalties and deadlines, citing the clause for each.',
      },
      {
        title: 'Writing a procedure',
        example:
          'Turn these messy notes into a clear operating procedure, with numbered steps and owners.',
      },
    ],
    relatedCourseIds: ['chatgpt-pro', 'prompt-engineering', 'intro-ai'],
    website: 'https://claude.ai',
    lastReviewed: REVIEWED,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    company: 'Google',
    categories: ['chatbots', 'productivity', 'research'],
    icon: 'planet-outline',
    tagline: 'The assistant built into the Google ecosystem',
    description:
      'Google’s AI assistant, integrated with services such as Gmail, Docs and Drive. Works with text, images, audio and video.',
    features: [
      'Integration with Google apps (Gmail, Docs, Drive)',
      'Analysis of images, documents and videos',
      'In-depth research across many sources',
      'Image generation and editing',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Email recap',
        example:
          'Summarize this week’s unread emails about orders and tell me which ones need a reply.',
      },
      {
        title: 'Market research',
        example:
          'Prepare an analysis of the main competitors selling motorcycle helmets online in Europe, with sources.',
      },
    ],
    relatedCourseIds: ['chatgpt-pro', 'intro-ai'],
    website: 'https://gemini.google.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    company: 'Microsoft',
    categories: ['productivity', 'chatbots'],
    icon: 'briefcase-outline',
    tagline: 'AI inside Word, Excel, Outlook and Teams',
    description:
      'Microsoft’s AI assistant, available as an app and built into the Microsoft 365 applications for documents, spreadsheets, email and meetings.',
    features: [
      'Drafts and rewrites in Word',
      'Analysis and formulas in Excel',
      'Summaries of emails and meetings',
      'Presentations from existing documents',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Meeting minutes',
        example: 'Summarize today’s meeting: decisions taken, actions to do, owners and deadlines.',
      },
      {
        title: 'Analysis in Excel',
        example:
          'Create a pivot table of sales by category and month and highlight drops of more than 10%.',
      },
    ],
    relatedCourseIds: ['chatgpt-pro'],
    website: 'https://copilot.microsoft.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    company: 'Perplexity AI',
    categories: ['research'],
    icon: 'search-outline',
    tagline: 'Answers from the web with cited sources',
    description:
      'AI-powered answer engine: it searches the web and answers citing its sources, so you can check every piece of information.',
    features: [
      'Answers with numbered sources',
      'In-depth research across many pages',
      'Suggested follow-up questions',
      'Research collections by topic',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Checking a news story',
        example:
          'What are the current rules on labeling AI-generated content in the European Union? Cite official sources.',
      },
      {
        title: 'Researching a supplier',
        example:
          'What is publicly known about this supplier: years in business, location, reviews? Give the sources.',
      },
    ],
    relatedCourseIds: ['intro-ai'],
    website: 'https://www.perplexity.ai',
    lastReviewed: REVIEWED,
  },
  {
    id: 'notebooklm',
    name: 'Gemini Notebook',
    formerNames: ['NotebookLM'],
    statusNote:
      'Since 16 July 2026 NotebookLM has been called Gemini Notebook: it is the same product, now also built into the Gemini app.',
    company: 'Google',
    categories: ['research', 'productivity'],
    icon: 'journal-outline',
    tagline: 'An assistant that answers only from your sources',
    description:
      'You upload documents, PDFs, links and notes and the AI answers based on those sources, with references. It can create summaries, study guides and audio overviews. Notebooks can also be used inside the Gemini app.',
    features: [
      'Answers anchored to the uploaded documents',
      'Citations of the source passages',
      'Study guides, FAQs and mind maps',
      'Podcast-style audio overviews',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Studying a manual',
        example:
          'Upload the management software manual and ask: “How do I record a return? Give me the chapter.”',
      },
      {
        title: 'Team training',
        example: 'Upload the company procedures and generate an FAQ for new hires.',
      },
    ],
    relatedCourseIds: ['intro-ai'],
    website: 'https://notebooklm.google.com',
    lastReviewed: VERIFIED,
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    company: 'Midjourney',
    categories: ['images'],
    icon: 'color-palette-outline',
    tagline: 'Images of great aesthetic quality',
    description:
      'Image generator highly regarded for its style and artistic quality. Offers parameters for aspect ratio, style and variations.',
    features: [
      'Images from text descriptions',
      'Parameters such as --ar for aspect ratio',
      'Variations and upscaling',
      'Style and subject references',
    ],
    difficulty: 'intermediate',
    useCases: [
      {
        title: 'Seasonal banner',
        example:
          'Mountain road in autumn at sunset, motorbike in the distance, warm mood, cinematic photographic style --ar 16:9',
      },
      {
        title: 'Mood board',
        example:
          'Interior of a motorcycle accessories shop, industrial style, warm light, wood and metal --ar 4:5',
      },
    ],
    relatedCourseIds: ['ai-images'],
    website: 'https://www.midjourney.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'nano-banana',
    name: 'Nano Banana',
    company: 'Google',
    categories: ['images'],
    icon: 'image-outline',
    tagline: 'Edit images by describing the changes',
    description:
      'Google’s image generation and editing model, available in Gemini. It excels at conversational editing while keeping the subject consistent.',
    features: [
      'Edits with natural-language instructions',
      'Subject consistency across several images',
      'Combining several images',
      'Changes of background, light and style',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Staging a product',
        example:
          'Put this helmet on a motorbike parked in an Italian town square at sunset. Keep the colors and graphics identical.',
      },
      {
        title: 'Social variants',
        example:
          'Create three versions of this photo with different backgrounds: urban, mountain, gray studio.',
      },
    ],
    relatedCourseIds: ['ai-images'],
    website: 'https://gemini.google.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'runway',
    name: 'Runway',
    company: 'Runway',
    categories: ['video'],
    icon: 'film-outline',
    tagline: 'AI video generation and editing',
    description:
      'Creative platform to generate videos from text or images and edit them with AI tools, designed for creators and video teams.',
    features: [
      'Video from text and from images',
      'Animating still photos',
      'AI editing tools',
      'Control of camera movements',
    ],
    difficulty: 'intermediate',
    useCases: [
      {
        title: 'Animating a product photo',
        example:
          'Animate this photo: slow camera orbit around the helmet, light sliding across the visor.',
      },
      {
        title: 'Clip for a reel',
        example: '5-second vertical video: rider on a coastal road at dawn, drone shot.',
      },
    ],
    relatedCourseIds: ['ai-images'],
    website: 'https://runwayml.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'sora',
    name: 'Sora',
    company: 'OpenAI',
    categories: ['video'],
    icon: 'videocam-off-outline',
    tagline: 'Service closed: use Runway or Veo',
    description:
      'It was OpenAI’s video generator. The app and website were shut down on 26 April 2026 and developer access (API) on 24 September 2026: Sora can no longer be used to create videos.',
    features: [
      'App and website closed on 26 April 2026',
      'Developer API closed on 24 September 2026',
      'Active alternatives in the catalog: Runway and Veo',
    ],
    difficulty: 'intermediate',
    useCases: [
      {
        title: 'What to learn from this closure',
        example:
          'AI tools can change or close within a few months: always keep a copy of your work and do not build a business process on a single service.',
      },
      {
        title: 'Where to create videos today',
        example:
          'Same prompt, different tool: open Runway or Veo and describe the scene, for example “A rider lowers her visor and sets off at sunset, commercial style”.',
      },
    ],
    relatedCourseIds: [],
    website: 'https://help.openai.com/en/articles/20001152',
    lastReviewed: VERIFIED,
    status: 'discontinued',
    statusNote:
      'OpenAI has shut down Sora: the app and website since 26 April 2026, the API since 24 September 2026. To create videos use Runway or Veo.',
  },
  {
    id: 'veo',
    name: 'Veo',
    company: 'Google DeepMind',
    categories: ['video'],
    icon: 'aperture-outline',
    tagline: 'High-quality video, with audio too',
    description:
      'Google’s video generation model, available through Google services. Recent versions also generate the audio of the scene.',
    features: [
      'Video from text and images',
      'Generated audio and dialogue',
      'Control of the cinematic style',
      'Integration with Google tools',
    ],
    difficulty: 'intermediate',
    useCases: [
      {
        title: 'Video with ambient sound',
        example:
          'Motorbike workshop, a mechanic checks a tire, sounds of tools, warm light from the window.',
      },
      {
        title: 'YouTube intro',
        example:
          'Animated logo appearing on wet asphalt, reflections of neon lights, the sound of an engine in the distance.',
      },
    ],
    relatedCourseIds: ['ai-images'],
    website: 'https://deepmind.google/models/veo',
    lastReviewed: REVIEWED,
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    company: 'ElevenLabs',
    categories: ['audio'],
    icon: 'mic-outline',
    tagline: 'Realistic voices and dubbing',
    description:
      'Speech synthesis platform: turns texts into natural voices in many languages, with dubbing and sound effects.',
    features: [
      'Multilingual speech synthesis',
      'Dubbing videos into other languages',
      'Voice library',
      'Sound effects from a description',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Voice for a tutorial',
        example:
          'Read this text with a calm, professional male voice, slow pace, for a video tutorial.',
      },
      {
        title: 'Video in several languages',
        example: 'Dub the shop’s presentation video into Italian, German and French.',
      },
    ],
    relatedCourseIds: ['intro-ai'],
    website: 'https://elevenlabs.io',
    lastReviewed: REVIEWED,
  },
  {
    id: 'suno',
    name: 'Suno',
    company: 'Suno',
    categories: ['audio'],
    icon: 'musical-notes-outline',
    tagline: 'Complete songs from a description',
    description:
      'Generates complete music tracks, with vocals and instruments, from a description of genre and mood or from lyrics you write.',
    features: [
      'Tracks with vocals and instruments',
      'Choice of genre and mood',
      'Your own or generated lyrics',
      'Instrumental versions',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Jingle',
        example:
          'Energetic 20-second rock jingle for a motorcycle accessories shop, electric guitars, no vocals.',
      },
      {
        title: 'Background music for a video',
        example:
          'Chill instrumental music for a motorbike travel video, medium tempo, upbeat mood.',
      },
    ],
    relatedCourseIds: ['intro-ai'],
    website: 'https://suno.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'cursor',
    name: 'Cursor',
    company: 'Anysphere',
    categories: ['coding', 'agents'],
    icon: 'code-slash-outline',
    tagline: 'Code editor with built-in AI',
    description:
      'Code editor based on VS Code with built-in AI: it completes code, answers questions about the project and can edit several files on its own.',
    features: [
      'Context-aware code completion',
      'Chat about the project’s code',
      'Multi-file edits with an agent',
      'Choice between different AI models',
    ],
    difficulty: 'advanced',
    useCases: [
      {
        title: 'Understanding a project',
        example: 'Explain how this project is organized and where the shopping cart is handled.',
      },
      {
        title: 'New feature',
        example: 'Add a brand filter to the products page and write the tests.',
      },
    ],
    relatedCourseIds: ['automation-agents', 'prompt-engineering'],
    website: 'https://cursor.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    company: 'Anthropic',
    categories: ['coding', 'agents'],
    icon: 'terminal-outline',
    tagline: 'An agent that codes alongside you',
    description:
      'Anthropic’s agentic coding tool: it reads the project, edits files, runs commands and tests, and can open pull requests on GitHub.',
    features: [
      'Works on entire projects, not just one file',
      'Runs commands, tests and builds',
      'Integration with Git and GitHub',
      'Available from the terminal, desktop and web',
    ],
    difficulty: 'advanced',
    useCases: [
      {
        title: 'Fixing a bug',
        example:
          'The cart total is wrong when I apply a coupon. Find the cause, fix it and add a test.',
      },
      {
        title: 'Quick prototype',
        example:
          'Create a small web app to manage return requests, with a list, a detail view and a status.',
      },
    ],
    relatedCourseIds: ['automation-agents', 'prompt-engineering'],
    website: 'https://claude.com/product/claude-code',
    lastReviewed: REVIEWED,
  },
  {
    id: 'lovable',
    name: 'Lovable',
    company: 'Lovable',
    categories: ['coding'],
    icon: 'heart-outline',
    tagline: 'Build web apps by describing them',
    description:
      'Platform to create web applications by describing what you want in natural language, with instant preview and publishing.',
    features: [
      'Web apps from a text description',
      'Real-time preview and edits',
      'Connection to databases and authentication',
      'One-click publishing',
    ],
    difficulty: 'intermediate',
    useCases: [
      {
        title: 'Landing page',
        example:
          'Create a landing page for a new helmet: hero with an image, 3 strengths, reviews and a contact form.',
      },
      {
        title: 'Internal tool',
        example: 'Create an app to log returns: customer, product, reason, status, with filters.',
      },
    ],
    relatedCourseIds: ['prompt-engineering'],
    website: 'https://lovable.dev',
    lastReviewed: REVIEWED,
  },
  {
    id: 'make',
    name: 'Make',
    company: 'Make',
    categories: ['automation'],
    icon: 'git-merge-outline',
    tagline: 'Visual automations across hundreds of apps',
    description:
      'No-code platform to build visual automations: you connect different apps with scenarios made of triggers, actions, filters and AI steps.',
    features: [
      'Visual block editor',
      'Thousands of app integrations',
      'Filters, routers and error handling',
      'Built-in AI modules',
    ],
    difficulty: 'intermediate',
    useCases: [
      {
        title: 'Orders into the spreadsheet',
        example:
          'When an order arrives from the online shop, add a row to the sheet and notify the warehouse.',
      },
      {
        title: 'Sorting emails',
        example: 'Use AI to classify customer service emails and create a ticket for returns.',
      },
    ],
    relatedCourseIds: ['automation-agents'],
    website: 'https://www.make.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'n8n',
    name: 'n8n',
    company: 'n8n',
    categories: ['automation', 'agents'],
    icon: 'git-network-outline',
    tagline: 'Automations and AI agents, even on your own server',
    description:
      'Workflow automation platform that can be used in the cloud or installed on your own servers. It offers nodes to build AI agents connected to tools and data.',
    features: [
      'Visual editor with the option to code',
      'Can be installed on your own servers',
      'Nodes for AI agents and memory',
      'Many integrations and webhooks',
    ],
    difficulty: 'advanced',
    useCases: [
      {
        title: 'Support agent',
        example:
          'An agent that reads customer requests, checks the order status and drafts a reply.',
      },
      {
        title: 'Automatic report',
        example:
          'Every Monday collect the week’s sales, have AI summarize the trends and send the report by email.',
      },
    ],
    relatedCourseIds: ['automation-agents'],
    website: 'https://n8n.io',
    lastReviewed: REVIEWED,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    company: 'Zapier',
    categories: ['automation', 'agents'],
    icon: 'flash-outline',
    tagline: 'The simplest way to connect apps',
    description:
      'Very intuitive automation platform: you connect apps with “when X happens, do Y” workflows and can add AI steps.',
    features: [
      'Simple guided setup',
      'A huge number of supported apps',
      'AI steps in workflows',
      'Built-in tables and forms',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'New contacts',
        example:
          'When someone fills in the website form, add them to the CRM and send a welcome email.',
      },
      {
        title: 'Reviews',
        example:
          'When a new review arrives, have AI classify it and alert the team if it is negative.',
      },
    ],
    relatedCourseIds: ['automation-agents'],
    website: 'https://zapier.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    company: 'Notion',
    categories: ['productivity'],
    icon: 'document-text-outline',
    tagline: 'AI inside your notes and documents',
    description:
      'AI features built into Notion to write, summarize and find information across the pages and databases of your workspace.',
    features: [
      'Writing and rewriting in pages',
      'Summaries of pages and meetings',
      'Questions about your workspace content',
      'Automatic database filling',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Company wiki',
        example:
          'Where did we write the procedure for international returns? Summarize it in 5 points.',
      },
      {
        title: 'Editorial plan',
        example:
          'Generate 12 blog article ideas about motorcycle safety and add them to the database.',
      },
    ],
    relatedCourseIds: ['chatgpt-pro'],
    website: 'https://www.notion.com',
    lastReviewed: REVIEWED,
  },
];
