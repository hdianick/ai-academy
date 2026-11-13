/**
 * Base di conoscenza del Tutor in MODALITÀ DEMO.
 * Risposte scritte a mano sui concetti dei corsi. Ogni voce rimanda alla lezione di riferimento.
 */
import type { KnowledgeEntry } from '@/features/tutor/types';

export const tutorKnowledge: KnowledgeEntry[] = [
  {
    id: 'help',
    keywords: ['cosa sai fare', 'come funzioni', 'aiuto', 'chi sei', 'cosa puoi fare', 'demo'],
    answer:
      'Sono il Tutor di AI Academy in modalità demo: rispondo con spiegazioni già preparate sui concetti dei corsi (prompt, modelli linguistici, immagini, automazioni, agenti…) e sugli strumenti del catalogo. Non sono ancora collegato a un modello AI vero, quindi su domande fuori da questi temi potrei non saperti aiutare.',
    followUps: [
      'Cos’è un modello linguistico?',
      'Come scrivo un buon prompt?',
      'Cos’è un agente AI?',
    ],
  },
  {
    id: 'ai-ml-dl',
    keywords: [
      'machine learning',
      'deep learning',
      'intelligenza artificiale',
      'cos e l ai',
      'differenza tra ai',
      'rete neurale',
      'reti neurali',
    ],
    answer:
      'L’intelligenza artificiale è l’insieme delle tecniche che fanno svolgere ai computer compiti “intelligenti”. Il machine learning è il modo in cui oggi si costruisce quasi tutta l’AI: il sistema impara dagli esempi invece di seguire regole scritte a mano. Il deep learning è un tipo di machine learning basato su reti neurali con molti livelli, ed è la tecnologia dietro ChatGPT, Claude, Gemini e i generatori di immagini.',
    followUps: ['Cos’è un modello linguistico?', 'Cosa sono i token?'],
    lessonId: 'intro-ai.m1.l1',
  },
  {
    id: 'llm',
    keywords: [
      'modello linguistico',
      'llm',
      'large language model',
      'come funziona chatgpt',
      'come ragiona',
      'come pensa',
    ],
    answer:
      'Un modello linguistico (LLM) è addestrato su enormi quantità di testo a prevedere il pezzo di testo successivo. Quando ti risponde genera la risposta un token alla volta, sulla base degli schemi appresi. Non consulta un archivio di risposte pronte: per questo è molto flessibile, ma può anche sbagliare con sicurezza.',
    followUps: ['Cosa sono i token?', 'Cos’è un’allucinazione?'],
    lessonId: 'intro-ai.m1.l2',
  },
  {
    id: 'token',
    keywords: ['token'],
    answer:
      'Un token è l’unità di testo con cui lavora un modello: può essere una parola intera, una parte di parola o un segno di punteggiatura. I modelli leggono e generano testo token per token, e spesso limiti e costi delle API si misurano proprio in token.',
    followUps: ['Cos’è un modello linguistico?'],
    lessonId: 'intro-ai.m1.l2',
  },
  {
    id: 'hallucination',
    keywords: [
      'allucinazion',
      'inventa',
      'sbaglia',
      'risposte false',
      'dati inventati',
      'si inventa',
    ],
    answer:
      'Un’allucinazione è una risposta sbagliata presentata con sicurezza: un dato inventato, una fonte inesistente, una norma citata male. Succede perché il modello genera testo plausibile, non necessariamente vero. Per ridurle: chiedi le fonti, ancora le risposte ai documenti (“rispondi solo in base al testo”), dai una via d’uscita (“se non lo sai scrivi NON DISPONIBILE”) e verifica sempre le informazioni importanti.',
    followUps: ['Come verifico una risposta?', 'Cosa sono i bias?'],
    lessonId: 'intro-ai.m2.l2',
  },
  {
    id: 'bias-cutoff',
    keywords: [
      'bias',
      'pregiudiz',
      'data di aggiornamento',
      'aggiornato',
      'cutoff',
      'conoscenza aggiornata',
    ],
    answer:
      'Ogni modello ha una data limite di addestramento: senza ricerca web non conosce gli eventi successivi. Inoltre impara dai testi umani, quindi può riprodurne i pregiudizi (bias). Per informazioni recenti usa strumenti con ricerca web e fonti; per decisioni delicate controlla che le risposte non contengano stereotipi.',
    followUps: ['Cos’è un’allucinazione?'],
    lessonId: 'intro-ai.m2.l2',
  },
  {
    id: 'multimodal',
    keywords: [
      'multimodal',
      'immagini e testo',
      'caricare una foto',
      'analizzare una foto',
      'audio',
    ],
    answer:
      'Un assistente multimodale lavora con più tipi di dati: testo, immagini, a volte audio e video. Puoi caricare la foto di una fattura e chiedere di estrarre i dati, oppure caricare un grafico e chiedere di spiegarlo.',
    followUps: ['Come analizzo un PDF con l’AI?'],
    lessonId: 'intro-ai.m2.l1',
  },
  {
    id: 'privacy',
    keywords: [
      'privacy',
      'dati sensibili',
      'dati personali',
      'gdpr',
      'riservat',
      'password',
      'sicuro incollare',
    ],
    answer:
      'Prima di incollare qualcosa in un chatbot pensa a dove finiscono i dati. Evita password, numeri di carte, dati sanitari, dati personali dei clienti e documenti riservati, a meno che l’azienda non usi una versione con garanzie contrattuali. Spesso basta anonimizzare: “Cliente A”, “Azienda X”. Controlla anche le impostazioni privacy del servizio.',
    followUps: ['Come verifico una risposta?'],
    lessonId: 'intro-ai.m3.l1',
  },
  {
    id: 'verify',
    keywords: ['verific', 'fidarmi', 'fonti', 'controllare una risposta', 'affidabil'],
    answer:
      'Un metodo semplice in 4 passi: 1) chiedi da quali fonti arrivano le informazioni; 2) apri le fonti e controlla che dicano davvero quello che l’AI riporta; 3) confronta con una seconda fonte autorevole; 4) per decisioni importanti chiedi a un professionista. Puoi anche chiedere all’AI: “Quali parti di questa risposta potrebbero essere imprecise?”',
    followUps: ['Cos’è un’allucinazione?'],
    lessonId: 'intro-ai.m3.l2',
  },
  {
    id: 'good-prompt',
    keywords: [
      'buon prompt',
      'scrivere un prompt',
      'come scrivo',
      'prompt efficace',
      'migliorare un prompt',
      'struttura del prompt',
      'cos e un prompt',
      'prompt',
    ],
    answer:
      'Un buon prompt ha quattro parti: ruolo (da quale prospettiva rispondere), compito (cosa fare, con un verbo chiaro), contesto (pubblico, obiettivo, vincoli, dati) e formato (tabella, elenco, numero di parole). Esempio: “Sei un copywriter per e-commerce. Scrivi la descrizione di un casco jet per motociclisti urbani, 80 parole, 3 punti di forza in elenco. Se mancano dati tecnici non inventarli.”',
    followUps: ['Cos’è il few-shot prompting?', 'Cos’è il prompt chaining?'],
    lessonId: 'prompt-engineering.m1.l1',
  },
  {
    id: 'few-shot',
    keywords: ['few-shot', 'few shot', 'esempi nel prompt', 'dare esempi'],
    answer:
      'Il few-shot prompting consiste nel dare al modello 2-3 esempi di input e output desiderato: il modello deduce lo schema e lo replica. Funziona benissimo per ottenere uno stile o un formato preciso. Gli esempi devono essere vari, altrimenti il modello li copia troppo da vicino.',
    followUps: ['Come scrivo un buon prompt?'],
    lessonId: 'prompt-engineering.m1.l2',
  },
  {
    id: 'chaining',
    keywords: [
      'chaining',
      'catena di prompt',
      'piu passaggi',
      'passo passo',
      'ragionamento',
      'scomporre',
    ],
    answer:
      'Per compiti complessi conviene scomporre il lavoro. Puoi chiedere di ragionare passo per passo in un unico prompt, oppure usare il prompt chaining: più richieste collegate in cui l’output di una diventa l’input della successiva (es. estrai i dati → raggruppali → scrivi il report). Ogni passaggio è più semplice da controllare.',
    followUps: ['Come valuto se un prompt funziona?'],
    lessonId: 'prompt-engineering.m2.l2',
  },
  {
    id: 'template',
    keywords: ['template', 'modello di prompt', 'variabili', 'riutilizzabil'],
    answer:
      'Un template è un prompt con parti fisse (istruzioni, tono, formato) e variabili tra parentesi, come {prodotto} o {pubblico}. Chiunque nel team può usarlo sostituendo solo le variabili e ottenendo risultati coerenti. Conserva i template in un documento condiviso, con un esempio di uso.',
    followUps: ['Come valuto se un prompt funziona?'],
    lessonId: 'prompt-engineering.m3.l1',
  },
  {
    id: 'evaluate-prompt',
    keywords: ['valutare', 'testare un prompt', 'valuto', 'funziona il prompt', 'misurare'],
    answer:
      'Prepara 5-10 casi di prova reali (anche difficili) e criteri di successo misurabili: formato rispettato, nessun dato inventato, tono corretto. Quando modifichi il prompt rilancia gli stessi casi e cambia una cosa alla volta, così capisci cosa ha migliorato il risultato.',
    followUps: ['Cos’è un template di prompt?'],
    lessonId: 'prompt-engineering.m3.l2',
  },
  {
    id: 'custom-instructions',
    keywords: [
      'istruzioni personalizzate',
      'memoria',
      'progetti',
      'gpt personalizzat',
      'assistente su misura',
      'personalizzare',
    ],
    answer:
      'Molti assistenti permettono di salvare istruzioni personalizzate (chi sei, come vuoi le risposte), di usare una memoria tra le conversazioni e di creare progetti o assistenti su misura con istruzioni e file fissi. Sono ideali per attività ripetitive: rispondere alle recensioni, scrivere schede prodotto, preparare preventivi. Nomi e disponibilità cambiano in base al servizio e al piano.',
    followUps: ['Come scrivo un buon prompt?'],
    lessonId: 'chatgpt-pro.m2.l2',
  },
  {
    id: 'documents',
    keywords: [
      'pdf',
      'documento',
      'contratto',
      'foglio di calcolo',
      'excel',
      'analizzare file',
      'caricare file',
    ],
    answer:
      'Puoi caricare PDF, documenti e fogli di calcolo e fare domande sul contenuto. Per ridurre gli errori chiedi: “Rispondi solo in base al documento e indica la sezione da cui prendi l’informazione”. Per i calcoli su un foglio di calcolo chiedi di mostrare il procedimento, così puoi controllarlo.',
    followUps: ['Cos’è un’allucinazione?'],
    lessonId: 'chatgpt-pro.m2.l1',
  },
  {
    id: 'diffusion',
    keywords: [
      'diffusione',
      'come nasce un immagine',
      'generatore di immagini',
      'come funzionano le immagini',
      'genera immagini',
    ],
    answer:
      'Molti generatori di immagini usano modelli di diffusione: partono da rumore casuale e lo trasformano passo dopo passo in un’immagine, guidati dal tuo testo. Per questo lo stesso prompt produce ogni volta risultati diversi: genera più varianti e scegli la migliore.',
    followUps: ['Come scrivo un prompt per le immagini?'],
    lessonId: 'ai-images.m1.l1',
  },
  {
    id: 'image-prompt',
    keywords: [
      'prompt per le immagini',
      'prompt visivo',
      'prompt immagine',
      'descrivere un immagine',
      'inquadratura',
      'midjourney prompt',
    ],
    answer:
      'Un prompt visivo efficace descrive: soggetto (con dettagli concreti), ambiente, stile (foto, illustrazione, 3D), luce e atmosfera, inquadratura e formato. Esempio: “Fotografia prodotto di un casco integrale nero opaco su cemento grezzo, luce laterale morbida, sfondo grigio sfumato, inquadratura a tre quarti, formato quadrato.”',
    followUps: ['Che proporzioni uso per i social?', 'Come modifico un’immagine esistente?'],
    lessonId: 'ai-images.m1.l2',
  },
  {
    id: 'aspect-ratio',
    keywords: ['proporzion', 'formato immagine', 'aspect ratio', '--ar', '16:9', '9:16', '4:5'],
    answer:
      'Scegli le proporzioni in base al canale: 1:1 per post quadrati, 4:5 per il feed verticale, 9:16 per storie e reel, 16:9 per banner e video orizzontali. In Midjourney si indicano con il parametro --ar (es. --ar 4:5); negli assistenti conversazionali basta scriverlo nella richiesta.',
    followUps: ['Come scrivo un prompt per le immagini?'],
    lessonId: 'ai-images.m2.l1',
  },
  {
    id: 'image-editing',
    keywords: ['modificare un immagine', 'modifico', 'editing', 'cambiare sfondo', 'sfondo'],
    answer:
      'Con l’editing conversazionale (ad esempio Nano Banana in Gemini o le immagini in ChatGPT) descrivi la modifica a parole: “sostituisci lo sfondo con una strada di montagna al tramonto”. Chiedi una modifica alla volta e indica cosa NON deve cambiare: “mantieni identici forma, colori e logo del prodotto”.',
    followUps: ['Posso usare le immagini AI per l’e-commerce?'],
    lessonId: 'ai-images.m2.l2',
  },
  {
    id: 'image-rights',
    keywords: [
      'diritti',
      'copyright',
      'etica',
      'legale',
      'uso commerciale',
      'usare le immagini',
      'immagini ai',
      'marketplace',
    ],
    answer:
      'Regole pratiche: non imitare marchi, loghi o personaggi protetti; non creare immagini realistiche di persone reali senza consenso; mantieni il prodotto fedele alla realtà; leggi le condizioni d’uso commerciale dello strumento e le regole del marketplace; dichiara quando un’immagine realistica è generata con AI. Le norme sono in evoluzione: per casi specifici chiedi a un legale.',
    followUps: ['Come modifico un’immagine esistente?'],
    lessonId: 'ai-images.m3.l2',
  },
  {
    id: 'automation',
    keywords: [
      'automazion',
      'trigger',
      'azione',
      'make',
      'zapier',
      'flusso',
      'workflow',
      'automatizzare',
    ],
    answer:
      'Un’automazione segue la regola “quando succede X, fai Y”: un trigger (nuovo ordine, nuova email, un orario) avvia una o più azioni (crea una riga, invia un messaggio), passando i dati da un passaggio all’altro. Strumenti come Make, n8n e Zapier permettono di costruirle visivamente. Prima di iniziare, descrivi il processo attuale e parti da un’attività frequente e con regole chiare.',
    followUps: ['Come inserisco l’AI in un’automazione?', 'Cos’è un agente AI?'],
    lessonId: 'automation-agents.m1.l1',
  },
  {
    id: 'ai-in-flows',
    keywords: [
      'ai nei flussi',
      'ai in un automazione',
      'json',
      'output strutturato',
      'classificare',
      'estrarre dati',
    ],
    answer:
      'Dentro un flusso l’AI è utile soprattutto con testo libero: classificare richieste, estrarre dati, riassumere, preparare bozze. Chiedi un output strutturato (ad esempio JSON con campi e valori ammessi), indica cosa fare se un dato manca (null) e aggiungi un controllo: se il risultato non è valido, il caso va a una persona.',
    followUps: ['Cos’è un agente AI?'],
    lessonId: 'automation-agents.m2.l2',
  },
  {
    id: 'agent',
    keywords: ['agente', 'agenti', 'agent', 'autonom'],
    answer:
      'Un agente AI riceve un obiettivo e decide da solo i passaggi per raggiungerlo, usando gli strumenti a cui ha accesso (ricerca, email, file, database). Lavora in un ciclo: osserva, decide, agisce, valuta il risultato. Più autonomia ha, più servono limiti: permessi minimi, approvazione umana per le azioni irreversibili, registro delle azioni e limiti di spesa.',
    followUps: ['Cos’è una prompt injection?', 'Cos’è un’automazione?'],
    lessonId: 'automation-agents.m3.l1',
  },
  {
    id: 'prompt-injection',
    keywords: [
      'prompt injection',
      'injection',
      'minimo privilegio',
      'sicurezza agent',
      'manipolare',
    ],
    answer:
      'Una prompt injection è un testo nascosto in un contenuto esterno (pagina web, email, documento) che cerca di far eseguire all’AI istruzioni diverse da quelle dell’utente. Difese pratiche: trattare i contenuti esterni come dati e non come ordini, dare all’agente solo i permessi necessari (minimo privilegio) e chiedere conferma umana per le azioni critiche.',
    followUps: ['Cos’è un agente AI?'],
    lessonId: 'automation-agents.m3.l2',
  },
];

/** Parole da ignorare quando si cercano argomenti nelle lezioni. */
export const stopWords = new Set(
  'a ad al alla alle allo ai agli anche come con cosa cos da dal dalla dei del della delle di dove e ed fa fare gli ha ho i il in io la le lo ma mi mio ne nel nella non o per perche piu poi puo quale quali quando questo questa se si sia sono su sul sulla ti tra tu tua tuo un una uno vuol vuoi faccio posso devo essere cosa che chi mi spieghi spiega spiegami'.split(
    ' ',
  ),
);
