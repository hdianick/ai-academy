/**
 * Validazione dei moduli di accesso. Restituisce chiavi i18n (non testi) per gli errori.
 */
import { z } from 'zod';

export type AuthErrorKey =
  | 'auth.errors.emailInvalid'
  | 'auth.errors.passwordTooShort'
  | 'auth.errors.passwordWeak'
  | 'auth.errors.passwordMismatch'
  | 'auth.errors.nameInvalid';

export const PASSWORD_MIN_LENGTH = 8;

const email = z.string().trim().email('auth.errors.emailInvalid');
const password = z
  .string()
  .min(PASSWORD_MIN_LENGTH, 'auth.errors.passwordTooShort')
  .regex(/[A-Za-z]/, 'auth.errors.passwordWeak')
  .regex(/[0-9]/, 'auth.errors.passwordWeak');

export const signInSchema = z.object({
  email,
  password: z.string().min(1, 'auth.errors.passwordTooShort'),
});

export const signUpSchema = z
  .object({
    displayName: z
      .string()
      .trim()
      .min(2, 'auth.errors.nameInvalid')
      .max(40, 'auth.errors.nameInvalid'),
    email,
    password,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'auth.errors.passwordMismatch',
    path: ['confirmPassword'],
  });

export const resetSchema = z.object({ email });

export type FieldErrors<T> = Partial<Record<keyof T, AuthErrorKey>>;

/** Valida e restituisce i dati puliti oppure il primo errore per ciascun campo. */
export function validate<T extends z.ZodTypeAny>(
  schema: T,
  values: unknown,
): { ok: true; data: z.infer<T> } | { ok: false; errors: FieldErrors<z.infer<T>> } {
  const result = schema.safeParse(values);
  if (result.success) return { ok: true, data: result.data };
  const errors: Record<string, AuthErrorKey> = {};
  for (const issue of result.error.issues) {
    const field = String(issue.path[0] ?? '');
    if (field && !errors[field]) errors[field] = issue.message as AuthErrorKey;
  }
  return { ok: false, errors: errors as FieldErrors<z.infer<T>> };
}
