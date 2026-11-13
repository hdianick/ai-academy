import { StyleSheet, View } from 'react-native';

import { colors, radius } from '@/core/theme';

export interface ProgressBarProps {
  /** Valore tra 0 e 1. Valori fuori intervallo vengono limitati. */
  progress: number;
  color?: string;
  height?: number;
  accessibilityLabel?: string;
  testID?: string;
}

export function clampProgress(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

export function ProgressBar({
  progress,
  color = colors.primary,
  height = 8,
  accessibilityLabel,
  testID,
}: ProgressBarProps) {
  const value = clampProgress(progress);
  const percent = Math.round(value * 100);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{ min: 0, max: 100, now: percent }}
      testID={testID}
      style={[styles.track, { height, borderRadius: height / 2 }]}
    >
      <View
        style={[
          styles.fill,
          { width: `${percent}%`, backgroundColor: color, borderRadius: height / 2 },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { width: '100%', backgroundColor: colors.surfacePressed, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: radius.pill },
});
