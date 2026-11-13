import { StyleSheet, View } from 'react-native';

import { spacing } from '@/core/theme';

import { AppText } from './AppText';

export function ScreenHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.container}>
      <AppText variant="title">{title}</AppText>
      {subtitle ? <AppText color="secondary">{subtitle}</AppText> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
});
