# Supabase — configurazione

L'app funziona in **modalità demo** finché non configuri Supabase. Per attivare account e progressi online:

1. Crea un progetto gratuito su [supabase.com](https://supabase.com) (regione consigliata: EU).
2. Apri **SQL Editor** e incolla ed esegui il contenuto di
   `supabase/migrations/20261114000000_init.sql` (oppure usa la Supabase CLI: `supabase db push`).
3. In **Authentication → Providers** verifica che il login con **Email** sia attivo.
   In **Authentication → URL Configuration** imposta l'URL del sito (per i link di recupero password).
4. In **Project Settings → API** copia **Project URL** e la chiave **publishable** (non quella segreta).
5. Crea `.env.local` partendo da `.env.example` e incolla i due valori.
6. Riavvia l'app: il banner “Modalità demo” sparisce e compaiono registrazione e login.

## Cosa contiene lo schema

| Tabella         | Contenuto                                            | Chi può leggere / scrivere          |
| --------------- | ---------------------------------------------------- | ----------------------------------- |
| `profiles`      | nome, ruolo (`user/editor/admin`), piano, preferenze | l'utente il proprio; lo staff tutti |
| `user_progress` | progressi dell'app (JSON)                            | solo l'utente stesso                |
| `courses`       | contenuti corsi (per la futura area admin)           | tutti i pubblicati; staff gestisce  |
| `ai_tools`      | schede strumenti (per la futura area admin)          | tutti i pubblicati; staff gestisce  |

- Il profilo viene creato automaticamente alla registrazione.
- Un utente **non può** cambiare da solo il proprio ruolo o piano: lo fa un admin o, in futuro,
  il sistema di pagamento lato server.
- Per nominare il primo admin, dal SQL Editor:
  `update public.profiles set role = 'admin' where id = '<id utente>';`

## Sicurezza

- Nell'app va solo la chiave **publishable**: i dati sono protetti dalle policy RLS.
- La chiave segreta (`service_role` / secret) non va mai nell'app né nel repository.

## Aggiornamenti dello schema

Esegui i file di `migrations/` in ordine di data nel SQL Editor:

1. `20261114000000_init.sql` — profili, progressi, contenuti, regole di sicurezza.
2. `20261114120000_admin.sql` — email nei profili, statistiche per lo staff, avvisi nella Home.
