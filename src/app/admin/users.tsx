import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import { listProfiles, updateProfileAccess } from '@/features/admin/api';
import { AdminShell, Notice } from '@/features/admin/components/AdminShell';
import { formatDate } from '@/features/admin/format';
import { filterProfiles } from '@/features/admin/stats';
import { appRoles, type AdminProfile } from '@/features/admin/types';
import { useAsyncData } from '@/features/admin/useAsyncData';
import { useAuthStore, type AppRole } from '@/features/auth/store';
import type { PlanTier } from '@/features/courses/types';
import { tierOrder } from '@/features/entitlements/entitlements';
import { useIsAdmin } from '@/features/entitlements/hooks';
import { AppText, Card, Chip, ErrorState, LoadingState, SearchField } from '@/ui';

export default function AdminUsersScreen() {
  const { t } = useTranslation();
  const status = useAuthStore((s) => s.status);
  const { state, reload } = useAsyncData(listProfiles, status === 'signedIn');

  return (
    <AdminShell
      title={t('admin.modules.users')}
      subtitle={t('admin.descriptions.users')}
      needsDatabase
      testID="screen-admin-users"
    >
      {state.status === 'loading' ? <LoadingState /> : null}
      {state.status === 'error' ? (
        <ErrorState description={t('admin.loadError')} onRetry={reload} />
      ) : null}
      {state.status === 'ready' ? <UsersList initial={state.data} /> : null}
    </AdminShell>
  );
}

function UsersList({ initial }: { initial: AdminProfile[] }) {
  const { t } = useTranslation();
  const isAdmin = useIsAdmin();
  const myId = useAuthStore((s) => s.profile?.id);
  const refreshProfile = useAuthStore((s) => s.refreshProfile);
  const [profiles, setProfiles] = useState(initial);
  const [query, setQuery] = useState('');
  const [notice, setNotice] = useState<{ tone: 'success' | 'danger'; text: string } | null>(null);

  const visible = filterProfiles(profiles, query);

  const change = async (
    profile: AdminProfile,
    changes: Partial<{ role: AppRole; plan: PlanTier }>,
  ) => {
    if (!isAdmin) {
      setNotice({ tone: 'danger', text: t('admin.adminOnly') });
      return;
    }
    if (profile.id === myId && changes.role && changes.role !== 'admin') {
      setNotice({ tone: 'danger', text: t('admin.users.selfDemote') });
      return;
    }
    const previous = profiles;
    setProfiles((list) => list.map((p) => (p.id === profile.id ? { ...p, ...changes } : p)));
    try {
      await updateProfileAccess(profile.id, changes);
      setNotice({ tone: 'success', text: t('admin.saved') });
      if (profile.id === myId) await refreshProfile();
    } catch {
      setProfiles(previous);
      setNotice({ tone: 'danger', text: t('admin.saveError') });
    }
  };

  return (
    <>
      <SearchField
        value={query}
        onChangeText={setQuery}
        placeholder={t('admin.users.search')}
        accessibilityLabel={t('admin.users.search')}
        clearLabel={t('academy.clearSearch')}
      />
      <AppText variant="caption" color="muted">
        {t('admin.users.count', { count: visible.length })}
        {isAdmin ? '' : ` · ${t('admin.readOnly')}`}
      </AppText>
      {notice ? (
        <Notice
          icon={notice.tone === 'success' ? 'checkmark-circle' : 'alert-circle'}
          tone={notice.tone}
          text={notice.text}
        />
      ) : null}
      {visible.length === 0 ? <AppText color="secondary">{t('admin.users.empty')}</AppText> : null}
      {visible.map((profile) => (
        <Card key={profile.id} testID={`user-${profile.id}`}>
          <View style={styles.header}>
            <View style={styles.flex}>
              <AppText variant="subheading">
                {profile.displayName || t('admin.users.noName')}
                {profile.id === myId ? ` · ${t('admin.users.you')}` : ''}
              </AppText>
              <AppText variant="caption" color="secondary" selectable>
                {profile.email ?? t('admin.users.noEmail')}
              </AppText>
              <AppText variant="caption" color="muted">
                {t('admin.users.joined', { date: formatDate(profile.createdAt) })}
              </AppText>
            </View>
          </View>
          <AppText variant="caption" color="muted">
            {t('admin.users.role')}
          </AppText>
          <View style={styles.chips}>
            {appRoles.map((role) => (
              <Chip
                key={role}
                label={t(`admin.roles.${role}`)}
                selected={profile.role === role}
                onPress={
                  isAdmin
                    ? () => profile.role !== role && void change(profile, { role })
                    : undefined
                }
              />
            ))}
          </View>
          <AppText variant="caption" color="muted">
            {t('admin.users.plan')}
          </AppText>
          <View style={styles.chips}>
            {tierOrder.map((plan) => (
              <Chip
                key={plan}
                label={t(`tiers.${plan}`)}
                selected={profile.plan === plan}
                tone={plan === 'free' ? 'default' : 'warning'}
                onPress={
                  isAdmin
                    ? () => profile.plan !== plan && void change(profile, { plan })
                    : undefined
                }
              />
            ))}
          </View>
        </Card>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: { flexDirection: 'row', gap: spacing.md },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
