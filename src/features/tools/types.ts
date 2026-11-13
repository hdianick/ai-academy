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
}
