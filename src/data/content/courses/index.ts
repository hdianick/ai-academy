import type { Course } from '@/features/courses/types';

import { aiImages } from './ai-images';
import { automationAgents } from './automation-agents';
import { chatgptCourse } from './chatgpt';
import { introAi } from './intro-ai';
import { promptEngineering } from './prompt-engineering';

/** Catalogo dimostrativo (modalità demo). Con Supabase arriverà dal database. */
export const demoCourses: Course[] = [
  introAi,
  chatgptCourse,
  promptEngineering,
  aiImages,
  automationAgents,
];
