import { useTranslation } from 'react-i18next';

import { ComingSoonScreen } from '@/features/placeholders/ComingSoonScreen';

export default function ProfileScreen() {
  const { t } = useTranslation();
  return (
    <ComingSoonScreen
      testID="screen-profile"
      icon="person-outline"
      title={t('profile.title')}
      subtitle={t('profile.subtitle')}
    />
  );
}
