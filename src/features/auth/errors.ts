/** Traduce gli errori di Supabase Auth in chiavi i18n comprensibili. */
export type AuthServiceErrorKey =
  | 'auth.errors.invalidCredentials'
  | 'auth.errors.emailNotConfirmed'
  | 'auth.errors.alreadyRegistered'
  | 'auth.errors.rateLimited'
  | 'auth.errors.network'
  | 'auth.errors.unknown';

export function mapAuthError(error: unknown): AuthServiceErrorKey {
  const raw = error as { code?: string; message?: string; status?: number } | null;
  const code = raw?.code ?? '';
  const message = (raw?.message ?? '').toLowerCase();

  if (code === 'invalid_credentials' || message.includes('invalid login credentials')) {
    return 'auth.errors.invalidCredentials';
  }
  if (code === 'email_not_confirmed' || message.includes('email not confirmed')) {
    return 'auth.errors.emailNotConfirmed';
  }
  if (code === 'user_already_exists' || message.includes('already registered')) {
    return 'auth.errors.alreadyRegistered';
  }
  if (code.includes('rate_limit') || raw?.status === 429) return 'auth.errors.rateLimited';
  if (message.includes('network') || message.includes('fetch')) return 'auth.errors.network';
  return 'auth.errors.unknown';
}
