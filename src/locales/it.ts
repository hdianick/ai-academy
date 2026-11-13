/**
 * Testi dell'interfaccia in italiano (lingua di riferimento).
 * Le chiavi qui definiscono la forma che anche le altre lingue devono rispettare.
 */
export const it = {
  app: {
    name: 'AI Academy',
    payoff: 'Learn. Practice. Master.',
  },
  tabs: {
    home: 'Home',
    academy: 'Academy',
    practice: 'Practice',
    tutor: 'Tutor',
    profile: 'Profilo',
  },
  home: {
    greeting: 'Ciao, {{name}}',
    guestName: 'studente',
    subtitle: 'Pronto a imparare qualcosa di nuovo sull’AI oggi?',
  },
  academy: {
    title: 'Academy',
    subtitle: 'Corsi e percorsi per usare davvero l’intelligenza artificiale.',
  },
  practice: {
    title: 'Practice Lab',
    subtitle: 'Esercitazioni, missioni e sfide di prompt engineering.',
  },
  tutor: {
    title: 'AI Tutor',
    subtitle: 'Fai domande sui concetti e sulle lezioni.',
  },
  profile: {
    title: 'Profilo',
    subtitle: 'Livello, XP, badge e statistiche.',
  },
  common: {
    comingSoon: 'In arrivo',
    comingSoonDescription: 'Questa sezione sarà disponibile nelle prossime fasi di sviluppo.',
    retry: 'Riprova',
    loading: 'Caricamento…',
    errorTitle: 'Qualcosa è andato storto',
    errorDescription: 'Si è verificato un errore imprevisto. Riprova tra qualche istante.',
    notFoundTitle: 'Pagina non trovata',
    backHome: 'Torna alla Home',
  },
  demo: {
    banner: 'Modalità demo · i progressi sono salvati solo su questo dispositivo',
  },
};

/** Forma dei testi: ogni lingua deve avere esattamente le stesse chiavi. */
type DeepStringShape<T> = { [K in keyof T]: T[K] extends string ? string : DeepStringShape<T[K]> };
export type TranslationShape = DeepStringShape<typeof it>;
