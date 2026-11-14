import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { colors, spacing } from '@/core/theme';
import { supabase } from '@/core/supabase/client';
import { listAnnouncements } from '@/features/admin/api';
import { useAsyncData } from '@/features/admin/useAsyncData';
import { AppText, Card } from '@/ui';

const loadActive = () => listAnnouncements(true);

/** Avvisi pubblicati dallo staff (solo con il database attivo). */
export function AnnouncementsBanner() {
  const { state } = useAsyncData(loadActive, supabase !== null);
  if (state.status !== 'ready' || state.data.length === 0) return null;

  return (
    <View style={styles.list} testID="announcements">
      {state.data.map((item) => (
        <Card key={item.id} variant="highlight">
          <View style={styles.row}>
            <Ionicons name="megaphone-outline" size={18} color={colors.accent} />
            <AppText variant="subheading" style={styles.flex}>
              {item.title}
            </AppText>
          </View>
          {item.body ? <AppText color="secondary">{item.body}</AppText> : null}
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  list: { gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});
