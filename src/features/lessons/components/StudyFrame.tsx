import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, layout, radius, spacing } from '@/core/theme';

/** Cornice comune per teoria e domande: barra in alto, contenuto scorrevole, piede con i pulsanti. */
export function StudyFrame({
  header,
  footer,
  children,
  scrollKey,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
  /** Cambiando chiave il contenuto riparte dall'alto (nuova pagina). */
  scrollKey: string;
}) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>{header}</View>
      <ScrollView
        key={scrollKey}
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>{children}</View>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.inner}>{footer}</View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  header: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  content: { paddingVertical: spacing.lg, paddingBottom: spacing.huge },
  inner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  footer: {
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
});
