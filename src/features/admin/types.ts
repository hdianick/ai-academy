import type { AppRole } from '@/features/auth/store';
import type { PlanTier } from '@/features/courses/types';
import type { ProgressState } from '@/features/progress/progress';

export interface AdminProfile {
  id: string;
  displayName: string;
  email: string | null;
  role: AppRole;
  plan: PlanTier;
  createdAt: string;
}

export interface ProgressRow {
  userId: string;
  data: Partial<ProgressState> | null;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  active: boolean;
  createdAt: string;
}

export const appRoles: AppRole[] = ['user', 'editor', 'admin'];
