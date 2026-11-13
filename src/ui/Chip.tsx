import { Pressable, StyleSheet, View } from 'react-native';

import { colors, layout, radius, spacing } from '@/core/theme';

import { AppText } from './AppText';

export interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  tone?: 'default' | 'accent' | 'success' | 'warning';
  testID?: string;
}

const toneStyles = {
  default: { backgroundColor: colors.surfaceElevated, color: colors.textSecondary },
  accent: { backgroundColor: colors.secondarySoft, color: colors.accent },
  success: { backgroundColor: colors.successSoft, color: colors.success },
  warning: { backgroundColor: colors.warningSoft, color: colors.warning },
} as const;

/** Etichetta compatta. Se ha onPress diventa un filtro selezionabile. */
export function Chip({ label, selected = false, onPress, tone = 'default', testID }: ChipProps) {
  const toneStyle = toneStyles[tone];
  const content = (
    <AppText
      variant="caption"
      style={{ color: selected ? colors.textOnAccent : toneStyle.color }}
      numberOfLines={1}
    >
      {label}
    </AppText>
  );

  if (!onPress) {
    return (
      <View style={[styles.base, { backgroundColor: toneStyle.backgroundColor }]} testID={testID}>
        {content}
      </View>
    );
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
      testID={testID}
      hitSlop={6}
      style={({ pressed }) => [
        styles.base,
        styles.selectable,
        { backgroundColor: selected ? colors.primary : toneStyle.backgroundColor },
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    alignSelf: 'flex-start',
  },
  selectable: {
    minHeight: layout.minTouchTarget - 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  selected: { borderColor: colors.primary },
  pressed: { opacity: 0.8 },
});
