import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { AuthShell, FormMessage } from '@/features/auth/components/AuthShell';
import { useAuthStore } from '@/features/auth/store';
import {
  PASSWORD_MIN_LENGTH,
  signUpSchema,
  validate,
  type FieldErrors,
} from '@/features/auth/validation';
import { Button, TextField } from '@/ui';

type Values = { displayName: string; email: string; password: string; confirmPassword: string };

export default function RegisterScreen() {
  const { t } = useTranslation();
  const status = useAuthStore((s) => s.status);
  const signUp = useAuthStore((s) => s.signUp);
  const [values, setValues] = useState<Values>({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FieldErrors<Values>>({});
  const [message, setMessage] = useState<{ tone: 'success' | 'danger'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const demo = status === 'demo';

  const field = (key: keyof Values) => ({
    value: values[key],
    onChangeText: (text: string) => setValues((v) => ({ ...v, [key]: text })),
    error: errors[key] ? t(errors[key]) : undefined,
    editable: !demo,
    testID: `register-${key}`,
  });

  const submit = async () => {
    setMessage(null);
    const result = validate(signUpSchema, values);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setLoading(true);
    const response = await signUp(result.data);
    setLoading(false);
    if (!response.ok) setMessage({ tone: 'danger', text: t(response.error) });
    else if (response.needsConfirmation)
      setMessage({ tone: 'success', text: t('auth.confirmEmail') });
    else router.replace('/profile');
  };

  return (
    <AuthShell
      title={t('auth.signUpTitle')}
      subtitle={t('auth.signUpSubtitle')}
      testID="screen-register"
    >
      <View style={styles.form}>
        <TextField label={t('auth.displayName')} autoComplete="name" {...field('displayName')} />
        <TextField
          label={t('auth.email')}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          {...field('email')}
        />
        <TextField
          label={t('auth.password')}
          hint={t('auth.passwordHint', { count: PASSWORD_MIN_LENGTH })}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          {...field('password')}
        />
        <TextField
          label={t('auth.confirmPassword')}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
          textContentType="newPassword"
          onSubmitEditing={() => void submit()}
          {...field('confirmPassword')}
        />
        {message ? <FormMessage tone={message.tone} text={message.text} /> : null}
        <Button
          label={t('auth.signUpAction')}
          onPress={() => void submit()}
          loading={loading}
          disabled={demo}
          fullWidth
          testID="register-submit"
        />
        <Button
          label={t('auth.haveAccount')}
          variant="ghost"
          onPress={() => router.replace('/login')}
        />
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({ form: { gap: spacing.lg } });
