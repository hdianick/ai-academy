import Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, radius, spacing } from '@/core/theme';
import { AppText, Button } from '@/ui';

export interface ResultAction {
  label: string;
  onPress: () => void;
  testID?: string;
}

export interface ResultViewProps {
  icon: ComponentProps<typeof Ionicons>['name'];
  tone: 'success' | 'warning';
  title: string;
  highlight?: string;
  lines: string[];
  primary: ResultAction;
  secondary?: ResultAction;
}

/** Schermata di esito alla fine di una lezione o di un quiz. */
export function ResultView({
  icon,
  tone,
  title,
  highlight,
  lines,
  primary,
  secondary,
}: ResultViewProps) {
  const color = tone === 'success' ? colors.success : colors.warning;
  const soft = tone === 'success' ? colors.successSoft : colors.warningSoft;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.inner}>
        <View style={styles.center}>
          <View style={[styles.iconWrap, { backgroundColor: soft }]}>
            <Ionicons name={icon} size={44} color={color} />
          </View>
          <AppText variant="title" align="center" accessibilityRole="header">
            {title}
          </AppText>
          {highlight ? (
            <AppText variant="display" color="xp" align="center" testID="result-highlight">
              {highlight}
            </AppText>
          ) : null}
          {lines.map((line) => (
            <AppText key={line} color="secondary" align="center">
              {line}
            </AppText>
          ))}
        </View>
        <View style={styles.actions}>
          <Button
            label={primary.label}
            onPress={primary.onPress}
            fullWidth
            testID={primary.testID}
          />
          {secondary ? (
            <Button
              label={secondary.label}
              onPress={secondary.onPress}
              variant="secondary"
              fullWidth
              testID={secondary.testID}
            />
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  inner: {
    flex: 1,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    padding: spacing.xl,
    justifyContent: 'space-between',
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md },
  iconWrap: {
    width: 96,
    height: 96,
    borderRadius: radius.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  actions: { gap: spacing.sm },
});
