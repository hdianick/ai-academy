import type { SubscriptionRequest } from './api';
import { priceFor } from './plans';

/** Incasso mensile potenziale delle prenotazioni (annuali ripartiti su 12 mesi), in centesimi. */
export function potentialMonthlyRevenue(requests: Pick<SubscriptionRequest, 'plan' | 'period'>[]) {
  return requests.reduce(
    (sum, r) =>
      sum +
      (r.period === 'monthly'
        ? priceFor(r.plan, 'monthly')
        : Math.round(priceFor(r.plan, 'yearly') / 12)),
    0,
  );
}
