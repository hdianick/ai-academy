import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { spacing } from '@/core/theme';
import {
  createAnnouncement,
  deleteAnnouncement,
  listAnnouncements,
  setAnnouncementActive,
} from '@/features/admin/api';
import { AdminShell, Notice } from '@/features/admin/components/AdminShell';
import { formatDate } from '@/features/admin/format';
import type { Announcement } from '@/features/admin/types';
import { useAsyncData } from '@/features/admin/useAsyncData';
import { useAuthStore } from '@/features/auth/store';
import { AppText, Button, Card, Chip, ErrorState, LoadingState, TextField } from '@/ui';

const loadAll = () => listAnnouncements(false);

export default function AdminNotificationsScreen() {
  const { t } = useTranslation();
  const status = useAuthStore((s) => s.status);
  const { state, reload } = useAsyncData(loadAll, status === 'signedIn');

  return (
    <AdminShell
      title={t('admin.modules.notifications')}
      subtitle={t('admin.descriptions.notifications')}
      needsDatabase
      testID="screen-admin-notifications"
    >
      <Notice icon="information-circle-outline" text={t('admin.notifications.hint')} />
      <Composer onPublished={reload} />
      {state.status === 'loading' ? <LoadingState /> : null}
      {state.status === 'error' ? (
        <ErrorState description={t('admin.loadError')} onRetry={reload} />
      ) : null}
      {state.status === 'ready' ? (
        state.data.length === 0 ? (
          <AppText color="secondary">{t('admin.notifications.empty')}</AppText>
        ) : (
          state.data.map((item) => <AnnouncementCard key={item.id} item={item} onChange={reload} />)
        )
      ) : null}
    </AdminShell>
  );
}

function Composer({ onPublished }: { onPublished: () => void }) {
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const publish = async () => {
    const cleanTitle = title.trim();
    if (!cleanTitle || cleanTitle.length > 80) {
      setError(t('admin.notifications.titleRequired'));
      return;
    }
    setError(null);
    setSaving(true);
    try {
      await createAnnouncement({ title: cleanTitle, body: body.trim().slice(0, 400) });
      setTitle('');
      setBody('');
      onPublished();
    } catch {
      setError(t('admin.saveError'));
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <AppText variant="subheading">{t('admin.notifications.newTitle')}</AppText>
      <TextField
        label={t('admin.notifications.titleLabel')}
        value={title}
        onChangeText={setTitle}
        maxLength={80}
        error={error ?? undefined}
        testID="announcement-title"
      />
      <TextField
        label={t('admin.notifications.bodyLabel')}
        value={body}
        onChangeText={setBody}
        maxLength={400}
        multiline
        testID="announcement-body"
      />
      <Button
        label={t('admin.notifications.publish')}
        onPress={() => void publish()}
        loading={saving}
        testID="announcement-publish"
      />
    </Card>
  );
}

function AnnouncementCard({ item, onChange }: { item: Announcement; onChange: () => void }) {
  const { t } = useTranslation();
  const [confirming, setConfirming] = useState(false);
  const [failed, setFailed] = useState(false);

  const run = async (action: () => Promise<void>) => {
    setFailed(false);
    try {
      await action();
      onChange();
    } catch {
      setFailed(true);
    }
  };

  return (
    <Card>
      <View style={styles.row}>
        <AppText variant="subheading" style={styles.flex}>
          {item.title}
        </AppText>
        <Chip
          label={item.active ? t('admin.notifications.active') : t('admin.notifications.inactive')}
          tone={item.active ? 'success' : 'default'}
        />
      </View>
      {item.body ? <AppText color="secondary">{item.body}</AppText> : null}
      <AppText variant="caption" color="muted">
        {t('admin.notifications.published', { date: formatDate(item.createdAt) })}
      </AppText>
      {failed ? <Notice icon="alert-circle" tone="danger" text={t('admin.saveError')} /> : null}
      {confirming ? (
        <>
          <AppText variant="bodyStrong">{t('admin.notifications.confirmDelete')}</AppText>
          <View style={styles.actions}>
            <Button
              label={t('admin.notifications.delete')}
              onPress={() => void run(() => deleteAnnouncement(item.id))}
            />
            <Button
              label={t('admin.notifications.cancel')}
              variant="ghost"
              onPress={() => setConfirming(false)}
            />
          </View>
        </>
      ) : (
        <View style={styles.actions}>
          <Button
            label={item.active ? t('admin.notifications.hide') : t('admin.notifications.show')}
            variant="secondary"
            onPress={() => void run(() => setAnnouncementActive(item.id, !item.active))}
          />
          <Button
            label={t('admin.notifications.delete')}
            variant="ghost"
            onPress={() => setConfirming(true)}
          />
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
