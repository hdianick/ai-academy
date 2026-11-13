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
    'Vai oltre le domande semplici: struttura dei prompt, delimitatori, esempi, vincoli, scomposizione dei problemi, catene di prompt, auto-revisione, template riutilizzabili e un metodo per valutare e migliorare i prompt con criteri oggettivi. Funziona con ChatGPT, Claude, Gemini e gli altri modelli.',
  category: 'prompting',
  level: 'advanced',
  tools: ['ChatGPT', 'Claude', 'Gemini'],
  outcomes: [
    'Scrivere prompt strutturati con ruolo, compito, contesto e formato',
    'Usare esempi, vincoli e delimitatori per controllare l’output',
    'Scomporre compiti complessi con ragionamento per passi e catene di prompt',
    'Creare template riutilizzabili e valutarli con casi di prova',
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
          summary: 'Lo schema in 4 parti per prompt chiari e completi.',
          estimatedMinutes: 9,
          theory: [
            theory('Perché serve una struttura', [
              'Un modello linguistico non conosce la tua azienda, il tuo pubblico né il motivo della richiesta: tutto ciò che sa della situazione è scritto nel prompt. Ogni informazione mancante viene “riempita” con l’ipotesi più generica, ed è per questo che i prompt vaghi producono testi banali.',
              'Una struttura fissa ti aiuta a non dimenticare nulla e rende i prompt facili da rileggere, correggere e condividere.',
            ]),
            theory(
              'Le 4 parti',
              [
                'Ruolo: da quale prospettiva rispondere (“sei un esperto di customer care per e-commerce”). Orienta lessico, livello tecnico e priorità.',
                'Compito: cosa fare, con un verbo chiaro (“scrivi”, “classifica”, “confronta”, “estrai”). Un compito per prompt, o più compiti numerati.',
                'Contesto: tutto ciò che il modello non può sapere: pubblico, obiettivo, vincoli aziendali, dati. Formato: come vuoi l’output (tabella, JSON, elenco, numero di parole, sezioni).',
              ],
              {
                tip: 'Se rileggendo il prompt un collega nuovo non capirebbe cosa fare, non lo capirà neanche il modello.',
              },
            ),
            theory(
              'Separare istruzioni e dati',
              [
                'Quando incolli testi o dati, separali dalle istruzioni con delimitatori chiari: tag come <documento>…</documento>, tre virgolette o titoli. Il modello distingue meglio cosa deve eseguire da cosa deve analizzare.',
                'È importante anche per la sicurezza: un testo incollato potrebbe contenere frasi che sembrano istruzioni (“ignora le regole precedenti”). Delimitarlo aiuta a trattarlo come semplice dato.',
              ],
              {
                example:
                  'Sei un analista di customer care.\nClassifica la recensione tra <recensione> in: positiva, neutra, negativa. Indica il motivo principale in max 10 parole.\nFormato: sentimento | motivo\n<recensione>Il casco è ottimo ma la consegna ha richiesto 12 giorni.</recensione>',
              },
            ),
            theory('Ordine e lunghezza', [
              'Un ordine leggibile e consigliato è: ruolo, compito, contesto, formato. Con documenti molto lunghi molti modelli rendono meglio se i dati vengono prima e la domanda alla fine, così la richiesta è “fresca” quando il modello inizia a rispondere.',
              'Un prompt lungo non è un problema se ogni frase è utile. Il problema sono le frasi vaghe o contraddittorie.',
            ]),
            theory('Prima e dopo', [
              'Prompt debole: “Dammi idee per il marketing.” Il modello non sa per quale attività, quale pubblico, quale budget, in che formato.',
              'Prompt strutturato: “Sei un consulente marketing per piccoli e-commerce. Proponi 5 campagne invernali per un negozio online di accessori moto, pubblico 25-45 anni, budget 500 € al mese. Formato: tabella con idea, canale, costo stimato e metrica da monitorare.” Il risultato è immediatamente utilizzabile.',
            ]),
          ],
          questions: [
            order(
              'Ordina le parti di un prompt strutturato (ordine consigliato).',
              ['Ruolo', 'Compito', 'Contesto', 'Formato di uscita'],
              'Non è una regola rigida, ma rende il prompt facile da leggere e mantenere.',
            ),
            promptFix({
              instruction: 'Riscrivi il prompt includendo ruolo, contesto, formato e quantità.',
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
                  keywords: ['elenco', 'tabella', 'punti', 'formato', 'json'],
                },
                {
                  label: 'Quantità o vincoli',
                  keywords: ['5', '10', 'tre', 'cinque', 'dieci', 'massimo', 'entro', 'max'],
                },
              ],
              sampleAnswer:
                'Sei un consulente di marketing per piccoli e-commerce. Proponi 5 idee di campagne per un negozio online di accessori moto, pubblico 25-45 anni, budget mensile 500 €, obiettivo aumentare le vendite in inverno. Formato: tabella con idea, canale, costo stimato, metrica da monitorare.',
            }),
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
            choice(
              'Quale parte del prompt descrive pubblico, obiettivo e vincoli aziendali?',
              ['Il ruolo', 'Il contesto', 'Il formato', 'Il titolo'],
              1,
              'Il contesto fornisce le informazioni che il modello non può conoscere.',
            ),
            trueFalse(
              'Un testo incollato potrebbe contenere frasi che sembrano istruzioni: delimitarlo aiuta a trattarlo come dato.',
              true,
              'È una buona pratica anche di sicurezza.',
            ),
            fillBlank(
              'Il compito va espresso con un ___ chiaro, come “classifica” o “estrai”.',
              ['verbo', 'colore', 'numero', 'link'],
              0,
              'Un verbo d’azione chiaro riduce le ambiguità.',
            ),
            choice(
              'Con un documento molto lungo, dove conviene mettere la domanda?',
              [
                'All’inizio, prima del documento',
                'Alla fine, dopo il documento',
                'In mezzo al documento',
                'Non va scritta',
              ],
              1,
              'Con molti modelli la domanda alla fine, dopo i dati, rende meglio.',
            ),
            trueFalse(
              'Un prompt lungo è sempre peggio di uno breve.',
              false,
              'La lunghezza non è un problema se ogni frase è utile; il problema sono vaghezza e contraddizioni.',
            ),
          ],
        },
        {
          title: 'Esempi e vincoli',
          summary: 'Few-shot prompting: mostra cosa vuoi invece di descriverlo.',
          estimatedMinutes: 8,
          theory: [
            theory('Zero-shot e few-shot', [
              'Quando chiedi qualcosa senza esempi si parla di zero-shot. Quando fornisci 2-5 esempi di input e output desiderato si parla di few-shot: il modello deduce lo schema e lo replica.',
              'Il few-shot è particolarmente efficace per stili di scrittura, formati precisi e classificazioni con regole difficili da descrivere a parole.',
            ]),
            theory(
              'Come scegliere gli esempi',
              [
                'Gli esempi devono essere vari e rappresentativi: casi diversi tra loro, compresi quelli difficili. Se sono tutti simili, il modello tenderà a copiarli troppo da vicino (stessa lunghezza, stesse parole).',
                'Mettili tra delimitatori e etichettali in modo coerente, così il modello capisce dove finisce un esempio e dove inizia il compito vero.',
              ],
              {
                example:
                  '<esempio>\nRecensione: “Arrivato in 2 giorni, perfetto.”\nCategoria: spedizione | positiva\n</esempio>\n<esempio>\nRecensione: “La visiera si graffia subito.”\nCategoria: prodotto | negativa\n</esempio>\nOra classifica: “Taglia giusta ma imbottitura scomoda.”',
              },
            ),
            theory('Vincoli espliciti', [
              'Indica limiti chiari: lunghezza, parole da evitare, lingua, livello di dettaglio, pubblico. Preferisci istruzioni positive (“usa frasi brevi”) a quelle solo negative (“non essere prolisso”): dire cosa fare è più efficace che dire cosa evitare.',
              'Spiega anche il perché quando non è ovvio: “evita i termini tecnici perché i lettori sono clienti alle prime armi”. Il modello generalizza meglio se capisce l’intento.',
            ]),
            theory(
              'La via d’uscita',
              [
                'Dì sempre cosa fare se manca un’informazione: “Se il dato non è presente, scrivi NON DISPONIBILE”. Senza questa istruzione, il modello tende a riempire il vuoto con qualcosa di plausibile, cioè a inventare.',
              ],
              {
                tip: 'Dare al modello una via d’uscita esplicita è una delle tecniche più efficaci contro le allucinazioni.',
              },
            ),
            theory('Prefill e formato guidato', [
              'Un modo per ottenere un formato preciso è mostrarne l’inizio: scrivere “Rispondi con una tabella con colonne: Prodotto | Problema | Soluzione” oppure fornire una struttura da completare.',
              'Per output destinati ad altri programmi (JSON, CSV) indica i nomi esatti dei campi e i valori ammessi.',
            ]),
          ],
          questions: [
            fillBlank(
              'Fornire 2-5 esempi di input e output desiderato si chiama prompting ___.',
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
              'Dà al modello un comportamento esplicito quando l’informazione manca.',
            ),
            trueFalse(
              'Gli esempi few-shot dovrebbero essere tutti molto simili tra loro.',
              false,
              'Esempi vari evitano che il modello copi troppo da vicino un unico schema.',
            ),
            choice(
              'Quale istruzione è formulata meglio?',
              [
                '“Non essere prolisso.”',
                '“Usa frasi brevi, massimo 15 parole ciascuna.”',
                '“Non scrivere male.”',
                '“Evita errori.”',
              ],
              1,
              'Le istruzioni positive e misurabili sono più efficaci di quelle solo negative.',
            ),
            choice(
              'Cosa si intende per zero-shot?',
              [
                'Un prompt senza esempi',
                'Un prompt con zero parole',
                'Un modello senza addestramento',
                'Un errore del modello',
              ],
              0,
              'Zero-shot: chiedi direttamente, senza fornire esempi.',
            ),
            trueFalse(
              'Spiegare il motivo di un vincolo aiuta il modello a generalizzare meglio.',
              true,
              'Se capisce l’intento, il modello applica il vincolo anche ai casi non previsti.',
            ),
            choice(
              'Vuoi un output da importare in un altro programma. Cosa specifichi?',
              [
                'Il tono emotivo',
                'I nomi esatti dei campi e i valori ammessi',
                'Il colore del testo',
                'Niente',
              ],
              1,
              'Formati come JSON o CSV richiedono campi e valori precisi.',
            ),
            choice(
              'In quale caso il few-shot è particolarmente utile?',
              [
                'Per una domanda di cultura generale',
                'Per ottenere uno stile o un formato difficile da descrivere',
                'Per salutare',
                'Per tradurre una parola',
              ],
              1,
              'Gli esempi mostrano ciò che sarebbe lungo o ambiguo da spiegare.',
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
          'I delimitatori riducono ambiguità ed errori.',
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
          estimatedMinutes: 8,
          theory: [
            theory('Pensare prima di rispondere', [
              'Per problemi con più passaggi (calcoli, analisi, decisioni) chiedere di ragionare per passi migliora spesso la qualità: “Analizza il problema passo per passo, poi dai la risposta finale”. Il modello esplicita i passaggi intermedi invece di saltare direttamente a una conclusione.',
              'Molti modelli recenti hanno modalità di ragionamento integrate (“thinking”): dedicano più tempo a pensare prima di rispondere. Anche con questi modelli aiuta indicare chiaramente quali aspetti considerare.',
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
            theory('Separare ragionamento e risposta', [
              'Se ti serve solo il risultato finale (ad esempio da incollare in un documento), chiedi di separare il ragionamento dalla conclusione: “Ragiona dentro <analisi>, poi scrivi la risposta finale dentro <risposta>”. Così puoi controllare il ragionamento e usare solo la parte finale.',
            ]),
            theory(
              'Considerare alternative',
              [
                'Per decisioni importanti chiedi di esplorare più opzioni prima di scegliere: “Proponi 3 approcci diversi, valuta pro e contro di ciascuno, poi raccomandane uno”. Riduce il rischio che il modello si fissi sulla prima idea.',
              ],
              {
                tip: 'Chiedi anche “cosa potrebbe andare storto con questa raccomandazione?”: è un ottimo controllo finale.',
              },
            ),
            theory('Quando non serve', [
              'Per richieste semplici (una traduzione, un sinonimo, una breve email) il ragionamento esplicito allunga solo la risposta. Usalo quando il problema ha davvero più passaggi o più criteri da bilanciare.',
            ]),
          ],
          questions: [
            trueFalse(
              'Per un problema con più passaggi, chiedere di ragionare per passi può migliorare il risultato.',
              true,
              'Il modello esplicita i passaggi intermedi invece di saltare alla conclusione.',
            ),
            order(
              'Ordina le fasi per scomporre un compito di analisi.',
              [
                'Raccogliere e organizzare le informazioni',
                'Analizzare',
                'Valutare i rischi',
                'Scrivere la raccomandazione finale',
              ],
              'Ogni fase usa il risultato della precedente.',
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
            choice(
              'Come separi ragionamento e risposta finale?',
              [
                'Non si può',
                'Chiedendo di ragionare in <analisi> e rispondere in <risposta>',
                'Scrivendo in maiuscolo',
                'Usando due chat',
              ],
              1,
              'I tag permettono di controllare il ragionamento e usare solo la conclusione.',
            ),
            fillBlank(
              'Per decisioni importanti chiedi di esplorare più ___ prima di scegliere.',
              ['opzioni', 'font', 'lingue', 'emoji'],
              0,
              'Valutare alternative riduce il rischio di fissarsi sulla prima idea.',
            ),
            trueFalse(
              'Il ragionamento esplicito è utile anche per tradurre una singola parola.',
              false,
              'Per richieste semplici allunga solo la risposta.',
            ),
            choice(
              'Quale domanda è un buon controllo finale per una raccomandazione?',
              [
                '“Sei felice?”',
                '“Cosa potrebbe andare storto con questa raccomandazione?”',
                '“Puoi usare più emoji?”',
                '“Quanti caratteri hai scritto?”',
              ],
              1,
              'Far emergere i rischi rende la decisione più solida.',
            ),
            choice(
              'Cosa fanno i modelli con modalità di ragionamento integrate?',
              [
                'Rispondono più in fretta senza pensare',
                'Dedicano più tempo a ragionare prima di rispondere',
                'Funzionano solo offline',
                'Non usano il testo',
              ],
              1,
              'Sono pensati per problemi complessi; indicare cosa considerare aiuta comunque.',
            ),
          ],
        },
        {
          title: 'Catene di prompt e auto-revisione',
          summary: 'Più passaggi semplici battono un unico prompt gigante.',
          estimatedMinutes: 8,
          theory: [
            theory('Prompt chaining', [
              'Il prompt chaining divide un lavoro in più richieste collegate: l’output di una diventa l’input della successiva. Esempio: 1) estrai i problemi citati nelle recensioni, 2) raggruppali per tema e conta le occorrenze, 3) scrivi un report con le priorità.',
              'Ogni passaggio è più semplice, quindi più affidabile. E se qualcosa va storto sai esattamente dove intervenire, senza dover rifare tutto.',
            ]),
            theory(
              'Progettare una catena',
              [
                'Definisci per ogni passaggio input, compito e formato di uscita. Il formato di uscita di un passaggio deve essere pensato per essere l’input del successivo: elenchi, tabelle o JSON funzionano meglio di testo libero.',
                'Controlla l’output intermedio, almeno le prime volte: è lì che si scoprono i problemi.',
              ],
              {
                example:
                  'Passo 1: “Estrai da queste 50 recensioni ogni problema citato. Formato: elenco, un problema per riga.”\nPasso 2: “Raggruppa i problemi seguenti per tema e conta quante volte compare ciascuno.”\nPasso 3: “Scrivi un report di 10 righe con i 3 temi prioritari e un’azione per ciascuno.”',
              },
            ),
            theory('Auto-revisione con criteri', [
              'Dopo una bozza, chiedi al modello di criticarla secondo criteri precisi e poi di riscriverla: “Valuta il testo su chiarezza, accuratezza e tono da 1 a 5, spiega i punti deboli e proponi una versione migliorata”.',
              'Criteri espliciti producono revisioni molto più utili di un generico “miglioralo”, che porta spesso a cambiamenti superficiali.',
            ]),
            theory(
              'Ruoli diversi per passaggi diversi',
              [
                'Puoi assegnare ruoli diversi ai passaggi: prima un “copywriter” che scrive, poi un “editor severo” che corregge, infine un “cliente” che legge e dice cosa non è chiaro. Cambiare prospettiva fa emergere problemi diversi.',
              ],
              {
                tip: 'Il “cliente critico” è particolarmente utile per testi di vendita e pagine prodotto.',
              },
            ),
            theory('Dai prompt alle automazioni', [
              'Le catene di prompt sono la base delle automazioni con AI: strumenti come Make, n8n o Zapier eseguono gli stessi passaggi in sequenza, in automatico. Progettare bene una catena “a mano” è il primo passo per automatizzarla.',
            ]),
          ],
          questions: [
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
            trueFalse(
              '“Miglioralo” produce revisioni più utili di una revisione con criteri espliciti.',
              false,
              'I criteri espliciti guidano il modello verso miglioramenti misurabili.',
            ),
            choice(
              'Quale formato di uscita è più adatto tra un passaggio e l’altro di una catena?',
              ['Testo libero e lungo', 'Elenchi, tabelle o JSON', 'Immagini', 'Audio'],
              1,
              'Formati strutturati sono facili da usare come input del passaggio successivo.',
            ),
            fillBlank(
              'Nel prompt chaining l’output di un passaggio diventa l’___ del successivo.',
              ['input', 'errore', 'titolo', 'logo'],
              0,
              'È il principio della catena.',
            ),
            choice(
              'Cosa conviene fare le prime volte che usi una catena?',
              [
                'Non guardare gli output intermedi',
                'Controllare gli output intermedi',
                'Cancellarla',
                'Allungarla',
              ],
              1,
              'Gli output intermedi rivelano dove nascono i problemi.',
            ),
            choice(
              'A cosa serve il ruolo del “cliente critico” in una revisione?',
              [
                'A scrivere più velocemente',
                'A far emergere ciò che non è chiaro per chi legge',
                'A tradurre',
                'A cambiare il formato',
              ],
              1,
              'Cambiare prospettiva fa emergere problemi diversi.',
            ),
            trueFalse(
              'Le catene di prompt sono la base delle automazioni con AI in strumenti come Make e n8n.',
              true,
              'Gli strumenti di automazione eseguono gli stessi passaggi in sequenza, in automatico.',
            ),
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
      ],
    },
    {
      title: 'Prompt per il business',
      description: 'Template, variabili e valutazione della qualità.',
      lessons: [
        {
          title: 'Template riutilizzabili',
          summary: 'Prompt con variabili che tutto il team può usare.',
          estimatedMinutes: 8,
          theory: [
            theory('Parti fisse e parti variabili', [
              'Un template è un prompt con parti fisse (istruzioni, formato, tono, regole) e variabili tra parentesi, ad esempio {prodotto}, {pubblico}, {lunghezza}. Chi lo usa sostituisce solo le variabili.',
              'Il vantaggio è la coerenza: chiunque nel team ottiene risultati simili, senza dover essere esperto di prompt. E quando migliori il template, migliorano i risultati di tutti.',
            ]),
            theory(
              'Esempio di template',
              [
                'Un buon template contiene anche le regole di qualità e il comportamento in caso di dati mancanti.',
                'Nell’esempio qui sotto le parti tra parentesi graffe cambiano a ogni utilizzo, mentre ruolo, struttura della scheda e regola sui dati tecnici restano sempre uguali: così ogni scheda prodotto ha la stessa qualità, chiunque la prepari.',
              ],
              {
                example:
                  'Sei un copywriter per e-commerce. Scrivi la descrizione del prodotto {prodotto} per {pubblico}.\nLunghezza: {lunghezza} parole. Includi: 3 punti di forza in elenco, una frase sulla sicurezza, una call to action finale.\nUsa solo i dati tecnici forniti in <dati>. Se mancano, scrivi [DA COMPLETARE].\n<dati>{dati_tecnici}</dati>',
              },
            ),
            theory('Organizzare una libreria', [
              'Conserva i template in un documento o spazio condiviso, con: nome, a cosa serve, il testo del template, un esempio di input e di output, data dell’ultima revisione e chi lo mantiene.',
              'Raggruppali per attività (marketing, servizio clienti, amministrazione) e tieni pochi template ben fatti invece di molti simili.',
            ]),
            theory(
              'Variabili ben definite',
              [
                'Dai alle variabili nomi chiari e indica, accanto al template, cosa inserire: {tono} → “formale / amichevole / tecnico”. Così si evitano valori imprevisti che peggiorano il risultato.',
              ],
              {
                tip: 'Se una variabile viene compilata male spesso, trasformala in una scelta tra opzioni fisse.',
              },
            ),
            theory('Dai template agli assistenti', [
              'Un template molto usato può diventare un assistente personalizzato o un passaggio di un’automazione: le parti fisse diventano le istruzioni, le variabili diventano i dati in ingresso.',
            ]),
          ],
          questions: [
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
            choice(
              'Cosa rende un template utile per un team?',
              [
                'Che sia lunghissimo',
                'Parti fisse chiare, variabili definite e un esempio d’uso',
                'Che sia in inglese',
                'Che non abbia formato',
              ],
              1,
              'Struttura chiara ed esempi permettono a tutti di ottenere risultati coerenti.',
            ),
            choice(
              'Una variabile viene compilata male spesso. Cosa fai?',
              [
                'La elimino',
                'La trasformo in una scelta tra opzioni fisse',
                'La ignoro',
                'La scrivo in maiuscolo',
              ],
              1,
              'Le opzioni fisse evitano valori imprevisti.',
            ),
            choice(
              'Cosa conviene annotare accanto a ogni template nella libreria?',
              [
                'Solo il titolo',
                'Scopo, esempio di input e output, data di revisione e responsabile',
                'Le password',
                'Niente',
              ],
              1,
              'Queste informazioni rendono la libreria affidabile e mantenibile.',
            ),
            trueFalse(
              'È meglio avere molti template quasi uguali che pochi ben fatti.',
              false,
              'Pochi template curati sono più facili da usare e mantenere.',
            ),
            choice(
              'Quale vantaggio dà migliorare un template condiviso?',
              [
                'Nessuno',
                'Migliorano i risultati di tutti quelli che lo usano',
                'Cambia la lingua',
                'Riduce i file',
              ],
              1,
              'Il miglioramento si propaga a tutto il team.',
            ),
            choice(
              'Come può evolvere un template molto usato?',
              [
                'In un’immagine',
                'In un assistente personalizzato o in un passaggio di automazione',
                'In un font',
                'Non può evolvere',
              ],
              1,
              'Parti fisse → istruzioni; variabili → dati in ingresso.',
            ),
          ],
        },
        {
          title: 'Valutare e migliorare i prompt',
          summary: 'Misura la qualità invece di andare a sensazione.',
          estimatedMinutes: 9,
          theory: [
            theory('Il problema del “mi sembra buono”', [
              'Provare un prompt una o due volte e giudicarlo “buono” è il modo più comune di lavorare, ed è anche il motivo per cui molti prompt falliscono quando arrivano casi diversi. Un prompt va valutato come un prodotto: con test ripetibili.',
            ]),
            theory(
              'Casi di prova e criteri',
              [
                'Prepara 5-10 casi di prova reali e vari, compresi i casi difficili (dati mancanti, richieste ambigue, testi molto lunghi). Definisci criteri di successo misurabili: correttezza, formato rispettato, tono, assenza di invenzioni, lunghezza.',
                'Un criterio è misurabile se due persone diverse darebbero lo stesso giudizio: “rispetta il formato JSON richiesto” lo è, “è bello” no.',
              ],
              {
                example:
                  'Caso 3: recensione in inglese con due problemi.\nCriteri: categoria corretta ✔ · motivo ≤ 10 parole ✔ · formato “sentimento | motivo” ✘ (ha aggiunto una frase introduttiva).',
              },
            ),
            theory('Una modifica alla volta', [
              'Quando modifichi il prompt, rilancia tutti i casi di prova e confronta i risultati. Cambia una cosa alla volta: se cambi molte cose insieme non sai cosa ha migliorato o peggiorato il risultato.',
              'Tieni un registro delle versioni con data, modifica e risultati dei test: ti permette di tornare indietro se una modifica peggiora le cose.',
            ]),
            theory(
              'Errori tipici e rimedi',
              [
                'Formato non rispettato → mostra un esempio del formato o chiedi solo l’output, senza frasi introduttive. Dati inventati → via d’uscita esplicita e dati delimitati. Istruzioni ignorate con testi lunghi → metti le istruzioni chiave alla fine e ripetile in breve. Tono incoerente → aggiungi esempi del tono desiderato.',
              ],
              {
                tip: 'Ogni errore trovato nei test è un’occasione: diventa una nuova regola, un nuovo esempio o un nuovo caso di prova.',
              },
            ),
            theory('Quando cambia il modello', [
              'I modelli vengono aggiornati spesso. Un prompt ottimo con una versione può comportarsi diversamente con la successiva. Avere i casi di prova pronti ti permette di verificarlo in pochi minuti invece di scoprirlo dai clienti.',
            ]),
          ],
          questions: [
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
            trueFalse(
              'Per valutare un prompt bastano un paio di prove a sensazione.',
              false,
              'Servono casi di prova vari, compresi quelli difficili, e criteri definiti.',
            ),
            choice(
              'Il modello aggiunge frasi introduttive prima del formato richiesto. Rimedio?',
              [
                'Allungare il prompt a caso',
                'Mostrare un esempio del formato e chiedere solo l’output',
                'Cambiare lingua',
                'Ignorare',
              ],
              1,
              'Un esempio del formato e l’istruzione “solo l’output” risolvono spesso il problema.',
            ),
            fillBlank(
              'Un registro delle ___ del prompt permette di tornare indietro se una modifica peggiora i risultati.',
              ['versioni', 'emoji', 'immagini', 'password'],
              0,
              'Data, modifica e risultati dei test per ogni versione.',
            ),
            trueFalse(
              'Quando il modello viene aggiornato, conviene rilanciare i casi di prova.',
              true,
              'Lo stesso prompt può comportarsi diversamente con una nuova versione del modello.',
            ),
            choice(
              'Con testi molto lunghi il modello ignora alcune istruzioni. Cosa provi?',
              [
                'Togliere tutte le istruzioni',
                'Mettere le istruzioni chiave alla fine e ripeterle in breve',
                'Scrivere in maiuscolo tutto',
                'Dividere il testo in immagini',
              ],
              1,
              'Istruzioni vicine alla fine e riassunte restano più “presenti”.',
            ),
          ],
        },
      ],
      quiz: [
        trueFalse(
          'Per valutare un prompt bastano un paio di prove a sensazione.',
          false,
          'Servono casi di prova vari e criteri definiti.',
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
