import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { colors, layout, radius, spacing } from '@/core/theme';
import { AppText } from '@/ui';

export type ActivityStatus = 'done' | 'next' | 'todo';

export interface ActivityRowProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  title: string;
  subtitle?: string;
  status: ActivityStatus;
  onPress: () => void;
  testID?: string;
}

export function ActivityRow({ icon, title, subtitle, status, onPress, testID }: ActivityRowProps) {
  const isDone = status === 'done';
  const isNext = status === 'next';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={subtitle ? `${title}, ${subtitle}` : title}
      accessibilityState={{ checked: isDone }}
      testID={testID}
      style={({ pressed }) => [styles.row, isNext && styles.rowNext, pressed && styles.pressed]}
    >
      <View
        style={[
          styles.badge,
          isDone && { backgroundColor: colors.successSoft },
          isNext && { backgroundColor: colors.primary },
        ]}
      >
        <Ionicons
          name={isDone ? 'checkmark' : icon}
          size={18}
          color={isDone ? colors.success : isNext ? colors.textOnAccent : colors.textMuted}
        />
      </View>
      <View style={styles.text}>
        <AppText variant="bodyStrong" numberOfLines={2}>
          {title}
        </AppText>
        {subtitle ? (
          <AppText variant="caption" color="muted" numberOfLines={1}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: layout.minTouchTarget + 12,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
  },
  rowNext: { backgroundColor: colors.primarySoft },
  pressed: { backgroundColor: colors.surfacePressed },
  badge: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: { flex: 1, gap: spacing.xxs },
});
