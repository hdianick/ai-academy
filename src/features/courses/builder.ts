/**
 * Helper per scrivere i contenuti in modo compatto e leggibile.
 * Gli id vengono generati automaticamente e sono stabili (dipendono dalla posizione).
 */
import type {
  Course,
  FillBlankStep,
  LessonStep,
  MultipleChoiceStep,
  OrderStep,
  PromptFixStep,
  QuizQuestion,
  TheoryStep,
  TrueFalseStep,
} from './types';

type WithoutId<T> = T extends unknown ? Omit<T, 'id'> : never;
export type DraftStep = WithoutId<LessonStep>;
export type DraftQuestion = WithoutId<QuizQuestion>;

export const theory = (
  title: string,
  paragraphs: string[],
  extra: { tip?: string; example?: string } = {},
): WithoutId<TheoryStep> => ({ type: 'theory', title, paragraphs, ...extra });

export const choice = (
  question: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): WithoutId<MultipleChoiceStep> => ({
  type: 'multipleChoice',
  question,
  options,
  correctIndex,
  explanation,
});

export const trueFalse = (
  statement: string,
  answer: boolean,
  explanation: string,
): WithoutId<TrueFalseStep> => ({ type: 'trueFalse', statement, answer, explanation });

export const fillBlank = (
  sentence: string,
  options: string[],
  correctIndex: number,
  explanation: string,
): WithoutId<FillBlankStep> => ({
  type: 'fillBlank',
  sentence,
  options,
  correctIndex,
  explanation,
});

export const order = (
  instruction: string,
  items: string[],
  explanation: string,
): WithoutId<OrderStep> => ({ type: 'order', instruction, items, explanation });

export const promptFix = (input: Omit<PromptFixStep, 'id' | 'type'>): WithoutId<PromptFixStep> => ({
  type: 'promptFix',
  ...input,
});

interface DraftLesson {
  title: string;
  summary: string;
  estimatedMinutes: number;
  xp?: number;
  steps: DraftStep[];
}

interface DraftModule {
  title: string;
  description: string;
  lessons: DraftLesson[];
  quiz: DraftQuestion[];
}

interface DraftCourse extends Omit<Course, 'modules' | 'finalTest'> {
  modules: DraftModule[];
  finalTest: DraftQuestion[];
}

const LESSON_XP = 20;
const MODULE_QUIZ_XP = 30;
const FINAL_TEST_XP = 60;

export function withIds<T extends object>(items: T[], prefix: string): (T & { id: string })[] {
  return items.map((item, index) => ({ ...item, id: `${prefix}.s${index + 1}` }));
}

export function defineCourse(draft: DraftCourse): Course {
  const courseId = draft.id;
  return {
    ...draft,
    modules: draft.modules.map((module, moduleIndex) => {
      const moduleId = `${courseId}.m${moduleIndex + 1}`;
      return {
        id: moduleId,
        title: module.title,
        description: module.description,
        lessons: module.lessons.map((lesson, lessonIndex) => {
          const lessonId = `${moduleId}.l${lessonIndex + 1}`;
          return {
            id: lessonId,
            title: lesson.title,
            summary: lesson.summary,
            estimatedMinutes: lesson.estimatedMinutes,
            xp: lesson.xp ?? LESSON_XP,
            steps: withIds(lesson.steps, lessonId) as LessonStep[],
          };
        }),
        quiz: {
          id: `${moduleId}.quiz`,
          title: `Quiz · ${module.title}`,
          kind: 'module',
          passingScore: 0.6,
          xp: MODULE_QUIZ_XP,
          questions: withIds(module.quiz, `${moduleId}.quiz`) as QuizQuestion[],
        },
      };
    }),
    finalTest: {
      id: `${courseId}.final`,
      title: `Test finale · ${draft.title}`,
      kind: 'final',
      passingScore: 0.7,
      xp: FINAL_TEST_XP,
      questions: withIds(draft.finalTest, `${courseId}.final`) as QuizQuestion[],
    },
  };
}
