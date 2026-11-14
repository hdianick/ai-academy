import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { useAuthStore } from '@/features/auth/store';
import { AppText, Card, IconButton, Screen } from '@/ui';

function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/profile');
}

/** Cornice comune alle schermate di accesso, con avviso esplicito in modalità demo. */
export function AuthShell({
  title,
  subtitle,
  children,
  testID,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  testID?: string;
}) {
  const { t } = useTranslation();
  const status = useAuthStore((s) => s.status);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Screen testID={testID}>
        <IconButton icon="arrow-back" accessibilityLabel={t('common.back')} onPress={goBack} />
        <View style={styles.header}>
          <View style={styles.logo}>
            <Ionicons name="sparkles" size={26} color={colors.textOnAccent} />
          </View>
          <AppText variant="title">{title}</AppText>
          <AppText color="secondary">{subtitle}</AppText>
        </View>
        {status === 'demo' ? (
          <Card variant="highlight" testID="auth-demo-notice">
            <View style={styles.row}>
              <Ionicons name="flask-outline" size={20} color={colors.warning} />
              <AppText variant="subheading" style={styles.flex}>
                {t('auth.demoTitle')}
              </AppText>
            </View>
            <AppText color="secondary">{t('auth.demoDescription')}</AppText>
          </Card>
        ) : null}
        {children}
      </Screen>
    </KeyboardAvoidingView>
  );
}

export function FormMessage({ tone, text }: { tone: 'success' | 'danger'; text: string }) {
  return (
    <View
      style={[styles.message, tone === 'success' ? styles.success : styles.danger]}
      accessibilityLiveRegion="polite"
      accessibilityRole="alert"
    >
      <Ionicons
        name={tone === 'success' ? 'checkmark-circle' : 'alert-circle'}
        size={18}
        color={tone === 'success' ? colors.success : colors.danger}
      />
      <AppText color={tone} style={styles.flex}>
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { gap: spacing.sm, alignItems: 'flex-start' },
  logo: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  message: {
    flexDirection: 'row',
    gap: spacing.sm,
    alignItems: 'flex-start',
    padding: spacing.md,
    borderRadius: radius.md,
  },
  success: { backgroundColor: colors.successSurface },
  danger: { backgroundColor: colors.dangerSurface },
});
