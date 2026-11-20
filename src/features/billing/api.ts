import { supabase } from '@/core/supabase/client';

import type { BillingPeriod, PaidPlan } from './plans';

export interface SubscriptionRequest {
  userId: string;
  plan: PaidPlan;
  period: BillingPeriod;
  createdAt: string;
}

function client() {
  if (!supabase) throw new Error('supabase-not-configured');
  return supabase;
}

/** Registra (o aggiorna) la richiesta di abbonamento dell'utente collegato. */
export async function saveSubscriptionRequest(
  userId: string,
  plan: PaidPlan,
  period: BillingPeriod,
): Promise<void> {
  const { error } = await client()
    .from('subscription_requests')
    .upsert({ user_id: userId, plan, period }, { onConflict: 'user_id' });
  if (error) throw error;
}

export async function cancelSubscriptionRequest(userId: string): Promise<void> {
  const { error } = await client().from('subscription_requests').delete().eq('user_id', userId);
  if (error) throw error;
}

function toRequest(row: Record<string, unknown>): SubscriptionRequest {
  return {
    userId: row.user_id as string,
    plan: row.plan as PaidPlan,
    period: row.period as BillingPeriod,
    createdAt: (row.updated_at ?? row.created_at) as string,
  };
}

export async function getMySubscriptionRequest(
  userId: string,
): Promise<SubscriptionRequest | null> {
  const { data, error } = await client()
    .from('subscription_requests')
    .select('user_id, plan, period, created_at, updated_at')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) throw error;
  return data ? toRequest(data) : null;
}

/** Tutte le richieste (solo staff, verificato dal database). */
export async function listSubscriptionRequests(): Promise<SubscriptionRequest[]> {
  const { data, error } = await client()
    .from('subscription_requests')
    .select('user_id, plan, period, created_at, updated_at')
    .order('updated_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(toRequest);
}
