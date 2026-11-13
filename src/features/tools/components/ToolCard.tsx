import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, radius, spacing } from '@/core/theme';
import type { AiTool } from '@/features/tools/types';
import { AppText, Card, Chip } from '@/ui';

export function ToolIcon({ tool, size = 44 }: { tool: AiTool; size?: number }) {
  return (
    <View style={[styles.icon, { width: size, height: size, borderRadius: size / 3.2 }]}>
      <Ionicons
        name={tool.icon as ComponentProps<typeof Ionicons>['name']}
        size={size * 0.5}
        color={colors.accent}
      />
    </View>
  );
}

export function ToolCard({ tool, onPress }: { tool: AiTool; onPress: () => void }) {
  const { t } = useTranslation();
  const mainCategory = tool.categories[0];
  return (
    <Card
      onPress={onPress}
      accessibilityLabel={`${tool.name}, ${tool.tagline}`}
      testID={`tool-card-${tool.id}`}
    >
      <View style={styles.row}>
        <ToolIcon tool={tool} />
        <View style={styles.flex}>
          <AppText variant="subheading">{tool.name}</AppText>
          <AppText variant="caption" color="muted">
            {t('tools.byCompany', { company: tool.company })}
          </AppText>
        </View>
        <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
      </View>
      <AppText color="secondary" numberOfLines={2}>
        {tool.tagline}
      </AppText>
      <View style={styles.chips}>
        {mainCategory ? <Chip label={t(`tools.categories.${mainCategory}`)} tone="accent" /> : null}
        <Chip label={t(`levels.${tool.difficulty}`)} />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  flex: { flex: 1 },
  icon: {
    backgroundColor: colors.secondarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radius.md,
  },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
});
