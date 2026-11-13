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
  title: 'Introduzione all’intelligenza artificiale',
  subtitle: 'Capire cos’è l’AI, come funziona e come usarla bene',
  description:
    'Il punto di partenza per tutti: cosa sono davvero l’intelligenza artificiale e i modelli linguistici, cosa sanno fare, dove sbagliano e come usarli in modo sicuro e responsabile.',
  category: 'fundamentals',
  level: 'beginner',
  tools: ['ChatGPT', 'Claude', 'Gemini'],
  outcomes: [
    'Spiegare con parole semplici cos’è un modello linguistico',
    'Riconoscere cosa l’AI fa bene e dove può sbagliare',
    'Usare l’AI proteggendo i tuoi dati e verificando le risposte',
  ],
  requiredTier: 'free',
  icon: 'bulb-outline',
  modules: [
    {
      title: 'Cos’è l’intelligenza artificiale',
      description: 'Le basi: AI, machine learning e modelli linguistici.',
      lessons: [
        {
          title: 'AI, machine learning e deep learning',
          summary: 'Tre termini che senti ovunque, spiegati in 4 minuti.',
          estimatedMinutes: 4,
          steps: [
            theory('Un sistema che impara dagli esempi', [
              'L’intelligenza artificiale (AI) è l’insieme delle tecniche che permettono a un computer di svolgere compiti che di solito richiedono intelligenza umana: capire un testo, riconoscere un’immagine, prendere una decisione.',
              'Il machine learning è il modo in cui oggi si costruisce quasi tutta l’AI: invece di scrivere a mano ogni regola, si mostrano al sistema moltissimi esempi e lui impara da solo gli schemi ricorrenti.',
            ]),
            theory(
              'Dal machine learning al deep learning',
              [
                'Il deep learning è un tipo di machine learning che usa reti neurali con molti livelli. È la tecnologia dietro gli assistenti come ChatGPT, Claude e Gemini, e dietro i generatori di immagini e video.',
                'Pensa a tre cerchi uno dentro l’altro: l’AI è il cerchio più grande, il machine learning è dentro l’AI e il deep learning è dentro il machine learning.',
              ],
              {
                tip: 'Quando qualcuno dice “AI” oggi, quasi sempre intende sistemi basati su deep learning.',
              },
            ),
            choice(
              'Qual è la differenza principale tra il software tradizionale e il machine learning?',
              [
                'Il machine learning impara gli schemi dagli esempi invece di seguire regole scritte a mano',
                'Il machine learning funziona solo su internet',
                'Il software tradizionale è sempre più lento',
                'Non c’è alcuna differenza',
              ],
              0,
              'Nel software tradizionale un programmatore scrive ogni regola. Nel machine learning il sistema ricava le regole da grandi quantità di esempi.',
            ),
            order(
              'Ordina dal concetto più ampio al più specifico.',
              ['Intelligenza artificiale', 'Machine learning', 'Deep learning'],
              'Il deep learning è un tipo di machine learning, che a sua volta è un modo di costruire l’intelligenza artificiale.',
            ),
          ],
        },
        {
          title: 'Come “pensa” un modello linguistico',
          summary: 'Token, previsioni e addestramento: cosa succede quando scrivi a un chatbot.',
          estimatedMinutes: 5,
          steps: [
            theory('Prevedere il pezzo successivo', [
              'Un modello linguistico (LLM, Large Language Model) è addestrato su enormi quantità di testo. Durante l’addestramento impara a prevedere qual è il pezzo di testo più probabile dopo quelli che ha già visto.',
              'Questi pezzi si chiamano token: possono essere parole intere, parti di parola o segni di punteggiatura. Quando ti risponde, il modello genera la risposta un token alla volta.',
            ]),
            theory(
              'Perché sembra capire',
              [
                'Prevedendo il testo su miliardi di esempi, il modello ha assorbito grammatica, fatti, stili di scrittura e schemi di ragionamento. Per questo sa riassumere, tradurre, spiegare e scrivere codice.',
                'Non “consulta” un database di risposte: costruisce ogni risposta sul momento. È anche per questo che a volte può sbagliare con grande sicurezza.',
              ],
              {
                tip: 'La stessa domanda può produrre risposte un po’ diverse: la generazione contiene una componente di variabilità.',
              },
            ),
            fillBlank(
              'I modelli linguistici generano il testo un ___ alla volta.',
              ['token', 'file', 'database', 'pixel'],
              0,
              'Il token è l’unità di testo con cui lavora il modello: una parola, una parte di parola o un simbolo.',
            ),
            trueFalse(
              'Un modello linguistico cerca ogni risposta in un archivio di risposte già scritte.',
              false,
              'Il modello genera ogni risposta sul momento, sulla base degli schemi appresi durante l’addestramento. Alcuni assistenti possono anche cercare sul web, ma la risposta viene comunque scritta dal modello.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Quale tecnologia è alla base di assistenti come ChatGPT, Claude e Gemini?',
          [
            'Fogli di calcolo',
            'Deep learning e modelli linguistici',
            'Motori di ricerca tradizionali',
            'Regole scritte a mano',
          ],
          1,
          'Sono modelli linguistici di grandi dimensioni, costruiti con tecniche di deep learning.',
        ),
        trueFalse(
          'Il deep learning è un sottoinsieme del machine learning.',
          true,
          'Esatto: il deep learning è una famiglia di tecniche di machine learning basate su reti neurali profonde.',
        ),
        choice(
          'Cos’è un token?',
          [
            'Una password per usare l’AI',
            'Un’unità di testo, come una parola o una parte di parola',
            'Un tipo di immagine',
            'Un abbonamento',
          ],
          1,
          'I modelli leggono e scrivono testo suddiviso in token.',
        ),
      ],
    },
    {
      title: 'Cosa sa fare l’AI (e cosa no)',
      description: 'Capacità reali e limiti da conoscere.',
      lessons: [
        {
          title: 'Le capacità principali',
          summary: 'Testo, immagini, audio, codice e ricerca: una mappa degli usi.',
          estimatedMinutes: 4,
          steps: [
            theory('Una mappa degli usi', [
              'Testo: scrivere, riassumere, tradurre, correggere, fare brainstorming. È l’uso più diffuso degli assistenti come ChatGPT, Claude e Gemini.',
              'Immagini e video: generare o modificare immagini a partire da una descrizione, creare brevi video. Audio: trascrivere riunioni, generare voci e musica.',
              'Codice: spiegare, scrivere e correggere programmi. Ricerca: alcuni strumenti cercano sul web e citano le fonti.',
            ]),
            theory(
              'Multimodale: più tipi di dati insieme',
              [
                'Molti assistenti moderni sono multimodali: puoi caricare una foto, un PDF o un foglio di calcolo e fare domande sul contenuto.',
                'Esempio pratico: fotografi lo scontrino di un fornitore e chiedi di estrarre data, importo e partita IVA in una tabella.',
              ],
              {
                example:
                  'Ecco la foto di una fattura. Estrai fornitore, data, imponibile, IVA e totale in una tabella.',
              },
            ),
            choice(
              'Vuoi trasformare la registrazione di una riunione in un verbale. Quali capacità ti servono?',
              [
                'Solo generazione di immagini',
                'Trascrizione audio e riassunto del testo',
                'Solo traduzione',
                'Nessuna: l’AI non lavora con l’audio',
              ],
              1,
              'Prima l’audio viene trascritto in testo, poi il testo viene riassunto e organizzato in un verbale.',
            ),
            trueFalse(
              'Un assistente multimodale può analizzare il contenuto di una foto che gli carichi.',
              true,
              'Multimodale significa proprio che il modello lavora con più tipi di dati: testo, immagini, a volte audio e video.',
            ),
          ],
        },
        {
          title: 'I limiti: allucinazioni, aggiornamento e bias',
          summary: 'Perché l’AI a volte sbaglia, e come accorgersene.',
          estimatedMinutes: 5,
          steps: [
            theory('Le allucinazioni', [
              'Un’allucinazione è una risposta sbagliata presentata con sicurezza: un dato inventato, una citazione inesistente, un riferimento normativo sbagliato.',
              'Succede perché il modello genera testo plausibile, non necessariamente vero. Il rischio aumenta con domande molto specifiche, numeri precisi e argomenti poco documentati.',
            ]),
            theory(
              'Data di aggiornamento e bias',
              [
                'Ogni modello ha una data limite di addestramento: senza accesso al web non conosce gli eventi successivi. Prezzi, leggi e versioni dei software possono essere cambiati.',
                'I modelli imparano dai testi umani, quindi possono riprodurne anche pregiudizi (bias), ad esempio su genere, provenienza o professioni.',
              ],
              {
                tip: 'Più la risposta è importante (soldi, salute, legge), più è importante verificarla su una fonte affidabile.',
              },
            ),
            choice(
              'Quale di queste è un’allucinazione?',
              [
                'Il modello risponde in inglese invece che in italiano',
                'Il modello cita una sentenza che non esiste',
                'Il modello dà una risposta troppo lunga',
                'Il modello chiede un chiarimento',
              ],
              1,
              'Inventare fonti, dati o fatti presentandoli come veri è il tipico esempio di allucinazione.',
            ),
            fillBlank(
              'Un modello senza accesso al web non conosce gli eventi successivi alla sua data di ___.',
              ['addestramento', 'installazione', 'acquisto', 'registrazione'],
              0,
              'La conoscenza del modello si ferma ai dati usati durante l’addestramento.',
            ),
          ],
        },
      ],
      quiz: [
        trueFalse(
          'Se un’AI risponde con sicurezza, la risposta è sicuramente corretta.',
          false,
          'Le allucinazioni sono proprio risposte sbagliate date con sicurezza.',
        ),
        choice(
          'In quale caso è più importante verificare la risposta?',
          [
            'Un’idea per il nome di un evento',
            'L’aliquota di una tassa da applicare in fattura',
            'Un sinonimo per una parola',
            'Una battuta per un post',
          ],
          1,
          'Dati fiscali, legali e numerici vanno sempre verificati su fonti ufficiali.',
        ),
        choice(
          'Cosa significa che un modello ha un bias?',
          [
            'Che è lento',
            'Che può riprodurre pregiudizi presenti nei dati di addestramento',
            'Che non parla italiano',
            'Che costa troppo',
          ],
          1,
          'I modelli apprendono dai testi umani, inclusi i pregiudizi che contengono.',
        ),
      ],
    },
    {
      title: 'Usare l’AI in modo responsabile',
      description: 'Privacy, verifica delle informazioni e buone abitudini.',
      lessons: [
        {
          title: 'Privacy e dati sensibili',
          summary: 'Cosa non incollare mai in un chatbot.',
          estimatedMinutes: 4,
          steps: [
            theory('Pensa prima di incollare', [
              'Quello che scrivi a un assistente AI viene elaborato sui server del fornitore. A seconda del servizio e delle impostazioni, le conversazioni possono essere conservate e, in alcuni casi, usate per migliorare i modelli.',
              'Evita di inserire password, numeri di carte, dati sanitari, dati personali di clienti o documenti riservati, a meno che la tua azienda non usi una versione con garanzie contrattuali adeguate.',
            ]),
            theory(
              'Anonimizzare',
              [
                'Spesso puoi ottenere lo stesso aiuto sostituendo i dati reali con segnaposto: “Cliente A”, “Azienda X”, “importo 1.000 €”.',
                'Controlla le impostazioni sulla privacy del servizio che usi e, in azienda, segui le regole interne sull’uso dell’AI.',
              ],
              {
                example:
                  'Prima: “Scrivi un sollecito a Mario Rossi, via Roma 12, per la fattura 2024/118”.\nDopo: “Scrivi un sollecito cortese a un cliente per una fattura scaduta da 30 giorni”.',
              },
            ),
            choice(
              'Quale di questi dati è sicuro da incollare in un chatbot pubblico?',
              [
                'La password del gestionale aziendale',
                'Un testo di marketing già pubblicato sul tuo sito',
                'L’elenco clienti con email e telefoni',
                'I referti medici di un dipendente',
              ],
              1,
              'Un contenuto già pubblico non espone dati riservati. Gli altri sono dati sensibili o personali.',
            ),
            trueFalse(
              'Sostituire nomi e dati reali con segnaposto è un buon modo per proteggere la privacy.',
              true,
              'L’anonimizzazione ti permette di ottenere aiuto senza esporre informazioni personali o riservate.',
            ),
          ],
        },
        {
          title: 'Verificare le risposte',
          summary: 'Un metodo in 4 passi per fidarti (il giusto) dell’AI.',
          estimatedMinutes: 4,
          steps: [
            theory('Il metodo dei 4 passi', [
              '1. Chiedi le fonti: quando possibile, usa strumenti che cercano sul web e citano da dove prendono le informazioni.',
              '2. Apri le fonti e controlla che dicano davvero quello che l’AI riporta. 3. Confronta con una seconda fonte autorevole. 4. Per decisioni importanti, chiedi a un professionista.',
            ]),
            theory(
              'Fai lavorare l’AI contro i propri errori',
              [
                'Puoi chiedere al modello di rivedere la propria risposta: “Quali parti di questa risposta potrebbero essere imprecise o datate?”',
                'Non è una garanzia, ma spesso fa emergere i punti deboli da controllare.',
              ],
              { tip: 'L’AI è un ottimo primo assistente, non un giudice finale.' },
            ),
            order(
              'Metti in ordine il metodo di verifica.',
              [
                'Chiedi da quali fonti arrivano le informazioni',
                'Apri le fonti e controlla il contenuto',
                'Confronta con una seconda fonte autorevole',
                'Per decisioni importanti, consulta un professionista',
              ],
              'Si parte dalle fonti, si verificano, si confrontano e, quando la posta è alta, si chiede a un esperto.',
            ),
            choice(
              'L’AI ti fornisce un link come fonte. Cosa fai?',
              [
                'Lo considero affidabile senza aprirlo',
                'Apro il link e verifico che dica davvero quello che l’AI riporta',
                'Lo ignoro sempre',
                'Chiedo all’AI di confermare che è giusto',
              ],
              1,
              'Anche le fonti citate vanno aperte: a volte il contenuto non corrisponde o il link non esiste.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Cosa è meglio fare prima di chiedere aiuto all’AI su un documento con dati di clienti?',
          ['Niente', 'Anonimizzare i dati personali', 'Aggiungere più dati', 'Tradurlo in inglese'],
          1,
          'Rimuovere o sostituire i dati personali riduce i rischi per la privacy.',
        ),
        trueFalse(
          'Chiedere all’AI di rivedere la propria risposta garantisce che sia corretta.',
          false,
          'Aiuta a far emergere errori, ma la verifica su fonti esterne resta necessaria.',
        ),
        choice(
          'Qual è il primo passo del metodo di verifica?',
          [
            'Consultare un avvocato',
            'Chiedere da quali fonti arrivano le informazioni',
            'Condividere la risposta',
            'Rifare la domanda in inglese',
          ],
          1,
          'Si parte dalle fonti, per poterle poi controllare.',
        ),
      ],
    },
  ],
  finalTest: [
    choice(
      'Come genera le risposte un modello linguistico?',
      [
        'Copia risposte da un archivio',
        'Prevede un token alla volta in base agli schemi appresi',
        'Chiede a un operatore umano',
        'Usa solo regole scritte a mano',
      ],
      1,
      'Il modello genera il testo token per token.',
    ),
    trueFalse(
      'I modelli linguistici conoscono sempre gli eventi di oggi.',
      false,
      'Senza accesso al web la loro conoscenza si ferma alla data di addestramento.',
    ),
    choice(
      'Cos’è un’allucinazione?',
      [
        'Un errore di connessione',
        'Una risposta inventata presentata come vera',
        'Un’immagine generata',
        'Una risposta troppo breve',
      ],
      1,
      'È uno dei limiti più importanti da conoscere.',
    ),
    choice(
      'Quale dato NON dovresti incollare in un chatbot pubblico?',
      [
        'Un testo pubblicato sul tuo blog',
        'Una domanda generica di grammatica',
        'Il numero della tua carta di credito',
        'Un’idea per un titolo',
      ],
      2,
      'Dati di pagamento e credenziali non vanno mai condivisi.',
    ),
    trueFalse(
      'Un assistente multimodale può lavorare con testo e immagini.',
      true,
      'Multimodale significa capace di gestire più tipi di dati.',
    ),
    choice(
      'Qual è l’atteggiamento più corretto verso le risposte dell’AI?',
      [
        'Fidarsi sempre',
        'Non usarla mai',
        'Usarla come assistente e verificare le informazioni importanti',
        'Usarla solo in inglese',
      ],
      2,
      'L’AI è un ottimo assistente, ma le decisioni importanti richiedono verifica.',
    ),
  ],
});
