import { StyleSheet, View } from 'react-native';

import { colors, radius, spacing } from '@/core/theme';
import { AppText } from '@/ui';

/** Riga con etichetta, valore e barra proporzionale (accessibile come testo). */
export function BarRow({ label, value, total }: { label: string; value: number; total: number }) {
  const ratio = total > 0 ? value / total : 0;
  return (
    <View style={styles.row} accessible accessibilityLabel={`${label}: ${value}`}>
      <View style={styles.labels}>
        <AppText style={styles.flex}>{label}</AppText>
        <AppText variant="bodyStrong">{value}</AppText>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.round(ratio * 100)}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { gap: spacing.xs },
  labels: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm },
  track: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceElevated,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: radius.pill, backgroundColor: colors.primary },
});
