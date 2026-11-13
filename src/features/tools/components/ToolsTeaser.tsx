import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import { toolsRepository } from '@/data/repositories/tools';
import { AppText, Card } from '@/ui';

/** Scheda che porta al catalogo AI Tools. */
export function ToolsTeaser() {
  const { t } = useTranslation();
  const count = toolsRepository.list().length;
  return (
    <Card
      onPress={() => router.push('/tools')}
      accessibilityLabel={t('tools.exploreTitle')}
      testID="tools-teaser"
    >
      <View style={styles.row}>
        <View style={styles.icon}>
          <Ionicons name="apps" size={22} color={colors.accent} />
        </View>
        <View style={styles.flex}>
          <AppText variant="subheading">{t('tools.exploreTitle')}</AppText>
          <AppText variant="caption" color="secondary">
            {t('tools.exploreDescription', { count })}
          </AppText>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.secondarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
