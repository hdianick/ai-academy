import { useTranslation } from 'react-i18next';

import { ComingSoonScreen } from '@/features/placeholders/ComingSoonScreen';

export default function TutorScreen() {
  const { t } = useTranslation();
  return (
    <ComingSoonScreen
      testID="screen-tutor"
      icon="chatbubbles-outline"
      title={t('tutor.title')}
      subtitle={t('tutor.subtitle')}
    />
  );
}
