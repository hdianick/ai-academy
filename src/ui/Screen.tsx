import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { colors, layout, spacing } from '@/core/theme';

export interface ScreenProps {
  children: ReactNode;
  /** Se true il contenuto scorre verticalmente (default). */
  scroll?: boolean;
  edges?: Edge[];
  testID?: string;
}

/** Contenitore standard di ogni schermata: sfondo, safe area e larghezza massima su tablet/web. */
export function Screen({ children, scroll = true, edges = ['top'], testID }: ScreenProps) {
  const content = <View style={styles.inner}>{children}</View>;
  return (
    <SafeAreaView edges={edges} style={styles.safeArea} testID={testID}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  scrollContent: { flexGrow: 1, paddingBottom: spacing.xxxl },
  inner: {
    flex: 1,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
    gap: spacing.lg,
  },
});
