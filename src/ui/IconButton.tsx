import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { colors, layout, radius } from '@/core/theme';

export interface IconButtonProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
  accessibilityLabel: string;
  testID?: string;
}

export function IconButton({ icon, onPress, accessibilityLabel, testID }: IconButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      testID={testID}
      hitSlop={8}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
    >
      <Ionicons name={icon} size={22} color={colors.text} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: { backgroundColor: colors.surfacePressed },
});
