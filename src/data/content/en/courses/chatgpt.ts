import {
  choice,
  defineCourse,
  fillBlank,
  order,
  promptFix,
  theory,
  trueFalse,
} from '@/features/courses/builder';

export const chatgptCourse = defineCourse({
  id: 'chatgpt-pro',
  title: 'ChatGPT from zero to pro',
  subtitle: 'From your first question to everyday workflows',
  description:
    'Learn to use ChatGPT in a practical, professional way: how to set up conversations, how to iterate, how to analyze files and data, how to customize the assistant and how to turn repetitive tasks into quick workflows. The same techniques work with Claude and Gemini too.',
  category: 'chatbots',
  level: 'beginner',
  tools: ['ChatGPT', 'Claude', 'Gemini'],
  outcomes: [
    'Get useful answers on the first try, without endless attempts',
    'Improve results by iterating with targeted instructions',
    'Analyze documents, PDFs and spreadsheets with AI',
    'Create instructions, projects and custom assistants for your work',
  ],
  requiredTier: 'free',
  icon: 'chatbubbles-outline',
  modules: [
    {
      title: 'First steps',
      description: 'The interface, your first conversation and using context.',
      lessons: [
        {
          title: 'Your first conversation',
          summary: 'How the interface is laid out and how to write a good request.',
          estimatedMinutes: 8,
          theory: [
            theory('How the interface is organized', [
              'ChatGPT, like Claude and Gemini, is organized into conversations (chats). On the left you find the list of previous chats, in the middle the active conversation and at the bottom the box where you type. Next to the box there are buttons to attach files, use your voice and turn on tools such as web search.',
              'At the top you can often choose which model to use: faster models for simple requests, models with deeper reasoning for complex problems. The options available depend on your plan.',
            ]),
            theory(
              'One chat, one topic',
              [
                'Each chat remembers the previous messages inside it: you can ask follow-up questions without repeating everything. A new chat starts “clean”, knowing nothing about earlier conversations (unless a memory feature is turned on).',
                'The practical rule is to open one chat for each topic or project. Mixing different subjects in the same conversation muddles the context and makes the answers worse.',
              ],
              {
                tip: 'Rename your important chats (e.g. “Winter helmet product pages”): finding them again will be much easier.',
              },
            ),
            theory(
              'Vague questions, vague answers',
              [
                'The quality of the answer depends heavily on the quality of the request. “Write me a post” produces a generic text, because the model has to guess audience, channel, tone and goal.',
                'A good request answers four questions: who is it for, what is it for, what form should it take, what tone should it use.',
              ],
              {
                example:
                  'Vague: “Write a post about helmets.”\nBetter: “Write an Instagram post for an online motorcycle helmet shop. Audience: riders aged 25-45. Topic: how to choose the right size. Friendly tone, maximum 120 words, 3 hashtags.”',
              },
            ),
            theory('Voice, images and files', [
              'You do not have to type: you can dictate your question, upload a photo (a form, an error on the screen, a product) or attach a document.',
              'It is especially handy on the go: you take a picture of a quote you received and ask “summarize the main terms and tell me what is missing compared with a standard quote”.',
            ]),
            theory('What to expect from the first answer', [
              'The first answer is a draft, not the final result. Read it critically: what works, what is missing, what is too much? In the next lesson we will see how to improve it with targeted instructions.',
              'Also remember the limits covered in the introductory course: for data, numbers and recent information, always check the sources.',
            ]),
          ],
          questions: [
            choice(
              'You want to switch to a completely different topic from the current chat. What is best?',
              [
                'Carry on in the same chat',
                'Open a new chat',
                'Delete your account',
                'Write everything in capitals',
              ],
              1,
              'A new chat stops the previous context from influencing the answers on the new topic.',
            ),
            trueFalse(
              'Within the same chat, the assistant takes the previous messages into account.',
              true,
              'That is why you can ask “make it shorter” without repeating the text.',
            ),
            choice(
              'Which request will probably produce the best result?',
              [
                '“Write a post.”',
                '“Instagram post for a helmet shop, audience aged 25-45, topic choosing the size, friendly tone, max 120 words.”',
                '“Do something about helmets.”',
                '“Post.”',
              ],
              1,
              'It specifies audience, channel, topic, tone and length: the model does not have to guess.',
            ),
            fillBlank(
              'A good request says who it is for, what it is for, what form it should take and what ___ to use.',
              ['tone', 'font', 'password', 'browser'],
              0,
              'Audience, goal, format and tone are the key pieces of information.',
            ),
            trueFalse(
              'The first AI answer should be treated as the final result and published right away.',
              false,
              'It is a draft to evaluate and improve.',
            ),
            choice(
              'Why is it worth renaming your important chats?',
              [
                'To save tokens',
                'To find them easily',
                'Because it is mandatory',
                'To change model',
              ],
              1,
              'A clear name makes it easy to get back to the work you did.',
            ),
            choice(
              'You have a paper quote. What is the quickest way to get it analyzed?',
              [
                'Copy it out by hand',
                'Take a photo and upload it to the chat',
                'Dictate it word by word',
                'It cannot be done',
              ],
              1,
              'Multimodal assistants read the content of images.',
            ),
            choice(
              'What do the models and tools you can choose in the interface depend on?',
              [
                'The theme color',
                'Your plan and the service you use',
                'Your phone’s language',
                'The time of day',
              ],
              1,
              'Available models and features vary with the service and the plan.',
            ),
          ],
        },
        {
          title: 'Context and follow-up questions',
          summary: 'The secret is to iterate: improve the answer step by step.',
          estimatedMinutes: 9,
          theory: [
            theory('Iterate instead of starting over', [
              'The first answer is rarely perfect. Instead of rewriting the whole request from scratch, give targeted instructions in the same chat: “more formal”, “remove the second paragraph”, “add a concrete example”, “cut it in half”.',
              'Each instruction adds to the previous ones: in three or four steps you reach a tailored result, often much faster than writing the text from scratch.',
            ]),
            theory(
              'Effective revision instructions',
              [
                'Be specific about what to change and what to keep: “keep the structure, but make the tone warmer”. Give the reason when it helps: “the audience is expert customers, skip basic explanations”.',
                'You can also quote the part to change: “in the shipping paragraph, say that returns are free within 30 days”.',
              ],
              {
                example:
                  '1) “Write a welcome email for new newsletter subscribers.”\n2) “Shorter, maximum 80 words.”\n3) “Add the discount code WELCOME10, valid for 7 days.”\n4) “Suggest 3 alternative subject lines.”',
              },
            ),
            theory('Ask for variants', [
              'When you are not sure exactly what you want, ask for several versions: “give me 3 versions with different tones: formal, friendly, ironic”. Comparing them helps you understand what you prefer.',
              'You can then combine them: “take the opening of version 2 and the ending of version 3”.',
            ]),
            theory(
              'Let it interview you',
              [
                'For complex requests, ask the assistant to ask you questions before answering: “Before writing the plan, ask me the questions you need to give me the best result”.',
                'The model will ask for information you may not have thought of providing (budget, deadlines, audience, constraints), and the final answer will be much more relevant.',
              ],
              {
                tip: 'This technique is invaluable for quotes, marketing plans, documents and projects with many variables.',
              },
            ),
            theory('When to start over', [
              'If after many steps the conversation has become confused, or the model keeps repeating the same mistake, it is better to open a new chat with a better initial request that includes everything you learned in the previous attempts.',
              'A useful trick: ask the model to summarize the requirements that came up in the conversation, then use that summary as the starting prompt in the new chat.',
            ]),
          ],
          questions: [
            choice(
              'The answer is fine but too long. What is the best move?',
              [
                'Open a new chat and rewrite everything',
                'Write: “Cut it in half while keeping the key points”',
                'Copy it and shorten it by hand',
                'Ask the same thing in French',
              ],
              1,
              'A targeted instruction in the same chat is the fastest way to improve the result.',
            ),
            promptFix({
              instruction:
                'Rewrite this request adding the recipient, what is delayed, the tone and the goal.',
              weakPrompt: 'Write an email about the delay.',
              checks: [
                {
                  label: 'Says who the recipient is',
                  keywords: [
                    'customer',
                    'client',
                    'supplier',
                    'recipient',
                    'boss',
                    'colleague',
                    'manager',
                  ],
                },
                {
                  label: 'Explains what is delayed',
                  keywords: [
                    'order',
                    'delivery',
                    'shipment',
                    'shipping',
                    'project',
                    'payment',
                    'invoice',
                  ],
                },
                {
                  label: 'Specifies the tone',
                  keywords: [
                    'tone',
                    'polite',
                    'formal',
                    'professional',
                    'friendly',
                    'empath',
                    'courteous',
                  ],
                },
                {
                  label: 'States a goal or a length',
                  keywords: [
                    'words',
                    'short',
                    'lines',
                    'goal',
                    'offer',
                    'apolog',
                    'solution',
                    'propose',
                  ],
                },
              ],
              sampleAnswer:
                'Write a polite, professional email to a customer to explain a 5-day delay in the delivery of their order. Apologize, explain that it is due to the courier and offer a 10% discount on their next purchase. Maximum 120 words.',
            }),
            trueFalse(
              'You can ask the assistant to ask you questions before it answers.',
              true,
              'It is a useful technique when the request is complex or you are not sure what is needed.',
            ),
            choice(
              'Which revision instruction is most effective?',
              [
                '“Improve it.”',
                '“Keep the structure but make the tone warmer and remove the technical terms.”',
                '“I don’t like it.”',
                '“Do it again.”',
              ],
              1,
              'It says what to change and what to keep.',
            ),
            choice(
              'You do not know which tone you prefer for an announcement. What do you ask for?',
              [
                'A very long text',
                '3 versions with different tones to compare',
                'To pick at random',
                'To use no tone',
              ],
              1,
              'Variants help you understand what you prefer and combine them.',
            ),
            fillBlank(
              'Before switching chat, you can ask the model to ___ the requirements that came up and use them as the new prompt.',
              ['summarize', 'delete', 'translate', 'color'],
              0,
              'The summary of the requirements becomes an excellent starting prompt.',
            ),
            order(
              'Put a typical iterative work cycle in order.',
              [
                'Initial request with context',
                'Critical reading of the draft',
                'Targeted revision instructions',
                'Final version to check',
              ],
              'You start from a good request, evaluate, correct and check the result.',
            ),
            trueFalse(
              'If the model repeats the same mistake after many attempts, it may be worth opening a new chat with a better request.',
              true,
              'A confused context makes answers worse; starting again with clear requirements often solves it.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'What improves the quality of an answer the most?',
          [
            'Writing in capitals',
            'Giving context: recipient, goal, format and tone',
            'Using very short sentences',
            'Asking the question twice',
          ],
          1,
          'The more relevant context you give, the more tailored the answer.',
        ),
        choice(
          'When is it worth opening a new chat?',
          [
            'With every message',
            'When you change topic or project',
            'Never',
            'Only in the evening',
          ],
          1,
          'One chat per topic keeps the context clean.',
        ),
      ],
    },
    {
      title: 'Advanced features',
      description: 'Files, data and customization.',
      lessons: [
        {
          title: 'Analyzing documents and data',
          summary: 'PDFs, contracts and spreadsheets: ask the right questions.',
          estimatedMinutes: 9,
          theory: [
            theory('What you can upload', [
              'The main assistants accept PDFs, text documents, presentations, spreadsheets, images and, in some cases, audio files. You can upload several in the same conversation and ask for comparisons.',
              'Typical requests are: summarize, extract specific information, compare versions, find inconsistencies, turn the content into another format (table, list, email).',
            ]),
            theory(
              'Questions anchored to the document',
              [
                'To reduce the risk of invented answers, explicitly ask it to rely only on the document and to show where each piece of information is: “Answer only based on the attached contract and cite the relevant clause”.',
                'If a piece of information is not there, the model must say so: “If the document does not specify it, write NOT PRESENT”.',
              ],
              {
                example:
                  'I am uploading the supply contract. List in a table: duration, termination conditions, penalties and payment terms. For each item give the clause. If an item is missing, write NOT PRESENT.',
              },
            ),
            theory('Working with spreadsheets', [
              'With an Excel or CSV file you can ask for real analysis: totals by category, comparisons between periods, declining products, outliers, charts. Some assistants run code to do the calculations, which makes them far more reliable than “mental arithmetic”.',
              'Describe the columns well if their names are unclear (“column Q holds the quantities sold”) and always ask to see the working for numbers you will use in important decisions.',
            ]),
            theory(
              'Long documents',
              [
                'With very long documents it is better to work in parts: first a table of contents, then questions on individual sections. That way you reduce the risk of important details being overlooked.',
                'For comparisons between versions (e.g. two contract drafts) ask for a table of differences quoting the exact passages that changed.',
              ],
              {
                tip: 'For confidential documents remember the privacy rules: anonymize, or use the approved business version.',
              },
            ),
            theory('Spot checks', [
              'Even when the AI cites the sections, spot-check two or three points by opening the original document. If you find a mistake, point it out in the chat and ask it to check everything again more carefully.',
            ]),
          ],
          questions: [
            choice(
              'How do you reduce the risk of invented answers when analyzing a PDF?',
              [
                'By asking it to answer only based on the document and to cite the section',
                'By uploading the file twice',
                'By only asking yes/no questions',
                'It cannot be reduced',
              ],
              0,
              'Anchoring the answer to the text and asking for references also lets you check quickly.',
            ),
            fillBlank(
              'For important calculations on a spreadsheet, ask the AI to show the ___.',
              ['working', 'logo', 'color', 'title'],
              0,
              'Seeing the working lets you check formulas and steps.',
            ),
            trueFalse(
              'With very long documents it is better to work in parts, starting from a table of contents.',
              true,
              'Working section by section reduces the risk of overlooking important details.',
            ),
            choice(
              'You want to compare two versions of a contract. What do you ask for?',
              [
                'A generic summary',
                'A table of differences with the passages that changed',
                'A translation',
                'An image',
              ],
              1,
              'A table with quotes makes the comparison verifiable.',
            ),
            choice(
              'What do you do if the column names in your file are unclear?',
              [
                'Nothing',
                'Explain what the columns mean in your request',
                'Change assistant',
                'Delete the columns',
              ],
              1,
              'Describing the data avoids wrong interpretations.',
            ),
            trueFalse(
              'If the AI cites the sections of the document, there is never any need to check anything.',
              false,
              'A spot check is still good practice.',
            ),
            choice(
              'Which instruction helps handle missing information?',
              [
                '“Make it up if needed”',
                '“If the document does not specify it, write NOT PRESENT”',
                '“Be creative”',
                '“Answer briefly”',
              ],
              1,
              'An explicit way out stops the model from filling in the gaps.',
            ),
            choice(
              'Why is it useful for the assistant to run code for calculations?',
              [
                'It is more colorful',
                'The calculations are much more reliable',
                'It costs less',
                'It is pointless',
              ],
              1,
              'Calculations run in code avoid the mistakes of “calculating in words”.',
            ),
          ],
        },
        {
          title: 'Customization: instructions, memory and projects',
          summary: 'Make sure the assistant already knows you and your work.',
          estimatedMinutes: 8,
          theory: [
            theory('Stop repeating who you are', [
              'The main assistants let you save custom instructions: information about you (role, industry) and about how you like your answers (language, length, format, tone). They are applied automatically to every new conversation.',
              'The names and location of these settings vary between services and versions, but the principle is the same everywhere.',
            ]),
            theory(
              'What to write in your instructions',
              [
                'Good instructions are short and concrete: role, industry, audience, preferred style and things to avoid. Avoid generic phrases like “be good”: they change nothing.',
                'You can also add useful safety rules: “flag when a piece of information may have changed”, “do not invent data: if you don’t know, say so”.',
              ],
              {
                example:
                  'I run an online shop for motorcycle accessories. Answer in English, concisely, with bullet points where useful. In texts for customers use a warm, professional tone. If you are not sure about a fact, say so explicitly.',
              },
            ),
            theory('Memory', [
              'Some assistants have memory across conversations: they remember information you shared (preferences, projects) to use it later. You can usually see what they remember, edit it and delete it.',
              'It is convenient, but remember privacy: avoid having sensitive data stored and regularly check what has been saved.',
            ]),
            theory(
              'Projects and workspaces',
              [
                'Projects (or similar spaces) gather in one place the chats, reference files and specific instructions for a topic: for example “Product pages”, with the price list, the brand’s tone of voice and a few examples of good product pages.',
                'Every new chat inside the project starts with that context already: you do not need to upload the files again or explain the rules again.',
              ],
              {
                tip: 'Create a project for every important recurring task: it is the simplest way to get consistent results over time.',
              },
            ),
            theory('When not to customize', [
              'Overly rigid instructions can make answers on unusual topics worse: if you write “always answer in 3 lines”, even a complex explanation will be cut short. Flexible rules work better (“be concise, unless I ask for detail”), plus specific instructions inside individual projects.',
            ]),
          ],
          questions: [
            trueFalse(
              'Custom instructions save you from repeating in every chat who you are and how you want your answers.',
              true,
              'They are applied automatically to new conversations.',
            ),
            choice(
              'Which of these is an effective custom instruction?',
              [
                '“Be good.”',
                '“I am a tax advisor: answer in English, cite the relevant rule and flag when a piece of information may have changed.”',
                '“Answer.”',
                '“Use lots of emojis.”',
              ],
              1,
              'It is specific: it says who you are, the language, the format and a safety behavior.',
            ),
            choice(
              'What is a “project” in an AI assistant for?',
              [
                'Paying less',
                'Gathering chats, files and instructions for a specific topic',
                'Deleting chats',
                'Changing the language',
              ],
              1,
              'It keeps the context of a piece of work together, so you do not have to reload it every time.',
            ),
            trueFalse(
              'All customization features are identical in every service and plan.',
              false,
              'Names and availability vary between services and plans and change over time.',
            ),
            choice(
              'What is one risk of memory across conversations?',
              [
                'It slows down your phone',
                'Sensitive data may be stored',
                'It changes the language',
                'None',
              ],
              1,
              'Regularly check what is remembered and delete what is not needed.',
            ),
            choice(
              'Why can “always answer in 3 lines” be a bad instruction?',
              [
                'Because it is too long',
                'Because it also cuts short explanations that need more room',
                'Because it is in English',
                'It is not bad',
              ],
              1,
              'Flexible rules with explicit exceptions work better.',
            ),
            fillBlank(
              'In a project for product pages it is worth attaching the price list, the brand’s tone of voice and a few ___ of good pages.',
              ['examples', 'viruses', 'passwords', 'receipts'],
              0,
              'Examples show the model the style and format to follow.',
            ),
            choice(
              'What should you add to your instructions to reduce mistakes?',
              [
                '“Always be confident”',
                '“If you are not sure about a fact, say so explicitly”',
                '“Answer quickly”',
                '“Do not ask questions”',
              ],
              1,
              'A transparency rule helps you spot the answers that need checking.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'What can you ask about an uploaded spreadsheet?',
          [
            'Only to change the font',
            'Calculations, charts and spotting anomalies',
            'Nothing',
            'Only to translate the headings',
          ],
          1,
          'AI can analyze the data, but important results must be checked.',
        ),
      ],
    },
    {
      title: 'ChatGPT at work',
      description: 'Professional use cases and repeatable workflows.',
      lessons: [
        {
          title: 'Emails, summaries and reports',
          summary: 'Three everyday tasks you can cut in half.',
          estimatedMinutes: 9,
          theory: [
            theory(
              'Faster emails',
              [
                'Paste the email you received and say what you want to achieve with your reply: “accept the proposal but move delivery to Monday”, “decline politely and suggest an alternative”. The AI takes care of form and tone, you take care of the content.',
                'For delicate emails (complaints, reminders, negotiations) ask for two versions with different tones and pick the one that best fits your relationship with that person.',
              ],
              {
                example:
                  'Reply to this email from the supplier. Goal: accept the new price list but ask to keep the old prices for orders already confirmed. Warm but firm tone, maximum 120 words.',
              },
            ),
            theory('Summaries that are actually useful', [
              'A useful summary is not just “shorter”: it is organized for whoever reads it. Explicitly ask for key points, decisions, actions, owners and deadlines.',
              'For meeting minutes, a fixed structure (decisions / actions / open points) makes summaries comparable from one meeting to the next.',
            ]),
            theory(
              'Reports from raw data',
              [
                'Provide the data (or the file) and ask for a precise structure: a summary in a few lines, key figures, issues to watch, recommended actions. Say who will read the report: an owner, a team, a client.',
              ],
              {
                example:
                  'Here are October sales by category. Write a report for the owner: 1) summary in 3 lines, 2) table with the top 5 categories, 3) two issues to watch, 4) three recommended actions.',
              },
            ),
            theory('Always specify the output format', [
              'Table, bullet list, email ready to send, text for a slide, maximum N words: stating the format saves you the work of reformatting.',
              'If you need to paste the result into another tool (spreadsheet, management software), ask for a compatible format, for example a table with specific columns.',
            ]),
            theory('Final check', [
              'Before sending: check names, figures, dates and promises. The AI may have added details you did not ask for (a discount, a delivery date) that you cannot guarantee. Always read the email as if you were the recipient.',
            ]),
          ],
          questions: [
            order(
              'Put the sections of a good short report in order.',
              ['Summary in a few lines', 'Key figures', 'Issues to watch', 'Next steps'],
              'First the main message, then the data that supports it, the risks and finally the actions.',
            ),
            promptFix({
              instruction:
                'Improve this summary request by stating the format and the content to extract.',
              weakPrompt: 'Summarize these minutes.',
              checks: [
                {
                  label: 'States the format',
                  keywords: ['points', 'bullet', 'list', 'table', 'lines', 'words'],
                },
                {
                  label: 'Asks for actions or decisions',
                  keywords: ['action', 'decision', 'to do', 'to-do', 'task'],
                },
                {
                  label: 'Asks for deadlines or owners',
                  keywords: ['deadline', 'date', 'owner', 'responsib', 'who does', 'due'],
                },
              ],
              sampleAnswer:
                'Summarize these minutes in 5 key points. Then list in a table the decisions taken, the actions to do, the owner of each one and the deadline.',
            }),
            choice(
              'What makes a report request more effective?',
              [
                'Asking “make a report”',
                'Stating the structure, the format and who will read it',
                'Writing everything in French',
                'Not providing data',
              ],
              1,
              'Structure, format and reader produce a report that is ready to use.',
            ),
            trueFalse(
              'Before sending an email written with AI, it is worth checking names, figures, dates and promises.',
              true,
              'The AI may add details you cannot guarantee.',
            ),
            choice(
              'For a reply email, what is most important to tell the AI?',
              [
                'The font to use',
                'What you want to achieve with the reply',
                'The length of the signature',
                'The color of the logo',
              ],
              1,
              'You decide the content and the goal; the AI handles form and tone.',
            ),
            fillBlank(
              'A fixed structure for minutes is: decisions, ___, open points.',
              ['actions', 'emojis', 'images', 'passwords'],
              0,
              'Decisions, actions and open points make minutes useful and comparable.',
            ),
            choice(
              'You need to paste the result into a spreadsheet. What do you ask for?',
              ['Free text', 'A table with specific columns', 'An image', 'An audio file'],
              1,
              'A compatible format avoids reformatting work.',
            ),
            choice(
              'For a delicate complaint, which approach is most useful?',
              [
                'A single aggressive version',
                'Two versions with different tones to choose from',
                'No reply',
                'Copying a template found online',
              ],
              1,
              'Comparing different tones helps you pick the one that best fits the relationship.',
            ),
          ],
        },
        {
          title: 'Custom assistants and repeatable workflows',
          summary: 'Turn a good prompt into a reusable tool.',
          estimatedMinutes: 8,
          theory: [
            theory('From prompt to tool', [
              'If you often do the same task (replying to reviews, writing product pages, preparing quotes), the prompt that works best is an asset: save it and reuse it instead of rewriting it each time.',
              'The next step is to create a custom assistant: in ChatGPT they are called GPTs, other services have similar features. It holds fixed instructions, reference files and sometimes connected tools; whoever uses it only enters the variable data.',
            ]),
            theory(
              'What to put in a custom assistant',
              [
                'Role and goal (“you help customer service reply to reviews”). Steps to follow. Output format. Examples of good answers. What not to do (“do not promise refunds”, “do not invent delivery times”).',
                'Attach the reference documents: price list, returns policy, tone of voice, FAQ. They will be the basis of the answers.',
              ],
              {
                example:
                  'Role: reply to the shop’s customer reviews.\nSteps: 1) say thank you, 2) if negative, acknowledge the problem, 3) offer the solution set out in the attached policy.\nFormat: max 80 words, sign off “The team”.\nDo not: promise refunds that are not provided for.',
              },
            ),
            theory('Test before sharing', [
              'Try the assistant with 5-10 real cases, including the hard ones (a very angry review, a request outside the policy). Note where it goes wrong and fix the instructions.',
              'Only when it works well with varied cases is it worth sharing with the team, explaining what to use it for and what not.',
            ]),
            theory(
              'Repeatable workflows without assistants',
              [
                'Even without creating an assistant, you can build a repeatable workflow: a document with the best prompts for each task, in the order you use them, with the variable parts highlighted.',
              ],
              {
                tip: 'A shared “prompt library” is one of the simplest and most effective tools for a small team.',
              },
            ),
            theory('Security', [
              'Never put credentials, keys or sensitive data in the instructions of a shared assistant. If the assistant is connected to other tools, grant only the permissions that are strictly necessary.',
            ]),
          ],
          questions: [
            choice(
              'When does it make sense to create a custom assistant?',
              [
                'For a question you will ask only once',
                'For a repetitive task with always the same instructions',
                'Never',
                'Only for fun',
              ],
              1,
              'Repetitive tasks are the ideal case: fixed instructions, variable data.',
            ),
            trueFalse(
              'Before sharing an assistant with the team, it is worth testing it on real cases.',
              true,
              'Tests reveal ambiguous instructions and unexpected cases.',
            ),
            choice(
              'What must NOT go into a shared custom assistant?',
              [
                'Role and goal',
                'Output format',
                'Examples of good answers',
                'A password or an access key',
              ],
              3,
              'Credentials and sensitive data must never go into the instructions.',
            ),
            choice(
              'Why add a “what not to do” section?',
              [
                'To make the text longer',
                'To avoid recurring mistakes such as unplanned promises',
                'Because it is mandatory',
                'It is not needed',
              ],
              1,
              'Explicit prohibitions prevent the most costly mistakes.',
            ),
            fillBlank(
              'A shared collection of the best prompts is called a ___ library.',
              ['prompt', 'image', 'font', 'password'],
              0,
              'A prompt library makes the team’s work faster and more consistent.',
            ),
            choice(
              'Which documents is it worth attaching to a customer service assistant?',
              [
                'Holiday photos',
                'Returns policy, FAQ and tone of voice',
                'None',
                'Customers’ passwords',
              ],
              1,
              'The reference documents are the basis of the answers.',
            ),
            trueFalse(
              'An assistant connected to other tools should have every possible permission.',
              false,
              'Only the permissions that are strictly necessary, to limit the risks.',
            ),
            choice(
              'During testing the assistant promises refunds that are not provided for. What do you do?',
              [
                'Share it anyway',
                'Add an explicit rule to the instructions and test again',
                'Delete it',
                'Ignore the problem',
              ],
              1,
              'You fix the instruction and check again with the same cases.',
            ),
          ],
        },
      ],
      quiz: [
        trueFalse(
          'A custom assistant is useful above all for repetitive tasks.',
          true,
          'Fixed instructions and variable data: it is the ideal use case.',
        ),
      ],
    },
  ],
  finalTest: [
    choice(
      'Which is the best request?',
      [
        '“Write a description.”',
        '“Write an 80-word product description for an open-face helmet, for an online shop, technical but simple tone, with 3 strengths as a list.”',
        '“Helmet description.”',
        '“Up to you.”',
      ],
      1,
      'It specifies length, product, channel, tone and format.',
    ),
    choice(
      'What are custom instructions?',
      [
        'A subscription',
        'Saved notes on who you are and how you want your answers',
        'A type of file',
        'A plugin',
      ],
      1,
      'They are applied to new conversations.',
    ),
  ],
});
