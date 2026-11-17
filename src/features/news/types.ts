export type NewsKind = 'launch' | 'change' | 'closure';

export interface NewsItem {
  id: string;
  /** Data dell'evento (YYYY-MM-DD). */
  date: string;
  kind: NewsKind;
  title: string;
  summary: string;
  /** Strumenti del catalogo coinvolti. */
  toolIds: string[];
  /** Fonte verificabile: preferire pagine ufficiali. */
  source: { name: string; url: string };
}
