import { useAuthStore } from '@/features/auth/store';
import type { PlanTier } from '@/features/courses/types';

import { canAccessTier, effectivePlan, type AccessContext } from './entitlements';

export function useAccess(): AccessContext & { can: (tier: PlanTier) => boolean } {
  const status = useAuthStore((s) => s.status);
  const profilePlan = useAuthStore((s) => s.profile?.plan);
  const context = effectivePlan({ status, profilePlan });
  return { ...context, can: (tier) => canAccessTier(context, tier) };
}

export function useIsStaff(): boolean {
  const role = useAuthStore((s) => s.profile?.role);
  return role === 'admin' || role === 'editor';
}
