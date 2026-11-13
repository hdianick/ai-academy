import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/core/theme';
import { TutorChat } from '@/features/tutor/components/TutorChat';

export default function TutorScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']} testID="screen-tutor">
      <TutorChat />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
});
