import { useTranslation } from 'react-i18next';

import { AppText, Card, DemoBanner, ProgressBar, Screen } from '@/ui';

export default function HomeScreen() {
  const { t } = useTranslation();

  return (
    <Screen testID="screen-home">
      <DemoBanner />
      <AppText variant="overline" color="accent">
        {t('app.payoff')}
      </AppText>
      <AppText variant="title">{t('home.greeting', { name: t('home.guestName') })}</AppText>
      <AppText color="secondary">{t('home.subtitle')}</AppText>

      <Card variant="highlight">
        <AppText variant="subheading">{t('common.comingSoon')}</AppText>
        <AppText color="secondary">{t('common.comingSoonDescription')}</AppText>
        <ProgressBar progress={0} accessibilityLabel={t('common.comingSoon')} />
      </Card>
    </Screen>
  );
}
