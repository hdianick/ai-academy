import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { AuthShell, FormMessage } from '@/features/auth/components/AuthShell';
import { useAuthStore } from '@/features/auth/store';
import {
  newPasswordSchema,
  PASSWORD_MIN_LENGTH,
  validate,
  type FieldErrors,
} from '@/features/auth/validation';
import { Button, TextField } from '@/ui';

type Values = { password: string; confirmPassword: string };

/** Aperta dal link dell'email di recupero: imposta la nuova password. */
export default function UpdatePasswordScreen() {
  const { t } = useTranslation();
  const status = useAuthStore((s) => s.status);
  const updatePassword = useAuthStore((s) => s.updatePassword);
  const [values, setValues] = useState<Values>({ password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<FieldErrors<Values>>({});
  const [message, setMessage] = useState<{ tone: 'success' | 'danger'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const disabled = status === 'demo' || done;

  const submit = async () => {
    setMessage(null);
    const result = validate(newPasswordSchema, values);
    if (!result.ok) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setLoading(true);
    const response = await updatePassword(result.data.password);
    setLoading(false);
    if (response.ok) {
      setDone(true);
      setMessage({ tone: 'success', text: t('auth.passwordUpdated') });
    } else setMessage({ tone: 'danger', text: t(response.error) });
  };

  return (
    <AuthShell
      title={t('auth.newPasswordTitle')}
      subtitle={t('auth.newPasswordSubtitle')}
      testID="screen-update-password"
    >
      <View style={styles.form}>
        <TextField
          label={t('auth.password')}
          hint={t('auth.passwordHint', { count: PASSWORD_MIN_LENGTH })}
          value={values.password}
          onChangeText={(password) => setValues((v) => ({ ...v, password }))}
          error={errors.password ? t(errors.password) : undefined}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
          editable={!disabled}
        />
        <TextField
          label={t('auth.confirmPassword')}
          value={values.confirmPassword}
          onChangeText={(confirmPassword) => setValues((v) => ({ ...v, confirmPassword }))}
          error={errors.confirmPassword ? t(errors.confirmPassword) : undefined}
          secureTextEntry
          autoCapitalize="none"
          autoComplete="new-password"
          editable={!disabled}
          onSubmitEditing={() => void submit()}
        />
        {message ? <FormMessage tone={message.tone} text={message.text} /> : null}
        {done ? (
          <Button
            label={t('auth.goToProfile')}
            onPress={() => router.replace('/profile')}
            fullWidth
          />
        ) : (
          <Button
            label={t('auth.newPasswordAction')}
            onPress={() => void submit()}
            loading={loading}
            disabled={disabled}
            fullWidth
          />
        )}
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({ form: { gap: spacing.lg } });
