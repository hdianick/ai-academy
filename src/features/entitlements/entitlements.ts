/**
 * Diritti di accesso ai contenuti in base al piano.
 * - Modalità demo: tutto sbloccato (chiaramente indicato nell'interfaccia).
 * - Utente non registrato: piano Free.
 * - Utente registrato: il piano salvato nel profilo (modificabile solo da un admin o, in futuro, dai pagamenti).
 */
import type { PlanTier } from '@/features/courses/types';

export const tierOrder: readonly PlanTier[] = ['free', 'premium', 'pro'];

export function tierRank(tier: PlanTier): number {
  return tierOrder.indexOf(tier);
}

export interface AccessContext {
  demo: boolean;
  plan: PlanTier;
}

export function canAccessTier(context: AccessContext, required: PlanTier): boolean {
  if (context.demo) return true;
  return tierRank(context.plan) >= tierRank(required);
}

export function effectivePlan(input: {
  status: 'demo' | 'loading' | 'signedOut' | 'signedIn';
  profilePlan: PlanTier | null | undefined;
}): AccessContext {
  if (input.status === 'demo') return { demo: true, plan: 'pro' };
  if (input.status === 'signedIn') return { demo: false, plan: input.profilePlan ?? 'free' };
  return { demo: false, plan: 'free' };
}
