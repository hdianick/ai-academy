import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { isDemoMode } from '@/core/config/env';
import { colors, radius, spacing } from '@/core/theme';

import { AppText } from './AppText';

/** Avviso sempre visibile quando l'app non è collegata a un backend reale. */
export function DemoBanner({ visible = isDemoMode }: { visible?: boolean }) {
  const { t } = useTranslation();
  if (!visible) return null;

  return (
    <View style={styles.banner} accessibilityRole="text" testID="demo-banner">
      <Ionicons name="flask-outline" size={14} color={colors.warning} />
      <AppText variant="caption" style={styles.text}>
        {t('demo.banner')}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.warningSoft,
  },
  text: { color: colors.warning, flex: 1 },
});
