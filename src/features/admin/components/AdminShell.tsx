import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { useAuthStore } from '@/features/auth/store';
import { useIsStaff } from '@/features/entitlements/hooks';
import { AppText, EmptyState, IconButton, Screen, ScreenHeader } from '@/ui';

function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/admin');
}

/**
 * Cornice delle schermate admin: controlla il ruolo (il database lo verifica comunque)
 * e, se richiesto, che gli account reali siano attivi.
 */
export function AdminShell({
  title,
  subtitle,
  children,
  needsDatabase = false,
  testID,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  needsDatabase?: boolean;
  testID?: string;
}) {
  const { t } = useTranslation();
  const isStaff = useIsStaff();
  const status = useAuthStore((s) => s.status);

  if (!isStaff) {
    return (
      <Screen scroll={false} testID="admin-denied">
        <EmptyState
          icon="lock-closed-outline"
          title={t('admin.denied')}
          actionLabel={t('common.backHome')}
          onAction={() => router.replace('/')}
        />
      </Screen>
    );
  }

  return (
    <Screen testID={testID}>
      <IconButton icon="arrow-back" accessibilityLabel={t('common.back')} onPress={goBack} />
      <ScreenHeader title={title} subtitle={subtitle} />
      {needsDatabase && status !== 'signedIn' ? (
        <Notice icon="cloud-offline-outline" text={t('admin.needsAccounts')} />
      ) : (
        children
      )}
    </Screen>
  );
}

export function Notice({
  icon,
  text,
  tone = 'info',
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  text: string;
  tone?: 'info' | 'success' | 'danger';
}) {
  const color =
    tone === 'success' ? colors.success : tone === 'danger' ? colors.danger : colors.accent;
  return (
    <View
      style={[
        styles.notice,
        tone === 'success' && styles.success,
        tone === 'danger' && styles.danger,
      ]}
      accessibilityRole={tone === 'danger' ? 'alert' : 'text'}
      accessibilityLiveRegion="polite"
    >
      <Ionicons name={icon} size={18} color={color} />
      <AppText color="secondary" style={styles.flex}>
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  notice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  success: { backgroundColor: colors.successSurface, borderColor: colors.successSurface },
  danger: { backgroundColor: colors.dangerSurface, borderColor: colors.dangerSurface },
});
