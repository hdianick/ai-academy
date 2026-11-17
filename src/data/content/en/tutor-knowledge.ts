/**
 * Tutor knowledge base in DEMO MODE (English).
 * Hand-written answers about the course concepts. Each entry links to the reference lesson.
 * Same ids and lessons as the Italian file.
 */
import type { KnowledgeEntry } from '@/features/tutor/types';

export const tutorKnowledge: KnowledgeEntry[] = [
  {
    id: 'help',
    keywords: ['what can you do', 'how do you work', 'help', 'who are you', 'demo'],
    answer:
      'I am the AI Academy Tutor in demo mode: I answer with pre-written explanations about the course concepts (prompts, language models, images, automations, agents…) and the tools in the catalog. I am not connected to a real AI model yet, so I may not be able to help with questions outside these topics.',
    followUps: [
      'What is a language model?',
      'How do I write a good prompt?',
      'What is an AI agent?',
    ],
  },
  {
    id: 'ai-ml-dl',
    keywords: [
      'machine learning',
      'deep learning',
      'artificial intelligence',
      'what is ai',
      'difference between ai',
      'neural network',
    ],
    answer:
      'Artificial intelligence is the set of techniques that let computers carry out “intelligent” tasks. Machine learning is how almost all AI is built today: the system learns from examples instead of following hand-written rules. Deep learning is a type of machine learning based on neural networks with many layers, and it is the technology behind ChatGPT, Claude, Gemini and image generators.',
    followUps: ['What is a language model?', 'What are tokens?'],
    lessonId: 'intro-ai.m1.l1',
  },
  {
    id: 'llm',
    keywords: [
      'language model',
      'llm',
      'large language model',
      'how does chatgpt work',
      'how does it reason',
      'how does it think',
    ],
    answer:
      'A language model (LLM) is trained on huge amounts of text to predict the next piece of text. When it answers you, it generates the reply one token at a time, based on the patterns it has learned. It does not look things up in an archive of ready-made answers: that is why it is very flexible, but it can also be confidently wrong.',
    followUps: ['What are tokens?', 'What is a hallucination?'],
    lessonId: 'intro-ai.m1.l2',
  },
  {
    id: 'token',
    keywords: ['token'],
    answer:
      'A token is the unit of text a model works with: it can be a whole word, part of a word or a punctuation mark. Models read and generate text token by token, and API limits and costs are often measured in tokens.',
    followUps: ['What is a language model?'],
    lessonId: 'intro-ai.m1.l2',
  },
  {
    id: 'hallucination',
    keywords: [
      'hallucinat',
      'makes things up',
      'make things up',
      'invent',
      'wrong answers',
      'false answers',
    ],
    answer:
      'A hallucination is a wrong answer delivered with confidence: an invented figure, a source that does not exist, a misquoted rule. It happens because the model generates plausible text, not necessarily true text. To reduce them: ask for sources, anchor the answers to documents (“answer only based on the text”), give it a way out (“if you don’t know, write NOT AVAILABLE”) and always check important information.',
    followUps: ['How do I check an answer?', 'What is bias?'],
    lessonId: 'intro-ai.m2.l2',
  },
  {
    id: 'bias-cutoff',
    keywords: ['bias', 'prejudice', 'stereotype', 'cutoff', 'up to date', 'outdated'],
    answer:
      'Every model has a training cutoff date: without web search it does not know about later events. It also learns from human texts, so it can reproduce their prejudices (bias). For recent information use tools with web search and sources; for sensitive decisions check that the answers contain no stereotypes.',
    followUps: ['What is a hallucination?'],
    lessonId: 'intro-ai.m2.l2',
  },
  {
    id: 'multimodal',
    keywords: ['multimodal', 'images and text', 'upload a photo', 'analyze a photo', 'audio'],
    answer:
      'A multimodal assistant works with several kinds of data: text, images, sometimes audio and video. You can upload a photo of an invoice and ask it to extract the data, or upload a chart and ask it to explain it.',
    followUps: ['How do I analyze a PDF with AI?'],
    lessonId: 'intro-ai.m2.l1',
  },
  {
    id: 'privacy',
    keywords: [
      'privacy',
      'sensitive data',
      'personal data',
      'gdpr',
      'confidential',
      'password',
      'safe to paste',
    ],
    answer:
      'Before pasting something into a chatbot, think about where the data goes. Avoid passwords, card numbers, health data, customers’ personal data and confidential documents, unless your company uses a version with contractual guarantees. Anonymizing is often enough: “Customer A”, “Company X”. Also check the service’s privacy settings.',
    followUps: ['How do I check an answer?'],
    lessonId: 'intro-ai.m3.l1',
  },
  {
    id: 'verify',
    keywords: ['verif', 'check an answer', 'trust', 'sources', 'reliab', 'fact check'],
    answer:
      'A simple 4-step method: 1) ask which sources the information comes from; 2) open the sources and check that they really say what the AI reports; 3) compare with a second authoritative source; 4) for important decisions ask a professional. You can also ask the AI: “Which parts of this answer might be inaccurate?”',
    followUps: ['What is a hallucination?'],
    lessonId: 'intro-ai.m3.l2',
  },
  {
    id: 'good-prompt',
    keywords: [
      'good prompt',
      'write a prompt',
      'how do i write',
      'effective prompt',
      'improve a prompt',
      'prompt structure',
      'what is a prompt',
      'prompt',
    ],
    answer:
      'A good prompt has four parts: role (the perspective to answer from), task (what to do, with a clear verb), context (audience, goal, constraints, data) and format (table, list, number of words). Example: “You are an e-commerce copywriter. Write the description of an open-face helmet for city riders, 80 words, 3 strengths as a list. If technical data is missing, do not invent it.”',
    followUps: ['What is few-shot prompting?', 'What is prompt chaining?'],
    lessonId: 'prompt-engineering.m1.l1',
  },
  {
    id: 'few-shot',
    keywords: ['few-shot', 'few shot', 'examples in the prompt', 'give examples'],
    answer:
      'Few-shot prompting means giving the model 2-3 examples of input and desired output: the model infers the pattern and repeats it. It works very well to get a precise style or format. The examples must be varied, otherwise the model copies them too closely.',
    followUps: ['How do I write a good prompt?'],
    lessonId: 'prompt-engineering.m1.l2',
  },
  {
    id: 'chaining',
    keywords: [
      'chaining',
      'prompt chain',
      'several steps',
      'step by step',
      'reasoning',
      'break down',
    ],
    answer:
      'For complex tasks it pays to break the work down. You can ask it to reason step by step in a single prompt, or use prompt chaining: several linked requests where the output of one becomes the input of the next (e.g. extract the data → group it → write the report). Each step is easier to check.',
    followUps: ['How do I evaluate whether a prompt works?'],
    lessonId: 'prompt-engineering.m2.l2',
  },
  {
    id: 'template',
    keywords: ['template', 'prompt template', 'variables', 'reusable'],
    answer:
      'A template is a prompt with fixed parts (instructions, tone, format) and variables in brackets, such as {product} or {audience}. Anyone on the team can use it by replacing only the variables, getting consistent results. Keep your templates in a shared document, with an example of use.',
    followUps: ['How do I evaluate whether a prompt works?'],
    lessonId: 'prompt-engineering.m3.l1',
  },
  {
    id: 'evaluate-prompt',
    keywords: ['evaluate', 'test a prompt', 'prompt works', 'measure'],
    answer:
      'Prepare 5-10 real test cases (including hard ones) and measurable success criteria: format followed, no invented data, correct tone. When you change the prompt, rerun the same cases and change one thing at a time, so you understand what improved the result.',
    followUps: ['What is a prompt template?'],
    lessonId: 'prompt-engineering.m3.l2',
  },
  {
    id: 'custom-instructions',
    keywords: [
      'custom instructions',
      'memory',
      'projects',
      'custom gpt',
      'custom assistant',
      'customize',
    ],
    answer:
      'Many assistants let you save custom instructions (who you are, how you want your answers), use memory across conversations and create projects or custom assistants with fixed instructions and files. They are ideal for repetitive tasks: replying to reviews, writing product pages, preparing quotes. Names and availability change with the service and the plan.',
    followUps: ['How do I write a good prompt?'],
    lessonId: 'chatgpt-pro.m2.l2',
  },
  {
    id: 'documents',
    keywords: [
      'pdf',
      'document',
      'contract',
      'spreadsheet',
      'excel',
      'analyze files',
      'upload files',
    ],
    answer:
      'You can upload PDFs, documents and spreadsheets and ask questions about their content. To reduce mistakes ask: “Answer only based on the document and give the section you take the information from”. For calculations on a spreadsheet ask it to show the working, so you can check it.',
    followUps: ['What is a hallucination?'],
    lessonId: 'chatgpt-pro.m2.l1',
  },
  {
    id: 'diffusion',
    keywords: [
      'diffusion',
      'how is an image made',
      'image generator',
      'how do images work',
      'generate images',
    ],
    answer:
      'Many image generators use diffusion models: they start from random noise and turn it step by step into an image, guided by your text. That is why the same prompt produces different results every time: generate several variations and pick the best one.',
    followUps: ['How do I write a prompt for images?'],
    lessonId: 'ai-images.m1.l1',
  },
  {
    id: 'image-prompt',
    keywords: [
      'prompt for images',
      'visual prompt',
      'image prompt',
      'describe an image',
      'framing',
      'midjourney prompt',
    ],
    answer:
      'An effective visual prompt describes: subject (with concrete details), setting, style (photo, illustration, 3D), light and mood, framing and format. Example: “Product photo of a matte black full-face helmet on rough concrete, soft side light, gray gradient background, three-quarter framing, square format.”',
    followUps: [
      'Which aspect ratios do I use for social media?',
      'How do I edit an existing image?',
    ],
    lessonId: 'ai-images.m1.l2',
  },
  {
    id: 'aspect-ratio',
    keywords: ['aspect ratio', 'image format', 'ratio', '--ar', '16:9', '9:16', '4:5'],
    answer:
      'Choose the aspect ratio based on the channel: 1:1 for square posts, 4:5 for the vertical feed, 9:16 for stories and reels, 16:9 for banners and horizontal videos. In Midjourney you set it with the --ar parameter (e.g. --ar 4:5); in chat assistants you just write it in the request.',
    followUps: ['How do I write a prompt for images?'],
    lessonId: 'ai-images.m2.l1',
  },
  {
    id: 'image-editing',
    keywords: [
      'edit an image',
      'edit an existing image',
      'existing image',
      'editing',
      'change the background',
      'background',
    ],
    answer:
      'With conversational editing (for example Nano Banana in Gemini or images in ChatGPT) you describe the change in words: “replace the background with a mountain road at sunset”. Ask for one edit at a time and say what must NOT change: “keep the product’s shape, colors and logo identical”.',
    followUps: ['Can I use AI images for my online shop?'],
    lessonId: 'ai-images.m2.l2',
  },
  {
    id: 'image-rights',
    keywords: [
      'rights',
      'copyright',
      'ethics',
      'legal',
      'commercial use',
      'use the images',
      'ai images',
      'marketplace',
    ],
    answer:
      'Practical rules: do not imitate brands, logos or protected characters; do not create realistic images of real people without consent; keep the product true to reality; read the tool’s terms for commercial use and the marketplace rules; disclose when a realistic image is AI-generated. The rules are evolving: for specific cases ask a lawyer.',
    followUps: ['How do I edit an existing image?'],
    lessonId: 'ai-images.m3.l2',
  },
  {
    id: 'automation',
    keywords: ['automation', 'automate', 'trigger', 'action', 'make', 'zapier', 'workflow'],
    answer:
      'An automation follows the rule “when X happens, do Y”: a trigger (new order, new email, a time of day) starts one or more actions (add a row, send a message), passing the data from one step to the next. Tools such as Make, n8n and Zapier let you build them visually. Before starting, describe the current process and begin with a frequent task with clear rules.',
    followUps: ['How do I add AI to an automation?', 'What is an AI agent?'],
    lessonId: 'automation-agents.m1.l1',
  },
  {
    id: 'ai-in-flows',
    keywords: [
      'ai in workflows',
      'ai to an automation',
      'json',
      'structured output',
      'classify',
      'extract data',
    ],
    answer:
      'Inside a workflow AI is most useful with free text: classifying requests, extracting data, summarizing, drafting replies. Ask for structured output (for example JSON with fields and allowed values), say what to do if a piece of data is missing (null) and add a check: if the result is not valid, the case goes to a person.',
    followUps: ['What is an AI agent?'],
    lessonId: 'automation-agents.m2.l2',
  },
  {
    id: 'agent',
    keywords: ['agent', 'agents', 'autonom'],
    answer:
      'An AI agent receives a goal and decides by itself the steps to reach it, using the tools it has access to (search, email, files, databases). It works in a loop: observe, decide, act, evaluate the result. The more autonomy it has, the more limits it needs: minimal permissions, human approval for irreversible actions, an action log and spending limits.',
    followUps: ['What is prompt injection?', 'What is an automation?'],
    lessonId: 'automation-agents.m3.l1',
  },
  {
    id: 'prompt-injection',
    keywords: ['prompt injection', 'injection', 'least privilege', 'agent security', 'manipulat'],
    answer:
      'Prompt injection is text hidden in external content (a web page, an email, a document) that tries to make the AI follow instructions other than the user’s. Practical defenses: treat external content as data rather than orders, give the agent only the permissions it needs (least privilege) and require human confirmation for critical actions.',
    followUps: ['What is an AI agent?'],
    lessonId: 'automation-agents.m3.l2',
  },
];

/** Words to ignore when looking for topics in the lessons. */
export const stopWords = new Set(
  'a an and are as at be but by can could do does for from had has have how i if in into is it its me my of on or please should so tell than that the their them then there these this those to us was we what when where which who why will with would you your about explain does'.split(
    ' ',
  ),
);
