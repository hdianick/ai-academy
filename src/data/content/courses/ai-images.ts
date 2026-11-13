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
  title: 'Creazione di immagini con AI',
  subtitle: 'Prompt visivi, editing e immagini per il business',
  description:
    'Impara a creare e modificare immagini con l’intelligenza artificiale: come funzionano i generatori, come scrivere prompt visivi efficaci, come ottenere coerenza e come usare le immagini per e-commerce e social in modo corretto e trasparente.',
  category: 'images',
  level: 'intermediate',
  tools: ['Midjourney', 'Nano Banana', 'ChatGPT'],
  outcomes: [
    'Scrivere prompt visivi con soggetto, stile, luce e composizione',
    'Modificare immagini esistenti con istruzioni in linguaggio naturale',
    'Creare immagini per prodotti e social rispettando diritti e trasparenza',
  ],
  requiredTier: 'free',
  icon: 'image-outline',
  modules: [
    {
      title: 'Fondamenti',
      description: 'Come nasce un’immagine generata e come descriverla.',
      lessons: [
        {
          title: 'Come funzionano i generatori di immagini',
          summary: 'Dal rumore all’immagine: l’idea dei modelli di diffusione.',
          estimatedMinutes: 4,
          steps: [
            theory('Dal rumore all’immagine', [
              'Molti generatori di immagini si basano su modelli di diffusione: durante l’addestramento imparano a “ripulire” immagini piene di rumore. Per creare un’immagine nuova partono da rumore casuale e lo trasformano passo dopo passo, guidati dal tuo testo.',
              'Altri modelli più recenti generano immagini direttamente dentro un assistente multimodale, e capiscono meglio istruzioni conversazionali e modifiche.',
            ]),
            theory(
              'Perché ogni risultato è diverso',
              [
                'Il punto di partenza casuale fa sì che lo stesso prompt produca immagini diverse. È un vantaggio: puoi generare varianti e scegliere la migliore.',
                'I generatori faticano ancora con alcuni dettagli: testi lunghi dentro l’immagine, mani, loghi precisi. Controlla sempre il risultato finale.',
              ],
              {
                tip: 'Genera più varianti e scegli: è il flusso di lavoro normale, non un ripiego.',
              },
            ),
            trueFalse(
              'Lo stesso prompt produce sempre esattamente la stessa immagine.',
              false,
              'Il punto di partenza casuale genera variazioni a ogni tentativo.',
            ),
            choice(
              'Quale di questi dettagli è spesso più difficile per un generatore?',
              [
                'Un cielo al tramonto',
                'Un testo lungo scritto dentro l’immagine',
                'Un paesaggio di montagna',
                'Un colore di sfondo',
              ],
              1,
              'Le scritte lunghe e precise sono ancora un punto debole, anche se i modelli migliorano rapidamente.',
            ),
          ],
        },
        {
          title: 'La struttura di un prompt visivo',
          summary: 'Soggetto, stile, luce, composizione e inquadratura.',
          estimatedMinutes: 5,
          steps: [
            theory('Gli ingredienti', [
              'Soggetto: cosa c’è nell’immagine, con dettagli concreti. Ambiente: dove si trova. Stile: fotografia, illustrazione, 3D, acquerello…',
              'Luce e atmosfera: luce naturale del mattino, studio fotografico, neon. Composizione e inquadratura: primo piano, vista dall’alto, sfondo sfocato, proporzioni.',
            ]),
            theory(
              'Esempio completo',
              [
                'Descrivi come se parlassi a un fotografo: frasi chiare, dettagli visibili, niente concetti astratti.',
              ],
              {
                example:
                  'Fotografia prodotto di un casco moto integrale nero opaco, appoggiato su una superficie di cemento grezzo, luce laterale morbida da studio, sfondo grigio scuro sfumato, inquadratura a tre quarti, alta nitidezza, formato quadrato.',
              },
            ),
            order(
              'Ordina gli elementi come in un prompt visivo ben costruito.',
              ['Soggetto', 'Ambiente', 'Stile', 'Luce e atmosfera', 'Inquadratura e formato'],
              'Dal “cosa” al “come”: prima il soggetto, poi contesto, stile, luce e infine la ripresa.',
            ),
            promptFix({
              instruction:
                'Rendi questo prompt visivo più preciso aggiungendo stile, luce e inquadratura.',
              weakPrompt: 'Un caffè.',
              checks: [
                {
                  label: 'Stile (foto, illustrazione…)',
                  keywords: [
                    'foto',
                    'fotografia',
                    'illustrazione',
                    'acquerello',
                    '3d',
                    'render',
                    'stile',
                  ],
                },
                {
                  label: 'Luce o atmosfera',
                  keywords: [
                    'luce',
                    'illuminazione',
                    'tramonto',
                    'mattino',
                    'atmosfera',
                    'ombre',
                    'neon',
                  ],
                },
                {
                  label: 'Inquadratura o formato',
                  keywords: [
                    'primo piano',
                    'dall’alto',
                    "dall'alto",
                    'inquadratura',
                    'formato',
                    'verticale',
                    'quadrato',
                    'sfondo sfocato',
                    'macro',
                  ],
                },
                {
                  label: 'Ambiente o dettagli',
                  keywords: [
                    'tavolo',
                    'bar',
                    'cucina',
                    'tazza',
                    'legno',
                    'marmo',
                    'schiuma',
                    'chicchi',
                  ],
                },
              ],
              sampleAnswer:
                'Fotografia di una tazza di espresso con crema dorata su un tavolo di marmo bianco in un bar italiano, luce naturale del mattino da una finestra, chicchi di caffè sparsi, primo piano con sfondo sfocato, formato verticale.',
            }),
          ],
        },
      ],
      quiz: [
        choice(
          'Da cosa parte un modello di diffusione per creare un’immagine?',
          [
            'Da una foto esistente sempre',
            'Da rumore casuale che viene ripulito passo dopo passo',
            'Da un disegno a mano',
            'Da un video',
          ],
          1,
          'Il testo guida la trasformazione del rumore in immagine.',
        ),
        trueFalse(
          'In un prompt visivo conviene descrivere luce e inquadratura.',
          true,
          'Sono tra gli elementi che cambiano di più il risultato.',
        ),
        choice(
          'Quale prompt è più efficace?',
          [
            '“Una bella scarpa”',
            '“Foto prodotto di una sneaker bianca su sfondo pastello, luce da studio, vista laterale”',
            '“Scarpa, figo”',
            '“Fai tu”',
          ],
          1,
          'Specifica soggetto, stile, luce e inquadratura.',
        ),
      ],
    },
    {
      title: 'Controllo e coerenza',
      description: 'Proporzioni, varianti, riferimenti ed editing.',
      lessons: [
        {
          title: 'Proporzioni, varianti e riferimenti',
          summary: 'Ottieni il formato giusto e uno stile coerente.',
          estimatedMinutes: 5,
          steps: [
            theory('Il formato giusto per ogni canale', [
              'Scegli le proporzioni in base a dove userai l’immagine: 1:1 per post quadrati, 4:5 per il feed verticale, 9:16 per storie e reel, 16:9 per banner e video orizzontali.',
              'Ogni strumento ha il suo modo di indicarle: in Midjourney si usa il parametro --ar (es. --ar 16:9), negli assistenti conversazionali basta scriverlo nella richiesta.',
            ]),
            theory(
              'Coerenza tra più immagini',
              [
                'Per una serie coerente (es. tutte le foto di un catalogo) riusa la stessa descrizione di stile, luce e sfondo, cambiando solo il soggetto.',
                'Molti strumenti accettano immagini di riferimento per stile o soggetto: carica una foto del tuo prodotto e chiedi di mantenerne forma e colori.',
              ],
              { tip: 'Salva il “blocco stile” del tuo brand e incollalo in fondo a ogni prompt.' },
            ),
            choice(
              'Quale proporzione è più adatta a una storia Instagram?',
              ['16:9', '9:16', '1:1', '21:9'],
              1,
              'Le storie e i reel usano il formato verticale 9:16.',
            ),
            fillBlank(
              'In Midjourney le proporzioni si indicano con il parametro ___.',
              ['--ar', '--size', '--color', '--fast'],
              0,
              '--ar sta per aspect ratio, ad esempio --ar 4:5.',
            ),
          ],
        },
        {
          title: 'Modificare immagini con le parole',
          summary: 'Editing conversazionale: cambia sfondo, luce e dettagli.',
          estimatedMinutes: 5,
          steps: [
            theory('Editing in linguaggio naturale', [
              'Strumenti come Nano Banana (il modello di immagini di Google integrato in Gemini) e la generazione di immagini in ChatGPT permettono di modificare una foto esistente descrivendo la modifica: “sostituisci lo sfondo con una strada di montagna”, “rendi la luce più calda”.',
              'Il vantaggio è che il soggetto originale viene in gran parte preservato: è ideale per ambientare foto di prodotto.',
            ]),
            theory(
              'Una modifica alla volta',
              [
                'Chiedi una modifica per volta e indica cosa NON deve cambiare: “mantieni identici forma, colori e logo del casco”. Se il risultato si allontana troppo, torna alla versione precedente invece di accumulare correzioni.',
              ],
              {
                example:
                  'Prendi questa foto del casco. Sostituisci lo sfondo bianco con una strada di montagna al tramonto, luce calda. Mantieni identici forma, colori e grafiche del casco.',
              },
            ),
            trueFalse(
              'Nell’editing conversazionale conviene indicare anche cosa non deve cambiare.',
              true,
              'Proteggere esplicitamente gli elementi importanti riduce le modifiche indesiderate.',
            ),
            choice(
              'Il risultato si è allontanato molto dall’originale dopo varie correzioni. Cosa fai?',
              [
                'Continuo ad aggiungere correzioni',
                'Torno a una versione precedente buona e riparto con una modifica più precisa',
                'Abbandono il progetto',
                'Cambio lingua',
              ],
              1,
              'Accumulare correzioni spesso degrada l’immagine: meglio ripartire da una base buona.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Quale formato useresti per un banner orizzontale di un sito?',
          ['9:16', '16:9', '4:5', '1:1'],
          1,
          '16:9 è il formato orizzontale standard.',
        ),
        trueFalse(
          'Per una serie coerente conviene riusare lo stesso blocco di stile, luce e sfondo.',
          true,
          'Cambiare solo il soggetto mantiene l’identità visiva.',
        ),
        choice(
          'Cosa permette l’editing conversazionale?',
          [
            'Solo ritagliare',
            'Modificare un’immagine descrivendo il cambiamento a parole',
            'Solo cambiare formato file',
            'Nulla',
          ],
          1,
          'Descrivi la modifica e il modello la applica preservando il resto.',
        ),
      ],
    },
    {
      title: 'Uso professionale',
      description: 'E-commerce, social, diritti e trasparenza.',
      lessons: [
        {
          title: 'Immagini per e-commerce e social',
          summary: 'Ambientazioni prodotto, banner e contenuti social.',
          estimatedMinutes: 5,
          steps: [
            theory('Dove l’AI fa risparmiare di più', [
              'Ambientazioni: parti dalla foto reale del prodotto e crea scene diverse (outdoor, studio, lifestyle) senza nuovi shooting. Banner e sfondi per campagne stagionali. Varianti per test A/B sui social.',
              'Mantieni sempre il prodotto reale fedele: colori, forma e dettagli devono corrispondere a ciò che il cliente riceverà.',
            ]),
            theory(
              'Attenzione alle regole dei marketplace',
              [
                'Molti marketplace hanno regole precise sulle immagini principali (es. sfondo bianco, prodotto reale, niente elementi che ingannano). Le scene generate sono più adatte alle immagini secondarie e ai contenuti social.',
              ],
              {
                tip: 'Controlla sempre le linee guida aggiornate del marketplace prima di caricare immagini generate.',
              },
            ),
            choice(
              'Quale uso dell’AI per le immagini prodotto è più corretto?',
              [
                'Cambiare il colore del prodotto per renderlo più bello di com’è',
                'Ambientare la foto reale del prodotto in una scena lifestyle mantenendolo fedele',
                'Aggiungere accessori che non sono inclusi senza dirlo',
                'Generare un prodotto che non esiste',
              ],
              1,
              'L’immagine deve rappresentare fedelmente ciò che il cliente riceve.',
            ),
            trueFalse(
              'Le regole sulle immagini principali possono variare da marketplace a marketplace.',
              true,
              'Vanno verificate sulle linee guida ufficiali, che possono cambiare nel tempo.',
            ),
          ],
        },
        {
          title: 'Diritti, etica e trasparenza',
          summary: 'Cosa puoi fare, cosa evitare e quando dichiararlo.',
          estimatedMinutes: 4,
          steps: [
            theory('Buone regole pratiche', [
              'Evita di imitare marchi, loghi, personaggi protetti o lo stile riconoscibile di un artista vivente. Non creare immagini realistiche di persone reali senza il loro consenso.',
              'Le condizioni d’uso commerciale dipendono dallo strumento e dal piano: leggile prima di usare le immagini in pubblicità. Le norme sul diritto d’autore per le opere generate sono in evoluzione.',
            ]),
            theory(
              'Trasparenza',
              [
                'Quando un’immagine generata potrebbe essere scambiata per una foto reale (persone, eventi, prodotti), dichiaralo. Alcune piattaforme richiedono un’etichetta per i contenuti generati con AI.',
              ],
              { tip: 'Nel dubbio, dichiaralo: la fiducia dei clienti vale più di un’immagine.' },
            ),
            choice(
              'Quale di questi usi è da evitare?',
              [
                'Creare uno sfondo astratto per un banner',
                'Creare un’immagine realistica di un personaggio famoso che usa il tuo prodotto',
                'Ambientare la foto del tuo prodotto in montagna',
                'Creare un’illustrazione per un articolo del blog',
              ],
              1,
              'Usare l’immagine di una persona reale senza consenso è scorretto e può essere illegale.',
            ),
            trueFalse(
              'Le condizioni d’uso commerciale sono uguali per tutti gli strumenti e i piani.',
              false,
              'Variano: vanno lette prima dell’uso in pubblicità.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Dove sono più adatte le scene di prodotto generate con AI?',
          [
            'Come unica immagine principale sempre',
            'Nelle immagini secondarie e nei contenuti social',
            'Nei documenti fiscali',
            'Da nessuna parte',
          ],
          1,
          'Le immagini principali dei marketplace spesso hanno regole stringenti.',
        ),
        trueFalse(
          'È corretto dichiarare quando un’immagine realistica è stata generata con AI.',
          true,
          'La trasparenza protegge la fiducia dei clienti.',
        ),
        choice(
          'Cosa devi verificare prima di usare un’immagine AI in una pubblicità?',
          [
            'Il colore preferito del cliente',
            'Le condizioni d’uso commerciale dello strumento',
            'Il meteo',
            'Niente',
          ],
          1,
          'I diritti di utilizzo dipendono dallo strumento e dal piano.',
        ),
      ],
    },
  ],
  finalTest: [
    choice(
      'Quale elemento NON fa parte di un prompt visivo ben costruito?',
      ['Soggetto', 'Luce', 'Inquadratura', 'La tua password'],
      3,
      'Soggetto, stile, luce e inquadratura sono gli ingredienti chiave.',
    ),
    trueFalse(
      'Generare più varianti e scegliere la migliore è un flusso di lavoro normale.',
      true,
      'La variabilità è un vantaggio creativo.',
    ),
    choice(
      'Che formato usi per un reel?',
      ['16:9', '1:1', '9:16', '3:2'],
      2,
      'Reel e storie sono verticali 9:16.',
    ),
    choice(
      'Come proteggi gli elementi importanti durante l’editing?',
      [
        'Non si può',
        'Indicando esplicitamente cosa deve rimanere identico',
        'Usando più colori',
        'Cambiando strumento ogni volta',
      ],
      1,
      'Es. “mantieni identici forma, colori e logo”.',
    ),
    trueFalse(
      'Puoi modificare il colore del prodotto nell’immagine per renderlo più attraente anche se non corrisponde al reale.',
      false,
      'Le immagini devono rappresentare fedelmente il prodotto.',
    ),
    choice(
      'Cosa evitare nelle immagini generate?',
      [
        'Sfondi astratti',
        'Imitare loghi e personaggi protetti',
        'Illustrazioni originali',
        'Ambientazioni prodotto',
      ],
      1,
      'Marchi e personaggi protetti non vanno imitati.',
    ),
  ],
});
