import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { EmptyState, Screen } from '@/ui';

export default function NotFoundScreen() {
  const { t } = useTranslation();
  return (
    <Screen scroll={false}>
      <EmptyState
        icon="compass-outline"
        title={t('common.notFoundTitle')}
        actionLabel={t('common.backHome')}
        onAction={() => router.replace('/')}
      />
    </Screen>
  );
}
