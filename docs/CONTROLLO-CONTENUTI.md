# Controllo settimanale dei contenuti

Obiettivo: le informazioni sugli strumenti AI devono essere **corrette e aggiornate**.
Il controllo gira ogni settimana in automatico; si può anche lanciare a mano.

## Due lingue

L'app è in **italiano e inglese**. Ogni contenuto esiste in due file con la stessa struttura:
`src/data/content/…` (italiano) e `src/data/content/en/…` (inglese). Ogni modifica va fatta **in entrambi**,
con gli stessi id, date, link e risposte corrette. I test (`src/data/content/__tests__/languages.test.ts`)
bloccano la pubblicazione se le due lingue non coincidono o se nel file inglese resta testo italiano.

## File da tenere aggiornati

| File                                                                      | Cosa contiene                                                                                                      |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `src/data/content/tools.ts` + `en/tools.ts`                               | Schede degli strumenti (nome, descrizione, funzioni, sito, `lastReviewed`, `status`, `statusNote`, `formerNames`). |
| `src/data/content/news.ts` + `en/news.ts`                                 | Novità (`newsItems`) e data dell'ultimo controllo (`CONTENT_VERIFIED_AT`).                                         |
| `courses/*.ts`, `practice.ts`, `tutor-knowledge.ts` (e le copie in `en/`) | Testi dei corsi che nominano gli strumenti.                                                                        |

## Procedura

1. Per **ogni strumento** in `tools.ts` cerca sul web (preferisci fonti ufficiali: blog, note di rilascio, centro assistenza dell'azienda) se negli ultimi mesi:
   - è stato **chiuso** → `status: 'discontinued'`, `statusNote` con date e alternative, `relatedCourseIds: []`, toglilo dagli esempi dei corsi;
   - ha **cambiato nome** → nuovo `name`, vecchio nome in `formerNames`, `statusNote` che spiega il cambio; aggiorna i testi dei corsi;
   - ha cambiato **funzioni principali** o **sito** → aggiorna `description`, `features`, `website`.
     Imposta `lastReviewed` al mese corrente per le schede verificate.
2. Aggiungi in cima a `newsItems` le **novità importanti** (lanci di modelli, chiusure, cambi di nome o di prezzo che interessano chi usa gli strumenti). Massimo 5 per settimana, solo eventi già avvenuti, con data e fonte `https`. Scrivi in italiano semplice e in inglese semplice, con parole tue (niente citazioni lunghe). Mantieni al massimo 30 notizie: elimina le più vecchie.
3. Aggiorna `CONTENT_VERIFIED_AT` alla data di oggi in entrambi i file `news.ts`.
4. Non inventare: se una notizia non è confermata da almeno una fonte affidabile, non inserirla. Nel dubbio non cambiare la scheda.
5. Verifica: `npm run check` e `npm run format:check` devono passare (i test controllano date, fonti e collegamenti).
6. Pubblica: commit su `main` con messaggio `Contenuti: controllo settimanale del GG/MM/AAAA` e push. Il sito si aggiorna da solo in 2–3 minuti e l'app degli utenti si ricarica con i nuovi contenuti.
