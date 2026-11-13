import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/core/theme';
import { TutorChat } from '@/features/tutor/components/TutorChat';

/** Tutor aperto sopra una lezione: chiudendolo si torna esattamente al punto della lezione. */
export default function AskTutorScreen() {
  const { q } = useLocalSearchParams<{ q?: string }>();
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <TutorChat
        initialQuestion={q}
        onClose={() => (router.canGoBack() ? router.back() : router.replace('/tutor'))}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});
