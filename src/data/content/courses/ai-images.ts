import {
  choice,
  defineCourse,
  fillBlank,
  order,
  promptFix,
  theory,
  trueFalse,
} from '@/features/courses/builder';

export const aiImages = defineCourse({
  id: 'ai-images',
  title: 'Creazione di immagini con AI',
  subtitle: 'Prompt visivi, editing e immagini per il business',
  description:
    'Impara a creare e modificare immagini con l’intelligenza artificiale: come funzionano i generatori, come scrivere prompt visivi efficaci, come controllare formato, stile e coerenza, come modificare foto esistenti a parole e come usare le immagini per e-commerce e social in modo corretto e trasparente.',
  category: 'images',
  level: 'intermediate',
  tools: ['Midjourney', 'Nano Banana', 'ChatGPT'],
  outcomes: [
    'Scrivere prompt visivi con soggetto, ambiente, stile, luce e inquadratura',
    'Controllare proporzioni, varianti e coerenza di una serie',
    'Modificare immagini esistenti con istruzioni in linguaggio naturale',
    'Usare le immagini AI rispettando diritti, regole dei marketplace e trasparenza',
  ],
  requiredTier: 'free',
  icon: 'image-outline',
  modules: [
    {
      title: 'Fondamenti',
      description: 'Come nasce un’immagine generata e come descriverla.',
      lessons: [
        {
          title: 'Come funzionano i generatori di immagini',
          summary: 'Dal rumore all’immagine: l’idea dei modelli di diffusione.',
          estimatedMinutes: 8,
          theory: [
            theory('Imparare da milioni di immagini', [
              'I generatori di immagini sono addestrati su enormi raccolte di immagini associate a descrizioni testuali. In questo modo il modello impara il legame tra parole e caratteristiche visive: cosa “significa” tramonto, acquerello, primo piano, luce al neon.',
              'Non conserva le immagini originali come in un archivio: impara schemi statistici che gli permettono di crearne di nuove.',
            ]),
            theory(
              'Dal rumore all’immagine',
              [
                'Molti generatori si basano su modelli di diffusione. Durante l’addestramento imparano a “ripulire” immagini a cui è stato aggiunto rumore, un passo alla volta.',
                'Per creare un’immagine nuova fanno il percorso inverso: partono da rumore casuale e lo trasformano progressivamente in un’immagine coerente, guidati dal testo che hai scritto.',
              ],
              {
                tip: 'Il punto di partenza casuale è il motivo per cui lo stesso prompt produce immagini diverse a ogni generazione.',
              },
            ),
            theory('Generatori dentro gli assistenti', [
              'Oltre ai generatori dedicati come Midjourney, oggi molti assistenti conversazionali generano e modificano immagini direttamente in chat (ad esempio Nano Banana dentro Gemini o le immagini di ChatGPT).',
              'Questi modelli capiscono meglio istruzioni in linguaggio naturale e richieste di modifica (“ora cambia lo sfondo”), perché mantengono il contesto della conversazione.',
            ]),
            theory(
              'Punti di forza e punti deboli',
              [
                'Sono molto bravi con atmosfere, stili, ambientazioni, illuminazione e composizioni. Faticano ancora con alcuni dettagli: testi lunghi dentro l’immagine, mani e dita, loghi e marchi precisi, conteggi esatti di oggetti, coerenza perfetta di un prodotto reale tra più immagini.',
                'I modelli migliorano rapidamente, ma controllare sempre il risultato finale resta indispensabile, soprattutto per uso commerciale.',
              ],
              {
                example:
                  'Rischioso: “Poster con il testo ‘Saldi invernali fino al 40% su tutti i caschi integrali’”.\nMeglio: genera l’immagine senza testo e aggiungi la scritta con un programma di grafica.',
              },
            ),
            theory('Il flusso di lavoro tipico', [
              'Si genera un gruppo di varianti, si sceglie la più promettente, la si raffina (variazioni, modifiche mirate, ingrandimento) e infine la si rifinisce con un editor tradizionale se servono testi o loghi.',
              'Generare molte varianti non è uno spreco: è il modo normale di lavorare, come scattare più foto per sceglierne una.',
            ]),
          ],
          questions: [
            trueFalse(
              'Lo stesso prompt produce sempre esattamente la stessa immagine.',
              false,
              'Il punto di partenza casuale genera variazioni a ogni tentativo.',
            ),
            choice(
              'Quale di questi dettagli è spesso più difficile per un generatore?',
              [
                'Un cielo al tramonto',
                'Un testo lungo scritto dentro l’immagine',
                'Un paesaggio di montagna',
                'Un colore di sfondo',
              ],
              1,
              'Le scritte lunghe e precise sono ancora un punto debole.',
            ),
            choice(
              'Da cosa parte un modello di diffusione per creare un’immagine?',
              [
                'Da una foto esistente sempre',
                'Da rumore casuale che viene ripulito passo dopo passo',
                'Da un disegno a mano',
                'Da un video',
              ],
              1,
              'Il testo guida la trasformazione del rumore in immagine.',
            ),
            fillBlank(
              'Molti generatori di immagini si basano su modelli di ___.',
              ['diffusione', 'contabilità', 'compressione', 'navigazione'],
              0,
              'I modelli di diffusione trasformano il rumore in immagini guidati dal testo.',
            ),
            choice(
              'Devi creare un poster con una scritta promozionale lunga. Qual è l’approccio migliore?',
              [
                'Chiedere al generatore di scrivere tutto il testo',
                'Generare l’immagine senza testo e aggiungerlo con un programma di grafica',
                'Rinunciare al poster',
                'Usare solo testo senza immagine',
              ],
              1,
              'Così eviti errori di scrittura nell’immagine.',
            ),
            trueFalse(
              'Generare molte varianti è uno spreco: conviene sempre accettare la prima immagine.',
              false,
              'Le varianti sono il modo normale di lavorare, come scattare più foto.',
            ),
            choice(
              'Perché i generatori integrati negli assistenti sono comodi per le modifiche?',
              [
                'Perché sono gratis',
                'Perché mantengono il contesto della conversazione',
                'Perché funzionano offline',
                'Perché non usano il testo',
              ],
              1,
              'Puoi chiedere modifiche successive (“ora cambia lo sfondo”) nella stessa chat.',
            ),
            choice(
              'Un generatore conserva le immagini di addestramento come in un archivio?',
              [
                'Sì, le copia sempre',
                'No, impara schemi statistici per crearne di nuove',
                'Solo quelle a colori',
                'Solo di notte',
              ],
              1,
              'Il modello apprende relazioni tra testo e caratteristiche visive.',
            ),
          ],
        },
        {
          title: 'La struttura di un prompt visivo',
          summary: 'Soggetto, ambiente, stile, luce, composizione e formato.',
          estimatedMinutes: 9,
          theory: [
            theory('Pensa come un fotografo', [
              'Un prompt visivo efficace descrive l’immagine come la descriveresti a un fotografo o a un illustratore: cosa c’è, dove, con che luce, da quale angolazione, in che stile. Frasi concrete e visive funzionano meglio di concetti astratti come “bello” o “accattivante”.',
            ]),
            theory(
              'Gli ingredienti',
              [
                'Soggetto: cosa c’è nell’immagine, con dettagli concreti (materiali, colori, azioni). Ambiente: dove si trova, cosa c’è sullo sfondo. Stile: fotografia, illustrazione, 3D, acquerello, cinematografico.',
                'Luce e atmosfera: luce naturale del mattino, tramonto, studio fotografico, neon, nebbia. Composizione e inquadratura: primo piano, vista dall’alto, a tre quarti, sfondo sfocato. Formato: quadrato, verticale, orizzontale.',
              ],
              {
                example:
                  'Fotografia prodotto di un casco moto integrale nero opaco, appoggiato su una superficie di cemento grezzo, luce laterale morbida da studio, sfondo grigio scuro sfumato, inquadratura a tre quarti, alta nitidezza, formato quadrato.',
              },
            ),
            theory('Lessico fotografico utile', [
              'Termini come “primo piano”, “campo largo”, “macro”, “profondità di campo ridotta” (sfondo sfocato), “luce controluce”, “golden hour” (luce dorata del tramonto), “grandangolo” aiutano molto, perché i modelli li hanno visti associati a immagini con caratteristiche precise.',
              'Per le illustrazioni funzionano descrizioni di tecnica e stile: “illustrazione piatta vettoriale”, “acquerello con colori tenui”, “stile fumetto con contorni netti”.',
            ]),
            theory(
              'Cosa evitare',
              [
                'Prompt troppo vaghi (“un caffè”), elenchi infiniti di aggettivi contraddittori, richieste di imitare marchi o personaggi protetti, nomi di artisti viventi per copiarne lo stile.',
                'Alcuni strumenti permettono di indicare cosa NON includere (prompt negativo): utile per escludere elementi indesiderati come testo, persone o oggetti specifici.',
              ],
              {
                tip: 'Parti da un prompt chiaro di 2-3 frasi; aggiungi dettagli solo dove il risultato non ti convince.',
              },
            ),
            theory('Iterare sul prompt visivo', [
              'Come per il testo, lavora per passaggi: genera, osserva cosa non va (luce troppo dura? soggetto troppo piccolo?), modifica solo quell’aspetto del prompt e rigenera. Annota i prompt che funzionano: diventeranno i tuoi template visivi.',
            ]),
          ],
          questions: [
            order(
              'Ordina gli elementi come in un prompt visivo ben costruito.',
              ['Soggetto', 'Ambiente', 'Stile', 'Luce e atmosfera', 'Inquadratura e formato'],
              'Dal “cosa” al “come”: prima il soggetto, poi contesto, stile, luce e infine la ripresa.',
            ),
            promptFix({
              instruction:
                'Rendi questo prompt visivo più preciso aggiungendo stile, luce, inquadratura e dettagli.',
              weakPrompt: 'Un caffè.',
              checks: [
                {
                  label: 'Stile (foto, illustrazione…)',
                  keywords: [
                    'foto',
                    'fotografia',
                    'illustrazione',
                    'acquerello',
                    '3d',
                    'render',
                    'stile',
                  ],
                },
                {
                  label: 'Luce o atmosfera',
                  keywords: [
                    'luce',
                    'illuminazione',
                    'tramonto',
                    'mattino',
                    'atmosfera',
                    'ombre',
                    'neon',
                  ],
                },
                {
                  label: 'Inquadratura o formato',
                  keywords: [
                    'primo piano',
                    'dall alto',
                    'inquadratura',
                    'formato',
                    'verticale',
                    'quadrato',
                    'sfondo sfocato',
                    'macro',
                  ],
                },
                {
                  label: 'Ambiente o dettagli',
                  keywords: [
                    'tavolo',
                    'bar',
                    'cucina',
                    'tazza',
                    'legno',
                    'marmo',
                    'schiuma',
                    'chicchi',
                  ],
                },
              ],
              sampleAnswer:
                'Fotografia di una tazza di espresso con crema dorata su un tavolo di marmo bianco in un bar italiano, luce naturale del mattino da una finestra, chicchi di caffè sparsi, primo piano con sfondo sfocato, formato verticale.',
            }),
            trueFalse(
              'In un prompt visivo conviene descrivere luce e inquadratura.',
              true,
              'Sono tra gli elementi che cambiano di più il risultato.',
            ),
            choice(
              'Quale prompt è più efficace?',
              [
                '“Una bella scarpa”',
                '“Foto prodotto di una sneaker bianca su sfondo pastello, luce da studio, vista laterale”',
                '“Scarpa, figo”',
                '“Fai tu”',
              ],
              1,
              'Specifica soggetto, stile, luce e inquadratura.',
            ),
            fillBlank(
              'L’espressione “golden hour” indica la luce ___ del tramonto o dell’alba.',
              ['dorata', 'blu', 'al neon', 'artificiale'],
              0,
              'È una luce calda e morbida molto usata in fotografia.',
            ),
            choice(
              'A cosa serve un prompt negativo?',
              [
                'A rendere l’immagine in bianco e nero',
                'A indicare cosa NON includere nell’immagine',
                'A cancellare l’immagine',
                'A cambiare formato',
              ],
              1,
              'Utile per escludere testo, persone o oggetti indesiderati.',
            ),
            choice(
              'Quale termine ottiene uno sfondo sfocato?',
              [
                'Profondità di campo ridotta',
                'Grandangolo estremo',
                'Bianco e nero',
                'Formato quadrato',
              ],
              0,
              'Una profondità di campo ridotta mette a fuoco il soggetto e sfoca lo sfondo.',
            ),
            trueFalse(
              'Usare il nome di un artista vivente per copiarne lo stile è una buona pratica.',
              false,
              'Meglio descrivere tecnica e caratteristiche visive senza imitare artisti viventi.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Quale prompt descrive meglio un’immagine?',
          [
            '“Una moto bella”',
            '“Moto naked rossa su strada costiera al tramonto, foto cinematografica, inquadratura laterale, formato 16:9”',
            '“Moto”',
            '“Fai una moto”',
          ],
          1,
          'Soggetto, ambiente, stile, luce e formato.',
        ),
      ],
    },
    {
      title: 'Controllo e coerenza',
      description: 'Proporzioni, varianti, riferimenti ed editing.',
      lessons: [
        {
          title: 'Proporzioni, varianti e riferimenti',
          summary: 'Ottieni il formato giusto e uno stile coerente.',
          estimatedMinutes: 8,
          theory: [
            theory('Il formato giusto per ogni canale', [
              'Scegli le proporzioni prima di generare, in base a dove userai l’immagine: 1:1 per post quadrati, 4:5 per il feed verticale dei social, 9:16 per storie e reel, 16:9 per banner, copertine e video orizzontali.',
              'Ritagliare dopo un’immagine nata in un altro formato spesso taglia elementi importanti o lascia spazi vuoti.',
            ]),
            theory(
              'Come indicarle',
              [
                'Ogni strumento ha il suo modo. In Midjourney si usa il parametro --ar seguito dal rapporto (es. --ar 16:9). Negli assistenti conversazionali basta scriverlo nella richiesta: “formato verticale 9:16”.',
              ],
              {
                example:
                  'Moto in movimento su strada costiera all’alba, foto cinematografica, motion blur sullo sfondo --ar 16:9',
              },
            ),
            theory('Varianti e affinamento', [
              'Quando un’immagine è quasi giusta, invece di riscrivere tutto chiedi variazioni di quella immagine: lievi (stessa composizione, dettagli diversi) o forti (più libertà). Poi ingrandisci la versione scelta per ottenere più risoluzione.',
            ]),
            theory(
              'Coerenza tra più immagini',
              [
                'Per una serie coerente (catalogo, campagna, post di una settimana) riusa sempre lo stesso “blocco stile”: tipo di fotografia, luce, palette, sfondo. Cambia solo il soggetto.',
                'Molti strumenti accettano immagini di riferimento per lo stile o per il soggetto: carica la foto del tuo prodotto e chiedi di mantenerne forma e colori, oppure un’immagine il cui stile vuoi replicare.',
              ],
              {
                tip: 'Salva il blocco stile del tuo brand, ad esempio: “fotografia editoriale, luce calda naturale, palette terrosa, sfondo pulito” e incollalo in fondo a ogni prompt.',
              },
            ),
            theory('Risoluzione e uso finale', [
              'Controlla la risoluzione richiesta dal canale (stampa, sito, marketplace) e usa le funzioni di ingrandimento quando servono. Per la stampa servono risoluzioni molto più alte che per i social.',
            ]),
          ],
          questions: [
            choice(
              'Quale proporzione è più adatta a una storia Instagram?',
              ['16:9', '9:16', '1:1', '21:9'],
              1,
              'Storie e reel usano il formato verticale 9:16.',
            ),
            fillBlank(
              'In Midjourney le proporzioni si indicano con il parametro ___.',
              ['--ar', '--size', '--color', '--fast'],
              0,
              '--ar sta per aspect ratio, ad esempio --ar 4:5.',
            ),
            choice(
              'Quale formato useresti per un banner orizzontale di un sito?',
              ['9:16', '16:9', '4:5', '1:1'],
              1,
              '16:9 è il formato orizzontale standard.',
            ),
            trueFalse(
              'Per una serie coerente conviene riusare lo stesso blocco di stile, luce e sfondo.',
              true,
              'Cambiare solo il soggetto mantiene l’identità visiva.',
            ),
            trueFalse(
              'Ritagliare dopo è sempre equivalente a generare direttamente nel formato giusto.',
              false,
              'Il ritaglio può tagliare elementi importanti o lasciare spazi vuoti.',
            ),
            choice(
              'Un’immagine è quasi perfetta. Cosa fai?',
              [
                'Riscrivo tutto il prompt da zero',
                'Chiedo variazioni di quella immagine e poi la ingrandisco',
                'La cancello',
                'La stampo subito',
              ],
              1,
              'Le variazioni permettono di affinare senza perdere ciò che funziona.',
            ),
            choice(
              'A cosa serve caricare un’immagine di riferimento del tuo prodotto?',
              [
                'A rallentare la generazione',
                'A mantenere forma e colori del prodotto',
                'A cambiare lingua',
                'A nulla',
              ],
              1,
              'Il riferimento guida il modello verso il soggetto reale.',
            ),
            choice(
              'Per quale uso servono le risoluzioni più alte?',
              ['Una storia sui social', 'La stampa', 'Un’anteprima in chat', 'Un’icona piccola'],
              1,
              'La stampa richiede molta più risoluzione dei canali digitali.',
            ),
          ],
        },
        {
          title: 'Modificare immagini con le parole',
          summary: 'Editing conversazionale: cambia sfondo, luce e dettagli.',
          estimatedMinutes: 8,
          theory: [
            theory('Editing in linguaggio naturale', [
              'Strumenti come Nano Banana (il modello di immagini di Google integrato in Gemini) e la generazione di immagini in ChatGPT permettono di modificare una foto esistente descrivendo la modifica: “sostituisci lo sfondo con una strada di montagna”, “rendi la luce più calda”, “togli la persona sullo sfondo”.',
              'Il grande vantaggio è che il soggetto originale viene in gran parte preservato: è ideale per ambientare foto di prodotto senza nuovi servizi fotografici.',
            ]),
            theory(
              'Una modifica alla volta',
              [
                'Chiedi una modifica per volta e indica esplicitamente cosa NON deve cambiare: “mantieni identici forma, colori e grafiche del casco”. Più elementi cambi insieme, più è probabile che il modello alteri anche ciò che volevi conservare.',
              ],
              {
                example:
                  'Prendi questa foto del casco. Sostituisci lo sfondo bianco con una strada di montagna al tramonto, luce calda. Mantieni identici forma, colori e grafiche del casco.',
              },
            ),
            theory('Tipi di modifiche', [
              'Sfondo e ambientazione; luce e atmosfera (giorno/notte, stagione); rimozione di oggetti; aggiunta di elementi (una persona che indossa il prodotto); cambio di stile (da foto a illustrazione); combinazione di più immagini in una scena.',
            ]),
            theory(
              'Quando tornare indietro',
              [
                'Se dopo varie correzioni il risultato si è allontanato troppo dall’originale (colori diversi, dettagli persi), non accumulare altre correzioni: torna a una versione precedente buona e riparti con una richiesta più precisa.',
              ],
              {
                tip: 'Salva le versioni intermedie che ti piacciono: sono i tuoi “punti di ripristino”.',
              },
            ),
            theory('Controllo di fedeltà', [
              'Per le immagini di prodotto confronta sempre il risultato con la foto originale: logo, colori, cuciture, etichette. Una modifica che altera il prodotto reale può creare aspettative sbagliate nei clienti e problemi di reso.',
            ]),
          ],
          questions: [
            trueFalse(
              'Nell’editing conversazionale conviene indicare anche cosa non deve cambiare.',
              true,
              'Proteggere esplicitamente gli elementi importanti riduce le modifiche indesiderate.',
            ),
            choice(
              'Il risultato si è allontanato molto dall’originale dopo varie correzioni. Cosa fai?',
              [
                'Continuo ad aggiungere correzioni',
                'Torno a una versione precedente buona e riparto con una modifica più precisa',
                'Abbandono il progetto',
                'Cambio lingua',
              ],
              1,
              'Accumulare correzioni spesso degrada l’immagine.',
            ),
            choice(
              'Cosa permette l’editing conversazionale?',
              [
                'Solo ritagliare',
                'Modificare un’immagine descrivendo il cambiamento a parole',
                'Solo cambiare formato file',
                'Nulla',
              ],
              1,
              'Descrivi la modifica e il modello la applica preservando il resto.',
            ),
            fillBlank(
              'Conviene chiedere una ___ alla volta.',
              ['modifica', 'password', 'fattura', 'traduzione'],
              0,
              'Più elementi cambi insieme, più rischi di alterare ciò che volevi conservare.',
            ),
            choice(
              'Cosa controlli in un’immagine prodotto modificata?',
              [
                'Solo il cielo',
                'Logo, colori, cuciture ed etichette rispetto all’originale',
                'Il nome del file',
                'Niente',
              ],
              1,
              'La fedeltà al prodotto reale evita aspettative sbagliate e resi.',
            ),
            trueFalse(
              'Salvare le versioni intermedie ti permette di tornare indietro facilmente.',
              true,
              'Sono i tuoi punti di ripristino.',
            ),
            choice(
              'Quale richiesta è scritta meglio?',
              [
                '“Cambia tutto e rendila bella”',
                '“Sostituisci lo sfondo con una piazza al tramonto, mantieni identico il casco”',
                '“Migliora”',
                '“Fai qualcosa”',
              ],
              1,
              'Una modifica precisa con ciò che va preservato.',
            ),
            choice(
              'Quale vantaggio offre l’editing per un e-commerce?',
              [
                'Ambientare le foto prodotto senza nuovi servizi fotografici',
                'Cambiare il prezzo',
                'Spedire più velocemente',
                'Nessuno',
              ],
              0,
              'Puoi creare scene diverse partendo dalla stessa foto reale.',
            ),
          ],
        },
      ],
      quiz: [
        choice(
          'Che formato usi per un reel?',
          ['16:9', '1:1', '9:16', '3:2'],
          2,
          'Reel e storie sono verticali 9:16.',
        ),
      ],
    },
    {
      title: 'Uso professionale',
      description: 'E-commerce, social, diritti e trasparenza.',
      lessons: [
        {
          title: 'Immagini per e-commerce e social',
          summary: 'Ambientazioni prodotto, banner e contenuti social.',
          estimatedMinutes: 8,
          theory: [
            theory('Dove l’AI fa risparmiare di più', [
              'Ambientazioni: parti dalla foto reale del prodotto e crea scene diverse (outdoor, studio, lifestyle) senza nuovi shooting. Banner e sfondi per campagne stagionali. Varianti per test A/B sui social, per capire quale immagine funziona meglio.',
              'Anche le immagini di supporto (illustrazioni per il blog, icone, sfondi per newsletter) diventano veloci ed economiche.',
            ]),
            theory(
              'La regola d’oro: fedeltà al prodotto',
              [
                'Mantieni sempre il prodotto reale fedele: colori, forma, dettagli e accessori devono corrispondere a ciò che il cliente riceverà. Un’immagine che “abbellisce” il prodotto porta a delusione, recensioni negative e resi.',
              ],
              { tip: 'Usa l’AI per l’ambiente intorno al prodotto, non per cambiare il prodotto.' },
            ),
            theory('Regole dei marketplace', [
              'Molti marketplace hanno regole precise per l’immagine principale (ad esempio sfondo bianco, solo il prodotto reale, nessun testo o elemento ingannevole). Le scene generate sono più adatte alle immagini secondarie e ai contenuti social.',
              'Le linee guida cambiano nel tempo e variano tra marketplace: verificale sempre sulle pagine ufficiali prima di caricare.',
            ]),
            theory(
              'Una serie per i social',
              [
                'Per una settimana di post crea un blocco stile comune (luce, palette, tipo di scena), poi varia il soggetto o l’ambientazione. Così il profilo ha un’identità visiva riconoscibile.',
              ],
              {
                example:
                  'Blocco stile: “fotografia lifestyle, luce calda del tardo pomeriggio, toni caldi, profondità di campo ridotta, formato 4:5”.\nPost 1: casco su sella di scooter in centro storico. Post 2: guanti su tavolo di legno in un garage. Post 3: giacca appesa vicino a una porta con vista sulla strada.',
              },
            ),
            theory('Misurare i risultati', [
              'Confronta le prestazioni delle immagini (click, salvataggi, conversioni) con quelle delle foto tradizionali. L’AI non è sempre migliore: serve a provare di più, più velocemente, e a tenere ciò che funziona.',
            ]),
          ],
          questions: [
            choice(
              'Quale uso dell’AI per le immagini prodotto è più corretto?',
              [
                'Cambiare il colore del prodotto per renderlo più bello di com’è',
                'Ambientare la foto reale del prodotto in una scena lifestyle mantenendolo fedele',
                'Aggiungere accessori non inclusi senza dirlo',
                'Generare un prodotto che non esiste',
              ],
              1,
              'L’immagine deve rappresentare fedelmente ciò che il cliente riceve.',
            ),
            trueFalse(
              'Le regole sulle immagini principali possono variare da marketplace a marketplace.',
              true,
              'Vanno verificate sulle linee guida ufficiali, che cambiano nel tempo.',
            ),
            choice(
              'Dove sono più adatte le scene di prodotto generate con AI?',
              [
                'Come unica immagine principale sempre',
                'Nelle immagini secondarie e nei contenuti social',
                'Nei documenti fiscali',
                'Da nessuna parte',
              ],
              1,
              'Le immagini principali dei marketplace hanno spesso regole stringenti.',
            ),
            fillBlank(
              'Usa l’AI per l’ambiente intorno al prodotto, non per cambiare il ___.',
              ['prodotto', 'formato', 'canale', 'colore dello sfondo'],
              0,
              'Il prodotto deve restare fedele alla realtà.',
            ),
            choice(
              'A cosa servono i test A/B con immagini diverse?',
              [
                'A spendere di più',
                'A capire quale immagine funziona meglio',
                'A cambiare marketplace',
                'A niente',
              ],
              1,
              'Si confrontano le prestazioni per tenere ciò che funziona.',
            ),
            trueFalse(
              'Le immagini AI sono sempre più efficaci delle foto tradizionali.',
              false,
              'Vanno misurate: l’AI serve a provare di più e più velocemente.',
            ),
            choice(
              'Come ottieni un’identità visiva coerente per i post della settimana?',
              [
                'Uno stile diverso per ogni post',
                'Lo stesso blocco stile con soggetti diversi',
                'Solo immagini in bianco e nero',
                'Immagini scaricate a caso',
              ],
              1,
              'Il blocco stile comune rende il profilo riconoscibile.',
            ),
            choice(
              'Quale conseguenza può avere un’immagine che abbellisce il prodotto?',
              [
                'Più fiducia',
                'Delusione, recensioni negative e resi',
                'Spedizioni più veloci',
                'Nessuna',
              ],
              1,
              'Le aspettative sbagliate si pagano in recensioni e resi.',
            ),
          ],
        },
        {
          title: 'Diritti, etica e trasparenza',
          summary: 'Cosa puoi fare, cosa evitare e quando dichiararlo.',
          estimatedMinutes: 8,
          theory: [
            theory('Marchi, personaggi e persone reali', [
              'Evita di imitare marchi, loghi, personaggi protetti (di film, fumetti, videogiochi) e lo stile riconoscibile di artisti viventi. Non creare immagini realistiche di persone reali senza il loro consenso: oltre ai problemi legali, è una questione di rispetto e reputazione.',
            ]),
            theory(
              'Condizioni d’uso e diritto d’autore',
              [
                'Le condizioni d’uso commerciale dipendono dallo strumento e dal piano: alcuni servizi limitano l’uso commerciale nei piani gratuiti. Leggile prima di usare le immagini in pubblicità o sul packaging.',
                'Le norme sul diritto d’autore per le opere generate dall’AI sono in evoluzione e differiscono tra paesi. Per usi importanti (marchi, campagne nazionali) chiedi un parere legale.',
              ],
              {
                tip: 'Tieni traccia di strumento, data e prompt usati per le immagini commerciali: ti sarà utile in caso di contestazioni.',
              },
            ),
            theory('Trasparenza', [
              'Quando un’immagine generata potrebbe essere scambiata per una foto reale (persone, eventi, prodotti), dichiaralo. Alcune piattaforme richiedono un’etichetta per i contenuti generati o modificati con AI, e le norme europee vanno nella direzione di una maggiore trasparenza.',
              'Molti strumenti inseriscono anche filigrane invisibili o metadati che identificano le immagini generate.',
            ]),
            theory(
              'Deepfake e disinformazione',
              [
                'Immagini realistiche di eventi mai accaduti o di persone in situazioni false possono danneggiare persone e aziende. Non crearle e non condividerle. Se ricevi un’immagine sospetta, verifica la fonte prima di diffonderla.',
              ],
              {
                example:
                  'Da evitare: “Foto realistica di un noto pilota di MotoGP che indossa il nostro casco”. Da preferire: “Foto lifestyle di un motociclista (persona generica) con il nostro casco”.',
              },
            ),
            theory('Una checklist prima di pubblicare', [
              '1) Il prodotto è fedele? 2) Ci sono marchi, loghi o persone reali? 3) Le condizioni d’uso dello strumento consentono l’uso commerciale? 4) Il marketplace o la piattaforma hanno regole specifiche? 5) Serve un’etichetta di trasparenza?',
            ]),
          ],
          questions: [
            choice(
              'Quale di questi usi è da evitare?',
              [
                'Creare uno sfondo astratto per un banner',
                'Creare un’immagine realistica di un personaggio famoso che usa il tuo prodotto',
                'Ambientare la foto del tuo prodotto in montagna',
                'Creare un’illustrazione per il blog',
              ],
              1,
              'Usare l’immagine di una persona reale senza consenso è scorretto e può essere illegale.',
            ),
            trueFalse(
              'Le condizioni d’uso commerciale sono uguali per tutti gli strumenti e i piani.',
              false,
              'Variano: vanno lette prima dell’uso in pubblicità.',
            ),
            trueFalse(
              'È corretto dichiarare quando un’immagine realistica è stata generata con AI.',
              true,
              'La trasparenza protegge la fiducia dei clienti.',
            ),
            choice(
              'Cosa devi verificare prima di usare un’immagine AI in una pubblicità?',
              [
                'Il colore preferito del cliente',
                'Le condizioni d’uso commerciale dello strumento',
                'Il meteo',
                'Niente',
              ],
              1,
              'I diritti di utilizzo dipendono dallo strumento e dal piano.',
            ),
            fillBlank(
              'Un’immagine falsa e realistica di una persona reale si chiama ___.',
              ['deepfake', 'thumbnail', 'favicon', 'mockup'],
              0,
              'I deepfake possono danneggiare persone e aziende.',
            ),
            choice(
              'Cosa conviene registrare per le immagini commerciali?',
              [
                'Niente',
                'Strumento, data e prompt usati',
                'Solo il nome del file',
                'La password dell’account',
              ],
              1,
              'Utile in caso di contestazioni o verifiche.',
            ),
            choice(
              'Ricevi un’immagine sorprendente di un evento. Cosa fai prima di condividerla?',
              ['La condivido subito', 'Verifico la fonte', 'La modifico', 'La stampo'],
              1,
              'Le immagini realistiche false sono un veicolo di disinformazione.',
            ),
            trueFalse(
              'Le norme sul diritto d’autore per le opere generate con AI sono identiche in tutto il mondo.',
              false,
              'Sono in evoluzione e differiscono tra paesi.',
            ),
          ],
        },
      ],
      quiz: [
        trueFalse(
          'È corretto dichiarare quando un’immagine realistica è stata generata con AI.',
          true,
          'La trasparenza protegge la fiducia dei clienti.',
        ),
      ],
    },
  ],
  finalTest: [
    choice(
      'Quale elemento NON fa parte di un prompt visivo ben costruito?',
      ['Soggetto', 'Luce', 'Inquadratura', 'La tua password'],
      3,
      'Soggetto, stile, luce e inquadratura sono gli ingredienti chiave.',
    ),
    choice(
      'Come proteggi gli elementi importanti durante l’editing?',
      [
        'Non si può',
        'Indicando esplicitamente cosa deve rimanere identico',
        'Usando più colori',
        'Cambiando strumento ogni volta',
      ],
      1,
      'Es. “mantieni identici forma, colori e logo”.',
    ),
  ],
});
