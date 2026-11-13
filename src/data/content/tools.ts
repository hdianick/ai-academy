/**
 * Catalogo dimostrativo degli strumenti AI.
 * Funzioni, piani e prezzi cambiano spesso: le schede descrivono gli usi principali
 * e rimandano al sito ufficiale. Aggiornare `lastReviewed` a ogni revisione.
 * I nomi appartengono ai rispettivi proprietari; nessun logo ufficiale viene usato.
 */
import type { AiTool } from '@/features/tools/types';

const REVIEWED = '2026-11';

export const demoTools: AiTool[] = [
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    company: 'OpenAI',
    categories: ['chatbots', 'agents', 'productivity'],
    icon: 'chatbubbles-outline',
    tagline: 'L’assistente conversazionale più diffuso',
    description:
      'Assistente AI generalista per scrivere, analizzare, riassumere, programmare e ragionare. Supporta file, immagini, voce, ricerca web e assistenti personalizzati.',
    features: [
      'Conversazione con memoria del contesto',
      'Analisi di file, PDF e fogli di calcolo',
      'Generazione e modifica di immagini',
      'Ricerca web con fonti',
      'Assistenti personalizzati (GPT) e progetti',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Rispondere ai clienti',
        example:
          'Scrivi una risposta cortese a questa recensione negativa, riconosci il problema e proponi una soluzione: …',
      },
      {
        title: 'Analizzare le vendite',
        example:
          'Ti carico il file vendite. Trova i 5 prodotti in calo rispetto al mese scorso e spiega perché potrebbe succedere.',
      },
    ],
    relatedCourseIds: ['chatgpt-pro', 'prompt-engineering', 'intro-ai'],
    website: 'https://chatgpt.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'claude',
    name: 'Claude',
    company: 'Anthropic',
    categories: ['chatbots', 'productivity', 'coding'],
    icon: 'sparkles-outline',
    tagline: 'Scrittura curata, documenti lunghi e ragionamento',
    description:
      'Assistente AI noto per la qualità della scrittura, la gestione di documenti lunghi e il ragionamento. Utile per analisi, redazione di testi, codice e lavoro su progetti con file di riferimento.',
    features: [
      'Analisi di documenti lunghi e più file insieme',
      'Progetti con istruzioni e file condivisi',
      'Creazione di documenti, pagine e piccoli strumenti',
      'Ricerca web e collegamento ad altre app',
      'Ottimo supporto alla programmazione',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Rivedere un contratto',
        example:
          'Leggi il contratto allegato ed elenca clausole di recesso, penali e scadenze, citando l’articolo di ciascuna.',
      },
      {
        title: 'Scrivere una procedura',
        example:
          'Trasforma questi appunti disordinati in una procedura operativa chiara, con passaggi numerati e responsabili.',
      },
    ],
    relatedCourseIds: ['chatgpt-pro', 'prompt-engineering', 'intro-ai'],
    website: 'https://claude.ai',
    lastReviewed: REVIEWED,
  },
  {
    id: 'gemini',
    name: 'Gemini',
    company: 'Google',
    categories: ['chatbots', 'productivity', 'research'],
    icon: 'planet-outline',
    tagline: 'L’assistente integrato nell’ecosistema Google',
    description:
      'Assistente AI di Google, integrato con servizi come Gmail, Documenti e Drive. Lavora con testo, immagini, audio e video.',
    features: [
      'Integrazione con app Google (Gmail, Documenti, Drive)',
      'Analisi di immagini, documenti e video',
      'Ricerca approfondita su più fonti',
      'Generazione e modifica di immagini',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Riepilogo email',
        example:
          'Riassumi le email non lette di questa settimana sul tema ordini e dimmi quali richiedono una risposta.',
      },
      {
        title: 'Ricerca di mercato',
        example:
          'Prepara un’analisi dei principali concorrenti nella vendita online di caschi moto in Europa, con fonti.',
      },
    ],
    relatedCourseIds: ['chatgpt-pro', 'intro-ai'],
    website: 'https://gemini.google.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    company: 'Microsoft',
    categories: ['productivity', 'chatbots'],
    icon: 'briefcase-outline',
    tagline: 'L’AI dentro Word, Excel, Outlook e Teams',
    description:
      'Assistente AI di Microsoft, disponibile come app e integrato nelle applicazioni Microsoft 365 per documenti, fogli di calcolo, email e riunioni.',
    features: [
      'Bozze e riscritture in Word',
      'Analisi e formule in Excel',
      'Riassunti di email e riunioni',
      'Presentazioni da documenti esistenti',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Verbale di riunione',
        example:
          'Riassumi la riunione di oggi: decisioni prese, azioni da fare, responsabili e scadenze.',
      },
      {
        title: 'Analisi in Excel',
        example:
          'Crea una tabella pivot delle vendite per categoria e mese ed evidenzia i cali superiori al 10%.',
      },
    ],
    relatedCourseIds: ['chatgpt-pro'],
    website: 'https://copilot.microsoft.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    company: 'Perplexity AI',
    categories: ['research'],
    icon: 'search-outline',
    tagline: 'Risposte dal web con le fonti citate',
    description:
      'Motore di risposta basato su AI: cerca sul web e risponde citando le fonti, così puoi verificare ogni informazione.',
    features: [
      'Risposte con fonti numerate',
      'Ricerca approfondita su più pagine',
      'Domande di approfondimento suggerite',
      'Raccolte di ricerche per argomento',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Verificare una notizia',
        example:
          'Quali sono le regole attuali sull’etichettatura dei contenuti generati con AI nell’Unione Europea? Cita fonti ufficiali.',
      },
      {
        title: 'Studiare un fornitore',
        example:
          'Cosa si sa pubblicamente di questo fornitore: anni di attività, sede, recensioni? Indica le fonti.',
      },
    ],
    relatedCourseIds: ['intro-ai'],
    website: 'https://www.perplexity.ai',
    lastReviewed: REVIEWED,
  },
  {
    id: 'notebooklm',
    name: 'NotebookLM',
    company: 'Google',
    categories: ['research', 'productivity'],
    icon: 'journal-outline',
    tagline: 'Un assistente che risponde solo dalle tue fonti',
    description:
      'Carichi documenti, PDF, link e appunti e l’AI risponde basandosi su quelle fonti, con riferimenti. Può creare riassunti, guide di studio e panoramiche audio.',
    features: [
      'Risposte ancorate ai documenti caricati',
      'Citazioni ai passaggi delle fonti',
      'Guide di studio, FAQ e mappe concettuali',
      'Panoramiche audio in stile podcast',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Studiare un manuale',
        example:
          'Carica il manuale del gestionale e chiedi: “Come si registra un reso? Indica il capitolo.”',
      },
      {
        title: 'Formazione del team',
        example: 'Carica le procedure aziendali e genera una FAQ per i nuovi assunti.',
      },
    ],
    relatedCourseIds: ['intro-ai'],
    website: 'https://notebooklm.google.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    company: 'Midjourney',
    categories: ['images'],
    icon: 'color-palette-outline',
    tagline: 'Immagini di grande qualità estetica',
    description:
      'Generatore di immagini molto apprezzato per stile e qualità artistica. Offre parametri per proporzioni, stile e varianti.',
    features: [
      'Immagini da descrizioni testuali',
      'Parametri come --ar per le proporzioni',
      'Varianti e upscaling',
      'Riferimenti di stile e di soggetto',
    ],
    difficulty: 'intermediate',
    useCases: [
      {
        title: 'Banner stagionale',
        example:
          'Strada di montagna in autunno al tramonto, moto in lontananza, atmosfera calda, stile fotografico cinematografico --ar 16:9',
      },
      {
        title: 'Mood board',
        example:
          'Interni di negozio di accessori moto, stile industriale, luce calda, legno e metallo --ar 4:5',
      },
    ],
    relatedCourseIds: ['ai-images'],
    website: 'https://www.midjourney.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'nano-banana',
    name: 'Nano Banana',
    company: 'Google',
    categories: ['images'],
    icon: 'image-outline',
    tagline: 'Modifica le immagini descrivendo i cambiamenti',
    description:
      'Modello di generazione e modifica di immagini di Google, disponibile in Gemini. Eccelle nell’editing conversazionale mantenendo coerente il soggetto.',
    features: [
      'Modifiche con istruzioni in linguaggio naturale',
      'Coerenza del soggetto tra più immagini',
      'Combinazione di più immagini',
      'Cambi di sfondo, luce e stile',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Ambientare un prodotto',
        example:
          'Metti questo casco su una moto parcheggiata in una piazza italiana al tramonto. Mantieni identici colori e grafiche.',
      },
      {
        title: 'Varianti social',
        example:
          'Crea tre versioni di questa foto con sfondi diversi: urbano, montagna, studio grigio.',
      },
    ],
    relatedCourseIds: ['ai-images'],
    website: 'https://gemini.google.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'runway',
    name: 'Runway',
    company: 'Runway',
    categories: ['video'],
    icon: 'film-outline',
    tagline: 'Generazione e montaggio video con AI',
    description:
      'Piattaforma creativa per generare video da testo o immagini e modificarli con strumenti AI, pensata per creator e team video.',
    features: [
      'Video da testo e da immagine',
      'Animazione di foto statiche',
      'Strumenti di editing con AI',
      'Controllo dei movimenti di camera',
    ],
    difficulty: 'intermediate',
    useCases: [
      {
        title: 'Animare una foto prodotto',
        example:
          'Anima questa foto: lenta rotazione della camera attorno al casco, luce che scorre sulla visiera.',
      },
      {
        title: 'Clip per reel',
        example:
          'Video verticale di 5 secondi: motociclista su strada costiera all’alba, ripresa da drone.',
      },
    ],
    relatedCourseIds: ['ai-images'],
    website: 'https://runwayml.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'sora',
    name: 'Sora',
    company: 'OpenAI',
    categories: ['video'],
    icon: 'videocam-outline',
    tagline: 'Video realistici da una descrizione',
    description:
      'Modello di OpenAI per generare video a partire da testo e immagini, con scene realistiche e movimenti di camera.',
    features: [
      'Video da testo e immagini',
      'Scene con più inquadrature',
      'Stili realistici o illustrati',
      'Remix di video generati',
    ],
    difficulty: 'intermediate',
    useCases: [
      {
        title: 'Spot di prova',
        example:
          'Una motociclista indossa il casco, abbassa la visiera e parte su una strada di campagna al tramonto. Stile spot pubblicitario.',
      },
      {
        title: 'Storyboard animato',
        example:
          'Tre scene brevi che mostrano: scelta del casco, prova della taglia, primo viaggio.',
      },
    ],
    relatedCourseIds: ['ai-images'],
    website: 'https://openai.com/sora',
    lastReviewed: REVIEWED,
  },
  {
    id: 'veo',
    name: 'Veo',
    company: 'Google DeepMind',
    categories: ['video'],
    icon: 'aperture-outline',
    tagline: 'Video di alta qualità anche con audio',
    description:
      'Modello di generazione video di Google, accessibile tramite i servizi Google. Le versioni recenti generano anche l’audio della scena.',
    features: [
      'Video da testo e immagini',
      'Audio e dialoghi generati',
      'Controllo dello stile cinematografico',
      'Integrazione con strumenti Google',
    ],
    difficulty: 'intermediate',
    useCases: [
      {
        title: 'Video con audio ambiente',
        example:
          'Officina di moto, un meccanico controlla una gomma, rumori di attrezzi, luce calda dalla finestra.',
      },
      {
        title: 'Intro per YouTube',
        example:
          'Logo animato che appare su asfalto bagnato, riflessi di luci al neon, suono di motore in lontananza.',
      },
    ],
    relatedCourseIds: ['ai-images'],
    website: 'https://deepmind.google/models/veo',
    lastReviewed: REVIEWED,
  },
  {
    id: 'elevenlabs',
    name: 'ElevenLabs',
    company: 'ElevenLabs',
    categories: ['audio'],
    icon: 'mic-outline',
    tagline: 'Voci realistiche e doppiaggio',
    description:
      'Piattaforma di sintesi vocale: trasforma testi in voci naturali in molte lingue, con doppiaggio ed effetti sonori.',
    features: [
      'Sintesi vocale multilingue',
      'Doppiaggio di video in altre lingue',
      'Libreria di voci',
      'Effetti sonori da descrizione',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Voce per un tutorial',
        example:
          'Leggi questo testo con voce maschile calma e professionale, ritmo lento, per un video tutorial.',
      },
      {
        title: 'Video in più lingue',
        example: 'Doppia il video di presentazione del negozio in inglese, tedesco e francese.',
      },
    ],
    relatedCourseIds: ['intro-ai'],
    website: 'https://elevenlabs.io',
    lastReviewed: REVIEWED,
  },
  {
    id: 'suno',
    name: 'Suno',
    company: 'Suno',
    categories: ['audio'],
    icon: 'musical-notes-outline',
    tagline: 'Canzoni complete da una descrizione',
    description:
      'Genera brani musicali completi, con voce e strumenti, partendo da una descrizione di genere e atmosfera o da testi scritti da te.',
    features: [
      'Brani con voce e strumenti',
      'Scelta di genere e atmosfera',
      'Testi propri o generati',
      'Versioni strumentali',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Jingle',
        example:
          'Jingle rock energico di 20 secondi per un negozio di accessori moto, chitarre elettriche, senza voce.',
      },
      {
        title: 'Sottofondo per video',
        example:
          'Musica strumentale chill per un video di viaggio in moto, ritmo medio, atmosfera positiva.',
      },
    ],
    relatedCourseIds: ['intro-ai'],
    website: 'https://suno.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'cursor',
    name: 'Cursor',
    company: 'Anysphere',
    categories: ['coding', 'agents'],
    icon: 'code-slash-outline',
    tagline: 'Editor di codice con AI integrata',
    description:
      'Editor di codice basato su VS Code con AI integrata: completa il codice, risponde a domande sul progetto e può modificare più file in autonomia.',
    features: [
      'Completamento del codice contestuale',
      'Chat sul codice del progetto',
      'Modifiche su più file con un agente',
      'Scelta tra diversi modelli AI',
    ],
    difficulty: 'advanced',
    useCases: [
      {
        title: 'Capire un progetto',
        example: 'Spiegami come è organizzato questo progetto e dove viene gestito il carrello.',
      },
      {
        title: 'Nuova funzione',
        example: 'Aggiungi un filtro per marca nella pagina prodotti e scrivi i test.',
      },
    ],
    relatedCourseIds: ['automation-agents', 'prompt-engineering'],
    website: 'https://cursor.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    company: 'Anthropic',
    categories: ['coding', 'agents'],
    icon: 'terminal-outline',
    tagline: 'Un agente che programma insieme a te',
    description:
      'Strumento di programmazione agentica di Anthropic: legge il progetto, modifica i file, esegue comandi e test, e può aprire richieste di modifica su GitHub.',
    features: [
      'Lavora su interi progetti, non solo su un file',
      'Esegue comandi, test e build',
      'Integrazione con Git e GitHub',
      'Disponibile da terminale, desktop e web',
    ],
    difficulty: 'advanced',
    useCases: [
      {
        title: 'Correggere un bug',
        example:
          'Il totale del carrello è sbagliato quando applico un coupon. Trova la causa, correggi e aggiungi un test.',
      },
      {
        title: 'Prototipo rapido',
        example:
          'Crea una piccola web app per gestire le richieste di reso, con elenco, dettaglio e stato.',
      },
    ],
    relatedCourseIds: ['automation-agents', 'prompt-engineering'],
    website: 'https://claude.com/product/claude-code',
    lastReviewed: REVIEWED,
  },
  {
    id: 'lovable',
    name: 'Lovable',
    company: 'Lovable',
    categories: ['coding'],
    icon: 'heart-outline',
    tagline: 'Crea web app descrivendole a parole',
    description:
      'Piattaforma per creare applicazioni web descrivendo cosa vuoi in linguaggio naturale, con anteprima immediata e pubblicazione.',
    features: [
      'App web da descrizione testuale',
      'Anteprima e modifiche in tempo reale',
      'Collegamento a database e autenticazione',
      'Pubblicazione con un clic',
    ],
    difficulty: 'intermediate',
    useCases: [
      {
        title: 'Landing page',
        example:
          'Crea una landing page per un nuovo casco: hero con immagine, 3 punti di forza, recensioni e modulo contatti.',
      },
      {
        title: 'Strumento interno',
        example: 'Crea un’app per registrare i resi: cliente, prodotto, motivo, stato, con filtri.',
      },
    ],
    relatedCourseIds: ['prompt-engineering'],
    website: 'https://lovable.dev',
    lastReviewed: REVIEWED,
  },
  {
    id: 'make',
    name: 'Make',
    company: 'Make',
    categories: ['automation'],
    icon: 'git-merge-outline',
    tagline: 'Automazioni visuali tra centinaia di app',
    description:
      'Piattaforma no-code per costruire automazioni visuali: colleghi app diverse con scenari fatti di trigger, azioni, filtri e passaggi AI.',
    features: [
      'Editor visuale a blocchi',
      'Migliaia di integrazioni con app',
      'Filtri, router e gestione errori',
      'Moduli AI integrati',
    ],
    difficulty: 'intermediate',
    useCases: [
      {
        title: 'Ordini nel foglio di calcolo',
        example:
          'Quando arriva un ordine dal negozio online, aggiungi una riga al foglio e avvisa il magazzino.',
      },
      {
        title: 'Smistare le email',
        example: 'Classifica con AI le email del servizio clienti e crea un ticket per i resi.',
      },
    ],
    relatedCourseIds: ['automation-agents'],
    website: 'https://www.make.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'n8n',
    name: 'n8n',
    company: 'n8n',
    categories: ['automation', 'agents'],
    icon: 'git-network-outline',
    tagline: 'Automazioni e agenti AI, anche sul tuo server',
    description:
      'Piattaforma di automazione dei flussi di lavoro, utilizzabile in cloud o installabile sui propri server. Offre nodi per costruire agenti AI collegati a strumenti e dati.',
    features: [
      'Editor visuale con possibilità di codice',
      'Installabile sui propri server',
      'Nodi per agenti AI e memoria',
      'Molte integrazioni e webhook',
    ],
    difficulty: 'advanced',
    useCases: [
      {
        title: 'Agente di supporto',
        example:
          'Un agente che legge le richieste dei clienti, consulta lo stato dell’ordine e prepara una bozza di risposta.',
      },
      {
        title: 'Report automatico',
        example:
          'Ogni lunedì raccogli le vendite della settimana, fai riassumere all’AI i trend e invia il report via email.',
      },
    ],
    relatedCourseIds: ['automation-agents'],
    website: 'https://n8n.io',
    lastReviewed: REVIEWED,
  },
  {
    id: 'zapier',
    name: 'Zapier',
    company: 'Zapier',
    categories: ['automation', 'agents'],
    icon: 'flash-outline',
    tagline: 'Il modo più semplice per collegare le app',
    description:
      'Piattaforma di automazione molto intuitiva: colleghi le app con flussi “quando succede X, fai Y” e puoi aggiungere passaggi AI.',
    features: [
      'Configurazione guidata semplice',
      'Moltissime app supportate',
      'Passaggi AI nei flussi',
      'Tabelle e moduli integrati',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Nuovi contatti',
        example:
          'Quando qualcuno compila il modulo del sito, aggiungilo al CRM e invia un’email di benvenuto.',
      },
      {
        title: 'Recensioni',
        example:
          'Quando arriva una nuova recensione, falla classificare all’AI e avvisa il team se è negativa.',
      },
    ],
    relatedCourseIds: ['automation-agents'],
    website: 'https://zapier.com',
    lastReviewed: REVIEWED,
  },
  {
    id: 'notion-ai',
    name: 'Notion AI',
    company: 'Notion',
    categories: ['productivity'],
    icon: 'document-text-outline',
    tagline: 'L’AI dentro i tuoi appunti e documenti',
    description:
      'Funzioni AI integrate in Notion per scrivere, riassumere e cercare informazioni tra pagine e database del tuo spazio di lavoro.',
    features: [
      'Scrittura e riscrittura nelle pagine',
      'Riassunti di pagine e riunioni',
      'Domande sul contenuto del workspace',
      'Compilazione automatica dei database',
    ],
    difficulty: 'beginner',
    useCases: [
      {
        title: 'Wiki aziendale',
        example:
          'Dove abbiamo scritto la procedura per i resi internazionali? Riassumila in 5 punti.',
      },
      {
        title: 'Piano editoriale',
        example:
          'Genera 12 idee di articoli per il blog sulla sicurezza in moto e inseriscile nel database.',
      },
    ],
    relatedCourseIds: ['chatgpt-pro'],
    website: 'https://www.notion.com',
    lastReviewed: REVIEWED,
  },
];
