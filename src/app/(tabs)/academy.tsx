import { useTranslation } from 'react-i18next';

import { ComingSoonScreen } from '@/features/placeholders/ComingSoonScreen';

export default function AcademyScreen() {
  const { t } = useTranslation();
  return (
    <ComingSoonScreen
      testID="screen-academy"
      icon="school-outline"
      title={t('academy.title')}
      subtitle={t('academy.subtitle')}
    />
  );
}
