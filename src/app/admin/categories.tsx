import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { coursesRepository } from '@/data/repositories/courses';
import { toolsRepository } from '@/data/repositories/tools';
import { AdminShell } from '@/features/admin/components/AdminShell';
import { courseCategories } from '@/features/courses/types';
import { toolCategories } from '@/features/tools/types';
import { AppText, Card } from '@/ui';

export default function AdminCategoriesScreen() {
  const { t } = useTranslation();
  const courses = coursesRepository.list();
  const tools = toolsRepository.list();

  return (
    <AdminShell
      title={t('admin.modules.categories')}
      subtitle={t('admin.descriptions.categories')}
      testID="screen-admin-categories"
    >
      <Card>
        <AppText variant="subheading">{t('admin.categories.courses')}</AppText>
        {courseCategories.map((category) => (
          <View key={category} style={styles.row}>
            <AppText style={styles.flex}>{t(`categories.${category}`)}</AppText>
            <AppText variant="caption" color="muted">
              {t('admin.categories.courseCount', {
                count: courses.filter((c) => c.category === category).length,
              })}
            </AppText>
          </View>
        ))}
      </Card>
      <Card>
        <AppText variant="subheading">{t('admin.categories.tools')}</AppText>
        {toolCategories.map((category) => (
          <View key={category} style={styles.row}>
            <AppText style={styles.flex}>{t(`tools.categories.${category}`)}</AppText>
            <AppText variant="caption" color="muted">
              {t('admin.categories.toolCount', {
                count: tools.filter((tool) => tool.categories.includes(category)).length,
              })}
            </AppText>
          </View>
        ))}
      </Card>
    </AdminShell>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, paddingVertical: spacing.xs },
});
