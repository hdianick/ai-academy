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
    'Impara a usare ChatGPT in modo concreto: conversazioni efficaci, analisi di file e dati, personalizzazione e casi d’uso professionali come email, report e assistenti su misura. Le stesse tecniche funzionano anche con Claude e Gemini.',
  category: 'chatbots',
  level: 'beginner',
  tools: ['ChatGPT', 'Claude', 'Gemini'],
  outcomes: [
    'Ottenere risposte utili al primo colpo, senza tentativi infiniti',
    'Analizzare documenti, PDF e fogli di calcolo con l’AI',
    'Creare flussi ripetibili per email, report e attività ricorrenti',
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
          summary: 'Come è fatta l’interfaccia e come impostare una buona domanda.',
          estimatedMinutes: 4,
          steps: [
            theory('Come funziona una chat', [
              'ChatGPT funziona a conversazioni: ogni chat ricorda i messaggi precedenti al suo interno, quindi puoi fare domande di approfondimento senza ripetere tutto.',
              'Una nuova chat parte invece “pulita”. Regola pratica: una chat per ogni argomento o progetto, così il contesto resta ordinato.',
            ]),
            theory(
              'Domande vaghe, risposte vaghe',
              [
                'La qualità della risposta dipende molto dalla qualità della richiesta. “Scrivimi un post” produce un testo generico; dire per chi è, su quale canale e con quale tono cambia completamente il risultato.',
              ],
              {
                example:
                  'Vago: “Scrivi un post sui caschi.”\nMeglio: “Scrivi un post Instagram per un negozio online di caschi moto. Pubblico: motociclisti 25-45 anni. Tema: come scegliere la taglia giusta. Tono amichevole, massimo 120 parole, 3 hashtag.”',
              },
            ),
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
              'All’interno della stessa chat, ChatGPT tiene conto dei messaggi precedenti.',
              true,
              'Per questo puoi chiedere “rendilo più breve” senza ripetere il testo.',
            ),
          ],
        },
        {
          title: 'Contesto e domande di follow-up',
          summary: 'Il segreto è iterare: migliora la risposta passo dopo passo.',
          estimatedMinutes: 5,
          steps: [
            theory('Itera invece di ricominciare', [
              'Raramente la prima risposta è perfetta. Invece di riscrivere tutta la richiesta, dai indicazioni mirate: “più formale”, “togli il secondo paragrafo”, “aggiungi un esempio concreto”.',
              'Puoi anche chiedere varianti: “dammi 3 versioni con toni diversi” e poi scegliere o combinare.',
            ]),
            theory(
              'Fatti fare domande',
              [
                'Quando non sai bene cosa serve, chiedi all’AI di intervistarti: “Prima di rispondere, fammi le domande necessarie per darti il miglior risultato.”',
              ],
              { tip: 'Questa tecnica è utilissima per preventivi, piani e documenti complessi.' },
            ),
            promptFix({
              instruction:
                'Riscrivi questa richiesta aggiungendo destinatario, obiettivo e tono. Scrivi il tuo prompt nel campo qui sotto.',
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
        trueFalse(
          'Puoi chiedere all’AI di farti domande prima di rispondere.',
          true,
          'È una tecnica utile quando la richiesta è complessa o non sai bene cosa serve.',
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
          estimatedMinutes: 5,
          steps: [
            theory('Carica e interroga', [
              'Puoi caricare file come PDF, documenti Word, immagini e fogli di calcolo e fare domande sul loro contenuto: riassunti, confronti, estrazione di dati.',
              'Con i fogli di calcolo l’AI può fare calcoli, creare grafici e trovare anomalie. Per i calcoli importanti chiedi sempre di mostrare il procedimento.',
            ]),
            theory(
              'Domande efficaci sui documenti',
              [
                'Chiedi risposte ancorate al testo: “Rispondi solo in base al documento e indica la sezione da cui prendi l’informazione.” Così riduci il rischio che il modello inventi.',
              ],
              {
                example:
                  'Ti carico il contratto di fornitura. Elenca in una tabella: durata, condizioni di recesso, penali e termini di pagamento. Per ogni voce indica l’articolo di riferimento.',
              },
            ),
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
          ],
        },
        {
          title: 'Personalizzazione: istruzioni, memoria e progetti',
          summary: 'Fai in modo che l’AI conosca già te e il tuo lavoro.',
          estimatedMinutes: 4,
          steps: [
            theory('Non ripetere ogni volta chi sei', [
              'Gli assistenti principali permettono di salvare istruzioni personalizzate: chi sei, che lavoro fai, come preferisci le risposte (breve, con elenchi, in italiano…).',
              'Alcuni offrono anche memoria tra le conversazioni e “progetti”: spazi dove raccogliere file e istruzioni per un argomento specifico. Nomi e disponibilità cambiano in base al servizio e al piano.',
            ]),
            theory(
              'Cosa scrivere nelle istruzioni',
              [
                'Buone istruzioni sono brevi e concrete: ruolo, settore, pubblico, stile preferito e cose da evitare.',
              ],
              {
                example:
                  'Gestisco un e-commerce di accessori moto. Rispondi in italiano, in modo sintetico, con elenchi puntati quando utile. Quando scrivi testi per clienti usa un tono cordiale e professionale. Evita il gergo tecnico.',
              },
            ),
            trueFalse(
              'Le istruzioni personalizzate servono a non dover ripetere in ogni chat chi sei e come vuoi le risposte.',
              true,
              'Vengono applicate automaticamente alle nuove conversazioni.',
            ),
            choice(
              'Quale di queste è un’istruzione personalizzata efficace?',
              [
                '“Sii bravo.”',
                '“Sono un consulente fiscale: rispondi in italiano, cita sempre la norma di riferimento e segnala quando un’informazione potrebbe essere cambiata.”',
                '“Rispondi.”',
                '“Usa tante emoji.”',
              ],
              1,
              'È specifica: dice chi sei, la lingua, il formato e un comportamento di sicurezza.',
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
        trueFalse(
          'Tutte le funzioni di personalizzazione sono identiche in ogni servizio e piano.',
          false,
          'Nomi e disponibilità delle funzioni variano tra servizi e piani, e cambiano nel tempo.',
        ),
        choice(
          'A cosa serve un “progetto” in un assistente AI?',
          [
            'A pagare meno',
            'A raccogliere file e istruzioni per un argomento specifico',
            'A cancellare le chat',
            'A cambiare lingua',
          ],
          1,
          'Tiene insieme il contesto di un lavoro, così non devi ricaricarlo ogni volta.',
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
          estimatedMinutes: 5,
          steps: [
            theory('Le tre attività più comuni', [
              'Email: incolla l’email ricevuta e chiedi una risposta indicando cosa vuoi ottenere (“accetta ma sposta la consegna a lunedì”).',
              'Riassunti: incolla un testo lungo e chiedi “5 punti chiave + azioni da fare + scadenze”. Report: fornisci i dati grezzi e chiedi una struttura precisa (sintesi, numeri chiave, problemi, prossimi passi).',
            ]),
            theory(
              'Specifica sempre il formato di uscita',
              [
                'Tabella, elenco puntato, email pronta da inviare, massimo N parole: dire il formato ti fa risparmiare il lavoro di riformattazione.',
              ],
              {
                example:
                  'Ecco le vendite di ottobre per categoria. Scrivi un report per il titolare: 1) sintesi in 3 righe, 2) tabella con le 5 categorie migliori, 3) due problemi da monitorare, 4) tre azioni consigliate.',
              },
            ),
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
          ],
        },
        {
          title: 'Assistenti su misura e flussi ripetibili',
          summary: 'Trasforma un buon prompt in uno strumento riutilizzabile.',
          estimatedMinutes: 5,
          steps: [
            theory('Dal prompt allo strumento', [
              'Se fai spesso la stessa attività (rispondere a recensioni, scrivere schede prodotto, preparare preventivi), salva il prompt migliore come modello da riusare.',
              'Molti servizi permettono di creare assistenti personalizzati (in ChatGPT si chiamano GPT): istruzioni fisse, file di riferimento e, a volte, strumenti collegati. Chi li usa deve solo inserire i dati variabili.',
            ]),
            theory(
              'Cosa mettere in un assistente su misura',
              [
                'Ruolo e obiettivo, passaggi da seguire, formato di uscita, esempi di buone risposte, cosa non fare. Allega i documenti di riferimento: listino, tono di voce, FAQ.',
              ],
              { tip: 'Prova l’assistente con 5 casi reali prima di condividerlo con il team.' },
            ),
            choice(
              'Quando ha senso creare un assistente personalizzato?',
              [
                'Per una domanda che farai una volta sola',
                'Per un’attività ripetitiva con istruzioni sempre uguali',
                'Mai, è sempre meglio scrivere tutto da capo',
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
          ],
        },
      ],
      quiz: [
        choice(
          'Cosa rende una richiesta di report più efficace?',
          [
            'Chiedere “fai un report”',
            'Indicare la struttura e il formato di uscita',
            'Scrivere tutto in inglese',
            'Non fornire dati',
          ],
          1,
          'Struttura e formato chiari producono un report pronto da usare.',
        ),
        trueFalse(
          'Un assistente su misura è utile soprattutto per attività ripetitive.',
          true,
          'Istruzioni fisse e dati variabili: è il caso d’uso ideale.',
        ),
        choice(
          'Cosa NON serve in un assistente personalizzato?',
          [
            'Ruolo e obiettivo',
            'Formato di uscita',
            'Esempi di buone risposte',
            'La tua password personale',
          ],
          3,
          'Credenziali e dati sensibili non vanno mai inseriti nelle istruzioni.',
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
    trueFalse(
      'Per migliorare una risposta è spesso meglio dare indicazioni mirate nella stessa chat.',
      true,
      'Iterare è più rapido che ricominciare.',
    ),
    choice(
      'Come rendi più affidabile l’analisi di un contratto?',
      [
        'Chiedendo di citare gli articoli di riferimento',
        'Chiedendo una risposta più lunga',
        'Usando un’altra lingua',
        'Non si può',
      ],
      0,
      'I riferimenti ti permettono di verificare rapidamente.',
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
    trueFalse(
      'Per un report conviene specificare la struttura desiderata.',
      true,
      'Così ottieni un documento pronto all’uso.',
    ),
    choice(
      'Quale attività è più adatta a un assistente su misura?',
      [
        'Rispondere ogni giorno alle recensioni dei clienti',
        'Scegliere il regalo per un amico una volta',
        'Leggere una notizia',
        'Cambiare la password',
      ],
      0,
      'È ripetitiva e segue sempre le stesse regole.',
    ),
  ],
});
