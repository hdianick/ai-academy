import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/core/theme';

import { AppText } from './AppText';

export interface StatTileProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  value: string;
  label: string;
  color?: string;
}

export function StatTile({ icon, value, label, color = colors.primary }: StatTileProps) {
  return (
    <View style={styles.tile} accessible accessibilityLabel={`${label}: ${value}`}>
      <Ionicons name={icon} size={18} color={color} />
      <AppText variant="heading">{value}</AppText>
      <AppText variant="caption" color="muted" numberOfLines={2}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    padding: spacing.md,
    gap: spacing.xs,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
  },
});
