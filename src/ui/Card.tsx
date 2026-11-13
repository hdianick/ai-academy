import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { colors, radius, spacing } from '@/core/theme';

export interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'highlight';
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  testID?: string;
}

export function Card({
  children,
  onPress,
  variant = 'default',
  style,
  accessibilityLabel,
  testID,
}: CardProps) {
  const cardStyle = [styles.base, styles[variant], style];

  if (!onPress) {
    return (
      <View style={cardStyle} testID={testID}>
        {children}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      style={({ pressed }) => [cardStyle, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    borderWidth: StyleSheet.hairlineWidth,
    gap: spacing.sm,
  },
  default: { backgroundColor: colors.surface, borderColor: colors.border },
  elevated: { backgroundColor: colors.surfaceElevated, borderColor: colors.borderStrong },
  highlight: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  pressed: { opacity: 0.85, transform: [{ scale: 0.99 }] },
});
