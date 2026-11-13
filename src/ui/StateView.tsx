import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';

import { AppText } from './AppText';
import { Button } from './Button';

type IconName = ComponentProps<typeof Ionicons>['name'];

export function LoadingState({ label }: { label?: string }) {
  const { t } = useTranslation();
  const text = label ?? t('common.loading');
  return (
    <View style={styles.container} accessibilityRole="progressbar" accessibilityLabel={text}>
      <ActivityIndicator color={colors.primary} size="large" />
      <AppText color="secondary">{text}</AppText>
    </View>
  );
}

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: IconName;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title,
  description,
  icon = 'sparkles-outline',
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={28} color={colors.primary} />
      </View>
      <AppText variant="heading" align="center">
        {title}
      </AppText>
      {description ? (
        <AppText color="secondary" align="center">
          {description}
        </AppText>
      ) : null}
      {actionLabel && onAction ? <Button label={actionLabel} onPress={onAction} /> : null}
    </View>
  );
}

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container} accessibilityRole="alert">
      <View style={[styles.iconWrap, styles.errorIconWrap]}>
        <Ionicons name="alert-circle-outline" size={28} color={colors.danger} />
      </View>
      <AppText variant="heading" align="center">
        {title ?? t('common.errorTitle')}
      </AppText>
      <AppText color="secondary" align="center">
        {description ?? t('common.errorDescription')}
      </AppText>
      {onRetry ? <Button label={t('common.retry')} onPress={onRetry} variant="secondary" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    gap: spacing.md,
  },
  iconWrap: {
    width: 56,
    height: 56,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  errorIconWrap: { backgroundColor: colors.dangerSoft },
});
