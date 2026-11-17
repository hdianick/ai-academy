import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { AppText, Button } from '@/ui';

import { useUpdateStore } from './store';

/** Avviso "nuova versione" mostrato solo se non è stato possibile aggiornare da soli. */
export function UpdateBanner() {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const available = useUpdateStore((s) => s.available);
  const apply = useUpdateStore((s) => s.apply);
  if (!available) return null;

  return (
    <View
      style={[styles.wrap, { bottom: insets.bottom + spacing.xl * 3 }]}
      pointerEvents="box-none"
    >
      <View style={styles.banner} accessibilityRole="alert" testID="update-banner">
        <Ionicons name="sparkles" size={18} color={colors.accent} />
        <AppText style={styles.flex}>{t('updates.available')}</AppText>
        <Button label={t('updates.apply')} onPress={apply} testID="update-apply" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  banner: {
    width: '100%',
    maxWidth: 520,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  flex: { flex: 1 },
});
