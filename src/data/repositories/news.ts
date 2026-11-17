import { content } from '@/data/content/registry';

/** Novità e data dell'ultimo controllo, nella lingua attiva dell'app. */
export const newsRepository = {
  list: () => content().news,
  verifiedAt: () => content().verifiedAt,
};
