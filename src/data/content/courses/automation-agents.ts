import {
  choice,
  defineCourse,
  fillBlank,
  order,
  promptFix,
  theory,
  trueFalse,
} from '@/features/courses/builder';

export const automationAgents = defineCourse({
  id: 'automation-agents',
  title: 'Automazioni e agenti AI',
  subtitle: 'Fai lavorare l’AI dentro i tuoi processi',
  description:
    'Dalle automazioni classiche agli agenti AI: trigger e azioni, come mappare un processo, come inserire passaggi AI affidabili in strumenti come Make e n8n, e come progettare agenti con la giusta supervisione umana.',
  category: 'automation',
  level: 'intermediate',
  tools: ['Make', 'n8n', 'Zapier', 'ChatGPT', 'Claude'],
  outcomes: [
    'Progettare un’automazione con trigger, azioni e dati',
    'Inserire l’AI nei flussi per classificare, estrarre e riassumere',
    'Capire come funziona un agente AI e come tenerlo sotto controllo',
  ],
  requiredTier: 'premium',
  icon: 'git-network-outline',
  modules: [
    {
      title: 'Le basi delle automazioni',
      description: 'Trigger, azioni e come scegliere cosa automatizzare.',
      lessons: [
        {
          title: 'Trigger, azioni e dati',
          summary: 'I tre mattoni di ogni automazione.',
          estimatedMinutes: 4,
          steps: [
            theory('Quando succede X, fai Y', [
              'Un’automazione collega app diverse con una regola: quando succede un evento (trigger), esegui una o più operazioni (azioni). Esempio: quando arriva un nuovo ordine sul sito, crea una riga nel foglio di calcolo e manda un messaggio al magazzino.',
              'Tra un passaggio e l’altro viaggiano i dati: nome cliente, prodotti, importo. Strumenti come Make, n8n e Zapier permettono di costruire questi flussi visivamente, spesso senza scrivere codice.',
            ]),
            theory(
              'Filtri e condizioni',
              [
                'Puoi aggiungere condizioni: “solo se l’ordine supera 200 €”, “solo se il cliente è nuovo”. Così lo stesso flusso gestisce casi diversi.',
              ],
              {
                example:
                  'Trigger: nuova email con allegato PDF nella casella fatture@\nAzione 1: salva il PDF nella cartella Fatture/2026\nCondizione: se il mittente è un fornitore nuovo\nAzione 2: avvisa l’amministrazione su chat',
              },
            ),
            fillBlank(
              'L’evento che fa partire un’automazione si chiama ___.',
              ['trigger', 'token', 'prompt', 'template'],
              0,
              'Il trigger è il “quando succede”: un nuovo ordine, una nuova email, un orario.',
            ),
            choice(
              'Quale di questi è un’azione, non un trigger?',
              [
                'Arriva un nuovo ordine',
                'Ogni lunedì alle 9:00',
                'Crea una riga nel foglio di calcolo',
                'Si compila un modulo sul sito',
              ],
              2,
              'Creare una riga è un’operazione eseguita dal flusso; gli altri sono eventi che lo avviano.',
            ),
          ],
        },
        {
          title: 'Mappare un processo prima di automatizzarlo',
          summary: 'Automatizzare il caos produce caos più veloce.',
          estimatedMinutes: 5,
          steps: [
            theory('Prima su carta', [
              'Prima di aprire qualsiasi strumento, scrivi il processo come lo fai oggi: chi fa cosa, in che ordine, con quali dati e dove nascono gli errori.',
              'Scegli i candidati giusti: attività frequenti, ripetitive, con regole chiare e dati digitali. Evita di partire da processi rari o pieni di eccezioni.',
            ]),
            theory(
              'Stima il beneficio',
              [
                'Un calcolo semplice: minuti risparmiati per volta × volte al mese. Un’attività da 5 minuti fatta 200 volte al mese vale circa 16 ore al mese.',
              ],
              { tip: 'Parti da un flusso piccolo che funziona, poi estendilo.' },
            ),
            order(
              'Ordina i passi per avviare un progetto di automazione.',
              [
                'Descrivere il processo attuale',
                'Individuare passaggi ripetitivi e regole',
                'Stimare il tempo risparmiato',
                'Costruire e testare un primo flusso semplice',
              ],
              'Capire, scegliere, valutare e solo dopo costruire.',
            ),
            choice(
              'Quale attività è la migliore candidata per una prima automazione?',
              [
                'Una trattativa commerciale complessa che capita due volte l’anno',
                'Copiare ogni giorno i dati degli ordini dal sito al foglio di calcolo',
                'Scegliere la strategia aziendale',
                'Un colloquio di lavoro',
              ],
              1,
              'È frequente, ripetitiva, con regole chiare e dati già digitali.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Quali sono i tre mattoni di un’automazione?',
          [
            'Prompt, token, modello',
            'Trigger, azioni, dati',
            'Email, PDF, chat',
            'Utente, password, server',
          ],
          1,
          'Un evento avvia operazioni che si scambiano dati.',
        ),
        trueFalse(
          'Conviene automatizzare per primi i processi rari e pieni di eccezioni.',
          false,
          'Meglio partire da attività frequenti e con regole chiare.',
        ),
        choice(
          'Un’attività da 5 minuti fatta 120 volte al mese fa risparmiare circa…',
          ['1 ora', '10 ore', '100 ore', '5 minuti'],
          1,
          '5 × 120 = 600 minuti, cioè 10 ore al mese.',
        ),
      ],
    },
    {
      title: 'L’AI dentro i flussi',
      description: 'Passaggi AI affidabili: classificare, estrarre, riassumere.',
      lessons: [
        {
          title: 'Aggiungere un passaggio AI',
          summary: 'Dove l’AI supera le regole fisse.',
          estimatedMinutes: 5,
          steps: [
            theory('Quando le regole non bastano', [
              'Le regole fisse funzionano con dati ordinati. L’AI è utile quando l’input è testo libero: email dei clienti, recensioni, documenti.',
              'Tre usi tipici in un flusso: classificare (es. tipo di richiesta: reso, informazioni, reclamo), estrarre dati (es. numero d’ordine da un’email), riassumere o redigere una bozza di risposta.',
            ]),
            theory(
              'Esempio di flusso',
              [
                'Il passaggio AI è un modulo del flusso: riceve il testo, applica un prompt fisso e restituisce il risultato ai passaggi successivi.',
              ],
              {
                example:
                  'Trigger: nuova email al servizio clienti\nAI: classifica in reso / spedizione / prodotto / altro ed estrai il numero d’ordine\nCondizione: se “reso” → crea ticket nel gestionale e prepara una bozza di risposta\nUmano: controlla e invia la risposta',
              },
            ),
            choice(
              'In quale caso un passaggio AI è più utile di una regola fissa?',
              [
                'Sommare due numeri',
                'Capire il tipo di richiesta da un’email scritta liberamente',
                'Copiare un file da una cartella a un’altra',
                'Inviare un messaggio ogni lunedì',
              ],
              1,
              'Il testo libero è il terreno dove l’AI dà il massimo valore.',
            ),
            trueFalse(
              'In un flusso, il passaggio AI dovrebbe usare un prompt fisso e ben testato.',
              true,
              'Il prompt è la “configurazione” del passaggio: deve essere stabile e verificato.',
            ),
          ],
        },
        {
          title: 'Output strutturato e controlli',
          summary: 'JSON, valori ammessi e gestione degli errori.',
          estimatedMinutes: 5,
          steps: [
            theory('Le macchine vogliono dati ordinati', [
              'Il passaggio successivo dell’automazione deve leggere il risultato dell’AI. Per questo conviene chiedere un output strutturato, ad esempio JSON con campi fissi e valori ammessi.',
              'Molti strumenti e API offrono modalità di output strutturato che garantiscono un formato valido: quando disponibili, usale.',
            ]),
            theory(
              'Controlli e piano B',
              [
                'Aggiungi controlli dopo il passaggio AI: il valore è tra quelli ammessi? il numero d’ordine ha il formato giusto? Se no, manda il caso a una persona invece di procedere.',
              ],
              {
                example:
                  'Rispondi SOLO con JSON valido:\n{"categoria": "reso" | "spedizione" | "prodotto" | "altro", "numero_ordine": string | null, "urgente": boolean}\nSe il numero d’ordine non è presente usa null.',
              },
            ),
            promptFix({
              instruction:
                'Riscrivi il prompt di un passaggio AI perché restituisca dati strutturati e gestisca i dati mancanti.',
              weakPrompt: 'Leggi l’email e dimmi di cosa parla.',
              checks: [
                {
                  label: 'Chiede un formato strutturato (es. JSON)',
                  keywords: ['json', 'campi', 'formato', 'struttura', 'chiave'],
                },
                {
                  label: 'Definisce categorie o valori ammessi',
                  keywords: ['categoria', 'categorie', 'valori', 'uno tra', 'reso', 'tipo'],
                },
                {
                  label: 'Gestisce i dati mancanti',
                  keywords: [
                    'null',
                    'mancante',
                    'non presente',
                    'se non',
                    'vuoto',
                    'non disponibile',
                  ],
                },
              ],
              sampleAnswer:
                'Analizza l’email e rispondi solo con JSON: {"categoria": uno tra "reso", "spedizione", "prodotto", "altro"; "numero_ordine": stringa o null se non presente; "sintesi": massimo 20 parole}.',
            }),
            choice(
              'L’AI restituisce una categoria non prevista. Cosa deve fare il flusso?',
              [
                'Procedere comunque',
                'Mandare il caso a una persona per la verifica',
                'Cancellare l’email',
                'Ripetere all’infinito',
              ],
              1,
              'Un piano B umano evita errori silenziosi.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Perché chiedere output in JSON in un’automazione?',
          [
            'È più elegante',
            'Perché i passaggi successivi possano leggere i dati in modo affidabile',
            'Perché costa meno',
            'Non serve',
          ],
          1,
          'I dati strutturati evitano errori di interpretazione.',
        ),
        trueFalse(
          'Dopo un passaggio AI è utile controllare che i valori siano tra quelli ammessi.',
          true,
          'I controlli intercettano risposte inattese prima che facciano danni.',
        ),
        choice(
          'Quale NON è un uso tipico dell’AI in un flusso?',
          [
            'Classificare email',
            'Estrarre dati da documenti',
            'Riassumere testi',
            'Sostituire il backup dei dati',
          ],
          3,
          'Il backup è un’operazione tecnica, non un compito di comprensione del testo.',
        ),
      ],
    },
    {
      title: 'Agenti AI',
      description: 'Obiettivi, strumenti e supervisione.',
      lessons: [
        {
          title: 'Cos’è un agente AI',
          summary: 'Obiettivo, strumenti e ciclo decisionale.',
          estimatedMinutes: 5,
          steps: [
            theory('Dal flusso fisso all’agente', [
              'In un’automazione classica i passaggi sono decisi in anticipo. Un agente AI riceve invece un obiettivo e decide da solo quali passaggi fare, usando gli strumenti a cui ha accesso: ricerca web, email, calendario, database, file.',
              'Funziona in un ciclo: osserva la situazione, decide la prossima azione, la esegue con uno strumento, valuta il risultato e ripete finché l’obiettivo è raggiunto.',
            ]),
            theory(
              'Esempi di agenti',
              [
                'Agenti di ricerca che consultano decine di fonti e scrivono un rapporto. Agenti di programmazione come Claude Code e Cursor che leggono un progetto, modificano file ed eseguono test. Agenti di customer care che consultano ordini e FAQ.',
              ],
              { tip: 'Più strumenti e autonomia dai a un agente, più servono limiti e controlli.' },
            ),
            order(
              'Ordina il ciclo di lavoro di un agente.',
              [
                'Osservare la situazione',
                'Decidere la prossima azione',
                'Eseguire l’azione con uno strumento',
                'Valutare il risultato',
              ],
              'Il ciclo si ripete finché l’obiettivo è raggiunto o serve l’intervento umano.',
            ),
            choice(
              'Qual è la differenza principale tra un’automazione classica e un agente?',
              [
                'L’agente decide autonomamente i passaggi per raggiungere un obiettivo',
                'L’agente funziona solo di notte',
                'L’automazione classica usa sempre l’AI',
                'Nessuna',
              ],
              0,
              'Nell’automazione i passaggi sono predefiniti; l’agente li sceglie in base alla situazione.',
            ),
          ],
        },
        {
          title: 'Supervisione, sicurezza e costi',
          summary: 'Come dare autonomia senza perdere il controllo.',
          estimatedMinutes: 5,
          steps: [
            theory('Il principio del minimo privilegio', [
              'Dai all’agente solo gli strumenti e i permessi strettamente necessari: se deve leggere gli ordini, non serve che possa fare rimborsi.',
              'Per le azioni irreversibili o costose (inviare email ai clienti, pagare, cancellare dati) prevedi sempre un’approvazione umana.',
            ]),
            theory(
              'Rischi e costi',
              [
                'Un agente può essere ingannato da istruzioni nascoste nei contenuti che legge (prompt injection): una pagina web o un’email potrebbero contenere testo che cerca di fargli fare altro. Tratta i contenuti esterni come dati, non come ordini.',
                'Ogni passaggio consuma risorse: imposta limiti di passaggi e di spesa, e registra le azioni per poterle controllare.',
              ],
              {
                tip: 'Registro delle azioni + approvazione umana sulle azioni critiche = agente affidabile.',
              },
            ),
            trueFalse(
              'Un agente che deve solo leggere gli ordini dovrebbe avere anche il permesso di fare rimborsi, per sicurezza.',
              false,
              'Il minimo privilegio riduce i danni possibili in caso di errore o manipolazione.',
            ),
            choice(
              'Cos’è una prompt injection?',
              [
                'Un modo per velocizzare il modello',
                'Istruzioni nascoste in un contenuto esterno che cercano di manipolare l’agente',
                'Un tipo di abbonamento',
                'Un errore di battitura',
              ],
              1,
              'Per questo i contenuti letti dall’agente vanno trattati come dati, non come comandi.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Per quale azione serve sempre un’approvazione umana?',
          [
            'Leggere un’email',
            'Cercare un’informazione',
            'Effettuare un pagamento',
            'Riassumere un documento',
          ],
          2,
          'Le azioni irreversibili o costose richiedono conferma.',
        ),
        trueFalse(
          'Registrare le azioni di un agente aiuta a controllarlo e correggerlo.',
          true,
          'Il registro permette di capire cosa ha fatto e perché.',
        ),
        choice(
          'Cosa significa “minimo privilegio”?',
          [
            'Dare tutti i permessi',
            'Dare solo i permessi strettamente necessari',
            'Non dare permessi',
            'Cambiare password spesso',
          ],
          1,
          'Meno permessi, meno danni possibili.',
        ),
      ],
    },
  ],
  finalTest: [
    choice(
      'Cosa avvia un’automazione?',
      ['Un’azione', 'Un trigger', 'Un JSON', 'Un agente'],
      1,
      'Il trigger è l’evento di partenza.',
    ),
    trueFalse(
      'Prima di automatizzare conviene descrivere il processo attuale.',
      true,
      'Automatizzare un processo poco chiaro moltiplica gli errori.',
    ),
    choice(
      'Perché chiedere all’AI un output JSON in un flusso?',
      [
        'Per renderlo leggibile dai passaggi successivi',
        'Per renderlo più lungo',
        'Per tradurlo',
        'Per decorarlo',
      ],
      0,
      'I dati strutturati sono affidabili da elaborare.',
    ),
    choice(
      'Cosa caratterizza un agente AI?',
      [
        'Segue passaggi fissi',
        'Riceve un obiettivo e sceglie le azioni con gli strumenti disponibili',
        'Funziona senza modello',
        'Non usa strumenti',
      ],
      1,
      'Autonomia guidata da un obiettivo.',
    ),
    trueFalse(
      'I contenuti esterni letti da un agente vanno trattati come comandi da eseguire.',
      false,
      'Vanno trattati come dati: potrebbero contenere istruzioni malevole.',
    ),
    choice(
      'Quale pratica rende un agente più sicuro?',
      [
        'Dargli accesso a tutto',
        'Approvazione umana per le azioni critiche',
        'Nessun registro',
        'Nessun limite di spesa',
      ],
      1,
      'Controllo umano dove il rischio è alto.',
    ),
  ],
});
