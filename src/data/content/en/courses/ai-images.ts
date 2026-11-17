import {
  choice,
  defineCourse,
  fillBlank,
  order,
  promptFix,
  theory,
  trueFalse,
} from '@/features/courses/builder';

export const aiImages = defineCourse({
  id: 'ai-images',
  title: 'Creating images with AI',
  subtitle: 'Visual prompts, editing and images for business',
  description:
    'Learn to create and edit images with artificial intelligence: how generators work, how to write effective visual prompts, how to control format, style and consistency, how to edit existing photos with words and how to use images for online shops and social media in a correct, transparent way.',
  category: 'images',
  level: 'intermediate',
  tools: ['Midjourney', 'Nano Banana', 'ChatGPT'],
  outcomes: [
    'Write visual prompts with subject, setting, style, light and framing',
    'Control aspect ratios, variations and the consistency of a series',
    'Edit existing images with natural-language instructions',
    'Use AI images respecting rights, marketplace rules and transparency',
  ],
  requiredTier: 'free',
  icon: 'image-outline',
  modules: [
    {
      title: 'Foundations',
      description: 'How a generated image is born and how to describe it.',
      lessons: [
        {
          title: 'How image generators work',
          summary: 'From noise to image: the idea behind diffusion models.',
          estimatedMinutes: 8,
          theory: [
            theory('Learning from millions of images', [
              'Image generators are trained on huge collections of images paired with text descriptions. That way the model learns the link between words and visual features: what “sunset”, “watercolor”, “close-up” or “neon light” mean.',
              'It does not keep the original images like an archive: it learns statistical patterns that let it create new ones.',
            ]),
            theory(
              'From noise to image',
              [
                'Many generators are based on diffusion models. During training they learn to “clean up” images that have had noise added, one step at a time.',
                'To create a new image they go the other way: they start from random noise and gradually turn it into a coherent image, guided by the text you wrote.',
              ],
              {
                tip: 'The random starting point is why the same prompt produces different images every time.',
              },
            ),
            theory('Generators inside assistants', [
              'Besides dedicated generators such as Midjourney, many chat assistants now generate and edit images right in the chat (for example Nano Banana inside Gemini, or images in ChatGPT).',
              'These models better understand natural-language instructions and edit requests (“now change the background”), because they keep the context of the conversation.',
            ]),
            theory(
              'Strengths and weaknesses',
              [
                'They are very good at moods, styles, settings, lighting and compositions. They still struggle with some details: long text inside the image, hands and fingers, precise logos and brands, exact counts of objects, perfect consistency of a real product across several images.',
                'Models are improving fast, but always checking the final result remains essential, especially for commercial use.',
              ],
              {
                example:
                  'Risky: “Poster with the text ‘Winter sale up to 40% off all full-face helmets’”.\nBetter: generate the image without text and add the lettering in a graphics program.',
              },
            ),
            theory('The typical workflow', [
              'You generate a batch of variations, pick the most promising one, refine it (variations, targeted edits, upscaling) and finally finish it in a traditional editor if you need text or logos.',
              'Generating many variations is not a waste: it is the normal way of working, like taking several photos to choose one.',
            ]),
          ],
          questions: [
            trueFalse(
              'The same prompt always produces exactly the same image.',
              false,
              'The random starting point creates variations at every attempt.',
            ),
            choice(
              'Which of these details is often hardest for a generator?',
              [
                'A sunset sky',
                'A long text written inside the image',
                'A mountain landscape',
                'A background color',
              ],
              1,
              'Long, precise lettering is still a weak point.',
            ),
            choice(
              'What does a diffusion model start from to create an image?',
              [
                'Always from an existing photo',
                'From random noise that is cleaned up step by step',
                'From a hand drawing',
                'From a video',
              ],
              1,
              'The text guides the transformation of noise into an image.',
            ),
            fillBlank(
              'Many image generators are based on ___ models.',
              ['diffusion', 'accounting', 'compression', 'navigation'],
              0,
              'Diffusion models turn noise into images guided by text.',
            ),
            choice(
              'You need to create a poster with a long promotional text. What is the best approach?',
              [
                'Ask the generator to write all the text',
                'Generate the image without text and add it in a graphics program',
                'Give up on the poster',
                'Use only text with no image',
              ],
              1,
              'That way you avoid spelling mistakes in the image.',
            ),
            trueFalse(
              'Generating many variations is a waste: you should always accept the first image.',
              false,
              'Variations are the normal way of working, like taking several photos.',
            ),
            choice(
              'Why are generators built into assistants handy for edits?',
              [
                'Because they are free',
                'Because they keep the context of the conversation',
                'Because they work offline',
                'Because they do not use text',
              ],
              1,
              'You can ask for further edits (“now change the background”) in the same chat.',
            ),
            choice(
              'Does a generator keep its training images like an archive?',
              [
                'Yes, it always copies them',
                'No, it learns statistical patterns to create new ones',
                'Only the color ones',
                'Only at night',
              ],
              1,
              'The model learns relationships between text and visual features.',
            ),
          ],
        },
        {
          title: 'The structure of a visual prompt',
          summary: 'Subject, setting, style, light, composition and format.',
          estimatedMinutes: 9,
          theory: [
            theory('Think like a photographer', [
              'An effective visual prompt describes the image the way you would describe it to a photographer or an illustrator: what is there, where, with what light, from which angle, in what style. Concrete, visual phrases work better than abstract concepts like “nice” or “eye-catching”.',
            ]),
            theory(
              'The ingredients',
              [
                'Subject: what is in the image, with concrete details (materials, colors, actions). Setting: where it is, what is in the background. Style: photography, illustration, 3D, watercolor, cinematic.',
                'Light and mood: soft morning light, sunset, photo studio, neon, fog. Composition and framing: close-up, top view, three-quarter view, blurred background. Format: square, vertical, horizontal.',
              ],
              {
                example:
                  'Product photo of a matte black full-face motorcycle helmet resting on a rough concrete surface, soft side studio light, dark gray gradient background, three-quarter framing, high sharpness, square format.',
              },
            ),
            theory('Useful photography vocabulary', [
              'Terms such as “close-up”, “wide shot”, “macro”, “shallow depth of field” (blurred background), “backlight”, “golden hour” (the golden light of sunset), “wide angle” help a lot, because models have seen them paired with images with specific features.',
              'For illustrations, descriptions of technique and style work: “flat vector illustration”, “watercolor with soft colors”, “comic style with bold outlines”.',
            ]),
            theory(
              'What to avoid',
              [
                'Prompts that are too vague (“a coffee”), endless lists of contradictory adjectives, requests to imitate protected brands or characters, names of living artists to copy their style.',
                'Some tools let you say what NOT to include (negative prompt): useful to exclude unwanted elements such as text, people or specific objects.',
              ],
              {
                tip: 'Start from a clear prompt of 2-3 sentences; add details only where the result does not convince you.',
              },
            ),
            theory('Iterating on the visual prompt', [
              'As with text, work in steps: generate, see what is wrong (light too harsh? subject too small?), change only that aspect of the prompt and generate again. Note down the prompts that work: they will become your visual templates.',
            ]),
          ],
          questions: [
            order(
              'Put the elements in the order of a well-built visual prompt.',
              ['Subject', 'Setting', 'Style', 'Light and mood', 'Framing and format'],
              'From the “what” to the “how”: first the subject, then context, style, light and finally the shot.',
            ),
            promptFix({
              instruction:
                'Make this visual prompt more precise by adding style, light, framing and details.',
              weakPrompt: 'A coffee.',
              checks: [
                {
                  label: 'Style (photo, illustration…)',
                  keywords: ['photo', 'illustration', 'watercolor', '3d', 'render', 'style'],
                },
                {
                  label: 'Light or mood',
                  keywords: ['light', 'sunset', 'morning', 'mood', 'atmosphere', 'shadow', 'neon'],
                },
                {
                  label: 'Framing or format',
                  keywords: [
                    'close-up',
                    'close up',
                    'from above',
                    'overhead',
                    'framing',
                    'format',
                    'vertical',
                    'square',
                    'blurred background',
                    'macro',
                  ],
                },
                {
                  label: 'Setting or details',
                  keywords: [
                    'table',
                    'cafe',
                    'bar',
                    'kitchen',
                    'cup',
                    'wood',
                    'marble',
                    'foam',
                    'beans',
                  ],
                },
              ],
              sampleAnswer:
                'Photo of a cup of espresso with golden crema on a white marble table in an Italian cafe, natural morning light from a window, scattered coffee beans, close-up with blurred background, vertical format.',
            }),
            trueFalse(
              'In a visual prompt it is worth describing light and framing.',
              true,
              'They are among the elements that change the result the most.',
            ),
            choice(
              'Which prompt is more effective?',
              [
                '“A nice shoe”',
                '“Product photo of a white sneaker on a pastel background, studio light, side view”',
                '“Shoe, cool”',
                '“Up to you”',
              ],
              1,
              'It specifies subject, style, light and framing.',
            ),
            fillBlank(
              'The expression “golden hour” means the ___ light of sunset or sunrise.',
              ['golden', 'blue', 'neon', 'artificial'],
              0,
              'It is a warm, soft light widely used in photography.',
            ),
            choice(
              'What is a negative prompt for?',
              [
                'Making the image black and white',
                'Saying what NOT to include in the image',
                'Deleting the image',
                'Changing the format',
              ],
              1,
              'Useful to exclude unwanted text, people or objects.',
            ),
            choice(
              'Which term gets you a blurred background?',
              ['Shallow depth of field', 'Extreme wide angle', 'Black and white', 'Square format'],
              0,
              'A shallow depth of field keeps the subject in focus and blurs the background.',
            ),
            trueFalse(
              'Using the name of a living artist to copy their style is good practice.',
              false,
              'Better to describe technique and visual features without imitating living artists.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Which prompt describes an image best?',
          [
            '“A nice motorbike”',
            '“Red naked motorbike on a coastal road at sunset, cinematic photo, side framing, 16:9 format”',
            '“Motorbike”',
            '“Make a motorbike”',
          ],
          1,
          'Subject, setting, style, light and format.',
        ),
      ],
    },
    {
      title: 'Control and consistency',
      description: 'Aspect ratios, variations, references and editing.',
      lessons: [
        {
          title: 'Aspect ratios, variations and references',
          summary: 'Get the right format and a consistent style.',
          estimatedMinutes: 8,
          theory: [
            theory('The right format for each channel', [
              'Choose the aspect ratio before generating, based on where you will use the image: 1:1 for square posts, 4:5 for the vertical social feed, 9:16 for stories and reels, 16:9 for banners, covers and horizontal videos.',
              'Cropping afterwards an image created in another format often cuts off important elements or leaves empty space.',
            ]),
            theory(
              'How to set it',
              [
                'Each tool has its own way. In Midjourney you use the --ar parameter followed by the ratio (e.g. --ar 16:9). In chat assistants you just write it in the request: “vertical 9:16 format”.',
              ],
              {
                example:
                  'Motorbike riding along a coastal road at dawn, cinematic photo, motion blur in the background --ar 16:9',
              },
            ),
            theory('Variations and refinement', [
              'When an image is almost right, instead of rewriting everything ask for variations of that image: subtle (same composition, different details) or strong (more freedom). Then upscale the version you chose to get more resolution.',
            ]),
            theory(
              'Consistency across several images',
              [
                'For a consistent series (catalog, campaign, a week of posts) always reuse the same “style block”: type of photography, light, palette, background. Change only the subject.',
                'Many tools accept reference images for style or subject: upload the photo of your product and ask it to keep its shape and colors, or an image whose style you want to replicate.',
              ],
              {
                tip: 'Save your brand’s style block, for example: “editorial photography, warm natural light, earthy palette, clean background”, and paste it at the end of every prompt.',
              },
            ),
            theory('Resolution and final use', [
              'Check the resolution the channel requires (print, website, marketplace) and use the upscaling features when needed. Print needs much higher resolutions than social media.',
            ]),
          ],
          questions: [
            choice(
              'Which aspect ratio suits an Instagram story best?',
              ['16:9', '9:16', '1:1', '21:9'],
              1,
              'Stories and reels use the vertical 9:16 format.',
            ),
            fillBlank(
              'In Midjourney the aspect ratio is set with the ___ parameter.',
              ['--ar', '--size', '--color', '--fast'],
              0,
              '--ar stands for aspect ratio, for example --ar 4:5.',
            ),
            choice(
              'Which format would you use for a horizontal website banner?',
              ['9:16', '16:9', '4:5', '1:1'],
              1,
              '16:9 is the standard horizontal format.',
            ),
            trueFalse(
              'For a consistent series it is worth reusing the same style, light and background block.',
              true,
              'Changing only the subject keeps the visual identity.',
            ),
            trueFalse(
              'Cropping afterwards is always equivalent to generating directly in the right format.',
              false,
              'Cropping can cut off important elements or leave empty space.',
            ),
            choice(
              'An image is almost perfect. What do you do?',
              [
                'Rewrite the whole prompt from scratch',
                'Ask for variations of that image and then upscale it',
                'Delete it',
                'Print it right away',
              ],
              1,
              'Variations let you refine without losing what works.',
            ),
            choice(
              'What is the point of uploading a reference image of your product?',
              [
                'Slowing down generation',
                'Keeping the product’s shape and colors',
                'Changing the language',
                'Nothing',
              ],
              1,
              'The reference guides the model towards the real subject.',
            ),
            choice(
              'For which use are the highest resolutions needed?',
              ['A social story', 'Print', 'A chat preview', 'A small icon'],
              1,
              'Print requires much more resolution than digital channels.',
            ),
          ],
        },
        {
          title: 'Editing images with words',
          summary: 'Conversational editing: change background, light and details.',
          estimatedMinutes: 8,
          theory: [
            theory('Natural-language editing', [
              'Tools such as Nano Banana (Google’s image model built into Gemini) and image generation in ChatGPT let you edit an existing photo by describing the change: “replace the background with a mountain road”, “make the light warmer”, “remove the person in the background”.',
              'The big advantage is that the original subject is largely preserved: it is ideal for placing product photos in new settings without new photo shoots.',
            ]),
            theory(
              'One edit at a time',
              [
                'Ask for one edit at a time and explicitly say what must NOT change: “keep the helmet’s shape, colors and graphics identical”. The more elements you change together, the more likely the model is to alter what you wanted to keep.',
              ],
              {
                example:
                  'Take this photo of the helmet. Replace the white background with a mountain road at sunset, warm light. Keep the helmet’s shape, colors and graphics identical.',
              },
            ),
            theory('Types of edits', [
              'Background and setting; light and mood (day/night, season); removing objects; adding elements (a person wearing the product); changing style (from photo to illustration); combining several images into one scene.',
            ]),
            theory(
              'When to go back',
              [
                'If after several corrections the result has drifted too far from the original (different colors, lost details), do not pile on more corrections: go back to a good earlier version and start again with a more precise request.',
              ],
              {
                tip: 'Save the intermediate versions you like: they are your “restore points”.',
              },
            ),
            theory('Faithfulness check', [
              'For product images always compare the result with the original photo: logo, colors, stitching, labels. An edit that alters the real product can create wrong expectations in customers and lead to returns.',
            ]),
          ],
          questions: [
            trueFalse(
              'In conversational editing it is worth also saying what must not change.',
              true,
              'Explicitly protecting the important elements reduces unwanted changes.',
            ),
            choice(
              'After several corrections the result has drifted far from the original. What do you do?',
              [
                'Keep adding corrections',
                'Go back to a good earlier version and start again with a more precise edit',
                'Abandon the project',
                'Change language',
              ],
              1,
              'Piling up corrections often degrades the image.',
            ),
            choice(
              'What does conversational editing let you do?',
              [
                'Only crop',
                'Edit an image by describing the change in words',
                'Only change the file format',
                'Nothing',
              ],
              1,
              'You describe the change and the model applies it while preserving the rest.',
            ),
            fillBlank(
              'It is best to ask for one ___ at a time.',
              ['edit', 'password', 'invoice', 'translation'],
              0,
              'The more elements you change together, the more you risk altering what you wanted to keep.',
            ),
            choice(
              'What do you check in an edited product image?',
              [
                'Only the sky',
                'Logo, colors, stitching and labels compared with the original',
                'The file name',
                'Nothing',
              ],
              1,
              'Faithfulness to the real product avoids wrong expectations and returns.',
            ),
            trueFalse(
              'Saving intermediate versions lets you go back easily.',
              true,
              'They are your restore points.',
            ),
            choice(
              'Which request is better written?',
              [
                '“Change everything and make it nice”',
                '“Replace the background with a town square at sunset, keep the helmet identical”',
                '“Improve”',
                '“Do something”',
              ],
              1,
              'A precise edit stating what must be preserved.',
            ),
            choice(
              'What advantage does editing offer an online shop?',
              [
                'Placing product photos in new settings without new photo shoots',
                'Changing the price',
                'Shipping faster',
                'None',
              ],
              0,
              'You can create different scenes starting from the same real photo.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Which format do you use for a reel?',
          ['16:9', '1:1', '9:16', '3:2'],
          2,
          'Reels and stories are vertical 9:16.',
        ),
      ],
    },
    {
      title: 'Professional use',
      description: 'Online shops, social media, rights and transparency.',
      lessons: [
        {
          title: 'Images for online shops and social media',
          summary: 'Product scenes, banners and social content.',
          estimatedMinutes: 8,
          theory: [
            theory('Where AI saves the most', [
              'Settings: start from the real product photo and create different scenes (outdoor, studio, lifestyle) without new shoots. Banners and backgrounds for seasonal campaigns. Variations for A/B tests on social media, to see which image works best.',
              'Supporting images (blog illustrations, icons, newsletter backgrounds) also become quick and cheap.',
            ]),
            theory(
              'The golden rule: faithful to the product',
              [
                'Always keep the real product faithful: colors, shape, details and accessories must match what the customer will receive. An image that “beautifies” the product leads to disappointment, negative reviews and returns.',
              ],
              { tip: 'Use AI for the setting around the product, not to change the product.' },
            ),
            theory('Marketplace rules', [
              'Many marketplaces have precise rules for the main image (for example a white background, only the real product, no text or misleading elements). Generated scenes are better suited to secondary images and social content.',
              'Guidelines change over time and differ between marketplaces: always check them on the official pages before uploading.',
            ]),
            theory(
              'A series for social media',
              [
                'For a week of posts create a common style block (light, palette, type of scene), then vary the subject or the setting. That way the profile has a recognizable visual identity.',
              ],
              {
                example:
                  'Style block: “lifestyle photography, warm late-afternoon light, warm tones, shallow depth of field, 4:5 format”.\nPost 1: helmet on a scooter seat in an old town center. Post 2: gloves on a wooden table in a garage. Post 3: jacket hanging by a door with a view of the street.',
              },
            ),
            theory('Measuring results', [
              'Compare the performance of the images (clicks, saves, conversions) with that of traditional photos. AI is not always better: it is there to let you try more, faster, and keep what works.',
            ]),
          ],
          questions: [
            choice(
              'Which use of AI for product images is most correct?',
              [
                'Changing the product’s color to make it look better than it is',
                'Placing the real product photo in a lifestyle scene while keeping it faithful',
                'Adding accessories that are not included without saying so',
                'Generating a product that does not exist',
              ],
              1,
              'The image must faithfully show what the customer receives.',
            ),
            trueFalse(
              'The rules for main images can vary from marketplace to marketplace.',
              true,
              'They must be checked on the official guidelines, which change over time.',
            ),
            choice(
              'Where are AI-generated product scenes best suited?',
              [
                'Always as the only main image',
                'In secondary images and social content',
                'In tax documents',
                'Nowhere',
              ],
              1,
              'Marketplace main images often have strict rules.',
            ),
            fillBlank(
              'Use AI for the setting around the product, not to change the ___.',
              ['product', 'format', 'channel', 'background color'],
              0,
              'The product must stay true to reality.',
            ),
            choice(
              'What are A/B tests with different images for?',
              [
                'Spending more',
                'Finding out which image works best',
                'Changing marketplace',
                'Nothing',
              ],
              1,
              'You compare performance to keep what works.',
            ),
            trueFalse(
              'AI images are always more effective than traditional photos.',
              false,
              'They must be measured: AI lets you try more, faster.',
            ),
            choice(
              'How do you get a consistent visual identity for the week’s posts?',
              [
                'A different style for every post',
                'The same style block with different subjects',
                'Only black-and-white images',
                'Images downloaded at random',
              ],
              1,
              'A shared style block makes the profile recognizable.',
            ),
            choice(
              'What can an image that beautifies the product lead to?',
              [
                'More trust',
                'Disappointment, negative reviews and returns',
                'Faster shipping',
                'Nothing',
              ],
              1,
              'Wrong expectations are paid for in reviews and returns.',
            ),
          ],
        },
        {
          title: 'Rights, ethics and transparency',
          summary: 'What you can do, what to avoid and when to disclose it.',
          estimatedMinutes: 8,
          theory: [
            theory('Brands, characters and real people', [
              'Avoid imitating brands, logos, protected characters (from films, comics, video games) and the recognizable style of living artists. Do not create realistic images of real people without their consent: beyond the legal issues, it is a matter of respect and reputation.',
            ]),
            theory(
              'Terms of use and copyright',
              [
                'The terms for commercial use depend on the tool and the plan: some services restrict commercial use on free plans. Read them before using the images in advertising or on packaging.',
                'Copyright rules for AI-generated works are evolving and differ between countries. For important uses (trademarks, national campaigns) get legal advice.',
              ],
              {
                tip: 'Keep track of the tool, date and prompt used for commercial images: it will be useful if they are ever challenged.',
              },
            ),
            theory('Transparency', [
              'When a generated image could be mistaken for a real photo (people, events, products), disclose it. Some platforms require a label for content generated or edited with AI, and European rules are moving towards more transparency.',
              'Many tools also embed invisible watermarks or metadata that identify generated images.',
            ]),
            theory(
              'Deepfakes and disinformation',
              [
                'Realistic images of events that never happened or of people in false situations can harm people and companies. Do not create them and do not share them. If you receive a suspicious image, check the source before passing it on.',
              ],
              {
                example:
                  'Avoid: “Realistic photo of a famous MotoGP rider wearing our helmet”. Prefer: “Lifestyle photo of a rider (a generic person) wearing our helmet”.',
              },
            ),
            theory('A checklist before publishing', [
              '1) Is the product faithful? 2) Are there brands, logos or real people? 3) Do the tool’s terms of use allow commercial use? 4) Does the marketplace or platform have specific rules? 5) Is a transparency label needed?',
            ]),
          ],
          questions: [
            choice(
              'Which of these uses should be avoided?',
              [
                'Creating an abstract background for a banner',
                'Creating a realistic image of a celebrity using your product',
                'Placing your product photo in the mountains',
                'Creating an illustration for the blog',
              ],
              1,
              'Using a real person’s image without consent is wrong and may be illegal.',
            ),
            trueFalse(
              'The terms for commercial use are the same for every tool and plan.',
              false,
              'They vary: read them before using images in advertising.',
            ),
            trueFalse(
              'It is right to disclose when a realistic image was generated with AI.',
              true,
              'Transparency protects customers’ trust.',
            ),
            choice(
              'What must you check before using an AI image in an advertisement?',
              [
                'The customer’s favorite color',
                'The tool’s terms for commercial use',
                'The weather',
                'Nothing',
              ],
              1,
              'Usage rights depend on the tool and the plan.',
            ),
            fillBlank(
              'A fake, realistic image of a real person is called a ___.',
              ['deepfake', 'thumbnail', 'favicon', 'mockup'],
              0,
              'Deepfakes can harm people and companies.',
            ),
            choice(
              'What is worth recording for commercial images?',
              [
                'Nothing',
                'Tool, date and prompt used',
                'Only the file name',
                'The account password',
              ],
              1,
              'Useful if they are challenged or need checking.',
            ),
            choice(
              'You receive a striking image of an event. What do you do before sharing it?',
              ['Share it right away', 'Check the source', 'Edit it', 'Print it'],
              1,
              'Fake realistic images are a vehicle for disinformation.',
            ),
            trueFalse(
              'Copyright rules for AI-generated works are identical all over the world.',
              false,
              'They are evolving and differ between countries.',
            ),
          ],
        },
      ],
      quiz: [
        trueFalse(
          'It is right to disclose when a realistic image was generated with AI.',
          true,
          'Transparency protects customers’ trust.',
        ),
      ],
    },
  ],
  finalTest: [
    choice(
      'Which element is NOT part of a well-built visual prompt?',
      ['Subject', 'Light', 'Framing', 'Your password'],
      3,
      'Subject, style, light and framing are the key ingredients.',
    ),
    choice(
      'How do you protect the important elements while editing?',
      [
        'It cannot be done',
        'By explicitly saying what must stay identical',
        'By using more colors',
        'By changing tool every time',
      ],
      1,
      'E.g. “keep the shape, colors and logo identical”.',
    ),
  ],
});
