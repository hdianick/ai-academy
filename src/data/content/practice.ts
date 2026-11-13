/**
 * Contenuti del Practice Lab: missioni di prompt engineering, confronti tra strumenti,
 * progetti guidati, domande per la sfida giornaliera e sfide settimanali.
 */
import { choice, order, promptFix, theory, trueFalse } from '@/features/courses/builder';
import {
  definePractice,
  defineQuestionPool,
  type PracticeItem,
  type WeeklyChallenge,
} from '@/features/practice/types';

export const practiceItems: PracticeItem[] = [
  /* ---------------- Missioni ---------------- */
  definePractice({
    id: 'mission-product-description',
    kind: 'mission',
    title: 'Scheda prodotto perfetta',
    description:
      'Trasforma una richiesta vaga in un prompt che produce una scheda prodotto pronta per l’e-commerce.',
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xp: 25,
    icon: 'pricetag-outline',
    tools: ['ChatGPT', 'Claude', 'Gemini'],
    steps: [
      theory(
        'La missione',
        [
          'Il tuo negozio online deve pubblicare la scheda di un nuovo casco jet. Il collega ha scritto un prompt troppo vago e il risultato è generico.',
          'Obiettivo: scrivere un prompt con ruolo, contesto, formato e vincoli, che dica anche cosa fare se mancano dati tecnici.',
        ],
        {
          tip: 'Pensa a chi leggerà la scheda: un motociclista che vuole capire in 10 secondi se il casco fa per lui.',
        },
      ),
      promptFix({
        instruction: 'Riscrivi il prompt per ottenere una scheda prodotto efficace.',
        weakPrompt: 'Scrivi la descrizione di un casco.',
        checks: [
          {
            label: 'Ruolo (es. copywriter e-commerce)',
            keywords: ['sei un', 'copywriter', 'agisci come', 'esperto'],
          },
          {
            label: 'Pubblico o canale',
            keywords: ['e-commerce', 'negozio', 'online', 'clienti', 'motociclist', 'pubblico'],
          },
          {
            label: 'Formato o lunghezza',
            keywords: ['parole', 'elenco', 'punti', 'titolo', 'paragraf'],
          },
          {
            label: 'Gestione dei dati mancanti',
            keywords: [
              'non inventare',
              'se mancano',
              'da completare',
              'non disponibile',
              'non presente',
            ],
          },
        ],
        sampleAnswer:
          'Sei un copywriter per un e-commerce di accessori moto. Scrivi la scheda di un casco jet per motociclisti urbani: titolo, 80 parole di descrizione, 4 punti di forza in elenco, una frase sulla sicurezza. Se mancano dati tecnici non inventarli: scrivi [DA COMPLETARE].',
      }),
      choice(
        'Il modello inventa il peso del casco. Quale istruzione aggiungi?',
        [
          '“Sii più creativo”',
          '“Usa solo i dati che ti fornisco; se un dato manca scrivi [DA COMPLETARE]”',
          '“Scrivi in inglese”',
          '“Fai una descrizione più lunga”',
        ],
        1,
        'Limitare il modello ai dati forniti e dargli una via d’uscita esplicita riduce le invenzioni.',
      ),
    ],
  }),
  definePractice({
    id: 'mission-customer-reply',
    kind: 'mission',
    title: 'Risposta a un cliente arrabbiato',
    description:
      'Gestisci un reclamo con il tono giusto, senza promettere ciò che non puoi mantenere.',
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xp: 25,
    icon: 'mail-unread-outline',
    tools: ['ChatGPT', 'Claude'],
    steps: [
      theory('La missione', [
        'Un cliente scrive: “Il casco è arrivato con la visiera graffiata. Pessimo servizio, voglio i soldi indietro subito!”.',
        'Devi far scrivere all’AI una risposta che si scusi, proponga una soluzione concreta (sostituzione o reso) e mantenga un tono calmo e professionale.',
      ]),
      promptFix({
        instruction: 'Scrivi il prompt per far preparare la risposta all’AI.',
        weakPrompt: 'Rispondi al cliente.',
        checks: [
          {
            label: 'Riporta il problema del cliente',
            keywords: ['visiera', 'graffiat', 'danneggiat', 'reclamo', 'problema'],
          },
          {
            label: 'Indica il tono',
            keywords: ['tono', 'empatic', 'cortese', 'calmo', 'professionale'],
          },
          {
            label: 'Propone una soluzione',
            keywords: ['sostituzione', 'reso', 'rimborso', 'soluzione', 'proponi'],
          },
          {
            label: 'Limita lunghezza o formato',
            keywords: ['parole', 'breve', 'righe', 'email', 'firma'],
          },
        ],
        sampleAnswer:
          'Scrivi un’email di risposta a un cliente che ha ricevuto un casco con la visiera graffiata ed è arrabbiato. Tono empatico e professionale: scusati, offri a scelta sostituzione gratuita o rimborso completo, spiega i prossimi passi. Massimo 120 parole, firma “Servizio Clienti”.',
      }),
      trueFalse(
        'In una risposta a un reclamo è utile chiedere all’AI di non promettere tempi che l’azienda non può garantire.',
        true,
        'L’AI tende a essere accomodante: meglio dirle esplicitamente cosa può e non può promettere.',
      ),
    ],
  }),
  definePractice({
    id: 'mission-data-extraction',
    kind: 'mission',
    title: 'Estrai dati da una fattura',
    description:
      'Ottieni dati strutturati e affidabili da un documento, pronti per un’automazione.',
    difficulty: 'intermediate',
    estimatedMinutes: 5,
    xp: 35,
    icon: 'receipt-outline',
    tools: ['ChatGPT', 'Claude', 'Make', 'n8n'],
    steps: [
      theory(
        'La missione',
        [
          'Ogni giorno arrivano fatture in PDF dai fornitori. Vuoi che l’AI estragga i dati principali in un formato che un’automazione possa leggere.',
          'Serve un output strutturato, campi precisi e una regola per i dati mancanti.',
        ],
        {
          example:
            '{"fornitore": "...", "numero": "...", "data": "AAAA-MM-GG", "imponibile": 0, "iva": 0, "totale": 0}',
        },
      ),
      promptFix({
        instruction: 'Scrivi il prompt di estrazione.',
        weakPrompt: 'Leggi la fattura e dimmi i dati.',
        checks: [
          {
            label: 'Formato strutturato (JSON o tabella)',
            keywords: ['json', 'tabella', 'campi', 'formato'],
          },
          {
            label: 'Elenca i campi da estrarre',
            keywords: ['fornitore', 'totale', 'data', 'numero', 'iva', 'imponibile'],
          },
          {
            label: 'Regola per i dati mancanti',
            keywords: ['null', 'mancante', 'non presente', 'se non', 'non disponibile'],
          },
          {
            label: 'Formato di date o numeri',
            keywords: ['aaaa', 'yyyy', 'formato data', 'numero', 'decimal', 'punto'],
          },
        ],
        sampleAnswer:
          'Estrai dalla fattura e rispondi solo con JSON con i campi: fornitore, numero, data (formato AAAA-MM-GG), imponibile, iva, totale (numeri con il punto decimale). Se un dato non è presente usa null.',
      }),
      choice(
        'L’AI restituisce il totale come “1.250,00 €” invece di 1250.00. Cosa fai?',
        [
          'Accetti: è uguale',
          'Specifichi nel prompt il formato numerico e aggiungi un controllo nel flusso',
          'Cambi strumento',
          'Togli il campo totale',
        ],
        1,
        'Formati espliciti nel prompt e controlli automatici rendono il dato affidabile.',
      ),
    ],
  }),
  definePractice({
    id: 'mission-image-prompt',
    kind: 'mission',
    title: 'Foto lifestyle per i social',
    description: 'Scrivi un prompt visivo per ambientare un prodotto in una scena credibile.',
    difficulty: 'intermediate',
    estimatedMinutes: 4,
    xp: 30,
    icon: 'camera-outline',
    tools: ['Midjourney', 'Nano Banana', 'ChatGPT'],
    steps: [
      theory('La missione', [
        'Devi creare un’immagine per un post Instagram verticale: un casco jet appoggiato sulla sella di uno scooter in una via del centro storico.',
        'Il prompt deve specificare soggetto, ambiente, luce, inquadratura e formato.',
      ]),
      promptFix({
        instruction: 'Scrivi il prompt visivo.',
        weakPrompt: 'Casco su scooter.',
        checks: [
          { label: 'Ambiente', keywords: ['via', 'strada', 'centro', 'piazza', 'citta', 'vicolo'] },
          {
            label: 'Luce o atmosfera',
            keywords: ['luce', 'tramonto', 'mattino', 'sole', 'atmosfera', 'golden'],
          },
          {
            label: 'Inquadratura',
            keywords: [
              'primo piano',
              'inquadratura',
              'sfondo sfocato',
              'angolo',
              'vista',
              'tre quarti',
            ],
          },
          { label: 'Formato verticale', keywords: ['verticale', '4:5', '9:16', 'formato'] },
        ],
        sampleAnswer:
          'Fotografia lifestyle di un casco jet bianco appoggiato sulla sella di uno scooter vintage in un vicolo del centro storico italiano, luce calda del tramonto, primo piano a tre quarti con sfondo sfocato, formato verticale 4:5.',
      }),
    ],
  }),

  /* ---------------- Confronti ---------------- */
  definePractice({
    id: 'compare-right-tool',
    kind: 'comparison',
    title: 'Lo strumento giusto per ogni lavoro',
    description: 'Cinque situazioni reali: scegli lo strumento più adatto e scopri perché.',
    difficulty: 'beginner',
    estimatedMinutes: 4,
    xp: 30,
    icon: 'git-compare-outline',
    tools: ['Perplexity', 'NotebookLM', 'Midjourney', 'Make', 'Cursor'],
    steps: [
      choice(
        'Ti serve una risposta aggiornata con le fonti da verificare. Quale strumento è più adatto?',
        ['Midjourney', 'Perplexity', 'Suno', 'Lovable'],
        1,
        'Perplexity cerca sul web e cita le fonti di ogni risposta.',
      ),
      choice(
        'Vuoi fare domande solo sui manuali interni dell’azienda, con riferimenti ai passaggi.',
        ['NotebookLM', 'Runway', 'Zapier', 'Sora'],
        0,
        'NotebookLM risponde basandosi solo sulle fonti caricate e cita i passaggi.',
      ),
      choice(
        'Devi collegare il negozio online al foglio di calcolo e avvisare il magazzino a ogni ordine.',
        ['ElevenLabs', 'Midjourney', 'Make', 'Perplexity'],
        2,
        'Make (come n8n e Zapier) collega app diverse con trigger e azioni.',
      ),
      choice(
        'Vuoi creare la voce narrante di un video tutorial in tre lingue.',
        ['ElevenLabs', 'Cursor', 'NotebookLM', 'Make'],
        0,
        'ElevenLabs è specializzato in sintesi vocale e doppiaggio.',
      ),
      choice(
        'Uno sviluppatore vuole aiuto con AI direttamente nel suo editor di codice.',
        ['Suno', 'Cursor', 'Perplexity', 'Nano Banana'],
        1,
        'Cursor è un editor di codice con AI integrata.',
      ),
    ],
  }),
  definePractice({
    id: 'compare-chatbots',
    kind: 'comparison',
    title: 'Chatbot a confronto',
    description: 'Come scegliere tra assistenti diversi e come confrontarli in modo serio.',
    difficulty: 'intermediate',
    estimatedMinutes: 4,
    xp: 30,
    icon: 'swap-horizontal-outline',
    tools: ['ChatGPT', 'Claude', 'Gemini', 'Microsoft Copilot'],
    steps: [
      theory('Confrontare con metodo', [
        'ChatGPT, Claude, Gemini e Copilot sono tutti assistenti generalisti molto capaci: le differenze cambiano spesso con i nuovi modelli.',
        'Invece di affidarti alle classifiche, prova lo stesso prompt su più assistenti con 3-5 casi reali del tuo lavoro e confronta i risultati con criteri fissi.',
      ]),
      order(
        'Ordina i passi di un confronto serio tra assistenti.',
        [
          'Scegli casi reali del tuo lavoro',
          'Usa lo stesso prompt su ogni assistente',
          'Valuta con criteri fissi',
          'Scegli e ripeti il test periodicamente',
        ],
        'Stessi input, stessi criteri: è l’unico modo per un confronto equo.',
      ),
      choice(
        'Lavori tutto il giorno in Outlook, Word ed Excel. Quale integrazione può farti risparmiare più passaggi?',
        ['Microsoft Copilot', 'Midjourney', 'Suno', 'Runway'],
        0,
        'Copilot è integrato nelle app Microsoft 365.',
      ),
      trueFalse(
        'La classifica degli assistenti migliori resta valida per anni.',
        false,
        'I modelli si aggiornano spesso: conviene ripetere i test periodicamente.',
      ),
    ],
  }),

  /* ---------------- Progetti ---------------- */
  definePractice({
    id: 'project-content-week',
    kind: 'project',
    title: 'Progetto: una settimana di contenuti social',
    description:
      'Dal piano editoriale ai testi e alle immagini: costruisci un flusso completo in 4 passaggi.',
    difficulty: 'intermediate',
    estimatedMinutes: 10,
    xp: 60,
    icon: 'calendar-outline',
    tools: ['ChatGPT', 'Claude', 'Midjourney', 'Nano Banana'],
    steps: [
      theory('Il progetto', [
        'Obiettivo: pianificare e preparare 5 post Instagram per un negozio di accessori moto, con testi e prompt per le immagini.',
        'Lavorerai come in una catena di prompt: piano → testi → immagini → revisione.',
      ]),
      promptFix({
        instruction: 'Passo 1: chiedi all’AI il piano editoriale.',
        weakPrompt: 'Fammi dei post.',
        checks: [
          { label: 'Numero di post o durata', keywords: ['5 post', 'cinque', 'settimana', '5'] },
          {
            label: 'Settore o pubblico',
            keywords: ['moto', 'motociclist', 'accessori', 'caschi', 'pubblico'],
          },
          {
            label: 'Formato del piano (tabella…)',
            keywords: ['tabella', 'giorno', 'colonne', 'elenco'],
          },
        ],
        sampleAnswer:
          'Crea un piano editoriale di 5 post Instagram per una settimana per un negozio online di accessori moto, pubblico 25-45 anni. Tabella con: giorno, tema, obiettivo, tipo di contenuto.',
      }),
      promptFix({
        instruction: 'Passo 2: chiedi i testi dei post partendo dal piano.',
        weakPrompt: 'Scrivi i testi.',
        checks: [
          {
            label: 'Collega al piano precedente',
            keywords: ['piano', 'tabella', 'sopra', 'precedente', 'ogni post'],
          },
          { label: 'Lunghezza', keywords: ['parole', 'caratteri', 'righe', 'breve'] },
          {
            label: 'Call to action o hashtag',
            keywords: ['call to action', 'cta', 'hashtag', 'invito'],
          },
        ],
        sampleAnswer:
          'Per ogni post del piano sopra scrivi la didascalia: massimo 80 parole, tono amichevole, una call to action finale e 3 hashtag pertinenti.',
      }),
      promptFix({
        instruction: 'Passo 3: chiedi i prompt per le immagini.',
        weakPrompt: 'Fai le immagini.',
        checks: [
          {
            label: 'Un prompt per ogni post',
            keywords: ['ogni post', 'per ciascun', 'per ogni', '5 prompt'],
          },
          {
            label: 'Stile coerente',
            keywords: ['stile', 'coerente', 'stessa luce', 'stesso', 'palette'],
          },
          { label: 'Formato', keywords: ['4:5', 'verticale', 'formato', '1:1'] },
        ],
        sampleAnswer:
          'Per ogni post scrivi un prompt per generare l’immagine, con uno stile coerente per tutta la serie (fotografia, luce calda naturale, toni caldi) e formato verticale 4:5.',
      }),
      choice(
        'Passo 4: qual è la revisione finale più importante prima di pubblicare?',
        [
          'Contare le emoji',
          'Verificare che prodotti, prezzi e promesse corrispondano alla realtà e che le immagini siano fedeli',
          'Tradurre tutto in inglese',
          'Nessuna, l’AI non sbaglia',
        ],
        1,
        'Prima di pubblicare servono sempre un controllo umano dei fatti e la fedeltà delle immagini al prodotto reale.',
      ),
    ],
  }),
  definePractice({
    id: 'project-support-automation',
    kind: 'project',
    title: 'Progetto: smistamento automatico del servizio clienti',
    description:
      'Progetta un flusso che classifica le email, estrae i dati e prepara una bozza di risposta.',
    difficulty: 'advanced',
    estimatedMinutes: 10,
    xp: 70,
    icon: 'construct-outline',
    tools: ['Make', 'n8n', 'Zapier', 'Claude', 'ChatGPT'],
    steps: [
      theory('Il progetto', [
        'Ogni giorno arrivano decine di email: domande sulle spedizioni, resi, informazioni sui prodotti. Vuoi un flusso che le smisti e prepari bozze di risposta, lasciando a una persona l’invio.',
        'Strumenti adatti: Make, n8n o Zapier per il flusso, un modello AI per classificare e scrivere.',
      ]),
      order(
        'Ordina i passaggi del flusso.',
        [
          'Trigger: arriva una nuova email',
          'AI: classifica la richiesta ed estrae il numero d’ordine',
          'Controllo: categoria valida e numero d’ordine presente',
          'AI: prepara una bozza di risposta',
          'Persona: verifica e invia',
        ],
        'Classificazione, controlli, bozza e approvazione umana: un flusso affidabile.',
      ),
      promptFix({
        instruction: 'Scrivi il prompt del passaggio di classificazione.',
        weakPrompt: 'Di cosa parla questa email?',
        checks: [
          {
            label: 'Categorie ammesse',
            keywords: ['reso', 'spedizione', 'categoria', 'categorie', 'informazioni'],
          },
          { label: 'Output strutturato', keywords: ['json', 'formato', 'campi'] },
          { label: 'Dati mancanti', keywords: ['null', 'se non', 'mancante', 'non presente'] },
        ],
        sampleAnswer:
          'Classifica l’email in una categoria tra: reso, spedizione, prodotto, altro. Estrai il numero d’ordine. Rispondi solo con JSON {"categoria": ..., "numero_ordine": ... o null se non presente, "urgente": true/false}.',
      }),
      choice(
        'Il flusso riceve un’email in tedesco con una categoria non riconosciuta. Cosa deve succedere?',
        [
          'Viene cancellata',
          'Viene inoltrata a una persona per la gestione manuale',
          'Si risponde automaticamente',
          'Il flusso si ferma per sempre',
        ],
        1,
        'I casi non previsti vanno sempre a una persona: è il “piano B” del flusso.',
      ),
    ],
  }),
];

/** Domande da cui viene estratta la sfida giornaliera (3 al giorno). */
export const dailyChallengePool = defineQuestionPool('daily', [
  choice(
    'Quale parte di un prompt descrive pubblico e obiettivo?',
    ['Il formato', 'Il contesto', 'Il ruolo', 'Il titolo'],
    1,
    'Il contesto contiene le informazioni che il modello non può sapere.',
  ),
  trueFalse(
    'Un’AI può citare una fonte inesistente.',
    true,
    'È un tipo di allucinazione: controlla sempre le fonti.',
  ),
  choice(
    'Quale formato usi per una storia Instagram?',
    ['16:9', '9:16', '1:1', '21:9'],
    1,
    'Storie e reel sono verticali.',
  ),
  choice(
    'Cosa avvia un’automazione?',
    ['Un’azione', 'Un trigger', 'Un token', 'Un badge'],
    1,
    'Il trigger è l’evento di partenza.',
  ),
  trueFalse(
    'Incollare password in un chatbot pubblico è una buona pratica.',
    false,
    'Credenziali e dati sensibili non vanno mai condivisi.',
  ),
  choice(
    'Cos’è il few-shot prompting?',
    [
      'Usare pochi token',
      'Dare esempi di input e output',
      'Fare domande brevi',
      'Usare solo immagini',
    ],
    1,
    'Gli esempi mostrano al modello cosa vuoi.',
  ),
  choice(
    'Quale strumento risponde citando le fonti dal web?',
    ['Suno', 'Perplexity', 'Midjourney', 'Lovable'],
    1,
    'Perplexity è un motore di risposta con fonti.',
  ),
  trueFalse(
    'Un agente AI dovrebbe avere solo i permessi strettamente necessari.',
    true,
    'È il principio del minimo privilegio.',
  ),
  choice(
    'Perché chiedere output in JSON in un flusso?',
    [
      'È più bello',
      'I passaggi successivi lo leggono in modo affidabile',
      'Costa meno',
      'È obbligatorio',
    ],
    1,
    'I dati strutturati evitano errori.',
  ),
  choice(
    'Cosa fa un modello linguistico quando risponde?',
    [
      'Copia da un archivio',
      'Genera il testo un token alla volta',
      'Chiede a una persona',
      'Cerca sempre su Google',
    ],
    1,
    'La generazione avviene token per token.',
  ),
  trueFalse(
    'Nell’editing di immagini conviene dire cosa NON deve cambiare.',
    true,
    'Proteggere gli elementi chiave evita modifiche indesiderate.',
  ),
  choice(
    'Quale tecnica divide un lavoro in più prompt collegati?',
    ['Prompt chaining', 'Upscaling', 'Few-shot', 'Fine-tuning'],
    0,
    'L’output di un passaggio è l’input del successivo.',
  ),
  choice(
    'Qual è il primo passo prima di automatizzare un processo?',
    [
      'Comprare un software',
      'Descrivere il processo attuale',
      'Assumere un tecnico',
      'Scrivere il codice',
    ],
    1,
    'Prima si capisce il processo, poi si automatizza.',
  ),
  trueFalse(
    'Le funzioni e i piani degli strumenti AI cambiano raramente.',
    false,
    'Cambiano spesso: verifica sempre sul sito ufficiale.',
  ),
  choice(
    'Quale istruzione riduce le invenzioni?',
    [
      '“Sii creativo”',
      '“Se un dato manca, scrivi NON DISPONIBILE”',
      '“Rispondi in fretta”',
      '“Usa emoji”',
    ],
    1,
    'Una via d’uscita esplicita riduce le allucinazioni.',
  ),
]);

export const DAILY_CHALLENGE_SIZE = 3;
export const DAILY_XP_PER_CORRECT = 5;

export const weeklyChallenges: WeeklyChallenge[] = [
  { id: 'weekly-xp', metric: 'xp', target: 150, bonusXp: 50, icon: 'flash' },
  { id: 'weekly-lessons', metric: 'lessons', target: 5, bonusXp: 40, icon: 'book' },
  { id: 'weekly-days', metric: 'activeDays', target: 4, bonusXp: 40, icon: 'calendar' },
];
