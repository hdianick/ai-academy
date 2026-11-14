import { mergeProgress, normalizeProgress } from '@/features/progress/merge';
import { emptyProgress, type ProgressState } from '@/features/progress/progress';

import { mapAuthError } from '../errors';
import { resetSchema, signInSchema, signUpSchema, validate } from '../validation';

describe('validazione moduli', () => {
  it('accetta una registrazione valida', () => {
    const result = validate(signUpSchema, {
      displayName: 'Mario',
      email: ' mario@example.com ',
      password: 'Casco2026',
      confirmPassword: 'Casco2026',
    });
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.data.email).toBe('mario@example.com');
  });

  it('segnala email, password debole, conferma diversa e nome', () => {
    const result = validate(signUpSchema, {
      displayName: 'M',
      email: 'non-una-email',
      password: 'solo-lettere',
      confirmPassword: 'diversa',
    });
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.errors).toEqual({
        displayName: 'auth.errors.nameInvalid',
        email: 'auth.errors.emailInvalid',
        password: 'auth.errors.passwordWeak',
        confirmPassword: 'auth.errors.passwordMismatch',
      });
    }
  });

  it('richiede almeno 8 caratteri', () => {
    const result = validate(signUpSchema, {
      displayName: 'Mario',
      email: 'm@e.it',
      password: 'Ab1',
      confirmPassword: 'Ab1',
    });
    expect(!result.ok && result.errors.password).toBe('auth.errors.passwordTooShort');
  });

  it('valida login e recupero password', () => {
    expect(validate(signInSchema, { email: 'm@e.it', password: 'x' }).ok).toBe(true);
    expect(validate(signInSchema, { email: 'm@e.it', password: '' }).ok).toBe(false);
    expect(validate(resetSchema, { email: 'sbagliata' }).ok).toBe(false);
  });
});

describe('errori di autenticazione', () => {
  it.each([
    [{ code: 'invalid_credentials' }, 'auth.errors.invalidCredentials'],
    [{ message: 'Email not confirmed' }, 'auth.errors.emailNotConfirmed'],
    [{ message: 'User already registered' }, 'auth.errors.alreadyRegistered'],
    [{ status: 429 }, 'auth.errors.rateLimited'],
    [{ message: 'Failed to fetch' }, 'auth.errors.network'],
    [null, 'auth.errors.unknown'],
  ])('%j → %s', (error, key) => {
    expect(mapAuthError(error)).toBe(key);
  });
});

describe('unione dei progressi', () => {
  const local: ProgressState = {
    ...emptyProgress,
    xp: 120,
    lessons: { a: { completedAt: '2026-11-10T10:00:00Z' } },
    quizzes: { q: { bestScore: 0.4, passed: false, lastAttemptAt: '2026-11-10T10:00:00Z' } },
    dailyXp: { '2026-11-10': 60 },
    badges: { firstLesson: '2026-11-10T10:00:00Z' },
    streak: { current: 2, longest: 2, lastActiveDate: '2026-11-13' },
  };
  const remote = {
    xp: 90,
    lessons: {
      a: { completedAt: '2026-11-09T10:00:00Z' },
      b: { completedAt: '2026-11-11T10:00:00Z' },
    },
    quizzes: { q: { bestScore: 0.8, passed: true, lastAttemptAt: '2026-11-09T10:00:00Z' } },
    dailyXp: { '2026-11-10': 40, '2026-11-11': 30 },
    streak: { current: 1, longest: 5, lastActiveDate: '2026-11-11' },
  };

  it('non perde nulla e non somma due volte gli XP', () => {
    const merged = mergeProgress(local, remote);
    expect(Object.keys(merged.lessons).sort()).toEqual(['a', 'b']);
    expect(merged.lessons.a?.completedAt).toBe('2026-11-09T10:00:00Z');
    expect(merged.quizzes.q).toEqual({
      bestScore: 0.8,
      passed: true,
      lastAttemptAt: '2026-11-10T10:00:00Z',
    });
    expect(merged.xp).toBe(120);
    expect(merged.dailyXp).toEqual({ '2026-11-10': 60, '2026-11-11': 30 });
    expect(merged.streak).toEqual({ current: 2, longest: 5, lastActiveDate: '2026-11-13' });
    expect(merged.badges.firstLesson).toBeDefined();
  });

  it('gestisce dati remoti vuoti o malformati', () => {
    expect(mergeProgress(local, null)).toMatchObject({ xp: 120 });
    expect(normalizeProgress('x')).toEqual(emptyProgress);
  });
});
