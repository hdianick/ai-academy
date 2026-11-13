import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { toolsRepository } from '@/data/repositories/tools';
import { filterTools } from '@/features/tools/catalog';
import { ToolCard } from '@/features/tools/components/ToolCard';
import { toolCategories, type ToolCategory } from '@/features/tools/types';
import { AppText, Chip, EmptyState, IconButton, Screen, ScreenHeader, SearchField } from '@/ui';

function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/');
}

export default function ToolsScreen() {
  const { t } = useTranslation();
  const tools = toolsRepository.list();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ToolCategory | null>(null);
  const results = filterTools(tools, { query, category });

  return (
    <Screen testID="screen-tools">
      <IconButton icon="arrow-back" onPress={goBack} accessibilityLabel={t('common.back')} />
      <ScreenHeader title={t('tools.title')} subtitle={t('tools.subtitle')} />

      <SearchField
        value={query}
        onChangeText={setQuery}
        placeholder={t('tools.searchPlaceholder')}
        accessibilityLabel={t('tools.searchLabel')}
        clearLabel={t('academy.clearSearch')}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        <Chip
          label={t('academy.filterAll')}
          selected={!category}
          onPress={() => setCategory(null)}
        />
        {toolCategories.map((value) => (
          <Chip
            key={value}
            label={t(`tools.categories.${value}`)}
            selected={category === value}
            onPress={() => setCategory(category === value ? null : value)}
            testID={`tool-filter-${value}`}
          />
        ))}
      </ScrollView>

      <AppText variant="caption" color="muted" accessibilityLiveRegion="polite">
        {t('tools.results', { count: results.length })}
      </AppText>

      {results.length === 0 ? (
        <EmptyState
          icon="search-outline"
          title={t('tools.noResultsTitle')}
          description={t('academy.noResultsDescription')}
          actionLabel={t('academy.clearFilters')}
          onAction={() => {
            setQuery('');
            setCategory(null);
          }}
        />
      ) : (
        <View style={styles.list}>
          {results.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              onPress={() =>
                router.push({ pathname: '/tools/[toolId]', params: { toolId: tool.id } })
              }
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  chips: { gap: spacing.xs, paddingRight: spacing.xl },
  list: { gap: spacing.md },
});
