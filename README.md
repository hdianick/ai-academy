# AI Academy

**Learn. Practice. Master.**

AI Academy è una piattaforma di apprendimento in stile Duolingo per imparare a usare davvero gli
strumenti di intelligenza artificiale (ChatGPT, Claude, Gemini, Midjourney, Cursor, n8n e molti altri),
dal livello principiante a quello avanzato.

Un'unica codebase per **iOS, Android e Web**, basata su Expo.

---

## Stack

| Area           | Tecnologia                                                           |
| -------------- | -------------------------------------------------------------------- |
| App            | React Native · Expo SDK 58 · Expo Router · TypeScript (`strict`)     |
| Stato locale   | Zustand + AsyncStorage (modalità demo)                               |
| Backend        | Supabase (auth, database, storage) — predisposto, attivabile via env |
| Localizzazione | i18next + expo-localization (italiano predefinito, inglese)          |
| Test           | Jest (`jest-expo`) + React Native Testing Library                    |
| Qualità        | ESLint (`eslint-config-expo`) · Prettier · GitHub Actions            |
| Build          | Expo EAS                                                             |

## Requisiti

- Node.js 20 o superiore
- Per provare l'app sul telefono: un **development build** (consigliato con SDK 58) oppure Expo Go
  quando la versione compatibile con SDK 58 è disponibile sugli store.

## Avvio rapido

```bash
npm install
npm run web        # apre l'app nel browser
npm start          # avvia il server di sviluppo (QR code per il telefono)
```

### Modalità demo vs Supabase

Senza configurazione l'app parte in **modalità demo**: i dati sono dimostrativi e i progressi restano
solo sul dispositivo. Un banner lo segnala sempre in modo chiaro.

Per collegare Supabase:

```bash
cp .env.example .env.local
# compila EXPO_PUBLIC_SUPABASE_URL e EXPO_PUBLIC_SUPABASE_ANON_KEY
```

> **Mai** inserire chiavi segrete (service role, chiavi di provider AI) nel codice o in variabili
> `EXPO_PUBLIC_*`: finirebbero nell'app pubblicata. Vanno solo lato server (Supabase Edge Functions).

## Script

| Comando             | Descrizione                          |
| ------------------- | ------------------------------------ |
| `npm start`         | Server di sviluppo Expo              |
| `npm run web`       | Avvio su browser                     |
| `npm run typecheck` | Controllo TypeScript                 |
| `npm run lint`      | ESLint                               |
| `npm test`          | Test con Jest                        |
| `npm run format`    | Formatta il codice con Prettier      |
| `npm run check`     | Typecheck + lint + test (come la CI) |

## Struttura del progetto

```
src/
├─ app/            # Route (Expo Router): ogni file è una schermata
│  └─ (tabs)/      # Home · Academy · Practice · Tutor · Profilo
├─ core/           # tema (design token), configurazione, i18n
├─ ui/             # componenti riutilizzabili (AppText, Button, Card, ProgressBar…)
├─ features/       # moduli per funzionalità (corsi, lezioni, gamification, tutor…)
├─ data/           # contenuti dimostrativi e repository (locale / Supabase)
└─ locales/        # testi dell'interfaccia (it, en)
```

Regola: in `src/app/` solo route. Logica e componenti vivono in `src/features/` e `src/ui/`.

## Roadmap di sviluppo

| Fase | Contenuto                                                                 | Stato         |
| ---- | ------------------------------------------------------------------------- | ------------- |
| 0    | Setup, TypeScript strict, lint, test, CI, design token, i18n, navigazione | ✅ completata |
| 1    | Design system completo, animazioni, stati di caricamento/errore           | ⏳            |
| 2    | Modello dei contenuti, 5 corsi completi, catalogo Academy con filtri      | ⏳            |
| 3    | Lesson player, esercizi interattivi, quiz, test finale, progressi         | ⏳            |
| 4    | Gamification: XP, livelli, streak, badge, obiettivi giornalieri           | ⏳            |
| 5    | AI Tools, Practice Lab, Challenges                                        | ⏳            |
| 6    | AI Tutor (modalità demo)                                                  | ⏳            |
| 7    | Supabase: autenticazione, schema, RLS, sincronizzazione                   | ⏳            |
| 8    | Piani FREE/PREMIUM/PRO, ruoli admin, accessibilità, EAS, rifinitura       | ⏳            |

## Note sui marchi

I nomi degli strumenti AI citati appartengono ai rispettivi proprietari. L'app non usa loghi ufficiali
e non è affiliata ai produttori degli strumenti.
