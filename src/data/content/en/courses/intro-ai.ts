import {
  choice,
  defineCourse,
  fillBlank,
  order,
  theory,
  trueFalse,
} from '@/features/courses/builder';

export const introAi = defineCourse({
  id: 'intro-ai',
  title: 'Introduction to artificial intelligence',
  subtitle: 'Understand what AI is, how it works and how to use it well',
  description:
    'The starting point for everyone: what artificial intelligence and language models really are, how they are trained, what they can do, where they go wrong and how to use them safely, checking the answers and protecting your data.',
  category: 'fundamentals',
  level: 'beginner',
  tools: ['ChatGPT', 'Claude', 'Gemini'],
  outcomes: [
    'Explain in simple words what a language model is and how it generates answers',
    'Recognize what AI does well and where it can fail (hallucinations, bias, outdated data)',
    'Use AI while protecting personal and business data',
    'Check answers with a simple, repeatable method',
  ],
  requiredTier: 'free',
  icon: 'bulb-outline',
  modules: [
    {
      title: 'What artificial intelligence is',
      description: 'The basics: AI, machine learning, deep learning and language models.',
      lessons: [
        {
          title: 'AI, machine learning and deep learning',
          summary: 'Three terms you hear everywhere, explained with concrete examples.',
          estimatedMinutes: 8,
          theory: [
            theory('What we mean by “artificial intelligence”', [
              'Artificial intelligence (AI) is the set of techniques that let a computer carry out tasks that, until recently, required human intelligence: understanding a sentence, recognizing a face in a photo, translating a text, recommending a product, forecasting a sale.',
              'There is no single “AI”: there are many different systems, each built for a purpose. Your email spam filter, the navigation app that estimates traffic, the suggestions in an online shop and ChatGPT are all examples of artificial intelligence, even though they work in very different ways.',
              'Almost all the AI we use today is “narrow”: it is very good at specific tasks, but it has no general understanding of the world like a person.',
            ]),
            theory(
              'From rule-based software to machine learning',
              [
                'In traditional software a programmer writes every rule: “if the email contains the word X, move it to spam”. It works while cases are predictable, but it becomes impossible when there are millions of situations that keep changing.',
                'Machine learning turns the approach around: instead of writing the rules, you show the system a huge number of labeled examples (“spam” and “not spam” emails) and it learns by itself which features separate the two categories.',
                'The result of training is called a model: a kind of very complex “formula” that, given a new example, produces a prediction.',
              ],
              {
                example:
                  'Hand-written rule: “If the customer has spent more than 500 € and has not bought anything for 90 days, send them a discount.”\nMachine learning: the model analyzes the history of thousands of customers and learns by itself who is most likely to stop buying.',
              },
            ),
            theory('Deep learning and neural networks', [
              'Deep learning is a type of machine learning that uses artificial neural networks with many layers (hence “deep”). Each layer transforms the data and passes the result to the next one, learning more and more abstract representations.',
              'In a network that recognizes images, the first layers learn to pick up edges and colors, the middle ones shapes and parts of objects, the last ones whole objects such as “helmet” or “motorbike”.',
              'Deep learning needs huge amounts of data and a lot of computing power, but it is the technology behind almost every modern AI: assistants such as ChatGPT, Claude and Gemini, image and video generators, speech recognition and machine translation.',
            ]),
            theory(
              'How the three ideas fit together',
              [
                'Picture three circles, one inside the other. The largest circle is artificial intelligence: the overall goal. Inside it is machine learning: the most common way to achieve it. Further inside is deep learning: the most powerful family of techniques today.',
                'When people talk about “AI” today, most of the time they mean deep learning systems, in particular generative models that can create text, images, audio and video.',
              ],
              {
                tip: 'You do not need the math: to use AI well it is enough to understand that it learns from examples and therefore reflects the data it was trained on.',
              },
            ),
            theory('Why now', [
              'The ideas behind neural networks have existed for decades. The boom of recent years comes from three factors that arrived together: huge amounts of digital data, much more powerful specialized processors (GPUs) and new neural network architectures, such as “transformers”, which are especially effective with language.',
              'The result is generative models that do not just classify or predict, but produce new content. That leap is what put AI in everyone’s hands.',
            ]),
          ],
          questions: [
            choice(
              'What is the main difference between traditional software and machine learning?',
              [
                'Machine learning learns patterns from examples instead of following hand-written rules',
                'Machine learning only works on the internet',
                'Traditional software is always slower',
                'There is no difference',
              ],
              0,
              'In traditional software a programmer writes every rule; in machine learning the system derives the rules from large amounts of examples.',
            ),
            order(
              'Sort from the broadest concept to the most specific.',
              ['Artificial intelligence', 'Machine learning', 'Deep learning'],
              'Deep learning is a type of machine learning, which in turn is a way to build artificial intelligence.',
            ),
            fillBlank(
              'The result of training a machine learning system is called a ___.',
              ['model', 'database', 'search engine', 'server'],
              0,
              'The model is what the system has “learned”: it receives a new input and produces a prediction.',
            ),
            trueFalse(
              'Almost all the AI we use today is “narrow”: very good at specific tasks, without a general understanding of the world.',
              true,
              'Current systems excel at defined tasks but lack a person’s general understanding.',
            ),
            choice(
              'Why is it called deep learning?',
              [
                'Because it only analyzes secret data',
                'Because it uses neural networks with many layers',
                'Because it only works at night',
                'Because it needs little data',
              ],
              1,
              'The term refers to the many layers of the neural network, each processing the output of the previous one.',
            ),
            choice(
              'Which of these is an example of artificial intelligence you probably use every day?',
              [
                'A pocket calculator',
                'The email spam filter',
                'A light switch',
                'A sheet of paper',
              ],
              1,
              'The spam filter learns to recognize unwanted messages: a classic example of machine learning.',
            ),
            trueFalse(
              'Deep learning works well even with very little data and little computing power.',
              false,
              'Deep learning typically requires large amounts of data and a lot of computing power.',
            ),
            choice(
              'Which combination of factors explains the recent AI boom?',
              [
                'More data, more powerful processors and new neural network architectures',
                'Only a European law',
                'Cheaper smartphones',
                'The birth of the internet',
              ],
              0,
              'Data, computing power (GPUs) and architectures such as transformers arrived together.',
            ),
          ],
        },
        {
          title: 'How a language model “thinks”',
          summary:
            'Tokens, predictions, training and context: what happens when you write to a chatbot.',
          estimatedMinutes: 9,
          theory: [
            theory('What a language model is', [
              'A large language model (LLM) is a neural network trained on huge amounts of text: books, websites, articles, code. During training the task is simple to describe: given a text, predict the most likely next piece.',
              'By repeating this exercise billions of times, the model absorbs grammar, vocabulary, facts, writing styles and even reasoning patterns. ChatGPT, Claude and Gemini are assistants built on models of this kind.',
            ]),
            theory(
              'Tokens: the building blocks of text',
              [
                'The model does not read letters or words the way we do: it works with tokens. A token can be a whole word (“house”), part of a word (“intelli” + “gence”) or a punctuation mark.',
                'When it answers, the model generates the reply one token at a time: it picks the next token based on all the previous text, adds it and repeats. That is why you see the answer appear gradually.',
                'Tokens matter in practice too: conversation length limits and API costs are measured in tokens.',
              ],
              {
                tip: 'Languages other than English often need more tokens to express the same idea.',
              },
            ),
            theory('From training to assistant', [
              'A model freshly trained to predict text can complete sentences, but it is not yet a good assistant. So it is trained further with example conversations and with feedback from people who indicate which answers are more useful, correct and safe.',
              'This second phase teaches the model to follow instructions, to answer in the requested format and to refuse dangerous requests. It is what turns a “text completer” into an assistant you can talk to.',
            ]),
            theory(
              'Context: the working memory',
              [
                'In a conversation the model sees all the text inside its context window: your instructions, the previous messages, the documents you uploaded. It is its “working memory”.',
                'The window has a limit: very long conversations or huge documents can exceed it, and older parts may be summarized or dropped. Also, the model does not learn from your chats in real time: its basic knowledge stays the one from training.',
              ],
              {
                example:
                  'In the same chat you can write “make it shorter” without repeating the text, because it is in the context. In a new chat the model does not know what you are talking about.',
              },
            ),
            theory('Why it seems to understand (and why it sometimes gets it wrong)', [
              'Thanks to the amount of examples it has seen, the model captures very sophisticated relationships between concepts: that is why it can summarize, translate, explain and write code convincingly.',
              'But it does not look things up in an archive of verified answers: it builds each answer on the spot, choosing the most plausible text. When the information is rare, recent or very specific, plausible text can be wrong. Generation also includes some randomness: the same question can produce different answers.',
            ]),
          ],
          questions: [
            fillBlank(
              'Language models generate text one ___ at a time.',
              ['token', 'file', 'database', 'pixel'],
              0,
              'A token is the unit of text the model works with: a word, part of a word or a symbol.',
            ),
            trueFalse(
              'A language model looks up every answer in an archive of pre-written answers.',
              false,
              'The model generates each answer on the spot, based on the patterns learned during training.',
            ),
            choice(
              'What is the basic task a language model is trained on?',
              [
                'Translating into English',
                'Predicting the next piece of text',
                'Counting words',
                'Searching on Google',
              ],
              1,
              'By predicting the next text on huge amounts of data, the model learns language, facts and patterns.',
            ),
            choice(
              'What is the second training phase, with example conversations and human feedback, for?',
              [
                'Making the model faster',
                'Teaching it to follow instructions and answer in a useful, safe way',
                'Connecting it to the internet',
                'Reducing its cost',
              ],
              1,
              'This phase turns a text completer into a conversational assistant.',
            ),
            choice(
              'What is the context window?',
              [
                'The browser window',
                'The text the model can “see” in a conversation',
                'The list of saved chats',
                'The model’s user manual',
              ],
              1,
              'It includes instructions, previous messages and uploaded documents, up to a maximum limit.',
            ),
            trueFalse(
              'The model learns in real time from each of your conversations and updates its basic knowledge.',
              false,
              'Basic knowledge comes from training; the conversation only stays in the context.',
            ),
            choice(
              'Why can the same question produce different answers?',
              [
                'Because the model is broken',
                'Because generation includes some randomness',
                'Because the language changes',
                'Because the internet is slow',
              ],
              1,
              'The choice of the next tokens is not always identical: that is why answers can vary.',
            ),
            choice(
              'In which situation is a model most likely to make a mistake?',
              [
                'A summary of a text you gave it',
                'A very specific, poorly documented fact',
                'Fixing the grammar of a sentence',
                'A simple translation',
              ],
              1,
              'With rare, recent or very specific information, “plausible” text can be wrong.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Which technology is behind assistants such as ChatGPT, Claude and Gemini?',
          [
            'Spreadsheets',
            'Deep learning and language models',
            'Traditional search engines',
            'Hand-written rules',
          ],
          1,
          'They are large language models built with deep learning techniques.',
        ),
        trueFalse(
          'Deep learning is a subset of machine learning.',
          true,
          'Deep learning is a family of machine learning techniques based on deep neural networks.',
        ),
        choice(
          'What is a token?',
          [
            'A password to use AI',
            'A unit of text, such as a word or part of a word',
            'A type of image',
            'A subscription',
          ],
          1,
          'Models read and write text split into tokens.',
        ),
      ],
    },
    {
      title: 'What AI can do (and what it cannot)',
      description: 'Real capabilities, limits and how to recognize them.',
      lessons: [
        {
          title: 'The main capabilities',
          summary: 'Text, images, audio, video, code and research: a map of uses.',
          estimatedMinutes: 8,
          theory: [
            theory('Working with text', [
              'It is the most common use: drafting emails, articles and product descriptions; summarizing long documents; translating; proofreading; changing the tone of a text; brainstorming ideas and names.',
              'Assistants are especially useful as a “first collaborator”: they give you a starting point that you then review and personalize. The best result almost always comes from several rounds of revision.',
            ]),
            theory(
              'Analyzing documents and data',
              [
                'You can upload PDFs, contracts, spreadsheets, photos of receipts or charts and ask questions about the content: “what are the termination clauses?”, “which products are declining?”, “extract the data from this invoice”.',
                'With spreadsheets some assistants run real calculations and create charts. For important numbers, always ask them to show the working.',
              ],
              {
                example:
                  'Here is a photo of an invoice. Extract supplier, date, net amount, VAT and total into a table. If a value is not readable, write “not readable”.',
              },
            ),
            theory('Images, video and audio', [
              'Generative models create images from a text description and edit existing photos with spoken or written instructions (“change the background”, “make the light warmer”). Tools such as Midjourney and Nano Banana specialize in this.',
              'Other models generate short videos (Runway, Veo), realistic voices and dubbing (ElevenLabs), music (Suno). Audio also works the other way round: meeting recordings can be transcribed and summarized.',
            ]),
            theory(
              'Code, research and actions',
              [
                'Assistants explain, write and fix code; tools such as Cursor and Claude Code work directly on entire software projects.',
                'Some tools search the web and cite their sources (for example Perplexity), others answer only based on your documents (Gemini Notebook, formerly called NotebookLM). Finally, agents can carry out multi-step actions: searching, filling in, sending, always within the permissions you grant.',
              ],
              {
                tip: 'Pick the tool based on the task: a general assistant to write and reason, a specialized one for images, video, sourced research or automations.',
              },
            ),
            theory('Multimodal: several kinds of data together', [
              'Many modern assistants are multimodal: in the same conversation they can read text, look at images, listen to audio and, in some cases, analyze video.',
              'In practice you can take a photo of a problem (an error on screen, a paper form, a faulty product) and ask for help by describing it out loud or in writing, without transcribing anything.',
            ]),
          ],
          questions: [
            choice(
              'You want to turn a meeting recording into minutes. Which capabilities do you need?',
              [
                'Only image generation',
                'Audio transcription and text summarization',
                'Only translation',
                'None: AI does not work with audio',
              ],
              1,
              'First the audio is transcribed, then the text is summarized and organized.',
            ),
            trueFalse(
              'A multimodal assistant can analyze the content of a photo you upload.',
              true,
              'Multimodal means the model works with several kinds of data: text, images, sometimes audio and video.',
            ),
            choice(
              'Which tool is best suited to web research with cited sources?',
              ['Suno', 'Perplexity', 'Midjourney', 'ElevenLabs'],
              1,
              'Perplexity searches the web and shows the sources of every answer.',
            ),
            choice(
              'What should you ask for when AI makes important calculations on a spreadsheet?',
              ['More colors', 'To show the working', 'To answer in English', 'Nothing'],
              1,
              'Seeing the working lets you check formulas and steps.',
            ),
            fillBlank(
              'An assistant that works with text, images and audio is called ___.',
              ['multimodal', 'monolingual', 'offline', 'analog'],
              0,
              'Multimodal: able to handle several kinds of data in the same conversation.',
            ),
            choice(
              'Which of these tasks is typical of an AI agent?',
              [
                'Writing a single sentence',
                'Carrying out several steps, such as finding information and filling in a document',
                'Showing a photo',
                'Changing the screen color',
              ],
              1,
              'An agent carries out multi-step tasks using tools, within the permissions granted.',
            ),
            trueFalse(
              'The best way to use an assistant for writing is to publish the first draft right away without rereading it.',
              false,
              'AI gives you a starting point: the best result comes from review and personalization.',
            ),
            choice(
              'You need a narrator voice for a video in three languages. Which kind of tool are you looking for?',
              ['Image generation', 'Speech synthesis and dubbing', 'Spreadsheet', 'Search engine'],
              1,
              'Tools such as ElevenLabs specialize in voices and dubbing.',
            ),
          ],
        },
        {
          title: 'The limits: hallucinations, cutoff dates and bias',
          summary: 'Why AI sometimes gets it wrong, and how to notice in time.',
          estimatedMinutes: 9,
          theory: [
            theory('Hallucinations', [
              'A hallucination is a wrong answer delivered with confidence: an invented figure, a quote that does not exist, a court ruling that was never issued, a wrong legal reference, a software feature that is not there.',
              'It happens because the model is trained to produce plausible text, not to check the truth. A confident tone is not a sign of accuracy: in fact hallucinations are dangerous precisely because they sound credible.',
            ]),
            theory(
              'When the risk is higher',
              [
                'Questions about precise numbers, dates, names, quotes and bibliographic or legal references. Niche or very recent topics. Requests to summarize documents the model never actually received.',
                'The way you ask also matters: a question that takes a false fact for granted (“why does law X of 2025 require…?”) pushes the model to “go along with you”.',
              ],
              {
                tip: 'To reduce hallucinations: provide the documents yourself, ask it to cite the source of every claim and give it a way out: “If you do not know, write I DON’T KNOW”.',
              },
            ),
            theory('The knowledge cutoff', [
              'Every model has a training cutoff date (knowledge cutoff): what happened afterwards is not part of its basic knowledge. Prices, laws, software versions, office holders and news may have changed.',
              'Many assistants can search the web to make up for this. When the information depends on the present moment, make sure the tool really consulted up-to-date sources and check the dates of those sources.',
            ]),
            theory(
              'Bias',
              [
                'Models learn from texts written by people, so they can reproduce their prejudices and stereotypes: about gender, origin, age, professions. Bias can show up subtly, for example by always associating certain jobs with one gender.',
                'At work this matters most when AI helps to evaluate people (hiring, credit decisions) or produces communications aimed at different audiences.',
              ],
              {
                example:
                  'Ask: “Write 5 descriptions of ideal candidates for an engineering role” and check whether names, pronouns and examples are varied or all the same.',
              },
            ),
            theory('A balanced attitude', [
              'Knowing the limits does not mean giving up on AI: it means using it the right way. It is excellent for drafts, ideas, summaries of texts you provide, rewording and explanations of well-known concepts.',
              'Caution, and a check, are needed for specific facts, numbers, legal, tax and health topics and any decision with important consequences. Practical rule: the higher the stakes, the more thorough the check.',
            ]),
          ],
          questions: [
            choice(
              'Which of these is a hallucination?',
              [
                'The model answers in French instead of English',
                'The model cites a court ruling that does not exist',
                'The model gives an answer that is too long',
                'The model asks for clarification',
              ],
              1,
              'Inventing sources, figures or facts and presenting them as true is the typical example of a hallucination.',
            ),
            fillBlank(
              'A model without web access does not know about events after its ___ cutoff.',
              ['training', 'installation', 'purchase', 'registration'],
              0,
              'Basic knowledge stops at the data used during training.',
            ),
            trueFalse(
              'If an AI answers in a very confident tone, the answer is reliable.',
              false,
              'A confident tone does not mean accuracy: hallucinations are dangerous precisely because they sound credible.',
            ),
            choice(
              'Which instruction helps reduce hallucinations?',
              [
                '“Answer faster”',
                '“If you do not know, write I DON’T KNOW”',
                '“Use a confident tone”',
                '“Write at least 500 words”',
              ],
              1,
              'An explicit way out stops the model from filling the gap with invented information.',
            ),
            choice(
              'What does it mean that a model has a bias?',
              [
                'That it is slow',
                'That it can reproduce prejudices found in its training data',
                'That it does not speak English',
                'That it costs too much',
              ],
              1,
              'Models learn from human texts, including the prejudices they contain.',
            ),
            choice(
              'In which case is it most important to check the answer?',
              [
                'An idea for the name of an event',
                'The tax rate to apply on an invoice',
                'A synonym for a word',
                'A joke for a post',
              ],
              1,
              'Tax, legal and numeric data should always be checked against official sources.',
            ),
            trueFalse(
              'A question that takes a false fact for granted can push the model to go along with it.',
              true,
              'The model tends to answer consistently with the question: check the premises before asking.',
            ),
            choice(
              'You need the current price of a service. What do you do?',
              [
                'I trust the model’s basic knowledge',
                'I use a tool with web search and check the date of the source',
                'I ask it to invent a plausible price',
                'I use an image generator',
              ],
              1,
              'Information that changes over time must be checked against up-to-date sources.',
            ),
          ],
        },
      ],
      quiz: [
        trueFalse(
          'If an AI answers confidently, the answer is certainly correct.',
          false,
          'Hallucinations are exactly wrong answers given with confidence.',
        ),
        choice(
          'What does “knowledge cutoff” mean?',
          [
            'The word limit of an answer',
            'The cutoff date of the training data',
            'The cost of a subscription',
            'The number of users',
          ],
          1,
          'It is the date after which the model has no basic knowledge.',
        ),
        choice(
          'Which activity is best suited to AI without particular checks?',
          [
            'Brainstorming ideas for a post',
            'Calculating the taxes to pay',
            'Quoting articles of law',
            'Giving a medical diagnosis',
          ],
          0,
          'Ideas and drafts are low risk; numbers, laws and health need checking.',
        ),
      ],
    },
    {
      title: 'Using AI responsibly',
      description: 'Privacy, fact-checking and good habits.',
      lessons: [
        {
          title: 'Privacy and sensitive data',
          summary: 'What never to paste into a chatbot and how to work safely.',
          estimatedMinutes: 8,
          theory: [
            theory('Where your data goes', [
              'When you write to an AI assistant, your text and files are sent to and processed on the provider’s servers. Depending on the service, the plan and the settings, conversations may be kept for some time and, in some cases, used to improve the models.',
              'Business and enterprise versions usually offer stronger contractual guarantees, for example excluding your data from training. Before using AI with work data, find out which version your company uses.',
            ]),
            theory(
              'What not to share',
              [
                'Passwords, access codes and API keys. Payment card numbers and bank details. Health data. Personal data of customers or employees (names, addresses, phone numbers, emails). Confidential documents: non-public contracts, strategies, internal financial data.',
                'Watch out for images too: a screenshot can contain information you did not notice, such as names in a chat or figures in a table in the background.',
              ],
              {
                tip: 'Quick rule: if you would not email it to a stranger, do not paste it into a public chatbot.',
              },
            ),
            theory(
              'Anonymize: the same help, less risk',
              [
                'You can often get exactly the same help by replacing real data with placeholders: “Customer A”, “Supplier X”, “amount 1,000 €”. The AI does not need the real name to write a good payment reminder.',
                'For documents, remove or black out the sensitive parts before uploading them, or paste only the passage you need.',
              ],
              {
                example:
                  'Before: “Write a payment reminder to John Smith, 12 High Street, for invoice 2024/118 of 3,420 €”.\nAfter: “Write a polite payment reminder to a customer for an invoice that is 30 days overdue”.',
              },
            ),
            theory('Settings and company rules', [
              'Many services let you switch off the use of conversations for training, use temporary chats and delete your history. Check these settings in your account.',
              'At work, follow your company’s AI policy: which tools are approved, which data is allowed, who is responsible. If there is no policy, it is a good time to propose one.',
            ]),
            theory('The legal framework in brief', [
              'In Europe the processing of personal data is governed by the GDPR and the use of artificial intelligence by the AI Act, which introduces obligations that grow with the risk level of each system.',
              'For everyday use the practical principle is simple: minimize the personal data you share, use approved tools and, in doubtful cases, ask whoever handles privacy or a lawyer.',
            ]),
          ],
          questions: [
            choice(
              'Which of these is safe to paste into a public chatbot?',
              [
                'The password of the company management software',
                'A marketing text already published on your website',
                'The customer list with emails and phone numbers',
                'An employee’s medical reports',
              ],
              1,
              'Content that is already public exposes nothing confidential. The others are sensitive or personal data.',
            ),
            trueFalse(
              'Replacing real names and data with placeholders is a good way to protect privacy.',
              true,
              'Anonymizing lets you get help without exposing personal or confidential information.',
            ),
            choice(
              'Why can a screenshot be risky?',
              [
                'Because the file is too big',
                'Because it can contain sensitive information you did not notice',
                'Because AI cannot read images',
                'Because it is always blurry',
              ],
              1,
              'Names, emails or figures in the background can end up in the conversation without you noticing.',
            ),
            choice(
              'What do business versions of AI assistants usually offer?',
              [
                'More emojis',
                'Stronger contractual guarantees on data',
                'Longer answers',
                'No difference',
              ],
              1,
              'For example excluding data from training and admin controls.',
            ),
            fillBlank(
              'In Europe the use of artificial intelligence is regulated by the ___.',
              ['AI Act', 'VAT', 'ISO 9001', 'Euro 6'],
              0,
              'The AI Act introduces obligations based on the risk level; the GDPR governs personal data.',
            ),
            trueFalse(
              'If some data is useful to the AI, it is always worth sharing it, even when it is personal.',
              false,
              'The principle is to minimize: the same result can often be achieved with anonymized data.',
            ),
            choice(
              'Which setting is worth checking in your account?',
              [
                'The theme color',
                'Whether conversations are used for training, and the chat history',
                'The font size',
                'The language of notifications',
              ],
              1,
              'Many services let you exclude chats from training and manage your history.',
            ),
            choice(
              'Your company has no AI policy. What is the most sensible thing to do?',
              [
                'Use any tool with any data',
                'Propose rules on approved tools and allowed data',
                'Ban everything forever',
                'Ignore the issue',
              ],
              1,
              'A clear policy lets you use AI with its benefits and risks under control.',
            ),
          ],
        },
        {
          title: 'Checking the answers',
          summary: 'A 4-step method to trust AI (just the right amount).',
          estimatedMinutes: 8,
          theory: [
            theory('Why you need a method', [
              'We have seen that AI can be confidently wrong. The solution is not to check everything all the time, but to have a method proportionate to how important the answer is.',
              'An idea for a post needs no checking. A figure that will end up in a contract, an invoice or a business decision does.',
            ]),
            theory('The 4 steps of checking', [
              '1. Ask for the sources: use tools that search the web and cite where they get their information, or provide the reference documents yourself.',
              '2. Open the sources and check that they really say what the AI reports: sometimes the link does not exist or the content is different. 3. Compare with a second authoritative, independent source (official website, official documentation). 4. For important decisions, ask a professional.',
            ]),
            theory(
              'Make AI work against its own mistakes',
              [
                'You can ask the model to critically review its own answer: “Which parts of this answer might be inaccurate, outdated or worth checking?”.',
                'Another technique is to ask the same thing in a different way, or a second assistant, and compare: if the answers differ, that is a sign a check is needed.',
              ],
              {
                tip: 'Self-review helps find the weak spots, but it does not replace checking against external sources.',
              },
            ),
            theory(
              'Reliable sources',
              [
                'For laws, taxes and obligations: official government websites (official journals, tax authorities, the European Commission). For products and software: the manufacturer’s official documentation. For statistics: statistical institutes and primary sources.',
                'Be wary of anonymous pages, undated content and articles that copy other articles without citing where they come from.',
              ],
              {
                example:
                  'Question: “How many days do I have to return an online purchase in the EU?”\nCheck: open the official source cited and make sure the number of days and the exceptions match.',
              },
            ),
            theory('Document and share', [
              'When an AI answer goes into a work document, write down the sources you checked. That way readers know where the information comes from and you can check it again later.',
              'In a team it pays to agree a simple rule: AI-generated content containing facts or numbers is always checked by a person before it is published or sent.',
            ]),
          ],
          questions: [
            order(
              'Put the checking method in order.',
              [
                'Ask which sources the information comes from',
                'Open the sources and check the content',
                'Compare with a second authoritative source',
                'For important decisions, consult a professional',
              ],
              'You start from the sources, check them, compare them and, when the stakes are high, ask an expert.',
            ),
            choice(
              'The AI gives you a link as a source. What do you do?',
              [
                'I consider it reliable without opening it',
                'I open the link and check that it really says what the AI reports',
                'I always ignore it',
                'I ask the AI to confirm it is right',
              ],
              1,
              'Cited sources must be opened too: sometimes the content does not match or the link does not exist.',
            ),
            trueFalse(
              'Asking the AI to review its own answer guarantees that it is correct.',
              false,
              'It helps bring out mistakes, but checking against external sources is still necessary.',
            ),
            choice(
              'Which source is most reliable for a tax rule?',
              [
                'An anonymous forum',
                'The official tax authority website',
                'An undated social media post',
                'A video with no sources',
              ],
              1,
              'For laws and taxes, official government sources are the reference.',
            ),
            choice(
              'Two assistants give different answers to the same question. What does it mean?',
              [
                'That one of them is broken',
                'That a check against external sources is needed',
                'That both are right',
                'Nothing important',
              ],
              1,
              'A difference is a sign of uncertainty: it is time to check.',
            ),
            trueFalse(
              'An idea for a post title needs the same level of checking as a figure going into a contract.',
              false,
              'The check should be proportionate to the stakes.',
            ),
            fillBlank(
              'When an AI answer goes into a work document, it is good practice to note the ___ you checked.',
              ['sources', 'emojis', 'passwords', 'tabs'],
              0,
              'Noting the sources makes the document verifiable by anyone.',
            ),
            choice(
              'Which question helps reveal the weak spots of an answer?',
              [
                '“Are you 100% sure?”',
                '“Which parts of this answer might be inaccurate or outdated?”',
                '“Rewrite it with more enthusiasm”',
                '“Translate it into French”',
              ],
              1,
              'A specific question about possible errors produces a more useful review than a generic “are you sure?”.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'What is best to do before asking AI for help with a document containing customer data?',
          ['Nothing', 'Anonymize the personal data', 'Add more data', 'Translate it into French'],
          1,
          'Removing or replacing personal data reduces privacy risks.',
        ),
        choice(
          'What is the first step of the checking method?',
          [
            'Consult a lawyer',
            'Ask which sources the information comes from',
            'Share the answer',
            'Ask the question again in another language',
          ],
          1,
          'You start from the sources, so that you can then check them.',
        ),
        trueFalse(
          'Conversations with an AI assistant are processed on the provider’s servers.',
          true,
          'That is why it matters which data you share and with which service.',
        ),
      ],
    },
  ],
  finalTest: [
    choice(
      'How does a language model generate answers?',
      [
        'It copies answers from an archive',
        'It predicts one token at a time based on learned patterns',
        'It asks a human operator',
        'It only uses hand-written rules',
      ],
      1,
      'The model generates text token by token.',
    ),
    trueFalse(
      'Language models always know today’s events.',
      false,
      'Without web access their knowledge stops at the training cutoff.',
    ),
    choice(
      'Which data should you NOT paste into a public chatbot?',
      [
        'A text published on your blog',
        'A general grammar question',
        'Your credit card number',
        'An idea for a title',
      ],
      2,
      'Payment data and credentials must never be shared.',
    ),
    choice(
      'What is the right attitude towards AI answers?',
      [
        'Always trust them',
        'Never use AI',
        'Use it as an assistant and check important information',
        'Only use it in English',
      ],
      2,
      'AI is a great assistant, but important decisions need checking.',
    ),
  ],
});
