import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, spacing } from '@/core/theme';
import { listProfiles } from '@/features/admin/api';
import { AdminShell } from '@/features/admin/components/AdminShell';
import { appRoles } from '@/features/admin/types';
import { useAsyncData } from '@/features/admin/useAsyncData';
import { useAuthStore, type AppRole } from '@/features/auth/store';
import { AppText, Card, Chip, LoadingState } from '@/ui';

type Permission = 'learn' | 'admin' | 'stats' | 'announcements' | 'content' | 'users';

/** Matrice dei permessi: rispecchia le regole RLS del database. */
const matrix: Record<Permission, AppRole[]> = {
  learn: ['user', 'editor', 'admin'],
  admin: ['editor', 'admin'],
  stats: ['editor', 'admin'],
  announcements: ['editor', 'admin'],
  content: ['editor', 'admin'],
  users: ['admin'],
};

export default function AdminRolesScreen() {
  const { t } = useTranslation();
  const status = useAuthStore((s) => s.status);
  const { state } = useAsyncData(listProfiles, status === 'signedIn');

  return (
    <AdminShell
      title={t('admin.modules.roles')}
      subtitle={t('admin.descriptions.roles')}
      testID="screen-admin-roles"
    >
      {appRoles.map((role) => (
        <Card key={role}>
          <AppText variant="subheading">{t(`admin.roles.${role}`)}</AppText>
          <AppText color="secondary">{t(`admin.roles.${role}Desc`)}</AppText>
          {(Object.keys(matrix) as Permission[]).map((perm) => {
            const allowed = matrix[perm].includes(role);
            return (
              <View key={perm} style={styles.perm}>
                <Ionicons
                  name={allowed ? 'checkmark-circle' : 'close-circle-outline'}
                  size={18}
                  color={allowed ? colors.success : colors.textMuted}
                />
                <AppText color={allowed ? 'primary' : 'muted'} style={styles.flex}>
                  {t(`admin.roles.perms.${perm}`)}
                </AppText>
              </View>
            );
          })}
        </Card>
      ))}

      {status === 'signedIn' ? (
        <>
          <AppText variant="heading">{t('admin.roles.staffTitle')}</AppText>
          {state.status === 'loading' ? <LoadingState /> : null}
          {state.status === 'ready'
            ? state.data
                .filter((p) => p.role !== 'user')
                .map((profile) => (
                  <Card key={profile.id}>
                    <View style={styles.row}>
                      <View style={styles.flex}>
                        <AppText variant="bodyStrong">
                          {profile.displayName || t('admin.users.noName')}
                        </AppText>
                        <AppText variant="caption" color="muted">
                          {profile.email ?? t('admin.users.noEmail')}
                        </AppText>
                      </View>
                      <Chip label={t(`admin.roles.${profile.role}`)} tone="accent" />
                    </View>
                  </Card>
                ))
            : null}
        </>
      ) : null}
    </AdminShell>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  perm: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
});
