import { useTranslation } from 'react-i18next';

import { ComingSoonScreen } from '@/features/placeholders/ComingSoonScreen';

export default function PracticeScreen() {
  const { t } = useTranslation();
  return (
    <ComingSoonScreen
      testID="screen-practice"
      icon="flask-outline"
      title={t('practice.title')}
      subtitle={t('practice.subtitle')}
    />
  );
}
