import { coursesRepository } from '@/data/repositories/courses';

import { listProfiles, listProgress } from './api';
import { computeStats } from './stats';

export async function loadStats() {
  const [profiles, progress] = await Promise.all([listProfiles(), listProgress()]);
  return { profiles, stats: computeStats(profiles, progress, coursesRepository.list()) };
}
