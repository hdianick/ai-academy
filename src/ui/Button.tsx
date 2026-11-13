import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';

import { colors, layout, radius, spacing } from '@/core/theme';

import { AppText } from './AppText';

export interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  accessibilityHint?: string;
  testID?: string;
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  fullWidth = false,
  accessibilityHint,
  testID,
}: ButtonProps) {
  const isInactive = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isInactive}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isInactive, busy: loading }}
      testID={testID}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        pressed && !isInactive && pressedStyles[variant],
        isInactive && styles.inactive,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            color={variant === 'ghost' ? colors.primary : colors.textOnAccent}
            accessibilityLabel={label}
          />
        ) : (
          <AppText variant="bodyStrong" color={variant === 'ghost' ? 'accent' : 'primary'}>
            {label}
          </AppText>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: layout.minTouchTarget + 4,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  fullWidth: { alignSelf: 'stretch' },
  primary: { backgroundColor: colors.primary },
  secondary: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  ghost: { backgroundColor: 'transparent' },
  inactive: { opacity: 0.5 },
});

const pressedStyles = StyleSheet.create({
  primary: { backgroundColor: colors.primaryPressed },
  secondary: { backgroundColor: colors.surfacePressed },
  ghost: { backgroundColor: colors.primarySoft },
});
