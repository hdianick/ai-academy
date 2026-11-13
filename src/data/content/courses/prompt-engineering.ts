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
  title: 'Prompt Engineering avanzato',
  subtitle: 'Tecniche per risultati precisi, affidabili e ripetibili',
  description:
    'Vai oltre le domande semplici: struttura dei prompt, esempi, vincoli, scomposizione dei problemi, catene di prompt, template riutilizzabili e metodi per valutare e migliorare i risultati. Funziona con ChatGPT, Claude, Gemini e gli altri modelli.',
  category: 'prompting',
  level: 'advanced',
  tools: ['ChatGPT', 'Claude', 'Gemini'],
  outcomes: [
    'Scrivere prompt strutturati con ruolo, compito, contesto e formato',
    'Usare esempi, vincoli e catene di prompt per compiti complessi',
    'Creare template riutilizzabili e valutarli con criteri oggettivi',
  ],
  requiredTier: 'premium',
  icon: 'code-slash-outline',
  modules: [
    {
      title: 'Anatomia di un prompt',
      description: 'Gli elementi che fanno la differenza.',
      lessons: [
        {
          title: 'Ruolo, compito, contesto e formato',
          summary: 'Lo schema in 4 parti per prompt chiari.',
          estimatedMinutes: 5,
          steps: [
            theory('Le 4 parti', [
              'Ruolo: da quale prospettiva deve rispondere il modello (“sei un esperto di customer care”). Compito: cosa deve fare, con un verbo chiaro (“scrivi”, “classifica”, “confronta”).',
              'Contesto: le informazioni che il modello non può sapere (pubblico, obiettivo, vincoli aziendali, dati). Formato: come vuoi l’output (tabella, JSON, elenco, numero di parole).',
            ]),
            theory(
              'Separare istruzioni e dati',
              [
                'Quando incolli testi o dati, separali dalle istruzioni con delimitatori chiari, ad esempio tag come <documento>…</documento> o tre virgolette. Il modello capisce meglio cosa è da eseguire e cosa è da analizzare.',
              ],
              {
                example:
                  'Sei un analista di customer care.\nClassifica la recensione tra <recensione> in: positiva, neutra, negativa. Indica anche il motivo principale in max 10 parole.\nRispondi in formato: sentimento | motivo\n<recensione>Il casco è ottimo ma la consegna ha richiesto 12 giorni.</recensione>',
              },
            ),
            order(
              'Ordina le parti di un prompt strutturato (ordine consigliato).',
              ['Ruolo', 'Compito', 'Contesto', 'Formato di uscita'],
              'Non è una regola rigida, ma questo ordine rende il prompt facile da leggere e da mantenere.',
            ),
            promptFix({
              instruction: 'Riscrivi il prompt includendo ruolo, compito, contesto e formato.',
              weakPrompt: 'Dammi idee per il marketing.',
              checks: [
                {
                  label: 'Ruolo',
                  keywords: ['sei un', 'agisci come', 'in qualità di', 'come esperto', 'ruolo'],
                },
                {
                  label: 'Contesto (azienda, pubblico, obiettivo)',
                  keywords: [
                    'pubblico',
                    'target',
                    'clienti',
                    'azienda',
                    'negozio',
                    'budget',
                    'obiettivo',
                  ],
                },
                {
                  label: 'Formato di uscita',
                  keywords: ['elenco', 'tabella', 'punti', 'idee', 'formato', 'json'],
                },
                {
                  label: 'Quantità o vincoli',
                  keywords: ['5', '10', 'tre', 'cinque', 'dieci', 'massimo', 'entro', 'max'],
                },
              ],
              sampleAnswer:
                'Sei un consulente di marketing per piccoli e-commerce. Proponi 5 idee di campagne per un negozio online di accessori moto, pubblico 25-45 anni, budget mensile 500 €, obiettivo aumentare le vendite in inverno. Formato: tabella con idea, canale, costo stimato, metrica da monitorare.',
            }),
          ],
        },
        {
          title: 'Esempi e vincoli',
          summary: 'Few-shot prompting: mostra cosa vuoi invece di descriverlo.',
          estimatedMinutes: 5,
          steps: [
            theory('Few-shot: imparare dagli esempi', [
              'Fornire 2-3 esempi di input e output desiderato (“few-shot”) è uno dei modi più efficaci per ottenere uno stile o un formato preciso.',
              'Gli esempi devono essere vari e rappresentativi: se sono tutti uguali, il modello tenderà a copiarli troppo da vicino.',
            ]),
            theory(
              'Vincoli espliciti',
              [
                'Indica limiti chiari: lunghezza, parole da evitare, lingua, livello di dettaglio. Preferisci istruzioni positive (“usa frasi brevi”) a quelle solo negative (“non essere prolisso”).',
                'Dì anche cosa fare se manca un’informazione: “Se il dato non è presente, scrivi NON DISPONIBILE”. Così riduci le invenzioni.',
              ],
              {
                tip: 'Dare al modello una “via d’uscita” esplicita è una delle tecniche più efficaci contro le allucinazioni.',
              },
            ),
            fillBlank(
              'Fornire 2-3 esempi di input e output desiderato si chiama prompting ___.',
              ['few-shot', 'zero-day', 'full-stack', 'one-click'],
              0,
              'Few-shot significa “pochi esempi”: il modello deduce lo schema da replicare.',
            ),
            choice(
              'Quale istruzione riduce di più il rischio di dati inventati?',
              [
                '“Sii preciso.”',
                '“Se un dato non è presente nel testo, scrivi NON DISPONIBILE.”',
                '“Rispondi velocemente.”',
                '“Usa un tono professionale.”',
              ],
              1,
              'Dà al modello un comportamento esplicito quando l’informazione manca, invece di spingerlo a riempire il vuoto.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Perché separare istruzioni e dati con delimitatori?',
          [
            'Per estetica',
            'Perché il modello distingua cosa eseguire e cosa analizzare',
            'Per risparmiare soldi',
            'Non serve',
          ],
          1,
          'I delimitatori riducono ambiguità ed errori, anche con testi lunghi.',
        ),
        trueFalse(
          'Gli esempi few-shot dovrebbero essere tutti molto simili tra loro.',
          false,
          'Esempi vari evitano che il modello copi troppo da vicino un unico schema.',
        ),
        choice(
          'Quale parte del prompt descrive pubblico, obiettivo e vincoli aziendali?',
          ['Il ruolo', 'Il contesto', 'Il formato', 'Il titolo'],
          1,
          'Il contesto fornisce le informazioni che il modello non può conoscere.',
        ),
      ],
    },
    {
      title: 'Tecniche avanzate',
      description: 'Scomporre i problemi e far lavorare il modello in più passaggi.',
      lessons: [
        {
          title: 'Ragionamento passo passo',
          summary: 'Dai al modello lo spazio per pensare prima di rispondere.',
          estimatedMinutes: 5,
          steps: [
            theory('Pensare prima di rispondere', [
              'Per problemi con più passaggi (calcoli, analisi, decisioni) chiedere di ragionare per passi migliora spesso la qualità: “Analizza il problema passo per passo, poi dai la risposta finale.”',
              'Molti modelli recenti hanno modalità di ragionamento integrate. Anche in quel caso aiuta indicare chiaramente quali aspetti considerare.',
            ]),
            theory(
              'Scomporre il compito',
              [
                'Un compito grande va diviso in parti: prima raccogli e organizza le informazioni, poi analizza, infine scrivi. Puoi chiederlo in un unico prompt con passaggi numerati.',
              ],
              {
                example:
                  'Devo scegliere tra due fornitori.\n1) Elenca i criteri rilevanti per un e-commerce.\n2) Valuta ciascun fornitore su ogni criterio con i dati sotto.\n3) Indica i rischi principali.\n4) Dai una raccomandazione motivata in 5 righe.',
              },
            ),
            trueFalse(
              'Per un problema con più passaggi, chiedere di ragionare per passi può migliorare il risultato.',
              true,
              'Il modello esplicita i passaggi intermedi invece di saltare direttamente alla conclusione.',
            ),
            order(
              'Ordina le fasi per scomporre un compito di analisi.',
              [
                'Raccogliere e organizzare le informazioni',
                'Analizzare',
                'Valutare i rischi',
                'Scrivere la raccomandazione finale',
              ],
              'Dalla raccolta dei dati alla conclusione: ogni fase usa il risultato della precedente.',
            ),
          ],
        },
        {
          title: 'Catene di prompt e auto-revisione',
          summary: 'Più passaggi semplici battono un unico prompt gigante.',
          estimatedMinutes: 5,
          steps: [
            theory('Prompt chaining', [
              'Il prompt chaining divide un lavoro in più richieste collegate: l’output di una diventa l’input della successiva. Esempio: 1) estrai i dati dalle recensioni, 2) raggruppali per tema, 3) scrivi il report.',
              'Ogni passaggio è più semplice da controllare e, se qualcosa va storto, sai esattamente dove intervenire.',
            ]),
            theory(
              'Auto-revisione',
              [
                'Dopo una bozza, chiedi al modello di criticarla secondo criteri precisi e poi di riscriverla: “Valuta il testo su chiarezza, accuratezza e tono da 1 a 5, spiega i punti deboli e proponi una versione migliorata.”',
              ],
              {
                tip: 'Criteri espliciti producono revisioni molto più utili di un generico “miglioralo”.',
              },
            ),
            choice(
              'Qual è il vantaggio principale del prompt chaining?',
              [
                'Usa meno parole in assoluto',
                'Ogni passaggio è più semplice da controllare e correggere',
                'Funziona solo in inglese',
                'Non richiede mai verifiche',
              ],
              1,
              'Scomporre rende il processo trasparente e più affidabile.',
            ),
            promptFix({
              instruction: 'Trasforma questa richiesta in una revisione con criteri espliciti.',
              weakPrompt: 'Migliora questo testo.',
              checks: [
                {
                  label: 'Criteri di valutazione',
                  keywords: [
                    'chiarezza',
                    'tono',
                    'accuratezza',
                    'criteri',
                    'leggibilita',
                    'coerenza',
                    'lunghezza',
                  ],
                },
                {
                  label: 'Chiede di individuare i punti deboli',
                  keywords: [
                    'punti deboli',
                    'problemi',
                    'errori',
                    'critica',
                    'cosa non funziona',
                    'valuta',
                  ],
                },
                {
                  label: 'Chiede una nuova versione',
                  keywords: [
                    'riscrivi',
                    'nuova versione',
                    'versione migliorata',
                    'proponi',
                    'riformula',
                  ],
                },
              ],
              sampleAnswer:
                'Valuta questo testo da 1 a 5 su chiarezza, tono e accuratezza. Elenca i 3 punti deboli principali e poi riscrivi una versione migliorata che li risolva, mantenendo la stessa lunghezza.',
            }),
          ],
        },
      ],
      quiz: [
        choice(
          'Cos’è il prompt chaining?',
          [
            'Un prompt molto lungo',
            'Una sequenza di prompt dove l’output di uno è l’input del successivo',
            'Un abbonamento',
            'Un tipo di immagine',
          ],
          1,
          'Scompone un lavoro complesso in passaggi controllabili.',
        ),
        trueFalse(
          '“Miglioralo” produce revisioni più utili di una revisione con criteri espliciti.',
          false,
          'I criteri espliciti guidano il modello verso miglioramenti misurabili.',
        ),
        choice(
          'Quando è più utile chiedere un ragionamento passo passo?',
          [
            'Per un sinonimo',
            'Per un problema con più passaggi o una decisione',
            'Per tradurre una parola',
            'Per salutare',
          ],
          1,
          'I problemi complessi beneficiano dei passaggi intermedi espliciti.',
        ),
      ],
    },
    {
      title: 'Prompt per il business',
      description: 'Template, variabili e valutazione della qualità.',
      lessons: [
        {
          title: 'Template riutilizzabili',
          summary: 'Prompt con variabili che tutto il team può usare.',
          estimatedMinutes: 4,
          steps: [
            theory('Parti fisse e parti variabili', [
              'Un template è un prompt con parti fisse (istruzioni, formato, tono) e variabili tra parentesi, ad esempio {prodotto}, {pubblico}, {lunghezza}.',
              'Così chiunque nel team ottiene risultati coerenti senza dover essere un esperto di prompt.',
            ]),
            theory(
              'Esempio di template',
              [
                'Conserva i template in un documento condiviso, con un esempio di input e di output per ciascuno.',
              ],
              {
                example:
                  'Sei un copywriter per e-commerce. Scrivi la descrizione del prodotto {prodotto} per {pubblico}.\nLunghezza: {lunghezza} parole. Includi: 3 punti di forza in elenco, una frase sulla sicurezza, una call to action finale.\nSe mancano dati tecnici, non inventarli: scrivi [DA COMPLETARE].',
              },
            ),
            fillBlank(
              'In un template, le parti che cambiano ogni volta si chiamano ___.',
              ['variabili', 'costanti', 'allucinazioni', 'token'],
              0,
              'Le variabili (es. {prodotto}) vengono sostituite con i dati specifici a ogni utilizzo.',
            ),
            trueFalse(
              'Un buon template dice anche cosa fare se mancano dei dati.',
              true,
              'Evita che il modello inventi informazioni per completare il testo.',
            ),
          ],
        },
        {
          title: 'Valutare e migliorare i prompt',
          summary: 'Misura la qualità invece di andare a sensazione.',
          estimatedMinutes: 5,
          steps: [
            theory('Un mini sistema di test', [
              'Prepara 5-10 casi di prova reali (input diversi, inclusi casi difficili) e definisci i criteri di successo: correttezza, formato rispettato, tono, assenza di invenzioni.',
              'Quando modifichi il prompt, rilancia gli stessi casi e confronta. Cambia una cosa alla volta, così capisci cosa ha funzionato.',
            ]),
            theory(
              'Errori tipici da cercare',
              [
                'Formato non rispettato, dati inventati, istruzioni ignorate quando il testo è lungo, tono incoerente. Annotali: diventano nuove regole o nuovi esempi nel prompt.',
              ],
              { tip: 'Tieni un registro delle versioni del prompt con data e risultati dei test.' },
            ),
            order(
              'Ordina il processo di miglioramento di un prompt.',
              [
                'Definire casi di prova e criteri',
                'Eseguire il prompt sui casi',
                'Annotare gli errori',
                'Modificare una cosa alla volta e ritestare',
              ],
              'È un ciclo: si misura, si corregge e si misura di nuovo.',
            ),
            choice(
              'Perché cambiare una sola cosa alla volta?',
              [
                'Per andare più piano',
                'Per capire quale modifica ha migliorato o peggiorato il risultato',
                'Perché i modelli accettano una sola modifica',
                'Non ha importanza',
              ],
              1,
              'Se cambi molte cose insieme non sai a cosa attribuire il risultato.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Cosa rende un template utile per un team?',
          [
            'Che sia lunghissimo',
            'Parti fisse chiare, variabili e un esempio d’uso',
            'Che sia in inglese',
            'Che non abbia formato',
          ],
          1,
          'Struttura chiara e esempi permettono a tutti di ottenere risultati coerenti.',
        ),
        trueFalse(
          'Per valutare un prompt bastano un paio di prove a sensazione.',
          false,
          'Servono casi di prova vari e criteri definiti.',
        ),
        choice(
          'Quale di questi è un criterio di successo misurabile?',
          [
            '“È bello”',
            '“Rispetta il formato JSON richiesto”',
            '“Mi piace”',
            '“Sembra intelligente”',
          ],
          1,
          'Un criterio misurabile si può verificare in modo oggettivo.',
        ),
      ],
    },
  ],
  finalTest: [
    choice(
      'Quali sono le 4 parti di un prompt strutturato?',
      [
        'Titolo, testo, firma, data',
        'Ruolo, compito, contesto, formato',
        'Domanda, risposta, voto, link',
        'Lingua, font, colore, lunghezza',
      ],
      1,
      'È lo schema base per prompt chiari.',
    ),
    trueFalse(
      'Dire al modello cosa fare quando un dato manca riduce le invenzioni.',
      true,
      'È una “via d’uscita” esplicita.',
    ),
    choice(
      'Cos’è il few-shot prompting?',
      [
        'Usare un solo prompt',
        'Dare pochi esempi di input e output desiderato',
        'Fare domande brevi',
        'Usare le immagini',
      ],
      1,
      'Il modello deduce lo schema dagli esempi.',
    ),
    choice(
      'Quale tecnica divide un lavoro in più richieste collegate?',
      ['Prompt chaining', 'Copia-incolla', 'Traduzione', 'Few-shot'],
      0,
      'L’output di un passaggio è l’input del successivo.',
    ),
    trueFalse(
      'In un template le variabili si scrivono spesso tra parentesi, come {prodotto}.',
      true,
      'È una convenzione semplice e leggibile.',
    ),
    choice(
      'Come migliori un prompt in modo affidabile?',
      [
        'Cambiando tutto ogni volta',
        'Testando su casi fissi e cambiando una cosa alla volta',
        'Chiedendo a un collega se gli piace',
        'Allungandolo sempre',
      ],
      1,
      'Misurare e confrontare è il metodo più solido.',
    ),
  ],
});
