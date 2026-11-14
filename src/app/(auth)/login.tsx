import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { AuthShell, FormMessage } from '@/features/auth/components/AuthShell';
import { useAuthStore } from '@/features/auth/store';
import type { AuthServiceErrorKey } from '@/features/auth/errors';
import { signInSchema, validate, type FieldErrors } from '@/features/auth/validation';
import { Button, TextField } from '@/ui';

type Values = { email: string; password: string };

export default function LoginScreen() {
  const { t } = useTranslation();
  const status = useAuthStore((s) => s.status);
  const signIn = useAuthStore((s) => s.signIn);
  const [values, setValues] = useState<Values>({ email: '', password: '' });
  const [errors, setErrors] = useState<FieldErrors<Values>>({});
  const [serverError, setServerError] = useState<AuthServiceErrorKey | null>(null);
  const [loading, setLoading] = useState(false);
  const demo = status === 'demo';

  const submit = async () => {
    setServerError(null);
    const result = validate(signInSchema, values);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setLoading(true);
    const response = await signIn(result.data.email, result.data.password);
    setLoading(false);
    if (response.ok) router.replace('/profile');
    else setServerError(response.error);
  };

  return (
    <AuthShell
      title={t('auth.signInTitle')}
      subtitle={t('auth.signInSubtitle')}
      testID="screen-login"
    >
      <View style={styles.form}>
        <TextField
          label={t('auth.email')}
          value={values.email}
          onChangeText={(email) => setValues((v) => ({ ...v, email }))}
          error={errors.email ? t(errors.email) : undefined}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          editable={!demo}
          testID="login-email"
        />
        <TextField
          label={t('auth.password')}
          value={values.password}
          onChangeText={(password) => setValues((v) => ({ ...v, password }))}
          error={errors.password ? t(errors.password) : undefined}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="current-password"
          textContentType="password"
          editable={!demo}
          onSubmitEditing={() => void submit()}
          testID="login-password"
        />
        {serverError ? <FormMessage tone="danger" text={t(serverError)} /> : null}
        <Button
          label={t('auth.signInAction')}
          onPress={() => void submit()}
          loading={loading}
          disabled={demo}
          fullWidth
          testID="login-submit"
        />
        <Button
          label={t('auth.forgotPassword')}
          variant="ghost"
          onPress={() => router.push('/forgot-password')}
        />
        <Button
          label={t('auth.noAccount')}
          variant="ghost"
          onPress={() => router.replace('/register')}
          testID="login-to-register"
        />
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({ form: { gap: spacing.lg } });
