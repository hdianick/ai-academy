/**
 * Modello dei contenuti formativi.
 * La stessa forma verrà usata per le tabelle Supabase (courses, modules, lessons, lesson_steps, quizzes).
 */

export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';

export type CourseCategory = 'fundamentals' | 'chatbots' | 'prompting' | 'images' | 'automation';

export type PlanTier = 'free' | 'premium' | 'pro';

export interface TheoryStep {
  type: 'theory';
  id: string;
  title: string;
  paragraphs: string[];
  /** Consiglio pratico evidenziato. */
  tip?: string;
  /** Esempio (es. un prompt) mostrato in un riquadro a parte. */
  example?: string;
}

export interface MultipleChoiceStep {
  type: 'multipleChoice';
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TrueFalseStep {
  type: 'trueFalse';
  id: string;
  statement: string;
  answer: boolean;
  explanation: string;
}

export interface FillBlankStep {
  type: 'fillBlank';
  id: string;
  /** Frase con "___" al posto della parola mancante. */
  sentence: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface OrderStep {
  type: 'order';
  id: string;
  instruction: string;
  /** Elementi nell'ordine CORRETTO (il player li mescola). */
  items: string[];
  explanation: string;
}

export interface PromptCheck {
  label: string;
  /** Il criterio è soddisfatto se il testo contiene almeno una di queste parole (case-insensitive). */
  keywords: string[];
}

export interface PromptFixStep {
  type: 'promptFix';
  id: string;
  instruction: string;
  weakPrompt: string;
  checks: PromptCheck[];
  sampleAnswer: string;
}

export type ExerciseStep =
  MultipleChoiceStep | TrueFalseStep | FillBlankStep | OrderStep | PromptFixStep;

export type LessonStep = TheoryStep | ExerciseStep;

export type QuizQuestion = MultipleChoiceStep | TrueFalseStep;

export interface Quiz {
  id: string;
  title: string;
  kind: 'module' | 'final';
  questions: QuizQuestion[];
  /** Percentuale minima (0-1) per superarlo. */
  passingScore: number;
  xp: number;
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  estimatedMinutes: number;
  xp: number;
  steps: LessonStep[];
}

export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quiz: Quiz;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: CourseCategory;
  level: CourseLevel;
  /** Strumenti AI trattati (nomi, senza loghi). */
  tools: string[];
  /** Cosa saprai fare alla fine. */
  outcomes: string[];
  requiredTier: PlanTier;
  icon: string;
  modules: CourseModule[];
  finalTest: Quiz;
}

export const courseLevels: CourseLevel[] = ['beginner', 'intermediate', 'advanced'];
export const courseCategories: CourseCategory[] = [
  'fundamentals',
  'chatbots',
  'prompting',
  'images',
  'automation',
];
