import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { toolsRepository } from '@/data/repositories/tools';
import { AdminShell, Notice } from '@/features/admin/components/AdminShell';
import { AppText, Card, Chip } from '@/ui';

export default function AdminToolsScreen() {
  const { t } = useTranslation();
  const tools = [...toolsRepository.list()].sort((a, b) =>
    a.lastReviewed.localeCompare(b.lastReviewed),
  );

  return (
    <AdminShell
      title={t('admin.modules.tools')}
      subtitle={t('admin.tools.count', { count: tools.length })}
      testID="screen-admin-tools"
    >
      <Notice icon="code-slash-outline" text={t('admin.content.editNote')} />
      {tools.map((tool) => (
        <Card
          key={tool.id}
          onPress={() => router.push({ pathname: '/tools/[toolId]', params: { toolId: tool.id } })}
          accessibilityLabel={tool.name}
        >
          <View style={styles.row}>
            <View style={styles.flex}>
              <AppText variant="subheading">{tool.name}</AppText>
              <AppText variant="caption" color="muted">
                {tool.company} · {t(`tools.categories.${tool.categories[0] ?? 'chatbots'}`)}
              </AppText>
            </View>
            <Chip label={t('admin.tools.reviewed', { date: tool.lastReviewed })} />
          </View>
          <AppText variant="caption" color="muted">
            {t('admin.tools.courses', { count: tool.relatedCourseIds.length })}
          </AppText>
        </Card>
      ))}
    </AdminShell>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
