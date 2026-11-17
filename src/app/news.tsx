import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, spacing } from '@/core/theme';
import { newsRepository } from '@/data/repositories/news';
import { NewsCard } from '@/features/news/components/NewsCard';
import { formatDay, sortNews } from '@/features/news/news';
import { AppText, IconButton, Screen, ScreenHeader } from '@/ui';

export default function NewsScreen() {
  const { t, i18n } = useTranslation();
  return (
    <Screen testID="screen-news">
      <IconButton
        icon="arrow-back"
        accessibilityLabel={t('common.back')}
        onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
      />
      <ScreenHeader title={t('news.title')} subtitle={t('news.subtitle')} />
      <View style={styles.verified}>
        <Ionicons name="shield-checkmark-outline" size={18} color={colors.success} />
        <View style={styles.flex}>
          <AppText variant="bodyStrong">
            {t('news.verifiedOn', { date: formatDay(newsRepository.verifiedAt(), i18n.language) })}
          </AppText>
          <AppText variant="caption" color="muted">
            {t('news.autoCheck')}
          </AppText>
        </View>
      </View>
      {sortNews(newsRepository.list()).map((item) => (
        <NewsCard key={item.id} item={item} />
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  verified: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
});
