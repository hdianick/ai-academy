import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { AuthShell, FormMessage } from '@/features/auth/components/AuthShell';
import { useAuthStore } from '@/features/auth/store';
import { resetSchema, validate, type AuthErrorKey } from '@/features/auth/validation';
import { Button, TextField } from '@/ui';

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const status = useAuthStore((s) => s.status);
  const resetPassword = useAuthStore((s) => s.resetPassword);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<AuthErrorKey | null>(null);
  const [message, setMessage] = useState<{ tone: 'success' | 'danger'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const demo = status === 'demo';

  const submit = async () => {
    setMessage(null);
    const result = validate(resetSchema, { email });
    if (!result.ok) {
      setError(result.errors.email ?? null);
      return;
    }
    setError(null);
    setLoading(true);
    const response = await resetPassword(result.data.email);
    setLoading(false);
    // Messaggio neutro: non rivela se l'email è registrata.
    setMessage(
      response.ok || response.error === 'auth.errors.unknown'
        ? { tone: 'success', text: t('auth.resetSent') }
        : { tone: 'danger', text: t(response.error) },
    );
  };

  return (
    <AuthShell
      title={t('auth.resetTitle')}
      subtitle={t('auth.resetSubtitle')}
      testID="screen-reset"
    >
      <View style={styles.form}>
        <TextField
          label={t('auth.email')}
          value={email}
          onChangeText={setEmail}
          error={error ? t(error) : undefined}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
          editable={!demo}
          onSubmitEditing={() => void submit()}
          testID="reset-email"
        />
        {message ? <FormMessage tone={message.tone} text={message.text} /> : null}
        <Button
          label={t('auth.resetAction')}
          onPress={() => void submit()}
          loading={loading}
          disabled={demo}
          fullWidth
        />
        <Button
          label={t('auth.backToSignIn')}
          variant="ghost"
          onPress={() => router.replace('/login')}
        />
      </View>
    </AuthShell>
  );
}

const styles = StyleSheet.create({ form: { gap: spacing.lg } });
