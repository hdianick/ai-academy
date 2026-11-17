import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { newsItems } from '@/data/content/news';
import { Button, AppText } from '@/ui';

import { latestNews } from '../news';
import { NewsCard } from './NewsCard';

/** Le ultime novità in Home, con accesso alla pagina completa. */
export function NewsTeaser() {
  const { t } = useTranslation();
  const items = latestNews(newsItems, 2);
  if (items.length === 0) return null;
  return (
    <View style={styles.section} testID="home-news">
      <AppText variant="heading">{t('news.latest')}</AppText>
      {items.map((item) => (
        <NewsCard key={item.id} item={item} compact />
      ))}
      <Button label={t('news.seeAll')} variant="ghost" onPress={() => router.push('/news')} />
    </View>
  );
}

const styles = StyleSheet.create({ section: { gap: spacing.md } });
