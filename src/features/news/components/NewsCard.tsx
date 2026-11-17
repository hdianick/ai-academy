import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, spacing } from '@/core/theme';
import { AppText, Card, Chip } from '@/ui';

import { formatDay } from '../news';
import type { NewsItem } from '../types';

const kindTone = { launch: 'accent', change: 'warning', closure: 'default' } as const;

/** Notizia con data, tipo, riassunto e link alla fonte. */
export function NewsCard({ item, compact = false }: { item: NewsItem; compact?: boolean }) {
  const { t, i18n } = useTranslation();
  return (
    <Card testID={`news-${item.id}`}>
      <View style={styles.row}>
        <Chip label={t(`news.kinds.${item.kind}`)} tone={kindTone[item.kind]} />
        <AppText variant="caption" color="muted">
          {formatDay(item.date, i18n.language)}
        </AppText>
      </View>
      <AppText variant="subheading">{item.title}</AppText>
      {compact ? null : <AppText color="secondary">{item.summary}</AppText>}
      <Link href={item.source.url as `https://${string}`} target="_blank" rel="noopener noreferrer">
        <View style={styles.source} accessibilityRole="link">
          <Ionicons name="open-outline" size={14} color={colors.accent} />
          <AppText variant="caption" color="accent">
            {t('news.source', { name: item.source.name })}
          </AppText>
        </View>
      </Link>
    </Card>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  source: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
});
