import {
  choice,
  defineCourse,
  fillBlank,
  order,
  promptFix,
  theory,
  trueFalse,
} from '@/features/courses/builder';

export const promptEngineering = defineCourse({
  id: 'prompt-engineering',
  title: 'Advanced prompt engineering',
  subtitle: 'Techniques for precise, reliable and repeatable results',
  description:
    'Go beyond simple questions: prompt structure, delimiters, examples, constraints, breaking problems down, prompt chains, self-review, reusable templates and a method to evaluate and improve prompts with objective criteria. Works with ChatGPT, Claude, Gemini and other models.',
  category: 'prompting',
  level: 'advanced',
  tools: ['ChatGPT', 'Claude', 'Gemini'],
  outcomes: [
    'Write structured prompts with role, task, context and format',
    'Use examples, constraints and delimiters to control the output',
    'Break complex tasks down with step-by-step reasoning and prompt chains',
    'Create reusable templates and evaluate them with test cases',
  ],
  requiredTier: 'premium',
  icon: 'code-slash-outline',
  modules: [
    {
      title: 'Anatomy of a prompt',
      description: 'The elements that make the difference.',
      lessons: [
        {
          title: 'Role, task, context and format',
          summary: 'The 4-part scheme for clear, complete prompts.',
          estimatedMinutes: 9,
          theory: [
            theory('Why you need a structure', [
              'A language model does not know your company, your audience or the reason for your request: everything it knows about the situation is written in the prompt. Every missing piece of information gets “filled in” with the most generic assumption, which is why vague prompts produce bland texts.',
              'A fixed structure helps you not to forget anything and makes prompts easy to reread, fix and share.',
            ]),
            theory(
              'The 4 parts',
              [
                'Role: the perspective to answer from (“you are an e-commerce customer care expert”). It steers vocabulary, technical level and priorities.',
                'Task: what to do, with a clear verb (“write”, “classify”, “compare”, “extract”). One task per prompt, or several numbered tasks.',
                'Context: everything the model cannot know: audience, goal, business constraints, data. Format: how you want the output (table, JSON, list, number of words, sections).',
              ],
              {
                tip: 'If a new colleague reading the prompt would not understand what to do, the model will not either.',
              },
            ),
            theory(
              'Separate instructions from data',
              [
                'When you paste texts or data, separate them from the instructions with clear delimiters: tags like <document>…</document>, triple quotes or headings. The model can better tell what it must execute from what it must analyze.',
                'It matters for security too: a pasted text might contain sentences that look like instructions (“ignore the previous rules”). Delimiting it helps treat it as plain data.',
              ],
              {
                example:
                  'You are a customer care analyst.\nClassify the review in <review> as: positive, neutral, negative. Give the main reason in max 10 words.\nFormat: sentiment | reason\n<review>The helmet is great but delivery took 12 days.</review>',
              },
            ),
            theory('Order and length', [
              'A readable, recommended order is: role, task, context, format. With very long documents many models perform better if the data comes first and the question at the end, so the request is “fresh” when the model starts answering.',
              'A long prompt is not a problem if every sentence is useful. The problem is vague or contradictory sentences.',
            ]),
            theory('Before and after', [
              'Weak prompt: “Give me marketing ideas.” The model does not know for which business, which audience, which budget, in what format.',
              'Structured prompt: “You are a marketing consultant for small online shops. Suggest 5 winter campaigns for an online motorcycle accessories shop, audience aged 25-45, budget 500 € a month. Format: table with idea, channel, estimated cost and metric to track.” The result can be used straight away.',
            ]),
          ],
          questions: [
            order(
              'Put the parts of a structured prompt in order (recommended order).',
              ['Role', 'Task', 'Context', 'Output format'],
              'It is not a rigid rule, but it makes the prompt easy to read and maintain.',
            ),
            promptFix({
              instruction: 'Rewrite the prompt including role, context, format and quantity.',
              weakPrompt: 'Give me marketing ideas.',
              checks: [
                {
                  label: 'Role',
                  keywords: ['you are', 'act as', 'as an expert', 'role'],
                },
                {
                  label: 'Context (business, audience, goal)',
                  keywords: [
                    'audience',
                    'target',
                    'customers',
                    'company',
                    'shop',
                    'store',
                    'budget',
                    'goal',
                  ],
                },
                {
                  label: 'Output format',
                  keywords: ['list', 'table', 'points', 'format', 'json'],
                },
                {
                  label: 'Quantity or constraints',
                  keywords: ['5', '10', 'three', 'five', 'ten', 'maximum', 'within', 'max'],
                },
              ],
              sampleAnswer:
                'You are a marketing consultant for small online shops. Suggest 5 campaign ideas for an online motorcycle accessories shop, audience aged 25-45, monthly budget 500 €, goal to increase winter sales. Format: table with idea, channel, estimated cost, metric to track.',
            }),
            choice(
              'Why separate instructions and data with delimiters?',
              [
                'For looks',
                'So the model can tell what to execute and what to analyze',
                'To save money',
                'It is not needed',
              ],
              1,
              'Delimiters reduce ambiguity and mistakes, even with long texts.',
            ),
            choice(
              'Which part of the prompt describes audience, goal and business constraints?',
              ['The role', 'The context', 'The format', 'The title'],
              1,
              'The context provides the information the model cannot know.',
            ),
            trueFalse(
              'A pasted text might contain sentences that look like instructions: delimiting it helps treat it as data.',
              true,
              'It is good security practice too.',
            ),
            fillBlank(
              'The task should be expressed with a clear ___, such as “classify” or “extract”.',
              ['verb', 'color', 'number', 'link'],
              0,
              'A clear action verb reduces ambiguity.',
            ),
            choice(
              'With a very long document, where is it best to put the question?',
              [
                'At the start, before the document',
                'At the end, after the document',
                'In the middle of the document',
                'It should not be written',
              ],
              1,
              'With many models, putting the question at the end, after the data, works better.',
            ),
            trueFalse(
              'A long prompt is always worse than a short one.',
              false,
              'Length is not a problem if every sentence is useful; the problem is vagueness and contradictions.',
            ),
          ],
        },
        {
          title: 'Examples and constraints',
          summary: 'Few-shot prompting: show what you want instead of describing it.',
          estimatedMinutes: 8,
          theory: [
            theory('Zero-shot and few-shot', [
              'When you ask for something without examples it is called zero-shot. When you provide 2-5 examples of input and desired output it is called few-shot: the model infers the pattern and repeats it.',
              'Few-shot is especially effective for writing styles, precise formats and classifications with rules that are hard to describe in words.',
            ]),
            theory(
              'How to choose the examples',
              [
                'Examples should be varied and representative: cases that differ from each other, including the hard ones. If they are all alike, the model will tend to copy them too closely (same length, same words).',
                'Put them between delimiters and label them consistently, so the model understands where an example ends and the real task begins.',
              ],
              {
                example:
                  '<example>\nReview: “Arrived in 2 days, perfect.”\nCategory: shipping | positive\n</example>\n<example>\nReview: “The visor scratches straight away.”\nCategory: product | negative\n</example>\nNow classify: “Right size but uncomfortable padding.”',
              },
            ),
            theory('Explicit constraints', [
              'State clear limits: length, words to avoid, language, level of detail, audience. Prefer positive instructions (“use short sentences”) over purely negative ones (“don’t be wordy”): saying what to do works better than saying what to avoid.',
              'Explain the why when it is not obvious: “avoid technical terms because the readers are beginner customers”. The model generalizes better when it understands the intent.',
            ]),
            theory(
              'The way out',
              [
                'Always say what to do if a piece of information is missing: “If the data is not present, write NOT AVAILABLE”. Without this instruction, the model tends to fill the gap with something plausible, in other words to make it up.',
              ],
              {
                tip: 'Giving the model an explicit way out is one of the most effective techniques against hallucinations.',
              },
            ),
            theory('Prefill and guided format', [
              'One way to get a precise format is to show its start: writing “Answer with a table with columns: Product | Problem | Solution” or providing a structure to fill in.',
              'For output meant for other programs (JSON, CSV) give the exact field names and the allowed values.',
            ]),
          ],
          questions: [
            fillBlank(
              'Providing 2-5 examples of input and desired output is called ___ prompting.',
              ['few-shot', 'zero-day', 'full-stack', 'one-click'],
              0,
              'Few-shot means “a few examples”: the model infers the pattern to repeat.',
            ),
            choice(
              'Which instruction most reduces the risk of invented data?',
              [
                '“Be precise.”',
                '“If a piece of data is not in the text, write NOT AVAILABLE.”',
                '“Answer quickly.”',
                '“Use a professional tone.”',
              ],
              1,
              'It gives the model an explicit behavior when the information is missing.',
            ),
            trueFalse(
              'Few-shot examples should all be very similar to each other.',
              false,
              'Varied examples stop the model from copying a single pattern too closely.',
            ),
            choice(
              'Which instruction is better worded?',
              [
                '“Don’t be wordy.”',
                '“Use short sentences, at most 15 words each.”',
                '“Don’t write badly.”',
                '“Avoid mistakes.”',
              ],
              1,
              'Positive, measurable instructions work better than purely negative ones.',
            ),
            choice(
              'What does zero-shot mean?',
              [
                'A prompt without examples',
                'A prompt with zero words',
                'A model without training',
                'A model error',
              ],
              0,
              'Zero-shot: you ask directly, without giving examples.',
            ),
            trueFalse(
              'Explaining the reason for a constraint helps the model generalize better.',
              true,
              'If it understands the intent, the model applies the constraint to unforeseen cases too.',
            ),
            choice(
              'You want output to import into another program. What do you specify?',
              [
                'The emotional tone',
                'The exact field names and the allowed values',
                'The text color',
                'Nothing',
              ],
              1,
              'Formats such as JSON or CSV require precise fields and values.',
            ),
            choice(
              'When is few-shot especially useful?',
              [
                'For a general knowledge question',
                'To get a style or format that is hard to describe',
                'To say hello',
                'To translate a word',
              ],
              1,
              'Examples show what would be long or ambiguous to explain.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Why separate instructions and data with delimiters?',
          [
            'For looks',
            'So the model can tell what to execute and what to analyze',
            'To save money',
            'It is not needed',
          ],
          1,
          'Delimiters reduce ambiguity and mistakes.',
        ),
      ],
    },
    {
      title: 'Advanced techniques',
      description: 'Break problems down and make the model work in several steps.',
      lessons: [
        {
          title: 'Step-by-step reasoning',
          summary: 'Give the model room to think before it answers.',
          estimatedMinutes: 8,
          theory: [
            theory('Think before answering', [
              'For problems with several steps (calculations, analyses, decisions) asking it to reason step by step often improves quality: “Analyze the problem step by step, then give the final answer”. The model spells out the intermediate steps instead of jumping straight to a conclusion.',
              'Many recent models have built-in reasoning modes (“thinking”): they spend more time thinking before answering. Even with these models it helps to state clearly which aspects to consider.',
            ]),
            theory(
              'Break the task down',
              [
                'A big task should be split into parts: first gather and organize the information, then analyze, finally write. You can ask for it in a single prompt with numbered steps.',
              ],
              {
                example:
                  'I have to choose between two suppliers.\n1) List the criteria that matter for an online shop.\n2) Rate each supplier on every criterion using the data below.\n3) State the main risks.\n4) Give a reasoned recommendation in 5 lines.',
              },
            ),
            theory('Separate reasoning and answer', [
              'If you only need the final result (for example to paste into a document), ask it to separate the reasoning from the conclusion: “Reason inside <analysis>, then write the final answer inside <answer>”. That way you can check the reasoning and use only the final part.',
            ]),
            theory(
              'Consider alternatives',
              [
                'For important decisions ask it to explore several options before choosing: “Suggest 3 different approaches, weigh the pros and cons of each, then recommend one”. It reduces the risk of the model locking onto the first idea.',
              ],
              {
                tip: 'Also ask “what could go wrong with this recommendation?”: it is an excellent final check.',
              },
            ),
            theory('When it is not needed', [
              'For simple requests (a translation, a synonym, a short email) explicit reasoning only makes the answer longer. Use it when the problem really has several steps or several criteria to balance.',
            ]),
          ],
          questions: [
            trueFalse(
              'For a problem with several steps, asking it to reason step by step can improve the result.',
              true,
              'The model spells out the intermediate steps instead of jumping to the conclusion.',
            ),
            order(
              'Put the phases of breaking down an analysis task in order.',
              [
                'Gather and organize the information',
                'Analyze',
                'Assess the risks',
                'Write the final recommendation',
              ],
              'Each phase uses the result of the previous one.',
            ),
            choice(
              'When is asking for step-by-step reasoning most useful?',
              [
                'For a synonym',
                'For a problem with several steps or a decision',
                'To translate a word',
                'To say hello',
              ],
              1,
              'Complex problems benefit from explicit intermediate steps.',
            ),
            choice(
              'How do you separate reasoning and final answer?',
              [
                'It cannot be done',
                'By asking it to reason in <analysis> and answer in <answer>',
                'By writing in capitals',
                'By using two chats',
              ],
              1,
              'Tags let you check the reasoning and use only the conclusion.',
            ),
            fillBlank(
              'For important decisions, ask it to explore several ___ before choosing.',
              ['options', 'fonts', 'languages', 'emojis'],
              0,
              'Weighing alternatives reduces the risk of locking onto the first idea.',
            ),
            trueFalse(
              'Explicit reasoning is also useful for translating a single word.',
              false,
              'For simple requests it only makes the answer longer.',
            ),
            choice(
              'Which question is a good final check for a recommendation?',
              [
                '“Are you happy?”',
                '“What could go wrong with this recommendation?”',
                '“Can you use more emojis?”',
                '“How many characters did you write?”',
              ],
              1,
              'Bringing the risks to light makes the decision more solid.',
            ),
            choice(
              'What do models with built-in reasoning modes do?',
              [
                'They answer faster without thinking',
                'They spend more time reasoning before answering',
                'They only work offline',
                'They do not use text',
              ],
              1,
              'They are designed for complex problems; stating what to consider still helps.',
            ),
          ],
        },
        {
          title: 'Prompt chains and self-review',
          summary: 'Several simple steps beat a single giant prompt.',
          estimatedMinutes: 8,
          theory: [
            theory('Prompt chaining', [
              'Prompt chaining splits a job into several linked requests: the output of one becomes the input of the next. Example: 1) extract the problems mentioned in the reviews, 2) group them by theme and count the occurrences, 3) write a report with the priorities.',
              'Each step is simpler, and therefore more reliable. And if something goes wrong you know exactly where to step in, without redoing everything.',
            ]),
            theory(
              'Designing a chain',
              [
                'For each step define input, task and output format. The output format of a step must be designed to be the input of the next: lists, tables or JSON work better than free text.',
                'Check the intermediate output, at least the first few times: that is where problems come to light.',
              ],
              {
                example:
                  'Step 1: “Extract every problem mentioned in these 50 reviews. Format: list, one problem per line.”\nStep 2: “Group the following problems by theme and count how many times each appears.”\nStep 3: “Write a 10-line report with the 3 priority themes and one action for each.”',
              },
            ),
            theory('Self-review with criteria', [
              'After a draft, ask the model to critique it against precise criteria and then rewrite it: “Rate the text on clarity, accuracy and tone from 1 to 5, explain the weak points and propose an improved version”.',
              'Explicit criteria produce far more useful reviews than a generic “improve it”, which often leads to superficial changes.',
            ]),
            theory(
              'Different roles for different steps',
              [
                'You can give different roles to the steps: first a “copywriter” who writes, then a “strict editor” who corrects, finally a “customer” who reads and says what is unclear. Changing perspective brings different problems to light.',
              ],
              {
                tip: 'The “critical customer” is especially useful for sales copy and product pages.',
              },
            ),
            theory('From prompts to automations', [
              'Prompt chains are the foundation of AI automations: tools such as Make, n8n or Zapier run the same steps in sequence, automatically. Designing a chain well “by hand” is the first step to automating it.',
            ]),
          ],
          questions: [
            choice(
              'What is the main advantage of prompt chaining?',
              [
                'It uses fewer words overall',
                'Each step is easier to check and fix',
                'It only works in English',
                'It never needs checking',
              ],
              1,
              'Breaking things down makes the process transparent and more reliable.',
            ),
            promptFix({
              instruction: 'Turn this request into a review with explicit criteria.',
              weakPrompt: 'Improve this text.',
              checks: [
                {
                  label: 'Evaluation criteria',
                  keywords: [
                    'clarity',
                    'tone',
                    'accuracy',
                    'criteria',
                    'readability',
                    'consistency',
                    'length',
                  ],
                },
                {
                  label: 'Asks it to find the weak points',
                  keywords: [
                    'weak',
                    'problem',
                    'error',
                    'critique',
                    'what does not work',
                    'evaluate',
                    'rate',
                  ],
                },
                {
                  label: 'Asks for a new version',
                  keywords: ['rewrite', 'new version', 'improved version', 'propose', 'rephrase'],
                },
              ],
              sampleAnswer:
                'Rate this text from 1 to 5 on clarity, tone and accuracy. List the 3 main weak points and then rewrite an improved version that fixes them, keeping the same length.',
            }),
            trueFalse(
              '“Improve it” produces more useful reviews than a review with explicit criteria.',
              false,
              'Explicit criteria guide the model towards measurable improvements.',
            ),
            choice(
              'Which output format is best between one step of a chain and the next?',
              ['Long free text', 'Lists, tables or JSON', 'Images', 'Audio'],
              1,
              'Structured formats are easy to use as the input of the next step.',
            ),
            fillBlank(
              'In prompt chaining the output of one step becomes the ___ of the next.',
              ['input', 'error', 'title', 'logo'],
              0,
              'It is the principle of the chain.',
            ),
            choice(
              'What is best to do the first few times you use a chain?',
              [
                'Not look at the intermediate outputs',
                'Check the intermediate outputs',
                'Delete it',
                'Make it longer',
              ],
              1,
              'Intermediate outputs reveal where problems start.',
            ),
            choice(
              'What is the “critical customer” role for in a review?',
              [
                'Writing faster',
                'Bringing out what is unclear for the reader',
                'Translating',
                'Changing the format',
              ],
              1,
              'Changing perspective brings different problems to light.',
            ),
            trueFalse(
              'Prompt chains are the foundation of AI automations in tools such as Make and n8n.',
              true,
              'Automation tools run the same steps in sequence, automatically.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'What is prompt chaining?',
          [
            'A very long prompt',
            'A sequence of prompts where the output of one is the input of the next',
            'A subscription',
            'A type of image',
          ],
          1,
          'It breaks a complex job down into steps you can check.',
        ),
      ],
    },
    {
      title: 'Prompts for business',
      description: 'Templates, variables and quality evaluation.',
      lessons: [
        {
          title: 'Reusable templates',
          summary: 'Prompts with variables the whole team can use.',
          estimatedMinutes: 8,
          theory: [
            theory('Fixed parts and variable parts', [
              'A template is a prompt with fixed parts (instructions, format, tone, rules) and variables in brackets, for example {product}, {audience}, {length}. Whoever uses it only replaces the variables.',
              'The advantage is consistency: anyone on the team gets similar results without being a prompt expert. And when you improve the template, everyone’s results improve.',
            ]),
            theory(
              'Template example',
              [
                'A good template also contains the quality rules and what to do when data is missing.',
                'In the example below the parts in curly braces change with each use, while the role, the structure of the product page and the rule about technical data always stay the same: that way every product page has the same quality, whoever prepares it.',
              ],
              {
                example:
                  'You are an e-commerce copywriter. Write the description of the product {product} for {audience}.\nLength: {length} words. Include: 3 strengths as a list, one sentence on safety, a final call to action.\nUse only the technical data provided in <data>. If anything is missing, write [TO BE COMPLETED].\n<data>{technical_data}</data>',
              },
            ),
            theory('Organizing a library', [
              'Keep the templates in a shared document or space, with: name, what it is for, the template text, an example of input and output, date of the last review and who maintains it.',
              'Group them by activity (marketing, customer service, admin) and keep a few well-made templates rather than many similar ones.',
            ]),
            theory(
              'Well-defined variables',
              [
                'Give variables clear names and state, next to the template, what to enter: {tone} → “formal / friendly / technical”. That avoids unexpected values that make the result worse.',
              ],
              {
                tip: 'If a variable is often filled in badly, turn it into a choice between fixed options.',
              },
            ),
            theory('From templates to assistants', [
              'A heavily used template can become a custom assistant or a step in an automation: the fixed parts become the instructions, the variables become the input data.',
            ]),
          ],
          questions: [
            fillBlank(
              'In a template, the parts that change each time are called ___.',
              ['variables', 'constants', 'hallucinations', 'tokens'],
              0,
              'Variables (e.g. {product}) are replaced with the specific data each time.',
            ),
            trueFalse(
              'A good template also says what to do if some data is missing.',
              true,
              'It stops the model from inventing information to complete the text.',
            ),
            choice(
              'What makes a template useful for a team?',
              [
                'Being very long',
                'Clear fixed parts, defined variables and an example of use',
                'Being in French',
                'Having no format',
              ],
              1,
              'A clear structure and examples let everyone get consistent results.',
            ),
            choice(
              'A variable is often filled in badly. What do you do?',
              [
                'I delete it',
                'I turn it into a choice between fixed options',
                'I ignore it',
                'I write it in capitals',
              ],
              1,
              'Fixed options avoid unexpected values.',
            ),
            choice(
              'What is worth noting next to each template in the library?',
              [
                'Only the title',
                'Purpose, example input and output, review date and owner',
                'The passwords',
                'Nothing',
              ],
              1,
              'This information makes the library reliable and maintainable.',
            ),
            trueFalse(
              'It is better to have many almost identical templates than a few well-made ones.',
              false,
              'A few curated templates are easier to use and maintain.',
            ),
            choice(
              'What is the benefit of improving a shared template?',
              [
                'None',
                'The results of everyone who uses it improve',
                'It changes the language',
                'It reduces the files',
              ],
              1,
              'The improvement spreads to the whole team.',
            ),
            choice(
              'How can a heavily used template evolve?',
              [
                'Into an image',
                'Into a custom assistant or an automation step',
                'Into a font',
                'It cannot evolve',
              ],
              1,
              'Fixed parts → instructions; variables → input data.',
            ),
          ],
        },
        {
          title: 'Evaluating and improving prompts',
          summary: 'Measure quality instead of going by gut feeling.',
          estimatedMinutes: 9,
          theory: [
            theory('The “looks good to me” problem', [
              'Trying a prompt once or twice and judging it “good” is the most common way of working, and also the reason many prompts fail when different cases come along. A prompt should be evaluated like a product: with repeatable tests.',
            ]),
            theory(
              'Test cases and criteria',
              [
                'Prepare 5-10 real, varied test cases, including the hard ones (missing data, ambiguous requests, very long texts). Define measurable success criteria: correctness, format followed, tone, nothing invented, length.',
                'A criterion is measurable if two different people would give the same verdict: “follows the requested JSON format” is, “it’s nice” is not.',
              ],
              {
                example:
                  'Case 3: review in French with two problems.\nCriteria: correct category ✔ · reason ≤ 10 words ✔ · format “sentiment | reason” ✘ (it added an introductory sentence).',
              },
            ),
            theory('One change at a time', [
              'When you change the prompt, rerun all the test cases and compare the results. Change one thing at a time: if you change many things together you do not know what made the result better or worse.',
              'Keep a version log with date, change and test results: it lets you go back if a change makes things worse.',
            ]),
            theory(
              'Typical mistakes and fixes',
              [
                'Format not followed → show an example of the format or ask for the output only, with no introductory sentences. Invented data → explicit way out and delimited data. Instructions ignored with long texts → put the key instructions at the end and repeat them briefly. Inconsistent tone → add examples of the desired tone.',
              ],
              {
                tip: 'Every mistake found in testing is an opportunity: it becomes a new rule, a new example or a new test case.',
              },
            ),
            theory('When the model changes', [
              'Models are updated often. A prompt that is excellent with one version may behave differently with the next. Having your test cases ready lets you check it in minutes instead of finding out from your customers.',
            ]),
          ],
          questions: [
            order(
              'Put the process of improving a prompt in order.',
              [
                'Define test cases and criteria',
                'Run the prompt on the cases',
                'Note the mistakes',
                'Change one thing at a time and test again',
              ],
              'It is a cycle: measure, fix and measure again.',
            ),
            choice(
              'Why change only one thing at a time?',
              [
                'To go slower',
                'To understand which change made the result better or worse',
                'Because models accept only one change',
                'It does not matter',
              ],
              1,
              'If you change many things together you do not know what to credit the result to.',
            ),
            choice(
              'Which of these is a measurable success criterion?',
              [
                '“It’s nice”',
                '“It follows the requested JSON format”',
                '“I like it”',
                '“It seems smart”',
              ],
              1,
              'A measurable criterion can be checked objectively.',
            ),
            trueFalse(
              'To evaluate a prompt a couple of tries by gut feeling are enough.',
              false,
              'You need varied test cases, including hard ones, and defined criteria.',
            ),
            choice(
              'The model adds introductory sentences before the requested format. Fix?',
              [
                'Make the prompt longer at random',
                'Show an example of the format and ask for the output only',
                'Change language',
                'Ignore it',
              ],
              1,
              'An example of the format and the instruction “output only” often solve the problem.',
            ),
            fillBlank(
              'A log of the prompt ___ lets you go back if a change makes the results worse.',
              ['versions', 'emojis', 'images', 'passwords'],
              0,
              'Date, change and test results for each version.',
            ),
            trueFalse(
              'When the model is updated, it is worth rerunning the test cases.',
              true,
              'The same prompt can behave differently with a new version of the model.',
            ),
            choice(
              'With very long texts the model ignores some instructions. What do you try?',
              [
                'Remove all the instructions',
                'Put the key instructions at the end and repeat them briefly',
                'Write everything in capitals',
                'Split the text into images',
              ],
              1,
              'Instructions near the end, summarized, stay more “present”.',
            ),
          ],
        },
      ],
      quiz: [
        trueFalse(
          'To evaluate a prompt a couple of tries by gut feeling are enough.',
          false,
          'You need varied test cases and defined criteria.',
        ),
      ],
    },
  ],
  finalTest: [
    choice(
      'What are the 4 parts of a structured prompt?',
      [
        'Title, text, signature, date',
        'Role, task, context, format',
        'Question, answer, grade, link',
        'Language, font, color, length',
      ],
      1,
      'It is the basic scheme for clear prompts.',
    ),
    choice(
      'How do you improve a prompt reliably?',
      [
        'By changing everything each time',
        'By testing on fixed cases and changing one thing at a time',
        'By asking a colleague whether they like it',
        'By always making it longer',
      ],
      1,
      'Measuring and comparing is the most solid method.',
    ),
  ],
});
