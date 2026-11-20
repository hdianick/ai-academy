import {
  formatPrice,
  isBillingPeriod,
  isPaidPlan,
  monthlyEquivalent,
  PAYMENTS_ENABLED,
  paidPlans,
  planPricing,
  priceFor,
  yearlySavingPercent,
} from '../plans';

describe('subscription plans', () => {
  it('payments are not active yet', () => {
    expect(PAYMENTS_ENABLED).toBe(false);
  });

  it('has coherent prices: Pro costs more than Premium, yearly is cheaper than 12 months', () => {
    for (const period of ['monthly', 'yearly'] as const)
      expect(priceFor('pro', period)).toBeGreaterThan(priceFor('premium', period));
    for (const plan of paidPlans) {
      expect(planPricing[plan].yearly).toBeLessThan(planPricing[plan].monthly * 12);
      expect(yearlySavingPercent(plan)).toBeGreaterThan(0);
      expect(monthlyEquivalent(plan)).toBeLessThan(planPricing[plan].monthly);
    }
  });

  it('computes savings and monthly equivalents', () => {
    expect(yearlySavingPercent('premium')).toBe(37);
    expect(monthlyEquivalent('premium')).toBe(500);
    expect(monthlyEquivalent('pro')).toBe(1000);
  });

  it('formats prices for each language', () => {
    expect(formatPrice(799, 'it').replace(/\s/g, ' ')).toBe('7,99 €');
    expect(formatPrice(5999, 'en')).toBe('€59.99');
  });

  it('validates route parameters', () => {
    expect(isPaidPlan('premium')).toBe(true);
    expect(isPaidPlan('free')).toBe(false);
    expect(isPaidPlan(undefined)).toBe(false);
    expect(isBillingPeriod('yearly')).toBe(true);
    expect(isBillingPeriod('weekly')).toBe(false);
  });
});

describe('potential revenue', () => {
  it('sums monthly reservations and spreads yearly ones over 12 months', () => {
    const { potentialMonthlyRevenue } = jest.requireActual('../potential');
    expect(potentialMonthlyRevenue([])).toBe(0);
    expect(
      potentialMonthlyRevenue([
        { plan: 'premium', period: 'monthly' },
        { plan: 'pro', period: 'yearly' },
      ]),
    ).toBe(799 + 1000);
  });
});
