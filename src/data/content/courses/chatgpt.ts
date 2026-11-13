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
  title: 'ChatGPT da zero a professionista',
  subtitle: 'Dalla prima domanda ai flussi di lavoro quotidiani',
  description:
    'Impara a usare ChatGPT in modo concreto e professionale: come impostare le conversazioni, come iterare, come analizzare file e dati, come personalizzare l’assistente e come trasformare le attività ripetitive in flussi rapidi. Le stesse tecniche funzionano anche con Claude e Gemini.',
  category: 'chatbots',
  level: 'beginner',
  tools: ['ChatGPT', 'Claude', 'Gemini'],
  outcomes: [
    'Ottenere risposte utili al primo colpo, senza tentativi infiniti',
    'Migliorare i risultati iterando con indicazioni mirate',
    'Analizzare documenti, PDF e fogli di calcolo con l’AI',
    'Creare istruzioni, progetti e assistenti su misura per il tuo lavoro',
  ],
  requiredTier: 'free',
  icon: 'chatbubbles-outline',
  modules: [
    {
      title: 'Primi passi',
      description: 'Interfaccia, prima conversazione e uso del contesto.',
      lessons: [
        {
          title: 'La tua prima conversazione',
          summary: 'Come è fatta l’interfaccia e come impostare una buona richiesta.',
          estimatedMinutes: 8,
          theory: [
            theory('Come è organizzata l’interfaccia', [
              'ChatGPT, come Claude e Gemini, è organizzato in conversazioni (chat). A sinistra trovi l’elenco delle chat precedenti, al centro la conversazione attiva e in basso il campo dove scrivere. Accanto al campo ci sono i pulsanti per allegare file, usare la voce e attivare strumenti come la ricerca web.',
              'In alto puoi spesso scegliere il modello da usare: modelli più veloci per richieste semplici, modelli con ragionamento più approfondito per problemi complessi. Le opzioni disponibili dipendono dal piano.',
            ]),
            theory(
              'Una chat, un argomento',
              [
                'Ogni chat ricorda i messaggi precedenti al suo interno: puoi fare domande di approfondimento senza ripetere tutto. Una nuova chat invece parte “pulita”, senza sapere nulla delle conversazioni precedenti (a meno che non sia attiva una funzione di memoria).',
                'La regola pratica è aprire una chat per ogni argomento o progetto. Mescolare temi diversi nella stessa conversazione confonde il contesto e peggiora le risposte.',
              ],
              {
                tip: 'Rinomina le chat importanti (es. “Schede prodotto caschi inverno”): ritrovarle sarà molto più facile.',
              },
            ),
            theory(
              'Domande vaghe, risposte vaghe',
              [
                'La qualità della risposta dipende molto dalla qualità della richiesta. “Scrivimi un post” produce un testo generico, perché il modello deve indovinare pubblico, canale, tono e obiettivo.',
                'Una buona richiesta risponde a quattro domande: per chi è, a cosa serve, che forma deve avere, che tono deve usare.',
              ],
              {
                example:
                  'Vago: “Scrivi un post sui caschi.”\nMeglio: “Scrivi un post Instagram per un negozio online di caschi moto. Pubblico: motociclisti 25-45 anni. Tema: come scegliere la taglia giusta. Tono amichevole, massimo 120 parole, 3 hashtag.”',
              },
            ),
            theory('Voce, immagini e file', [
              'Non devi per forza scrivere: puoi dettare la domanda a voce, caricare una foto (un modulo, un errore sullo schermo, un prodotto) o allegare un documento.',
              'È utile soprattutto in mobilità: fotografi un preventivo ricevuto e chiedi “riassumi le condizioni principali e dimmi cosa manca rispetto a un preventivo standard”.',
            ]),
            theory('Cosa aspettarsi dalla prima risposta', [
              'La prima risposta è una bozza, non il risultato finale. Leggila con spirito critico: cosa va bene, cosa manca, cosa è troppo? Nella prossima lezione vedremo come migliorarla con indicazioni mirate.',
              'Ricorda anche i limiti visti nel corso introduttivo: per dati, numeri e informazioni recenti verifica sempre le fonti.',
            ]),
          ],
          questions: [
            choice(
              'Vuoi cambiare completamente argomento rispetto alla chat attuale. Cosa conviene fare?',
              [
                'Continuare nella stessa chat',
                'Aprire una nuova chat',
                'Cancellare l’account',
                'Scrivere tutto in maiuscolo',
              ],
              1,
              'Una nuova chat evita che il contesto precedente influenzi le risposte sul nuovo argomento.',
            ),
            trueFalse(
              'All’interno della stessa chat, l’assistente tiene conto dei messaggi precedenti.',
              true,
              'Per questo puoi chiedere “rendilo più breve” senza ripetere il testo.',
            ),
            choice(
              'Quale richiesta produce probabilmente il risultato migliore?',
              [
                '“Scrivi un post.”',
                '“Post Instagram per un negozio di caschi, pubblico 25-45 anni, tema scelta della taglia, tono amichevole, max 120 parole.”',
                '“Fai qualcosa sui caschi.”',
                '“Post.”',
              ],
              1,
              'Specifica pubblico, canale, tema, tono e lunghezza: il modello non deve indovinare.',
            ),
            fillBlank(
              'Una buona richiesta indica per chi è, a cosa serve, che forma deve avere e che ___ usare.',
              ['tono', 'font', 'password', 'browser'],
              0,
              'Pubblico, obiettivo, formato e tono sono le informazioni chiave.',
            ),
            trueFalse(
              'La prima risposta dell’AI va considerata il risultato finale da pubblicare subito.',
              false,
              'È una bozza da valutare e migliorare.',
            ),
            choice(
              'Perché conviene rinominare le chat importanti?',
              [
                'Per risparmiare token',
                'Per ritrovarle facilmente',
                'Perché è obbligatorio',
                'Per cambiare modello',
              ],
              1,
              'Un nome chiaro rende semplice tornare sul lavoro fatto.',
            ),
            choice(
              'Hai un preventivo cartaceo. Qual è il modo più rapido per farlo analizzare?',
              [
                'Ricopiarlo a mano',
                'Fotografarlo e caricarlo nella chat',
                'Dettarlo parola per parola',
                'Non si può',
              ],
              1,
              'Gli assistenti multimodali leggono il contenuto delle immagini.',
            ),
            choice(
              'Da cosa dipendono i modelli e gli strumenti che puoi scegliere nell’interfaccia?',
              [
                'Dal colore del tema',
                'Dal piano e dal servizio che usi',
                'Dalla lingua del telefono',
                'Dall’ora del giorno',
              ],
              1,
              'Modelli e funzioni disponibili variano in base al servizio e al piano.',
            ),
          ],
        },
        {
          title: 'Contesto e domande di follow-up',
          summary: 'Il segreto è iterare: migliora la risposta passo dopo passo.',
          estimatedMinutes: 9,
          theory: [
            theory('Itera invece di ricominciare', [
              'Raramente la prima risposta è perfetta. Invece di riscrivere tutta la richiesta da capo, dai indicazioni mirate nella stessa chat: “più formale”, “togli il secondo paragrafo”, “aggiungi un esempio concreto”, “riduci a metà”.',
              'Ogni indicazione si somma alle precedenti: in tre o quattro passaggi arrivi a un risultato su misura, spesso molto più velocemente che scrivendo il testo da zero.',
            ]),
            theory(
              'Indicazioni di revisione efficaci',
              [
                'Sii specifico su cosa cambiare e su cosa mantenere: “mantieni la struttura, ma rendi il tono più caldo”. Indica il motivo quando aiuta: “il pubblico sono clienti esperti, evita spiegazioni di base”.',
                'Puoi anche citare la parte da modificare: “nel paragrafo sulle spedizioni, specifica che i resi sono gratuiti entro 30 giorni”.',
              ],
              {
                example:
                  '1) “Scrivi un’email di benvenuto per i nuovi iscritti alla newsletter.”\n2) “Più breve, massimo 80 parole.”\n3) “Aggiungi il codice sconto BENVENUTO10 valido 7 giorni.”\n4) “Proponi 3 oggetti email alternativi.”',
              },
            ),
            theory('Chiedi varianti', [
              'Quando non sai esattamente cosa vuoi, chiedi più versioni: “dammi 3 versioni con toni diversi: formale, amichevole, ironico”. Confrontarle ti aiuta a capire cosa preferisci.',
              'Puoi poi combinarle: “prendi l’apertura della versione 2 e la chiusura della versione 3”.',
            ]),
            theory(
              'Fatti intervistare',
              [
                'Per richieste complesse, chiedi all’assistente di farti domande prima di rispondere: “Prima di scrivere il piano, fammi le domande necessarie per darti il miglior risultato”.',
                'Il modello ti chiederà informazioni che magari non avevi pensato di fornire (budget, scadenze, pubblico, vincoli), e la risposta finale sarà molto più pertinente.',
              ],
              {
                tip: 'Questa tecnica è preziosa per preventivi, piani marketing, documenti e progetti con molte variabili.',
              },
            ),
            theory('Quando ricominciare da capo', [
              'Se dopo molti passaggi la conversazione è diventata confusa, o il modello continua a ripetere lo stesso errore, conviene aprire una nuova chat con una richiesta iniziale migliore, che includa tutto ciò che hai imparato nei tentativi precedenti.',
              'Un trucco utile: chiedi al modello di riassumere i requisiti emersi nella conversazione, poi usa quel riassunto come prompt di partenza nella nuova chat.',
            ]),
          ],
          questions: [
            choice(
              'La risposta va bene ma è troppo lunga. Qual è la mossa migliore?',
              [
                'Aprire una nuova chat e riscrivere tutto',
                'Scrivere: “Riducila a metà mantenendo i punti chiave”',
                'Copiarla e accorciarla a mano',
                'Chiedere la stessa cosa in inglese',
              ],
              1,
              'Un’indicazione mirata nella stessa chat è il modo più rapido per migliorare il risultato.',
            ),
            promptFix({
              instruction:
                'Riscrivi questa richiesta aggiungendo destinatario, oggetto del ritardo, tono e obiettivo.',
              weakPrompt: 'Scrivi un’email per il ritardo.',
              checks: [
                {
                  label: 'Indica il destinatario',
                  keywords: ['cliente', 'fornitore', 'destinatario', 'capo', 'collega'],
                },
                {
                  label: 'Spiega cosa è in ritardo',
                  keywords: [
                    'ordine',
                    'consegna',
                    'spedizione',
                    'progetto',
                    'pagamento',
                    'fattura',
                  ],
                },
                {
                  label: 'Specifica il tono',
                  keywords: [
                    'tono',
                    'cortese',
                    'formale',
                    'professionale',
                    'amichevole',
                    'empatic',
                  ],
                },
                {
                  label: 'Indica un obiettivo o una lunghezza',
                  keywords: [
                    'parole',
                    'breve',
                    'righe',
                    'obiettivo',
                    'proponi',
                    'scusa',
                    'soluzione',
                  ],
                },
              ],
              sampleAnswer:
                'Scrivi un’email cortese e professionale a un cliente per comunicare un ritardo di 5 giorni nella consegna del suo ordine. Scusati, spiega che dipende dal corriere, proponi uno sconto del 10% sul prossimo acquisto. Massimo 120 parole.',
            }),
            trueFalse(
              'Puoi chiedere all’assistente di farti domande prima di rispondere.',
              true,
              'È una tecnica utile quando la richiesta è complessa o non sai bene cosa serve.',
            ),
            choice(
              'Quale indicazione di revisione è più efficace?',
              [
                '“Miglioralo.”',
                '“Mantieni la struttura ma rendi il tono più caldo e togli i termini tecnici.”',
                '“Non mi piace.”',
                '“Rifallo.”',
              ],
              1,
              'Dice cosa cambiare e cosa mantenere.',
            ),
            choice(
              'Non sai quale tono preferisci per un annuncio. Cosa chiedi?',
              [
                'Un testo lunghissimo',
                '3 versioni con toni diversi da confrontare',
                'Di scegliere a caso',
                'Di non usare un tono',
              ],
              1,
              'Le varianti ti aiutano a capire cosa preferisci e a combinarle.',
            ),
            fillBlank(
              'Prima di cambiare chat, puoi chiedere al modello di ___ i requisiti emersi e usarli come nuovo prompt.',
              ['riassumere', 'cancellare', 'tradurre', 'colorare'],
              0,
              'Il riassunto dei requisiti diventa un ottimo prompt di partenza.',
            ),
            order(
              'Ordina un tipico ciclo di lavoro iterativo.',
              [
                'Richiesta iniziale con contesto',
                'Lettura critica della bozza',
                'Indicazioni mirate di revisione',
                'Versione finale da verificare',
              ],
              'Si parte da una buona richiesta, si valuta, si corregge e si verifica il risultato.',
            ),
            trueFalse(
              'Se il modello ripete lo stesso errore dopo molti tentativi, può convenire aprire una nuova chat con una richiesta migliore.',
              true,
              'Un contesto confuso peggiora le risposte; ripartire con requisiti chiari spesso risolve.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Cosa migliora di più la qualità di una risposta?',
          [
            'Scrivere in maiuscolo',
            'Dare contesto: destinatario, obiettivo, formato e tono',
            'Usare frasi molto brevi',
            'Fare la domanda due volte',
          ],
          1,
          'Più contesto rilevante dai, più la risposta sarà su misura.',
        ),
        choice(
          'Quando conviene aprire una nuova chat?',
          ['A ogni messaggio', 'Quando cambi argomento o progetto', 'Mai', 'Solo di sera'],
          1,
          'Una chat per argomento mantiene il contesto pulito.',
        ),
      ],
    },
    {
      title: 'Funzioni avanzate',
      description: 'File, dati e personalizzazione.',
      lessons: [
        {
          title: 'Analizzare documenti e dati',
          summary: 'PDF, contratti e fogli di calcolo: fai le domande giuste.',
          estimatedMinutes: 9,
          theory: [
            theory('Cosa puoi caricare', [
              'Gli assistenti principali accettano PDF, documenti di testo, presentazioni, fogli di calcolo, immagini e, in alcuni casi, file audio. Puoi caricarne più di uno nella stessa conversazione e chiedere confronti.',
              'Le richieste tipiche sono: riassumere, estrarre informazioni specifiche, confrontare versioni, trovare incongruenze, trasformare il contenuto in un altro formato (tabella, elenco, email).',
            ]),
            theory(
              'Domande ancorate al documento',
              [
                'Per ridurre il rischio di risposte inventate, chiedi esplicitamente di basarsi solo sul documento e di indicare dove si trova ogni informazione: “Rispondi solo in base al contratto allegato e cita l’articolo di riferimento”.',
                'Se un’informazione non c’è, il modello deve dirlo: “Se il documento non lo specifica, scrivi NON PRESENTE”.',
              ],
              {
                example:
                  'Ti carico il contratto di fornitura. Elenca in una tabella: durata, condizioni di recesso, penali e termini di pagamento. Per ogni voce indica l’articolo. Se una voce manca, scrivi NON PRESENTE.',
              },
            ),
            theory('Lavorare con i fogli di calcolo', [
              'Con un file Excel o CSV puoi chiedere analisi vere: totali per categoria, confronti tra periodi, prodotti in calo, valori anomali, grafici. Alcuni assistenti eseguono codice per fare i calcoli, il che li rende molto più affidabili del “calcolo a mente”.',
              'Descrivi bene le colonne se i nomi sono poco chiari (“la colonna Q indica le quantità vendute”) e chiedi sempre di mostrare il procedimento per i numeri che userai in decisioni importanti.',
            ]),
            theory(
              'Documenti lunghi',
              [
                'Con documenti molto lunghi conviene procedere per parti: prima un indice dei contenuti, poi domande su singole sezioni. Così riduci il rischio che dettagli importanti vengano trascurati.',
                'Per confronti tra versioni (es. due bozze di contratto) chiedi una tabella delle differenze con la citazione esatta dei passaggi cambiati.',
              ],
              {
                tip: 'Per documenti riservati ricorda le regole sulla privacy: anonimizza o usa la versione aziendale approvata.',
              },
            ),
            theory('Verifica a campione', [
              'Anche quando l’AI cita le sezioni, controlla a campione due o tre punti aprendo il documento originale. Se trovi un errore, segnalalo nella chat e chiedi di ricontrollare tutto con più attenzione.',
            ]),
          ],
          questions: [
            choice(
              'Come riduci il rischio di risposte inventate quando analizzi un PDF?',
              [
                'Chiedendo di rispondere solo in base al documento e di citare la sezione',
                'Caricando il file due volte',
                'Usando solo domande sì/no',
                'Non è possibile ridurlo',
              ],
              0,
              'Ancorare la risposta al testo e chiedere i riferimenti permette anche a te di verificare velocemente.',
            ),
            fillBlank(
              'Per i calcoli importanti su un foglio di calcolo, chiedi all’AI di mostrare il ___.',
              ['procedimento', 'logo', 'colore', 'titolo'],
              0,
              'Vedere il procedimento ti permette di controllare formule e passaggi.',
            ),
            trueFalse(
              'Con documenti molto lunghi conviene procedere per parti, partendo da un indice.',
              true,
              'Lavorare per sezioni riduce il rischio di trascurare dettagli importanti.',
            ),
            choice(
              'Vuoi confrontare due versioni di un contratto. Cosa chiedi?',
              [
                'Un riassunto generico',
                'Una tabella delle differenze con i passaggi cambiati',
                'Una traduzione',
                'Un’immagine',
              ],
              1,
              'La tabella con le citazioni rende il confronto verificabile.',
            ),
            choice(
              'Cosa fai se i nomi delle colonne del tuo file sono poco chiari?',
              [
                'Niente',
                'Spieghi il significato delle colonne nella richiesta',
                'Cambi assistente',
                'Elimini le colonne',
              ],
              1,
              'Descrivere i dati evita interpretazioni sbagliate.',
            ),
            trueFalse(
              'Se l’AI cita le sezioni del documento, non serve mai controllare nulla.',
              false,
              'Una verifica a campione resta una buona pratica.',
            ),
            choice(
              'Quale istruzione aiuta a gestire le informazioni mancanti?',
              [
                '“Inventa se serve”',
                '“Se il documento non lo specifica, scrivi NON PRESENTE”',
                '“Sii creativo”',
                '“Rispondi in breve”',
              ],
              1,
              'Una via d’uscita esplicita evita che il modello riempia i vuoti.',
            ),
            choice(
              'Perché è utile che l’assistente esegua codice per fare i calcoli?',
              [
                'È più colorato',
                'I calcoli risultano molto più affidabili',
                'Costa meno',
                'Non serve a nulla',
              ],
              1,
              'Il calcolo eseguito da codice evita gli errori del “calcolo a parole”.',
            ),
          ],
        },
        {
          title: 'Personalizzazione: istruzioni, memoria e progetti',
          summary: 'Fai in modo che l’assistente conosca già te e il tuo lavoro.',
          estimatedMinutes: 8,
          theory: [
            theory('Non ripetere ogni volta chi sei', [
              'Gli assistenti principali permettono di salvare istruzioni personalizzate: informazioni su di te (ruolo, settore) e su come preferisci le risposte (lingua, lunghezza, formato, tono). Vengono applicate automaticamente a ogni nuova conversazione.',
              'Nomi e posizione di queste impostazioni cambiano tra servizi e versioni, ma il principio è lo stesso ovunque.',
            ]),
            theory(
              'Cosa scrivere nelle istruzioni',
              [
                'Buone istruzioni sono brevi e concrete: ruolo, settore, pubblico, stile preferito e cose da evitare. Evita frasi generiche come “sii bravo”: non cambiano nulla.',
                'Puoi anche inserire regole di sicurezza utili: “segnala quando un’informazione potrebbe essere cambiata”, “non inventare dati: se non sai, dillo”.',
              ],
              {
                example:
                  'Gestisco un e-commerce di accessori moto. Rispondi in italiano, in modo sintetico, con elenchi puntati quando utile. Nei testi per clienti usa un tono cordiale e professionale. Se non sei sicuro di un dato, dillo esplicitamente.',
              },
            ),
            theory('La memoria', [
              'Alcuni assistenti hanno una memoria tra le conversazioni: ricordano informazioni che hai condiviso (preferenze, progetti) per usarle in seguito. Di solito puoi vedere cosa ricordano, modificarlo e cancellarlo.',
              'È comoda, ma ricorda la privacy: evita che vengano memorizzati dati sensibili e controlla periodicamente cosa è stato salvato.',
            ]),
            theory(
              'Progetti e spazi di lavoro',
              [
                'I progetti (o spazi simili) raccolgono in un unico posto chat, file di riferimento e istruzioni specifiche per un argomento: ad esempio “Schede prodotto”, con il listino, il tono di voce del brand e alcuni esempi di schede riuscite.',
                'Ogni nuova chat dentro il progetto parte già con quel contesto: non devi ricaricare i file né rispiegare le regole.',
              ],
              {
                tip: 'Crea un progetto per ogni attività ricorrente importante: è il modo più semplice per ottenere risultati coerenti nel tempo.',
              },
            ),
            theory('Quando non personalizzare', [
              'Istruzioni troppo rigide possono peggiorare risposte su argomenti diversi dal solito: se scrivi “rispondi sempre in 3 righe”, anche una spiegazione complessa verrà troncata. Meglio regole flessibili (“sii sintetico, salvo quando chiedo approfondimenti”) e istruzioni specifiche dentro i singoli progetti.',
            ]),
          ],
          questions: [
            trueFalse(
              'Le istruzioni personalizzate servono a non dover ripetere in ogni chat chi sei e come vuoi le risposte.',
              true,
              'Vengono applicate automaticamente alle nuove conversazioni.',
            ),
            choice(
              'Quale di queste è un’istruzione personalizzata efficace?',
              [
                '“Sii bravo.”',
                '“Sono un consulente fiscale: rispondi in italiano, cita la norma di riferimento e segnala quando un’informazione potrebbe essere cambiata.”',
                '“Rispondi.”',
                '“Usa tante emoji.”',
              ],
              1,
              'È specifica: dice chi sei, la lingua, il formato e un comportamento di sicurezza.',
            ),
            choice(
              'A cosa serve un “progetto” in un assistente AI?',
              [
                'A pagare meno',
                'A raccogliere chat, file e istruzioni per un argomento specifico',
                'A cancellare le chat',
                'A cambiare lingua',
              ],
              1,
              'Tiene insieme il contesto di un lavoro, così non devi ricaricarlo ogni volta.',
            ),
            trueFalse(
              'Tutte le funzioni di personalizzazione sono identiche in ogni servizio e piano.',
              false,
              'Nomi e disponibilità variano tra servizi e piani e cambiano nel tempo.',
            ),
            choice(
              'Qual è un rischio della memoria tra le conversazioni?',
              [
                'Che rallenti il telefono',
                'Che vengano memorizzati dati sensibili',
                'Che cambi lingua',
                'Nessuno',
              ],
              1,
              'Controlla periodicamente cosa viene ricordato ed elimina ciò che non serve.',
            ),
            choice(
              'Perché “rispondi sempre in 3 righe” può essere un’istruzione sbagliata?',
              [
                'Perché è troppo lunga',
                'Perché tronca anche le spiegazioni che richiedono più spazio',
                'Perché è in italiano',
                'Non è sbagliata',
              ],
              1,
              'Meglio regole flessibili, con eccezioni esplicite.',
            ),
            fillBlank(
              'In un progetto per le schede prodotto conviene allegare il listino, il tono di voce del brand e alcuni ___ di schede riuscite.',
              ['esempi', 'virus', 'password', 'scontrini'],
              0,
              'Gli esempi mostrano al modello lo stile e il formato da seguire.',
            ),
            choice(
              'Cosa conviene inserire nelle istruzioni per ridurre gli errori?',
              [
                '“Sii sempre sicuro di te”',
                '“Se non sei sicuro di un dato, dillo esplicitamente”',
                '“Rispondi velocemente”',
                '“Non fare domande”',
              ],
              1,
              'Una regola di trasparenza aiuta a individuare le risposte da verificare.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Cosa puoi chiedere su un foglio di calcolo caricato?',
          [
            'Solo di cambiare il font',
            'Calcoli, grafici e individuazione di anomalie',
            'Nulla',
            'Solo la traduzione dei titoli',
          ],
          1,
          'L’AI può analizzare i dati, ma i risultati importanti vanno verificati.',
        ),
      ],
    },
    {
      title: 'ChatGPT al lavoro',
      description: 'Casi d’uso professionali e flussi ripetibili.',
      lessons: [
        {
          title: 'Email, riassunti e report',
          summary: 'Tre attività quotidiane che puoi dimezzare.',
          estimatedMinutes: 9,
          theory: [
            theory(
              'Email più veloci',
              [
                'Incolla l’email ricevuta e indica cosa vuoi ottenere con la risposta: “accetta la proposta ma sposta la consegna a lunedì”, “rifiuta con gentilezza e proponi un’alternativa”. L’AI si occupa di forma e tono, tu del contenuto.',
                'Per email delicate (reclami, solleciti, trattative) chiedi due versioni con toni diversi e scegli quella più adatta alla relazione con quella persona.',
              ],
              {
                example:
                  'Rispondi a questa email del fornitore. Obiettivo: accettare il nuovo listino ma chiedere di mantenere i vecchi prezzi per gli ordini già confermati. Tono cordiale e fermo, massimo 120 parole.',
              },
            ),
            theory('Riassunti che servono davvero', [
              'Un riassunto utile non è solo “più corto”: è organizzato per chi lo legge. Chiedi esplicitamente punti chiave, decisioni, azioni da fare, responsabili e scadenze.',
              'Per verbali di riunione, una struttura fissa (decisioni / azioni / punti aperti) rende i riassunti confrontabili tra una riunione e l’altra.',
            ]),
            theory(
              'Report dai dati grezzi',
              [
                'Fornisci i dati (o il file) e chiedi una struttura precisa: sintesi in poche righe, numeri chiave, problemi da monitorare, azioni consigliate. Indica chi leggerà il report: un titolare, un team, un cliente.',
              ],
              {
                example:
                  'Ecco le vendite di ottobre per categoria. Scrivi un report per il titolare: 1) sintesi in 3 righe, 2) tabella con le 5 categorie migliori, 3) due problemi da monitorare, 4) tre azioni consigliate.',
              },
            ),
            theory('Specifica sempre il formato di uscita', [
              'Tabella, elenco puntato, email pronta da inviare, testo per una slide, massimo N parole: indicare il formato ti fa risparmiare il lavoro di riformattazione.',
              'Se devi incollare il risultato in un altro strumento (foglio di calcolo, gestionale), chiedi un formato compatibile, ad esempio una tabella con colonne precise.',
            ]),
            theory('Controllo finale', [
              'Prima di inviare: verifica nomi, cifre, date e promesse. L’AI potrebbe aver aggiunto dettagli non richiesti (uno sconto, una data di consegna) che non puoi garantire. Leggi sempre l’email come se fossi il destinatario.',
            ]),
          ],
          questions: [
            order(
              'Ordina le sezioni di un buon report sintetico.',
              [
                'Sintesi in poche righe',
                'Numeri chiave',
                'Problemi da monitorare',
                'Prossimi passi',
              ],
              'Prima il messaggio principale, poi i dati che lo supportano, i rischi e infine le azioni.',
            ),
            promptFix({
              instruction:
                'Migliora questa richiesta di riassunto indicando formato e contenuti da estrarre.',
              weakPrompt: 'Riassumi questo verbale.',
              checks: [
                {
                  label: 'Indica il formato',
                  keywords: ['punti', 'elenco', 'tabella', 'righe', 'parole', 'bullet'],
                },
                {
                  label: 'Chiede azioni o decisioni',
                  keywords: ['azioni', 'decisioni', 'cose da fare', 'to do', 'compiti'],
                },
                {
                  label: 'Chiede scadenze o responsabili',
                  keywords: ['scadenz', 'date', 'responsabil', 'chi fa', 'entro'],
                },
              ],
              sampleAnswer:
                'Riassumi questo verbale in 5 punti chiave. Poi elenca in una tabella le decisioni prese, le azioni da fare, il responsabile di ciascuna e la scadenza.',
            }),
            choice(
              'Cosa rende una richiesta di report più efficace?',
              [
                'Chiedere “fai un report”',
                'Indicare la struttura, il formato e chi lo leggerà',
                'Scrivere tutto in inglese',
                'Non fornire dati',
              ],
              1,
              'Struttura, formato e destinatario producono un report pronto da usare.',
            ),
            trueFalse(
              'Prima di inviare un’email scritta con l’AI conviene controllare nomi, cifre, date e promesse.',
              true,
              'L’AI potrebbe aggiungere dettagli che non puoi garantire.',
            ),
            choice(
              'Per un’email di risposta, cosa è più importante indicare all’AI?',
              [
                'Il font da usare',
                'Cosa vuoi ottenere con la risposta',
                'La lunghezza della firma',
                'Il colore del logo',
              ],
              1,
              'Tu decidi il contenuto e l’obiettivo; l’AI cura forma e tono.',
            ),
            fillBlank(
              'Una struttura fissa per i verbali è: decisioni, ___, punti aperti.',
              ['azioni', 'emoji', 'immagini', 'password'],
              0,
              'Decisioni, azioni e punti aperti rendono i verbali utili e confrontabili.',
            ),
            choice(
              'Devi incollare il risultato in un foglio di calcolo. Cosa chiedi?',
              ['Un testo libero', 'Una tabella con colonne precise', 'Un’immagine', 'Un audio'],
              1,
              'Un formato compatibile evita lavoro di riformattazione.',
            ),
            choice(
              'Per un reclamo delicato, quale approccio è più utile?',
              [
                'Una sola versione aggressiva',
                'Due versioni con toni diversi tra cui scegliere',
                'Nessuna risposta',
                'Copiare un modello trovato online',
              ],
              1,
              'Confrontare toni diversi aiuta a scegliere quello più adatto alla relazione.',
            ),
          ],
        },
        {
          title: 'Assistenti su misura e flussi ripetibili',
          summary: 'Trasforma un buon prompt in uno strumento riutilizzabile.',
          estimatedMinutes: 8,
          theory: [
            theory('Dal prompt allo strumento', [
              'Se fai spesso la stessa attività (rispondere a recensioni, scrivere schede prodotto, preparare preventivi), il prompt che funziona meglio è un patrimonio: salvalo e riusalo invece di riscriverlo ogni volta.',
              'Il passo successivo è creare un assistente personalizzato: in ChatGPT si chiamano GPT, altri servizi hanno funzioni simili. Contiene istruzioni fisse, file di riferimento e talvolta strumenti collegati; chi lo usa inserisce solo i dati variabili.',
            ]),
            theory(
              'Cosa mettere in un assistente su misura',
              [
                'Ruolo e obiettivo (“aiuti il servizio clienti a rispondere alle recensioni”). Passaggi da seguire. Formato di uscita. Esempi di buone risposte. Cosa non fare (“non promettere rimborsi”, “non inventare tempi di consegna”).',
                'Allega i documenti di riferimento: listino, policy di reso, tono di voce, FAQ. Saranno la base delle risposte.',
              ],
              {
                example:
                  'Ruolo: rispondi alle recensioni dei clienti del negozio.\nPassi: 1) ringrazia, 2) se negativa riconosci il problema, 3) proponi la soluzione prevista dalla policy allegata.\nFormato: max 80 parole, firma “Il team”.\nNon fare: promettere rimborsi non previsti.',
              },
            ),
            theory('Testare prima di condividere', [
              'Prova l’assistente con 5-10 casi reali, compresi quelli difficili (recensione molto arrabbiata, richiesta fuori policy). Annota dove sbaglia e correggi le istruzioni.',
              'Solo quando funziona bene con casi vari conviene condividerlo con il team, spiegando per cosa usarlo e per cosa no.',
            ]),
            theory(
              'Flussi ripetibili senza assistenti',
              [
                'Anche senza creare un assistente, puoi costruire un flusso ripetibile: un documento con i prompt migliori per ogni attività, in ordine di utilizzo, con le parti variabili evidenziate.',
              ],
              {
                tip: 'Una “libreria di prompt” condivisa è uno degli strumenti più semplici ed efficaci per un piccolo team.',
              },
            ),
            theory('Sicurezza', [
              'Non inserire mai credenziali, chiavi o dati sensibili nelle istruzioni di un assistente condiviso. Se l’assistente è collegato ad altri strumenti, concedi solo i permessi strettamente necessari.',
            ]),
          ],
          questions: [
            choice(
              'Quando ha senso creare un assistente personalizzato?',
              [
                'Per una domanda che farai una volta sola',
                'Per un’attività ripetitiva con istruzioni sempre uguali',
                'Mai',
                'Solo per giocare',
              ],
              1,
              'Le attività ripetitive sono il caso ideale: istruzioni fisse, dati variabili.',
            ),
            trueFalse(
              'Prima di condividere un assistente con il team conviene testarlo su casi reali.',
              true,
              'I test rivelano istruzioni ambigue e casi non previsti.',
            ),
            choice(
              'Cosa NON va inserito in un assistente personalizzato condiviso?',
              [
                'Ruolo e obiettivo',
                'Formato di uscita',
                'Esempi di buone risposte',
                'Una password o una chiave di accesso',
              ],
              3,
              'Credenziali e dati sensibili non vanno mai inseriti nelle istruzioni.',
            ),
            choice(
              'Perché inserire la sezione “cosa non fare”?',
              [
                'Per allungare il testo',
                'Per evitare errori ricorrenti come promesse non previste',
                'Perché è obbligatoria',
                'Non serve',
              ],
              1,
              'I divieti espliciti prevengono gli errori più costosi.',
            ),
            fillBlank(
              'Una raccolta condivisa dei prompt migliori si chiama libreria di ___.',
              ['prompt', 'immagini', 'font', 'password'],
              0,
              'Una libreria di prompt rende il lavoro del team più rapido e coerente.',
            ),
            choice(
              'Quali documenti conviene allegare a un assistente per il servizio clienti?',
              [
                'Foto delle vacanze',
                'Policy di reso, FAQ e tono di voce',
                'Nessuno',
                'Le password dei clienti',
              ],
              1,
              'I documenti di riferimento sono la base delle risposte.',
            ),
            trueFalse(
              'Un assistente collegato ad altri strumenti dovrebbe avere tutti i permessi possibili.',
              false,
              'Solo i permessi strettamente necessari, per limitare i rischi.',
            ),
            choice(
              'Durante i test l’assistente promette rimborsi non previsti. Cosa fai?',
              [
                'Lo condivido comunque',
                'Aggiungo una regola esplicita nelle istruzioni e ritesto',
                'Lo cancello',
                'Ignoro il problema',
              ],
              1,
              'Si corregge l’istruzione e si verifica di nuovo con gli stessi casi.',
            ),
          ],
        },
      ],
      quiz: [
        trueFalse(
          'Un assistente su misura è utile soprattutto per attività ripetitive.',
          true,
          'Istruzioni fisse e dati variabili: è il caso d’uso ideale.',
        ),
      ],
    },
  ],
  finalTest: [
    choice(
      'Qual è la richiesta migliore?',
      [
        '“Scrivi una descrizione.”',
        '“Scrivi una descrizione prodotto di 80 parole per un casco jet, per un e-commerce, tono tecnico ma semplice, con 3 punti di forza in elenco.”',
        '“Descrizione casco.”',
        '“Fai tu.”',
      ],
      1,
      'Specifica lunghezza, prodotto, canale, tono e formato.',
    ),
    choice(
      'Cosa sono le istruzioni personalizzate?',
      [
        'Un abbonamento',
        'Indicazioni salvate su chi sei e come vuoi le risposte',
        'Un tipo di file',
        'Un plugin',
      ],
      1,
      'Vengono applicate alle nuove conversazioni.',
    ),
  ],
});
