/**
 * Contratto del Tutor AI. L'interfaccia non dipende dall'implementazione:
 * oggi c'è il provider DEMO (risposte locali); in futuro un provider remoto
 * chiamerà un modello AI tramite una funzione lato server (mai con chiavi nell'app).
 */

export interface TutorMessage {
  id: string;
  role: 'user' | 'tutor';
  text: string;
  /** Suggerimenti collegati alla risposta (solo messaggi del tutor). */
  links?: TutorLink[];
  /** Domande di approfondimento proposte. */
  followUps?: string[];
  /** Vero se la risposta è il fallback “non so”. */
  isFallback?: boolean;
}

export type TutorLink =
  { kind: 'lesson'; id: string; title: string } | { kind: 'tool'; id: string; title: string };

export interface TutorReply {
  text: string;
  links: TutorLink[];
  followUps: string[];
  isFallback: boolean;
}

export interface TutorProvider {
  /** Identifica il provider nell'interfaccia (es. etichetta "demo"). */
  readonly mode: 'demo' | 'remote';
  ask(question: string, history: TutorMessage[]): Promise<TutorReply>;
}

export interface KnowledgeEntry {
  id: string;
  /** Parole o frasi chiave (minuscole, senza accenti non necessari). */
  keywords: string[];
  answer: string;
  followUps: string[];
  /** Lezione consigliata per approfondire. */
  lessonId?: string;
}
