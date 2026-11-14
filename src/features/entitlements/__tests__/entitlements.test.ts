import { canAccessTier, effectivePlan, tierRank } from '../entitlements';

describe('entitlements', () => {
  it('orders tiers', () => {
    expect(tierRank('free')).toBeLessThan(tierRank('premium'));
    expect(tierRank('premium')).toBeLessThan(tierRank('pro'));
  });

  it('unlocks everything in demo mode', () => {
    const ctx = effectivePlan({ status: 'demo', profilePlan: null });
    expect(ctx.demo).toBe(true);
    expect(canAccessTier(ctx, 'pro')).toBe(true);
  });

  it('treats signed-out users as free', () => {
    const ctx = effectivePlan({ status: 'signedOut', profilePlan: 'pro' });
    expect(ctx.plan).toBe('free');
    expect(canAccessTier(ctx, 'free')).toBe(true);
    expect(canAccessTier(ctx, 'premium')).toBe(false);
  });

  it('uses the profile plan when signed in', () => {
    const premium = effectivePlan({ status: 'signedIn', profilePlan: 'premium' });
    expect(canAccessTier(premium, 'premium')).toBe(true);
    expect(canAccessTier(premium, 'pro')).toBe(false);
    expect(effectivePlan({ status: 'signedIn', profilePlan: undefined }).plan).toBe('free');
  });
});
