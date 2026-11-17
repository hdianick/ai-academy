/**
 * Practice Lab content (English): prompt missions, tool comparisons, guided projects,
 * daily challenge questions and weekly challenges. Same structure as the Italian file.
 */
import { choice, order, promptFix, theory, trueFalse } from '@/features/courses/builder';
import {
  definePractice,
  defineQuestionPool,
  type PracticeItem,
  type WeeklyChallenge,
} from '@/features/practice/types';

export const practiceItems: PracticeItem[] = [
  /* ---------------- Missions ---------------- */
  definePractice({
    id: 'mission-product-description',
    kind: 'mission',
    title: 'The perfect product page',
    description:
      'Turn a vague request into a prompt that produces a product description ready for an online shop.',
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xp: 25,
    icon: 'pricetag-outline',
    tools: ['ChatGPT', 'Claude', 'Gemini'],
    steps: [
      theory(
        'The mission',
        [
          'Your online shop has to publish the page for a new open-face helmet. A colleague wrote a prompt that is too vague and the result is generic.',
          'Goal: write a prompt with role, context, format and constraints, which also says what to do if technical data is missing.',
        ],
        {
          tip: 'Think about who will read the page: a rider who wants to understand in 10 seconds whether the helmet is right for them.',
        },
      ),
      promptFix({
        instruction: 'Rewrite the prompt to get an effective product description.',
        weakPrompt: 'Write the description of a helmet.',
        checks: [
          {
            label: 'Role (e.g. e-commerce copywriter)',
            keywords: ['you are', 'copywriter', 'act as', 'expert'],
          },
          {
            label: 'Audience or channel',
            keywords: ['e-commerce', 'shop', 'store', 'online', 'customers', 'riders', 'audience'],
          },
          {
            label: 'Format or length',
            keywords: ['words', 'list', 'points', 'title', 'paragraph'],
          },
          {
            label: 'Handling missing data',
            keywords: [
              'do not invent',
              'don’t invent',
              'if missing',
              'is missing',
              'to be completed',
              'not available',
            ],
          },
        ],
        sampleAnswer:
          'You are a copywriter for an online motorcycle accessories shop. Write the page for an open-face helmet for city riders: title, an 80-word description, 4 strengths as a list, one sentence on safety. If technical data is missing do not invent it: write [TO BE COMPLETED].',
      }),
      choice(
        'The model invents the weight of the helmet. Which instruction do you add?',
        [
          '“Be more creative”',
          '“Use only the data I give you; if a piece of data is missing write [TO BE COMPLETED]”',
          '“Write in French”',
          '“Write a longer description”',
        ],
        1,
        'Limiting the model to the data provided and giving it an explicit way out reduces invention.',
      ),
    ],
  }),
  definePractice({
    id: 'mission-customer-reply',
    kind: 'mission',
    title: 'Replying to an angry customer',
    description:
      'Handle a complaint with the right tone, without promising what you cannot deliver.',
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xp: 25,
    icon: 'mail-unread-outline',
    tools: ['ChatGPT', 'Claude'],
    steps: [
      theory('The mission', [
        'A customer writes: “The helmet arrived with a scratched visor. Terrible service, I want my money back now!”.',
        'You need the AI to write a reply that apologizes, offers a concrete solution (replacement or return) and keeps a calm, professional tone.',
      ]),
      promptFix({
        instruction: 'Write the prompt to have the AI prepare the reply.',
        weakPrompt: 'Reply to the customer.',
        checks: [
          {
            label: 'States the customer’s problem',
            keywords: ['visor', 'scratch', 'damage', 'complaint', 'problem'],
          },
          {
            label: 'Specifies the tone',
            keywords: ['tone', 'empath', 'polite', 'calm', 'professional'],
          },
          {
            label: 'Offers a solution',
            keywords: ['replacement', 'return', 'refund', 'solution', 'offer'],
          },
          {
            label: 'Limits length or format',
            keywords: ['words', 'short', 'lines', 'email', 'sign'],
          },
        ],
        sampleAnswer:
          'Write a reply email to a customer who received a helmet with a scratched visor and is angry. Empathetic, professional tone: apologize, offer a free replacement or a full refund, whichever they prefer, and explain the next steps. Maximum 120 words, sign off “Customer Service”.',
      }),
      trueFalse(
        'When replying to a complaint it is useful to tell the AI not to promise times the company cannot guarantee.',
        true,
        'AI tends to be accommodating: better to tell it explicitly what it can and cannot promise.',
      ),
    ],
  }),
  definePractice({
    id: 'mission-data-extraction',
    kind: 'mission',
    title: 'Extract data from an invoice',
    description: 'Get structured, reliable data from a document, ready for an automation.',
    difficulty: 'intermediate',
    estimatedMinutes: 5,
    xp: 35,
    icon: 'receipt-outline',
    tools: ['ChatGPT', 'Claude', 'Make', 'n8n'],
    steps: [
      theory(
        'The mission',
        [
          'Every day PDF invoices arrive from suppliers. You want the AI to extract the main data in a format an automation can read.',
          'You need structured output, precise fields and a rule for missing data.',
        ],
        {
          example:
            '{"supplier": "...", "number": "...", "date": "YYYY-MM-DD", "net_amount": 0, "vat": 0, "total": 0}',
        },
      ),
      promptFix({
        instruction: 'Write the extraction prompt.',
        weakPrompt: 'Read the invoice and tell me the data.',
        checks: [
          {
            label: 'Structured format (JSON or table)',
            keywords: ['json', 'table', 'fields', 'format'],
          },
          {
            label: 'Lists the fields to extract',
            keywords: ['supplier', 'total', 'date', 'number', 'vat', 'net'],
          },
          {
            label: 'Rule for missing data',
            keywords: ['null', 'missing', 'not present', 'if not', 'not available'],
          },
          {
            label: 'Format of dates or numbers',
            keywords: ['yyyy', 'date format', 'number', 'decimal', 'point'],
          },
        ],
        sampleAnswer:
          'Extract from the invoice and reply only with JSON with the fields: supplier, number, date (format YYYY-MM-DD), net_amount, vat, total (numbers with a decimal point). If a value is not present use null.',
      }),
      choice(
        'The AI returns the total as “€1,250.00” instead of 1250.00. What do you do?',
        [
          'Accept it: it is the same',
          'Specify the number format in the prompt and add a check to the workflow',
          'Change tool',
          'Remove the total field',
        ],
        1,
        'Explicit formats in the prompt and automatic checks make the data reliable.',
      ),
    ],
  }),
  definePractice({
    id: 'mission-image-prompt',
    kind: 'mission',
    title: 'Lifestyle photo for social media',
    description: 'Write a visual prompt to place a product in a believable scene.',
    difficulty: 'intermediate',
    estimatedMinutes: 4,
    xp: 30,
    icon: 'camera-outline',
    tools: ['Midjourney', 'Nano Banana', 'ChatGPT'],
    steps: [
      theory('The mission', [
        'You need to create an image for a vertical Instagram post: an open-face helmet resting on the seat of a scooter in an old-town street.',
        'The prompt must specify subject, setting, light, framing and format.',
      ]),
      promptFix({
        instruction: 'Write the visual prompt.',
        weakPrompt: 'Helmet on scooter.',
        checks: [
          { label: 'Setting', keywords: ['street', 'road', 'town', 'square', 'city', 'alley'] },
          {
            label: 'Light or mood',
            keywords: ['light', 'sunset', 'morning', 'sun', 'mood', 'golden'],
          },
          {
            label: 'Framing',
            keywords: [
              'close-up',
              'close up',
              'framing',
              'blurred background',
              'angle',
              'view',
              'three-quarter',
            ],
          },
          { label: 'Vertical format', keywords: ['vertical', '4:5', '9:16', 'format'] },
        ],
        sampleAnswer:
          'Lifestyle photo of a white open-face helmet resting on the seat of a vintage scooter in an alley of an Italian old town, warm sunset light, three-quarter close-up with blurred background, vertical 4:5 format.',
      }),
    ],
  }),

  /* ---------------- Comparisons ---------------- */
  definePractice({
    id: 'compare-right-tool',
    kind: 'comparison',
    title: 'The right tool for every job',
    description: 'Five real situations: pick the most suitable tool and find out why.',
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xp: 30,
    icon: 'git-compare-outline',
    tools: ['Perplexity', 'Gemini Notebook', 'Midjourney', 'Make', 'Cursor'],
    steps: [
      choice(
        'You need an up-to-date answer with sources to check. Which tool is best suited?',
        ['Midjourney', 'Perplexity', 'Suno', 'Lovable'],
        1,
        'Perplexity searches the web and cites the sources of every answer.',
      ),
      choice(
        'You want to ask questions only about the company’s internal manuals, with references to the passages.',
        ['Gemini Notebook', 'Runway', 'Zapier', 'Veo'],
        0,
        'Gemini Notebook (formerly called NotebookLM) answers based only on the uploaded sources and cites the passages.',
      ),
      choice(
        'You need to connect the online shop to the spreadsheet and notify the warehouse for every order.',
        ['ElevenLabs', 'Midjourney', 'Make', 'Perplexity'],
        2,
        'Make (like n8n and Zapier) connects different apps with triggers and actions.',
      ),
      choice(
        'You want to create the narrator voice for a video tutorial in three languages.',
        ['ElevenLabs', 'Cursor', 'Gemini Notebook', 'Make'],
        0,
        'ElevenLabs specializes in speech synthesis and dubbing.',
      ),
      choice(
        'A developer wants AI help right inside their code editor.',
        ['Suno', 'Cursor', 'Perplexity', 'Nano Banana'],
        1,
        'Cursor is a code editor with built-in AI.',
      ),
    ],
  }),
  definePractice({
    id: 'compare-chatbots',
    kind: 'comparison',
    title: 'Chatbots compared',
    description: 'How to choose between different assistants and how to compare them properly.',
    difficulty: 'intermediate',
    estimatedMinutes: 4,
    xp: 30,
    icon: 'swap-horizontal-outline',
    tools: ['ChatGPT', 'Claude', 'Gemini', 'Microsoft Copilot'],
    steps: [
      theory('Comparing with a method', [
        'ChatGPT, Claude, Gemini and Copilot are all very capable general assistants: the differences change often with new models.',
        'Instead of relying on rankings, try the same prompt on several assistants with 3-5 real cases from your work and compare the results with fixed criteria.',
      ]),
      order(
        'Put the steps of a proper comparison between assistants in order.',
        [
          'Choose real cases from your work',
          'Use the same prompt on every assistant',
          'Evaluate with fixed criteria',
          'Choose and repeat the test periodically',
        ],
        'Same inputs, same criteria: it is the only way to compare fairly.',
      ),
      choice(
        'You work all day in Outlook, Word and Excel. Which integration can save you the most steps?',
        ['Microsoft Copilot', 'Midjourney', 'Suno', 'Runway'],
        0,
        'Copilot is built into the Microsoft 365 apps.',
      ),
      trueFalse(
        'The ranking of the best assistants stays valid for years.',
        false,
        'Models are updated often: it is worth repeating the tests periodically.',
      ),
    ],
  }),

  /* ---------------- Projects ---------------- */
  definePractice({
    id: 'project-content-week',
    kind: 'project',
    title: 'Project: a week of social content',
    description:
      'From the editorial plan to the copy and the images: build a complete workflow in 4 steps.',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    xp: 60,
    icon: 'calendar-outline',
    tools: ['ChatGPT', 'Claude', 'Midjourney', 'Nano Banana'],
    steps: [
      theory('The project', [
        'Goal: plan and prepare 5 Instagram posts for a motorcycle accessories shop, with copy and image prompts.',
        'You will work like a prompt chain: plan → copy → images → review.',
      ]),
      promptFix({
        instruction: 'Step 1: ask the AI for the editorial plan.',
        weakPrompt: 'Make me some posts.',
        checks: [
          { label: 'Number of posts or duration', keywords: ['5 posts', 'five', 'week', '5'] },
          {
            label: 'Industry or audience',
            keywords: ['motorcycle', 'rider', 'accessories', 'helmets', 'audience'],
          },
          {
            label: 'Plan format (table…)',
            keywords: ['table', 'day', 'columns', 'list'],
          },
        ],
        sampleAnswer:
          'Create an editorial plan of 5 Instagram posts for one week for an online motorcycle accessories shop, audience aged 25-45. Table with: day, topic, goal, type of content.',
      }),
      promptFix({
        instruction: 'Step 2: ask for the post copy based on the plan.',
        weakPrompt: 'Write the copy.',
        checks: [
          {
            label: 'Links to the previous plan',
            keywords: ['plan', 'table', 'above', 'previous', 'each post'],
          },
          { label: 'Length', keywords: ['words', 'characters', 'lines', 'short'] },
          {
            label: 'Call to action or hashtags',
            keywords: ['call to action', 'cta', 'hashtag', 'invitation'],
          },
        ],
        sampleAnswer:
          'For each post in the plan above write the caption: maximum 80 words, friendly tone, a final call to action and 3 relevant hashtags.',
      }),
      promptFix({
        instruction: 'Step 3: ask for the image prompts.',
        weakPrompt: 'Make the images.',
        checks: [
          {
            label: 'One prompt per post',
            keywords: ['each post', 'for each', 'every post', '5 prompts'],
          },
          {
            label: 'Consistent style',
            keywords: ['style', 'consistent', 'same light', 'same', 'palette'],
          },
          { label: 'Format', keywords: ['4:5', 'vertical', 'format', '1:1'] },
        ],
        sampleAnswer:
          'For each post write a prompt to generate the image, with a consistent style for the whole series (photography, warm natural light, warm tones) and a vertical 4:5 format.',
      }),
      choice(
        'Step 4: what is the most important final review before publishing?',
        [
          'Counting the emojis',
          'Checking that products, prices and promises match reality and that the images are faithful',
          'Translating everything into French',
          'None, AI does not make mistakes',
        ],
        1,
        'Before publishing you always need a human fact check and images that are faithful to the real product.',
      ),
    ],
  }),
  definePractice({
    id: 'project-support-automation',
    kind: 'project',
    title: 'Project: automatic customer service triage',
    description: 'Design a workflow that classifies emails, extracts data and drafts a reply.',
    difficulty: 'advanced',
    estimatedMinutes: 10,
    xp: 70,
    icon: 'construct-outline',
    tools: ['Make', 'n8n', 'Zapier', 'Claude', 'ChatGPT'],
    steps: [
      theory('The project', [
        'Every day dozens of emails arrive: shipping questions, returns, product information. You want a workflow that sorts them and drafts replies, leaving the sending to a person.',
        'Suitable tools: Make, n8n or Zapier for the workflow, an AI model to classify and write.',
      ]),
      order(
        'Put the steps of the workflow in order.',
        [
          'Trigger: a new email arrives',
          'AI: classifies the request and extracts the order number',
          'Check: valid category and order number present',
          'AI: drafts a reply',
          'Person: checks and sends',
        ],
        'Classification, checks, draft and human approval: a reliable workflow.',
      ),
      promptFix({
        instruction: 'Write the prompt for the classification step.',
        weakPrompt: 'What is this email about?',
        checks: [
          {
            label: 'Allowed categories',
            keywords: ['return', 'shipping', 'category', 'categories', 'information'],
          },
          { label: 'Structured output', keywords: ['json', 'format', 'fields'] },
          { label: 'Missing data', keywords: ['null', 'if not', 'missing', 'not present'] },
        ],
        sampleAnswer:
          'Classify the email into one category among: return, shipping, product, other. Extract the order number. Reply only with JSON {"category": ..., "order_number": ... or null if not present, "urgent": true/false}.',
      }),
      choice(
        'The workflow receives an email in German with an unrecognized category. What should happen?',
        [
          'It gets deleted',
          'It is forwarded to a person to handle manually',
          'An automatic reply is sent',
          'The workflow stops forever',
        ],
        1,
        'Unexpected cases always go to a person: it is the workflow’s “plan B”.',
      ),
    ],
  }),
];

/** Questions from which the daily challenge is drawn (3 per day). */
export const dailyChallengePool = defineQuestionPool('daily', [
  choice(
    'Which part of a prompt describes audience and goal?',
    ['The format', 'The context', 'The role', 'The title'],
    1,
    'The context holds the information the model cannot know.',
  ),
  trueFalse(
    'An AI can cite a source that does not exist.',
    true,
    'It is a kind of hallucination: always check the sources.',
  ),
  choice(
    'Which format do you use for an Instagram story?',
    ['16:9', '9:16', '1:1', '21:9'],
    1,
    'Stories and reels are vertical.',
  ),
  choice(
    'What starts an automation?',
    ['An action', 'A trigger', 'A token', 'A badge'],
    1,
    'The trigger is the starting event.',
  ),
  trueFalse(
    'Pasting passwords into a public chatbot is good practice.',
    false,
    'Credentials and sensitive data must never be shared.',
  ),
  choice(
    'What is few-shot prompting?',
    [
      'Using few tokens',
      'Giving examples of input and output',
      'Asking short questions',
      'Using only images',
    ],
    1,
    'Examples show the model what you want.',
  ),
  choice(
    'Which tool answers by citing sources from the web?',
    ['Suno', 'Perplexity', 'Midjourney', 'Lovable'],
    1,
    'Perplexity is an answer engine with sources.',
  ),
  trueFalse(
    'An AI agent should have only the permissions strictly needed.',
    true,
    'It is the principle of least privilege.',
  ),
  choice(
    'Why ask for JSON output in a workflow?',
    [
      'It looks nicer',
      'The following steps can read it reliably',
      'It costs less',
      'It is mandatory',
    ],
    1,
    'Structured data avoids mistakes.',
  ),
  choice(
    'What does a language model do when it answers?',
    [
      'It copies from an archive',
      'It generates text one token at a time',
      'It asks a person',
      'It always searches Google',
    ],
    1,
    'Generation happens token by token.',
  ),
  trueFalse(
    'When editing images it is worth saying what must NOT change.',
    true,
    'Protecting the key elements avoids unwanted changes.',
  ),
  choice(
    'Which technique splits a job into several linked prompts?',
    ['Prompt chaining', 'Upscaling', 'Few-shot', 'Fine-tuning'],
    0,
    'The output of one step is the input of the next.',
  ),
  choice(
    'What is the first step before automating a process?',
    [
      'Buying software',
      'Describing the current process',
      'Hiring a technician',
      'Writing the code',
    ],
    1,
    'First you understand the process, then you automate it.',
  ),
  trueFalse(
    'The features and plans of AI tools rarely change.',
    false,
    'They change often: always check the official website.',
  ),
  choice(
    'Which instruction reduces invented content?',
    [
      '“Be creative”',
      '“If a piece of data is missing, write NOT AVAILABLE”',
      '“Answer quickly”',
      '“Use emojis”',
    ],
    1,
    'An explicit way out reduces hallucinations.',
  ),
]);

export const DAILY_CHALLENGE_SIZE = 3;
export const DAILY_XP_PER_CORRECT = 5;

export const weeklyChallenges: WeeklyChallenge[] = [
  { id: 'weekly-xp', metric: 'xp', target: 150, bonusXp: 50, icon: 'flash' },
  { id: 'weekly-lessons', metric: 'lessons', target: 5, bonusXp: 40, icon: 'book' },
  { id: 'weekly-days', metric: 'activeDays', target: 4, bonusXp: 40, icon: 'calendar' },
];
