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
    'Il punto di partenza per tutti: cosa sono davvero l’intelligenza artificiale e i modelli linguistici, come vengono addestrati, cosa sanno fare, dove sbagliano e come usarli in modo sicuro, verificando le risposte e proteggendo i dati.',
  category: 'fundamentals',
  level: 'beginner',
  tools: ['ChatGPT', 'Claude', 'Gemini'],
  outcomes: [
    'Spiegare con parole semplici cos’è un modello linguistico e come genera le risposte',
    'Riconoscere cosa l’AI fa bene e dove può sbagliare (allucinazioni, bias, dati non aggiornati)',
    'Usare l’AI proteggendo i dati personali e aziendali',
    'Verificare le risposte con un metodo semplice e ripetibile',
  ],
  requiredTier: 'free',
  icon: 'bulb-outline',
  modules: [
    {
      title: 'Cos’è l’intelligenza artificiale',
      description: 'Le basi: AI, machine learning, deep learning e modelli linguistici.',
      lessons: [
        {
          title: 'AI, machine learning e deep learning',
          summary: 'Tre termini che senti ovunque, spiegati con esempi concreti.',
          estimatedMinutes: 8,
          theory: [
            theory('Che cosa intendiamo per “intelligenza artificiale”', [
              'Con intelligenza artificiale (AI) si indica l’insieme delle tecniche che permettono a un computer di svolgere compiti che, fino a poco tempo fa, richiedevano l’intelligenza umana: capire una frase, riconoscere un volto in una foto, tradurre un testo, consigliare un prodotto, prevedere una vendita.',
              'Non esiste una sola “AI”: esistono molti sistemi diversi, ciascuno costruito per uno scopo. Il filtro antispam della tua email, il navigatore che stima il traffico, i suggerimenti di un e-commerce e ChatGPT sono tutti esempi di intelligenza artificiale, anche se funzionano in modo molto diverso.',
              'Quasi tutta l’AI che usiamo oggi è “ristretta”: è molto brava in compiti specifici, ma non ha una comprensione generale del mondo come una persona.',
            ]),
            theory(
              'Dal software a regole al machine learning',
              [
                'Nel software tradizionale un programmatore scrive ogni regola: “se l’email contiene la parola X, spostala nello spam”. Funziona finché i casi sono prevedibili, ma diventa impossibile quando le situazioni sono milioni e cambiano continuamente.',
                'Il machine learning (apprendimento automatico) ribalta l’approccio: invece di scrivere le regole, si mostrano al sistema moltissimi esempi già etichettati (email “spam” e “non spam”) e lui impara da solo quali caratteristiche distinguono le due categorie.',
                'Il risultato dell’addestramento si chiama modello: una specie di “formula” molto complessa che, ricevuto un nuovo esempio, produce una previsione.',
              ],
              {
                example:
                  'Regola scritta a mano: “Se il cliente ha speso più di 500 € e non compra da 90 giorni, mandagli uno sconto.”\nMachine learning: il modello analizza lo storico di migliaia di clienti e impara da solo chi è più probabile che smetta di comprare.',
              },
            ),
            theory('Il deep learning e le reti neurali', [
              'Il deep learning è un tipo di machine learning che usa reti neurali artificiali con molti livelli (da qui “deep”, profondo). Ogni livello trasforma i dati e passa il risultato al successivo, imparando rappresentazioni sempre più astratte.',
              'In una rete che riconosce immagini, i primi livelli imparano a cogliere bordi e colori, quelli intermedi forme e parti di oggetti, gli ultimi oggetti interi come “casco” o “moto”.',
              'Il deep learning ha bisogno di enormi quantità di dati e di grande potenza di calcolo, ma è la tecnologia dietro quasi tutte le AI moderne: assistenti come ChatGPT, Claude e Gemini, generatori di immagini e video, riconoscimento vocale e traduzione automatica.',
            ]),
            theory(
              'Come stanno insieme i tre concetti',
              [
                'Immagina tre cerchi uno dentro l’altro. Il cerchio più grande è l’intelligenza artificiale: l’obiettivo generale. Dentro c’è il machine learning: il modo più diffuso per ottenerla. Dentro ancora c’è il deep learning: la famiglia di tecniche più potente oggi.',
                'Quando qualcuno oggi parla di “AI”, nella maggior parte dei casi si riferisce a sistemi di deep learning, in particolare ai modelli generativi capaci di creare testo, immagini, audio e video.',
              ],
              {
                tip: 'Non serve conoscere la matematica: per usare bene l’AI basta capire che impara dagli esempi e che quindi riflette i dati con cui è stata addestrata.',
              },
            ),
            theory('Perché proprio adesso', [
              'Le idee alla base delle reti neurali esistono da decenni. L’esplosione degli ultimi anni dipende da tre fattori arrivati insieme: enormi quantità di dati digitali disponibili, processori specializzati (GPU) molto più potenti e nuove architetture di reti neurali, come i “transformer”, particolarmente efficaci con il linguaggio.',
              'Il risultato sono modelli generativi che non si limitano a classificare o prevedere, ma producono contenuti nuovi. È questo salto che ha portato l’AI nelle mani di tutti.',
            ]),
          ],
          questions: [
            choice(
              'Qual è la differenza principale tra il software tradizionale e il machine learning?',
              [
                'Il machine learning impara gli schemi dagli esempi invece di seguire regole scritte a mano',
                'Il machine learning funziona solo su internet',
                'Il software tradizionale è sempre più lento',
                'Non c’è alcuna differenza',
              ],
              0,
              'Nel software tradizionale un programmatore scrive ogni regola; nel machine learning il sistema ricava le regole da grandi quantità di esempi.',
            ),
            order(
              'Ordina dal concetto più ampio al più specifico.',
              ['Intelligenza artificiale', 'Machine learning', 'Deep learning'],
              'Il deep learning è un tipo di machine learning, che a sua volta è un modo di costruire l’intelligenza artificiale.',
            ),
            fillBlank(
              'Il risultato dell’addestramento di un sistema di machine learning si chiama ___.',
              ['modello', 'database', 'motore di ricerca', 'server'],
              0,
              'Il modello è ciò che il sistema ha “imparato”: riceve un nuovo input e produce una previsione.',
            ),
            trueFalse(
              'Quasi tutta l’AI che usiamo oggi è “ristretta”: molto brava in compiti specifici, senza una comprensione generale del mondo.',
              true,
              'I sistemi attuali eccellono in compiti definiti ma non hanno la comprensione generale di una persona.',
            ),
            choice(
              'Perché si parla di deep (“profondo”) learning?',
              [
                'Perché analizza solo dati segreti',
                'Perché usa reti neurali con molti livelli',
                'Perché funziona solo di notte',
                'Perché richiede pochi dati',
              ],
              1,
              'Il termine si riferisce ai molti livelli della rete neurale, ognuno dei quali elabora i dati del precedente.',
            ),
            choice(
              'Quale di questi è un esempio di intelligenza artificiale che usi probabilmente ogni giorno?',
              [
                'Una calcolatrice tascabile',
                'Il filtro antispam dell’email',
                'Un interruttore della luce',
                'Un foglio di carta',
              ],
              1,
              'Il filtro antispam impara a riconoscere i messaggi indesiderati: è un classico esempio di machine learning.',
            ),
            trueFalse(
              'Il deep learning funziona bene anche con pochissimi dati e poca potenza di calcolo.',
              false,
              'Il deep learning richiede tipicamente grandi quantità di dati e molta potenza di calcolo.',
            ),
            choice(
              'Quale combinazione di fattori spiega il boom recente dell’AI?',
              [
                'Più dati, processori più potenti e nuove architetture di reti neurali',
                'Solo una legge europea',
                'Il calo dei prezzi degli smartphone',
                'La nascita di internet',
              ],
              0,
              'Dati, potenza di calcolo (GPU) e architetture come i transformer sono arrivati insieme.',
            ),
          ],
        },
        {
          title: 'Come “pensa” un modello linguistico',
          summary:
            'Token, previsioni, addestramento e contesto: cosa succede quando scrivi a un chatbot.',
          estimatedMinutes: 9,
          theory: [
            theory('Cos’è un modello linguistico', [
              'Un modello linguistico di grandi dimensioni (LLM, Large Language Model) è una rete neurale addestrata su enormi quantità di testo: libri, siti web, articoli, codice. Durante l’addestramento il compito è semplice da descrivere: dato un testo, prevedere qual è il pezzo successivo più probabile.',
              'Ripetendo questo esercizio miliardi di volte, il modello assorbe grammatica, vocabolario, fatti, stili di scrittura e perfino schemi di ragionamento. ChatGPT, Claude e Gemini sono assistenti costruiti su modelli di questo tipo.',
            ]),
            theory(
              'I token: i mattoncini del testo',
              [
                'Il modello non legge lettere o parole come noi: lavora con i token. Un token può essere una parola intera (“casa”), una parte di parola (“intelli” + “genza”) o un segno di punteggiatura.',
                'Quando ti risponde, il modello genera la risposta un token alla volta: sceglie il token successivo in base a tutto il testo precedente, lo aggiunge e ripete. Per questo vedi la risposta comparire progressivamente.',
                'I token contano anche in pratica: i limiti di lunghezza delle conversazioni e i costi delle API si misurano in token.',
              ],
              {
                tip: 'In italiano servono in media più token che in inglese per esprimere lo stesso concetto.',
              },
            ),
            theory('Dall’addestramento all’assistente', [
              'Un modello appena addestrato a prevedere il testo sa completare frasi, ma non è ancora un buon assistente. Per questo viene addestrato ulteriormente con esempi di conversazioni e con il giudizio di persone che indicano quali risposte sono più utili, corrette e sicure.',
              'Questa seconda fase insegna al modello a seguire le istruzioni, a rispondere nel formato richiesto e a rifiutare richieste pericolose. È ciò che trasforma un “completatore di testo” in un assistente con cui conversare.',
            ]),
            theory(
              'Il contesto: la memoria di lavoro',
              [
                'In una conversazione il modello vede tutto il testo dentro la sua finestra di contesto: le tue istruzioni, i messaggi precedenti, i documenti che hai caricato. È la sua “memoria di lavoro”.',
                'La finestra ha un limite: conversazioni lunghissime o documenti enormi possono superarlo, e le parti più vecchie possono essere riassunte o escluse. Inoltre il modello non impara dalle tue chat in tempo reale: la conoscenza di base resta quella dell’addestramento.',
              ],
              {
                example:
                  'Nella stessa chat puoi scrivere “rendilo più breve” senza ripetere il testo, perché è nel contesto. In una nuova chat il modello non sa di cosa stai parlando.',
              },
            ),
            theory('Perché sembra capire (e perché a volte sbaglia)', [
              'Grazie alla quantità di esempi visti, il modello coglie relazioni molto sofisticate tra concetti: per questo sa riassumere, tradurre, spiegare e scrivere codice in modo convincente.',
              'Però non consulta un archivio di risposte verificate: costruisce ogni risposta sul momento, scegliendo il testo più plausibile. Quando l’informazione è rara, recente o molto specifica, il testo plausibile può essere sbagliato. Inoltre la generazione contiene una componente di variabilità: la stessa domanda può produrre risposte diverse.',
            ]),
          ],
          questions: [
            fillBlank(
              'I modelli linguistici generano il testo un ___ alla volta.',
              ['token', 'file', 'database', 'pixel'],
              0,
              'Il token è l’unità di testo con cui lavora il modello: una parola, una parte di parola o un simbolo.',
            ),
            trueFalse(
              'Un modello linguistico cerca ogni risposta in un archivio di risposte già scritte.',
              false,
              'Il modello genera ogni risposta sul momento, sulla base degli schemi appresi durante l’addestramento.',
            ),
            choice(
              'Qual è il compito di base con cui viene addestrato un modello linguistico?',
              [
                'Tradurre in inglese',
                'Prevedere il pezzo di testo successivo',
                'Contare le parole',
                'Cercare su Google',
              ],
              1,
              'Prevedendo il testo successivo su enormi quantità di dati, il modello impara lingua, fatti e schemi.',
            ),
            choice(
              'A cosa serve la seconda fase di addestramento con esempi di conversazioni e giudizi umani?',
              [
                'A rendere il modello più veloce',
                'A insegnargli a seguire le istruzioni e rispondere in modo utile e sicuro',
                'A collegarlo a internet',
                'A ridurne il costo',
              ],
              1,
              'È questa fase che trasforma un completatore di testo in un assistente conversazionale.',
            ),
            choice(
              'Cos’è la finestra di contesto?',
              [
                'La finestra del browser',
                'Il testo che il modello può “vedere” in una conversazione',
                'L’elenco delle chat salvate',
                'Il manuale del modello',
              ],
              1,
              'Comprende istruzioni, messaggi precedenti e documenti caricati, entro un limite massimo.',
            ),
            trueFalse(
              'Il modello impara in tempo reale da ogni tua conversazione e aggiorna la sua conoscenza di base.',
              false,
              'La conoscenza di base deriva dall’addestramento; la conversazione resta solo nel contesto.',
            ),
            choice(
              'Perché la stessa domanda può produrre risposte diverse?',
              [
                'Perché il modello è rotto',
                'Perché la generazione contiene una componente di variabilità',
                'Perché cambia la lingua',
                'Perché internet è lento',
              ],
              1,
              'La scelta dei token successivi non è sempre identica: per questo le risposte possono variare.',
            ),
            choice(
              'In quale situazione è più probabile che un modello sbagli?',
              [
                'Un riassunto di un testo che gli hai fornito',
                'Un dato molto specifico e poco documentato',
                'La correzione grammaticale di una frase',
                'Una traduzione semplice',
              ],
              1,
              'Con informazioni rare, recenti o molto specifiche il testo “plausibile” può essere sbagliato.',
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
          'Il deep learning è una famiglia di tecniche di machine learning basate su reti neurali profonde.',
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
      description: 'Capacità reali, limiti e come riconoscerli.',
      lessons: [
        {
          title: 'Le capacità principali',
          summary: 'Testo, immagini, audio, video, codice e ricerca: una mappa degli usi.',
          estimatedMinutes: 8,
          theory: [
            theory('Lavorare con il testo', [
              'È l’uso più diffuso: scrivere bozze di email, articoli e schede prodotto; riassumere documenti lunghi; tradurre; correggere; cambiare tono a un testo; fare brainstorming di idee e nomi.',
              'Gli assistenti sono particolarmente utili come “primo collaboratore”: ti danno una base da cui partire, che poi rivedi e personalizzi. Il risultato migliore nasce quasi sempre da più passaggi di revisione.',
            ]),
            theory(
              'Analizzare documenti e dati',
              [
                'Puoi caricare PDF, contratti, fogli di calcolo, foto di scontrini o grafici e fare domande sul contenuto: “quali sono le clausole di recesso?”, “quali prodotti sono in calo?”, “estrai i dati di questa fattura”.',
                'Con i fogli di calcolo alcuni assistenti eseguono veri calcoli e creano grafici. Per i numeri importanti chiedi sempre di mostrare il procedimento.',
              ],
              {
                example:
                  'Ecco la foto di una fattura. Estrai fornitore, data, imponibile, IVA e totale in una tabella. Se un dato non è leggibile, scrivi “non leggibile”.',
              },
            ),
            theory('Immagini, video e audio', [
              'I modelli generativi creano immagini da una descrizione testuale e modificano foto esistenti con istruzioni a parole (“cambia lo sfondo”, “rendi la luce più calda”). Strumenti come Midjourney e Nano Banana sono specializzati in questo.',
              'Altri modelli generano brevi video (Runway, Sora, Veo), voci realistiche e doppiaggi (ElevenLabs), musica (Suno). L’audio funziona anche al contrario: le registrazioni delle riunioni possono essere trascritte e riassunte.',
            ]),
            theory(
              'Codice, ricerca e azioni',
              [
                'Gli assistenti spiegano, scrivono e correggono codice; strumenti come Cursor e Claude Code lavorano direttamente su interi progetti software.',
                'Alcuni strumenti cercano sul web e citano le fonti (ad esempio Perplexity), altri rispondono solo sulla base dei tuoi documenti (NotebookLM). Gli agenti, infine, possono svolgere azioni in più passaggi: cercare, compilare, inviare, sempre entro i permessi che concedi.',
              ],
              {
                tip: 'Scegli lo strumento in base al compito: un generalista per scrivere e ragionare, uno specializzato per immagini, video, ricerca con fonti o automazioni.',
              },
            ),
            theory('Multimodale: più tipi di dati insieme', [
              'Molti assistenti moderni sono multimodali: nella stessa conversazione possono leggere testo, guardare immagini, ascoltare audio e, in alcuni casi, analizzare video.',
              'In pratica significa che puoi fotografare un problema (un errore sullo schermo, un modulo cartaceo, un prodotto difettoso) e chiedere aiuto descrivendolo a voce o per iscritto, senza dover trascrivere nulla.',
            ]),
          ],
          questions: [
            choice(
              'Vuoi trasformare la registrazione di una riunione in un verbale. Quali capacità ti servono?',
              [
                'Solo generazione di immagini',
                'Trascrizione audio e riassunto del testo',
                'Solo traduzione',
                'Nessuna: l’AI non lavora con l’audio',
              ],
              1,
              'Prima l’audio viene trascritto, poi il testo viene riassunto e organizzato.',
            ),
            trueFalse(
              'Un assistente multimodale può analizzare il contenuto di una foto che gli carichi.',
              true,
              'Multimodale significa che il modello lavora con più tipi di dati: testo, immagini, a volte audio e video.',
            ),
            choice(
              'Quale strumento è più adatto a una ricerca sul web con fonti citate?',
              ['Suno', 'Perplexity', 'Midjourney', 'ElevenLabs'],
              1,
              'Perplexity cerca sul web e indica le fonti di ogni risposta.',
            ),
            choice(
              'Cosa conviene chiedere quando l’AI fa calcoli importanti su un foglio di calcolo?',
              [
                'Di usare più colori',
                'Di mostrare il procedimento',
                'Di rispondere in inglese',
                'Niente',
              ],
              1,
              'Vedere il procedimento ti permette di controllare formule e passaggi.',
            ),
            fillBlank(
              'Un assistente che lavora con testo, immagini e audio si definisce ___.',
              ['multimodale', 'monolingue', 'offline', 'analogico'],
              0,
              'Multimodale: capace di gestire più tipi di dati nella stessa conversazione.',
            ),
            choice(
              'Quale di questi compiti è tipico di un agente AI?',
              [
                'Scrivere una sola frase',
                'Svolgere più passaggi, come cercare informazioni e compilare un documento',
                'Mostrare una foto',
                'Cambiare il colore dello schermo',
              ],
              1,
              'Un agente esegue compiti in più passaggi usando strumenti, entro i permessi concessi.',
            ),
            trueFalse(
              'Il modo migliore di usare un assistente per scrivere è pubblicare subito la prima bozza senza rileggerla.',
              false,
              'L’AI dà una base: il risultato migliore nasce da revisione e personalizzazione.',
            ),
            choice(
              'Hai bisogno di una voce narrante per un video in tre lingue. Quale categoria di strumento cerchi?',
              [
                'Generazione di immagini',
                'Sintesi vocale e doppiaggio',
                'Foglio di calcolo',
                'Motore di ricerca',
              ],
              1,
              'Strumenti come ElevenLabs sono specializzati in voci e doppiaggio.',
            ),
          ],
        },
        {
          title: 'I limiti: allucinazioni, aggiornamento e bias',
          summary: 'Perché l’AI a volte sbaglia, e come accorgersene in tempo.',
          estimatedMinutes: 9,
          theory: [
            theory('Le allucinazioni', [
              'Un’allucinazione è una risposta sbagliata presentata con sicurezza: un dato inventato, una citazione inesistente, una sentenza che non esiste, un riferimento normativo errato, una funzione software che non c’è.',
              'Succede perché il modello è addestrato a produrre testo plausibile, non a verificare la verità. Il tono sicuro non è un indicatore di correttezza: anzi, le allucinazioni sono pericolose proprio perché sembrano credibili.',
            ]),
            theory(
              'Quando il rischio è più alto',
              [
                'Domande su numeri precisi, date, nomi, citazioni e riferimenti bibliografici o legali. Argomenti di nicchia o molto recenti. Richieste di riassumere documenti che il modello non ha davvero ricevuto.',
                'Anche il modo in cui chiedi conta: una domanda che dà per scontato un fatto falso (“perché la legge X del 2025 obbliga a…?”) spinge il modello ad “assecondarti”.',
              ],
              {
                tip: 'Per ridurre le allucinazioni: fornisci tu i documenti, chiedi di citare la fonte di ogni affermazione e dai una via d’uscita: “Se non lo sai, scrivi NON LO SO”.',
              },
            ),
            theory('La data di aggiornamento', [
              'Ogni modello ha una data limite di addestramento (knowledge cutoff): ciò che è successo dopo non fa parte della sua conoscenza di base. Prezzi, leggi, versioni software, cariche e notizie potrebbero essere cambiati.',
              'Molti assistenti possono cercare sul web per colmare questo limite. Quando l’informazione dipende dal momento attuale, assicurati che lo strumento abbia davvero consultato fonti aggiornate e controlla le date delle fonti.',
            ]),
            theory(
              'I bias',
              [
                'I modelli imparano dai testi prodotti da persone, quindi possono riprodurne pregiudizi e stereotipi: su genere, provenienza, età, professioni. Un bias può comparire in modo sottile, ad esempio associando sempre certi lavori a un genere.',
                'Nel lavoro questo conta soprattutto quando l’AI aiuta a valutare persone (selezione del personale, concessione di crediti) o produce comunicazioni rivolte a pubblici diversi.',
              ],
              {
                example:
                  'Chiedi: “Scrivi 5 descrizioni di candidati ideali per un ruolo di ingegnere” e controlla se nomi, pronomi ed esempi sono vari o tutti uguali.',
              },
            ),
            theory('Un atteggiamento equilibrato', [
              'Conoscere i limiti non significa rinunciare all’AI: significa usarla nel modo giusto. È eccellente per bozze, idee, riassunti di testi che fornisci tu, riformulazioni e spiegazioni di concetti noti.',
              'Serve invece cautela, e una verifica, per fatti puntuali, numeri, temi legali, fiscali e sanitari e per qualsiasi decisione con conseguenze importanti. Regola pratica: più alta è la posta in gioco, più alta deve essere la verifica.',
            ]),
          ],
          questions: [
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
              'La conoscenza di base si ferma ai dati usati durante l’addestramento.',
            ),
            trueFalse(
              'Se un’AI risponde con un tono molto sicuro, la risposta è affidabile.',
              false,
              'Il tono sicuro non indica correttezza: le allucinazioni sono pericolose proprio perché sembrano credibili.',
            ),
            choice(
              'Quale istruzione aiuta a ridurre le allucinazioni?',
              [
                '“Rispondi più in fretta”',
                '“Se non lo sai, scrivi NON LO SO”',
                '“Usa un tono sicuro”',
                '“Scrivi almeno 500 parole”',
              ],
              1,
              'Dare una via d’uscita esplicita evita che il modello riempia il vuoto con informazioni inventate.',
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
            trueFalse(
              'Una domanda che dà per scontato un fatto falso può spingere il modello ad assecondarlo.',
              true,
              'Il modello tende a completare in modo coerente con la domanda: verifica le premesse prima di chiedere.',
            ),
            choice(
              'Ti serve il prezzo attuale di un servizio. Cosa fai?',
              [
                'Mi fido della conoscenza di base del modello',
                'Uso uno strumento con ricerca web e controllo la data della fonte',
                'Chiedo di inventare un prezzo plausibile',
                'Uso un generatore di immagini',
              ],
              1,
              'Le informazioni che cambiano nel tempo vanno verificate su fonti aggiornate.',
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
          'Cosa significa “knowledge cutoff”?',
          [
            'Il limite di parole di una risposta',
            'La data limite dei dati di addestramento',
            'Il costo di un abbonamento',
            'Il numero di utenti',
          ],
          1,
          'È la data oltre la quale il modello non ha conoscenze di base.',
        ),
        choice(
          'Quale attività è più adatta all’AI senza particolari verifiche?',
          [
            'Fare brainstorming di idee per un post',
            'Calcolare le imposte da versare',
            'Citare articoli di legge',
            'Dare una diagnosi medica',
          ],
          0,
          'Idee e bozze sono a basso rischio; numeri, leggi e salute richiedono verifica.',
        ),
      ],
    },
    {
      title: 'Usare l’AI in modo responsabile',
      description: 'Privacy, verifica delle informazioni e buone abitudini.',
      lessons: [
        {
          title: 'Privacy e dati sensibili',
          summary: 'Cosa non incollare mai in un chatbot e come lavorare in sicurezza.',
          estimatedMinutes: 8,
          theory: [
            theory('Dove finiscono i tuoi dati', [
              'Quando scrivi a un assistente AI, il testo e i file vengono inviati ed elaborati sui server del fornitore. A seconda del servizio, del piano e delle impostazioni, le conversazioni possono essere conservate per un certo periodo e, in alcuni casi, usate per migliorare i modelli.',
              'Le versioni aziendali (business, enterprise) offrono di solito garanzie contrattuali più forti, ad esempio l’esclusione dei dati dall’addestramento. Prima di usare l’AI con dati di lavoro, informati su quale versione usa la tua azienda.',
            ]),
            theory(
              'Cosa non condividere',
              [
                'Password, codici di accesso e chiavi API. Numeri di carte di pagamento e dati bancari. Dati sanitari. Dati personali di clienti o dipendenti (nomi, indirizzi, telefoni, email). Documenti riservati: contratti non pubblici, strategie, dati finanziari interni.',
                'Attenzione anche alle immagini: uno screenshot può contenere informazioni che non hai notato, come nomi in una chat o dati in una tabella sullo sfondo.',
              ],
              {
                tip: 'Regola veloce: se non lo invieresti per email a uno sconosciuto, non incollarlo in un chatbot pubblico.',
              },
            ),
            theory(
              'Anonimizzare: lo stesso aiuto, meno rischi',
              [
                'Spesso puoi ottenere esattamente lo stesso aiuto sostituendo i dati reali con segnaposto: “Cliente A”, “Fornitore X”, “importo 1.000 €”. L’AI non ha bisogno del nome vero per scrivere un buon sollecito.',
                'Per i documenti, rimuovi o oscura le parti sensibili prima di caricarli, oppure incolla solo il passaggio che ti serve.',
              ],
              {
                example:
                  'Prima: “Scrivi un sollecito a Mario Rossi, via Roma 12, per la fattura 2024/118 di 3.420 €”.\nDopo: “Scrivi un sollecito cortese a un cliente per una fattura scaduta da 30 giorni”.',
              },
            ),
            theory('Impostazioni e regole aziendali', [
              'Molti servizi permettono di disattivare l’uso delle conversazioni per l’addestramento, usare chat temporanee e cancellare la cronologia. Controlla queste impostazioni nel tuo account.',
              'In azienda, segui la policy interna sull’uso dell’AI: quali strumenti sono approvati, quali dati sono ammessi, chi è responsabile. Se una policy non esiste, è un buon momento per proporla.',
            ]),
            theory('Il quadro normativo in breve', [
              'In Europa il trattamento dei dati personali è regolato dal GDPR e l’uso dell’intelligenza artificiale dall’AI Act, che introduce obblighi crescenti in base al livello di rischio dei sistemi.',
              'Per l’uso quotidiano il principio pratico è semplice: minimizza i dati personali che condividi, usa strumenti approvati e, per casi dubbi, chiedi a chi si occupa di privacy o a un legale.',
            ]),
          ],
          questions: [
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
              'L’anonimizzazione permette di ottenere aiuto senza esporre informazioni personali o riservate.',
            ),
            choice(
              'Perché uno screenshot può essere rischioso?',
              [
                'Perché pesa troppo',
                'Perché può contenere informazioni sensibili che non hai notato',
                'Perché l’AI non legge le immagini',
                'Perché è sempre sfocato',
              ],
              1,
              'Nomi, email o dati sullo sfondo possono finire nella conversazione senza che te ne accorga.',
            ),
            choice(
              'Cosa offrono di solito le versioni aziendali degli assistenti AI?',
              [
                'Più emoji',
                'Garanzie contrattuali più forti sui dati',
                'Risposte più lunghe',
                'Nessuna differenza',
              ],
              1,
              'Ad esempio l’esclusione dei dati dall’addestramento e controlli amministrativi.',
            ),
            fillBlank(
              'In Europa l’uso dell’intelligenza artificiale è regolato dall’___.',
              ['AI Act', 'IVA', 'ISO 9001', 'Euro 6'],
              0,
              'L’AI Act introduce obblighi in base al livello di rischio; il GDPR regola i dati personali.',
            ),
            trueFalse(
              'Se un dato è utile all’AI, conviene sempre condividerlo, anche se è personale.',
              false,
              'Il principio è minimizzare: spesso lo stesso risultato si ottiene con dati anonimizzati.',
            ),
            choice(
              'Qual è una buona impostazione da controllare nel tuo account?',
              [
                'Il colore del tema',
                'L’uso delle conversazioni per l’addestramento e la cronologia',
                'La dimensione del carattere',
                'La lingua delle notifiche',
              ],
              1,
              'Molti servizi permettono di escludere le chat dall’addestramento e di gestire la cronologia.',
            ),
            choice(
              'In azienda non esiste una policy sull’uso dell’AI. Cosa è più sensato fare?',
              [
                'Usare qualsiasi strumento con qualsiasi dato',
                'Proporre regole su strumenti approvati e dati ammessi',
                'Vietare tutto per sempre',
                'Ignorare la questione',
              ],
              1,
              'Una policy chiara permette di usare l’AI con benefici e rischi sotto controllo.',
            ),
          ],
        },
        {
          title: 'Verificare le risposte',
          summary: 'Un metodo in 4 passi per fidarti (il giusto) dell’AI.',
          estimatedMinutes: 8,
          theory: [
            theory('Perché serve un metodo', [
              'Abbiamo visto che l’AI può sbagliare con sicurezza. La soluzione non è controllare tutto sempre, ma avere un metodo proporzionato all’importanza della risposta.',
              'Un’idea per un post non ha bisogno di verifiche. Un dato che finirà in un contratto, in una fattura o in una decisione aziendale sì.',
            ]),
            theory('I 4 passi della verifica', [
              '1. Chiedi le fonti: usa strumenti che cercano sul web e citano da dove prendono le informazioni, oppure fornisci tu i documenti di riferimento.',
              '2. Apri le fonti e controlla che dicano davvero quello che l’AI riporta: a volte il link non esiste o il contenuto è diverso. 3. Confronta con una seconda fonte autorevole e indipendente (sito istituzionale, documentazione ufficiale). 4. Per decisioni importanti, chiedi a un professionista.',
            ]),
            theory(
              'Fai lavorare l’AI contro i propri errori',
              [
                'Puoi chiedere al modello di rivedere criticamente la propria risposta: “Quali parti di questa risposta potrebbero essere imprecise, datate o da verificare?”.',
                'Un’altra tecnica è chiedere la stessa cosa in modo diverso, o a un secondo assistente, e confrontare: se le risposte divergono, è un segnale che serve una verifica.',
              ],
              {
                tip: 'L’autoverifica aiuta a trovare i punti deboli, ma non sostituisce il controllo su fonti esterne.',
              },
            ),
            theory(
              'Fonti affidabili',
              [
                'Per leggi, tasse e obblighi: siti istituzionali (Gazzetta Ufficiale, Agenzia delle Entrate, Commissione europea). Per prodotti e software: la documentazione ufficiale del produttore. Per dati statistici: istituti di statistica e fonti primarie.',
                'Diffida di pagine anonime, contenuti senza data e articoli che copiano altri articoli senza citare l’origine.',
              ],
              {
                example:
                  'Domanda: “Quali sono i termini per il diritto di recesso negli acquisti online in Italia?”\nVerifica: apri la fonte istituzionale citata e controlla che il numero di giorni e le eccezioni corrispondano.',
              },
            ),
            theory('Documenta e condividi', [
              'Quando una risposta dell’AI entra in un documento di lavoro, annota le fonti verificate. Così chi legge sa da dove arrivano le informazioni e tu puoi ricontrollarle in futuro.',
              'Nel lavoro di squadra conviene stabilire una regola semplice: i contenuti generati con AI che contengono fatti o numeri vengono sempre verificati da una persona prima di essere pubblicati o inviati.',
            ]),
          ],
          questions: [
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
            trueFalse(
              'Chiedere all’AI di rivedere la propria risposta garantisce che sia corretta.',
              false,
              'Aiuta a far emergere errori, ma la verifica su fonti esterne resta necessaria.',
            ),
            choice(
              'Quale fonte è più affidabile per una norma fiscale?',
              [
                'Un forum anonimo',
                'Il sito dell’Agenzia delle Entrate',
                'Un post sui social senza data',
                'Un video senza fonti',
              ],
              1,
              'Per leggi e tasse le fonti istituzionali sono il riferimento.',
            ),
            choice(
              'Due assistenti danno risposte diverse alla stessa domanda. Cosa significa?',
              [
                'Che uno dei due è rotto',
                'Che serve una verifica su fonti esterne',
                'Che entrambe sono giuste',
                'Niente di importante',
              ],
              1,
              'La divergenza è un segnale di incertezza: è il momento di controllare.',
            ),
            trueFalse(
              'Un’idea per il titolo di un post richiede lo stesso livello di verifica di un dato da inserire in un contratto.',
              false,
              'La verifica va proporzionata alla posta in gioco.',
            ),
            fillBlank(
              'Quando una risposta dell’AI entra in un documento di lavoro, conviene annotare le ___ verificate.',
              ['fonti', 'emoji', 'password', 'tabulazioni'],
              0,
              'Annotare le fonti rende il documento verificabile da chiunque.',
            ),
            choice(
              'Quale domanda è utile per far emergere i punti deboli di una risposta?',
              [
                '“Sei sicuro al 100%?”',
                '“Quali parti di questa risposta potrebbero essere imprecise o datate?”',
                '“Riscrivila con più entusiasmo”',
                '“Traducila in inglese”',
              ],
              1,
              'Una domanda specifica sui possibili errori produce una revisione più utile di un generico “sei sicuro?”.',
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
        trueFalse(
          'Le conversazioni con un assistente AI vengono elaborate sui server del fornitore.',
          true,
          'Per questo è importante sapere quali dati condividi e con quale servizio.',
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
