import type { CourseLevel } from '@/features/courses/types';

export type ToolCategory =
  | 'chatbots'
  | 'images'
  | 'video'
  | 'audio'
  | 'coding'
  | 'research'
  | 'automation'
  | 'agents'
  | 'productivity';

export const toolCategories: ToolCategory[] = [
  'chatbots',
  'images',
  'video',
  'audio',
  'coding',
  'research',
  'automation',
  'agents',
  'productivity',
];

export interface ToolUseCase {
  title: string;
  /** Esempio concreto, spesso un prompt da provare. */
  example: string;
}

export interface AiTool {
  id: string;
  name: string;
  company: string;
  /** Prima categoria = categoria principale. */
  categories: ToolCategory[];
  icon: string;
  tagline: string;
  description: string;
  features: string[];
  difficulty: CourseLevel;
  useCases: ToolUseCase[];
  /** Id dei corsi collegati. */
  relatedCourseIds: string[];
  /** Sito ufficiale (mostrato come testo + link esterno). */
  website: string;
  /** Mese dell'ultima revisione del contenuto (YYYY-MM). */
  lastReviewed: string;
  /** `discontinued`: il servizio non è più disponibile (la scheda resta per chi lo cerca). */
  status?: 'active' | 'discontinued';
  /** Spiegazione mostrata in evidenza sulla scheda (es. chiusura o cambio di nome). */
  statusNote?: string;
  /** Nomi usati in passato, per ritrovare lo strumento con la ricerca. */
  formerNames?: string[];
}

export function isDiscontinued(tool: AiTool): boolean {
  return tool.status === 'discontinued';
}
