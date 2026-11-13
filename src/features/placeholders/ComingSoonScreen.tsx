import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { EmptyState, Screen, ScreenHeader } from '@/ui';

interface ComingSoonScreenProps {
  title: string;
  subtitle: string;
  icon: ComponentProps<typeof Ionicons>['name'];
  testID?: string;
}

/** Segnaposto temporaneo per le sezioni che verranno sviluppate nelle fasi successive. */
export function ComingSoonScreen({ title, subtitle, icon, testID }: ComingSoonScreenProps) {
  const { t } = useTranslation();
  return (
    <Screen testID={testID}>
      <ScreenHeader title={title} subtitle={subtitle} />
      <EmptyState
        icon={icon}
        title={t('common.comingSoon')}
        description={t('common.comingSoonDescription')}
      />
    </Screen>
  );
}
