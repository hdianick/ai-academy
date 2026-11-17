/**
 * Contenuti per lingua. Italiano e inglese hanno la STESSA struttura e gli stessi id
 * (un test lo verifica), così i progressi valgono in entrambe le lingue.
 */
import i18n, { type SupportedLanguage } from '@/core/i18n';
import type { NewsItem } from '@/features/news/types';
import type { Course, QuizQuestion } from '@/features/courses/types';
import type { PracticeItem, WeeklyChallenge } from '@/features/practice/types';
import type { AiTool } from '@/features/tools/types';
import type { KnowledgeEntry } from '@/features/tutor/types';

import { demoCourses as coursesEn } from './en/courses';
import { CONTENT_VERIFIED_AT as verifiedEn, newsItems as newsEn } from './en/news';
import * as practiceEn from './en/practice';
import { demoTools as toolsEn } from './en/tools';
import { stopWords as stopWordsEn, tutorKnowledge as tutorEn } from './en/tutor-knowledge';
import { demoCourses as coursesIt } from './courses';
import { CONTENT_VERIFIED_AT as verifiedIt, newsItems as newsIt } from './news';
import * as practiceIt from './practice';
import { demoTools as toolsIt } from './tools';
import { stopWords as stopWordsIt, tutorKnowledge as tutorIt } from './tutor-knowledge';

export interface ContentBundle {
  courses: Course[];
  tools: AiTool[];
  news: NewsItem[];
  verifiedAt: string;
  practice: {
    items: PracticeItem[];
    dailyPool: QuizQuestion[];
    weekly: WeeklyChallenge[];
  };
  tutor: { knowledge: KnowledgeEntry[]; stopWords: Set<string> };
  /** Lingua della voce che legge le lezioni. */
  speechLanguage: string;
}

export const contentByLanguage: Record<SupportedLanguage, ContentBundle> = {
  it: {
    courses: coursesIt,
    tools: toolsIt,
    news: newsIt,
    verifiedAt: verifiedIt,
    practice: {
      items: practiceIt.practiceItems,
      dailyPool: practiceIt.dailyChallengePool,
      weekly: practiceIt.weeklyChallenges,
    },
    tutor: { knowledge: tutorIt, stopWords: stopWordsIt },
    speechLanguage: 'it-IT',
  },
  en: {
    courses: coursesEn,
    tools: toolsEn,
    news: newsEn,
    verifiedAt: verifiedEn,
    practice: {
      items: practiceEn.practiceItems,
      dailyPool: practiceEn.dailyChallengePool,
      weekly: practiceEn.weeklyChallenges,
    },
    tutor: { knowledge: tutorEn, stopWords: stopWordsEn },
    speechLanguage: 'en-US',
  },
};

export function contentLanguage(): SupportedLanguage {
  return i18n.language?.startsWith('en') ? 'en' : 'it';
}

/** Contenuti nella lingua attiva dell'app. */
export function content(): ContentBundle {
  return contentByLanguage[contentLanguage()];
}
