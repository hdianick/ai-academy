/**
 * Piani di abbonamento e prezzi.
 * I PAGAMENTI NON SONO ANCORA ATTIVI: nessun addebito, si raccolgono solo le richieste.
 * Per cambiare i prezzi basta modificare `planPricing` (importi in centesimi di euro, IVA inclusa).
 */
import type { PlanTier } from '@/features/courses/types';

export const PAYMENTS_ENABLED = false;

export type PaidPlan = Exclude<PlanTier, 'free'>;
export type BillingPeriod = 'monthly' | 'yearly';

export const paidPlans: PaidPlan[] = ['premium', 'pro'];
export const billingPeriods: BillingPeriod[] = ['monthly', 'yearly'];

export const CURRENCY = 'EUR';

export const planPricing: Record<PaidPlan, Record<BillingPeriod, number>> = {
  premium: { monthly: 799, yearly: 5999 },
  pro: { monthly: 1499, yearly: 11999 },
};

/** Il piano messo in evidenza come “più scelto”. */
export const featuredPlan: PaidPlan = 'premium';

export function isPaidPlan(value: unknown): value is PaidPlan {
  return value === 'premium' || value === 'pro';
}

export function isBillingPeriod(value: unknown): value is BillingPeriod {
  return value === 'monthly' || value === 'yearly';
}

export function priceFor(plan: PaidPlan, period: BillingPeriod): number {
  return planPricing[plan][period];
}

/** Costo mensile equivalente del piano annuale (arrotondato al centesimo). */
export function monthlyEquivalent(plan: PaidPlan): number {
  return Math.round(planPricing[plan].yearly / 12);
}

/** Risparmio percentuale dell'annuale rispetto a 12 mesi pagati mese per mese. */
export function yearlySavingPercent(plan: PaidPlan): number {
  const fullYear = planPricing[plan].monthly * 12;
  return Math.round((1 - planPricing[plan].yearly / fullYear) * 100);
}

export function formatPrice(cents: number, language: string): string {
  const locale = language.startsWith('en') ? 'en-IE' : 'it-IT';
  return new Intl.NumberFormat(locale, { style: 'currency', currency: CURRENCY }).format(
    cents / 100,
  );
}
