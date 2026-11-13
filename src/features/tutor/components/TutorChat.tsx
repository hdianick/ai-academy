import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  type ScrollViewInstance,
} from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, layout, radius, spacing, typography } from '@/core/theme';
import { useTutorStore } from '@/features/tutor/store';
import type { TutorLink, TutorMessage } from '@/features/tutor/types';
import { AppText, Chip, FadeIn, IconButton } from '@/ui';

function openLink(link: TutorLink) {
  if (link.kind === 'lesson')
    router.push({ pathname: '/lesson/[lessonId]', params: { lessonId: link.id } });
  else router.push({ pathname: '/tools/[toolId]', params: { toolId: link.id } });
}

function MessageBubble({ message, onAsk }: { message: TutorMessage; onAsk: (q: string) => void }) {
  const { t } = useTranslation();
  const isUser = message.role === 'user';
  return (
    <FadeIn style={[styles.bubbleRow, isUser && styles.bubbleRowUser]}>
      {!isUser ? (
        <View style={styles.avatar}>
          <Ionicons name="sparkles" size={16} color={colors.textOnAccent} />
        </View>
      ) : null}
      <View style={[styles.bubbleCol, isUser && styles.bubbleColUser]}>
        <View
          style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleTutor]}
          accessible
          accessibilityLabel={`${isUser ? t('tutor.you') : t('tutor.tutorName')}: ${message.text}`}
          testID={isUser ? 'msg-user' : 'msg-tutor'}
        >
          <AppText>{message.text}</AppText>
          {message.isFallback && !isUser ? (
            <AppText variant="caption" color="muted">
              {t('tutor.fallbackHint')}
            </AppText>
          ) : null}
        </View>
        {message.links && message.links.length > 0 ? (
          <View style={styles.links}>
            {message.links.map((link) => (
              <Pressable
                key={`${link.kind}-${link.id}`}
                onPress={() => openLink(link)}
                accessibilityRole="link"
                style={({ pressed }) => [styles.linkChip, pressed && styles.pressed]}
                testID={`tutor-link-${link.kind}-${link.id}`}
              >
                <Ionicons
                  name={link.kind === 'lesson' ? 'book-outline' : 'apps-outline'}
                  size={14}
                  color={colors.accent}
                />
                <AppText variant="caption" color="accent" numberOfLines={1}>
                  {link.kind === 'lesson'
                    ? t('tutor.openLesson', { title: link.title })
                    : t('tutor.openTool', { title: link.title })}
                </AppText>
              </Pressable>
            ))}
          </View>
        ) : null}
        {message.followUps && message.followUps.length > 0 ? (
          <View style={styles.links}>
            {message.followUps.map((q) => (
              <Chip key={q} label={q} onPress={() => onAsk(q)} />
            ))}
          </View>
        ) : null}
      </View>
    </FadeIn>
  );
}

export interface TutorChatProps {
  /** Domanda da inviare automaticamente all'apertura (es. dalla lezione). */
  initialQuestion?: string;
  onClose?: () => void;
}

export function TutorChat({ initialQuestion, onClose }: TutorChatProps) {
  const { t } = useTranslation();
  const { messages, pending, send, clear } = useTutorStore();
  const [draft, setDraft] = useState('');
  const scrollRef = useRef<ScrollViewInstance>(null);
  const sentInitial = useRef(false);

  useEffect(() => {
    if (initialQuestion && !sentInitial.current) {
      sentInitial.current = true;
      void send(initialQuestion);
    }
  }, [initialQuestion, send]);

  useEffect(() => {
    const timer = setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
    return () => clearTimeout(timer);
  }, [messages.length]);

  const submit = (text: string) => {
    if (!text.trim()) return;
    setDraft('');
    void send(text);
  };

  const suggestions = [
    t('tutor.suggestion1'),
    t('tutor.suggestion2'),
    t('tutor.suggestion3'),
    t('tutor.suggestion4'),
    t('tutor.suggestion5'),
  ];

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 8 : 0}
    >
      <View style={styles.header}>
        {onClose ? (
          <IconButton icon="close" onPress={onClose} accessibilityLabel={t('player.close')} />
        ) : null}
        <View style={styles.flex}>
          <AppText variant="heading">{t('tutor.title')}</AppText>
          <Chip label={t('tutor.demoBadge')} tone="warning" testID="tutor-demo-badge" />
        </View>
        {messages.length > 0 ? (
          <IconButton
            icon="refresh"
            onPress={clear}
            accessibilityLabel={t('tutor.clear')}
            testID="tutor-clear"
          />
        ) : null}
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.notice}>
          <Ionicons name="information-circle-outline" size={18} color={colors.warning} />
          <AppText variant="caption" color="secondary" style={styles.flex}>
            {t('tutor.demoNotice')}
          </AppText>
        </View>

        {messages.length === 0 ? (
          <View style={styles.empty}>
            <MessageBubble
              message={{ id: 'welcome', role: 'tutor', text: t('tutor.welcome') }}
              onAsk={submit}
            />
            <AppText variant="overline" color="muted">
              {t('tutor.suggestionsTitle')}
            </AppText>
            <View style={styles.links}>
              {suggestions.map((q) => (
                <Chip key={q} label={q} onPress={() => submit(q)} testID={`suggestion-${q}`} />
              ))}
            </View>
          </View>
        ) : (
          messages.map((message) => (
            <MessageBubble key={message.id} message={message} onAsk={submit} />
          ))
        )}

        {pending ? <ActivityIndicator color={colors.primary} style={styles.pending} /> : null}
      </ScrollView>

      <View style={styles.inputBar}>
        <TextInput
          value={draft}
          onChangeText={setDraft}
          placeholder={t('tutor.placeholder')}
          placeholderTextColor={colors.textMuted}
          accessibilityLabel={t('tutor.inputLabel')}
          style={styles.input}
          multiline
          maxLength={500}
          onSubmitEditing={() => submit(draft)}
          blurOnSubmit
          returnKeyType="send"
          testID="tutor-input"
        />
        <Pressable
          onPress={() => submit(draft)}
          disabled={!draft.trim() || pending}
          accessibilityRole="button"
          accessibilityLabel={t('tutor.send')}
          accessibilityState={{ disabled: !draft.trim() || pending }}
          style={[styles.send, (!draft.trim() || pending) && styles.sendDisabled]}
          testID="tutor-send"
        >
          <Ionicons name="arrow-up" size={20} color={colors.textOnAccent} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, gap: spacing.xs },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  content: {
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xl,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  notice: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
    backgroundColor: colors.warningSoft,
  },
  empty: { gap: spacing.md },
  bubbleRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'flex-start' },
  bubbleRowUser: { justifyContent: 'flex-end' },
  bubbleCol: { flexShrink: 1, maxWidth: '88%', gap: spacing.xs },
  bubbleColUser: { alignItems: 'flex-end' },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: { padding: spacing.md, borderRadius: radius.lg, gap: spacing.xs },
  bubbleTutor: { backgroundColor: colors.surfaceElevated, borderTopLeftRadius: radius.sm / 2 },
  bubbleUser: { backgroundColor: colors.primary, borderTopRightRadius: radius.sm / 2 },
  links: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  linkChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: colors.secondarySoft,
    maxWidth: '100%',
  },
  pressed: { opacity: 0.8 },
  pending: { alignSelf: 'flex-start', marginLeft: spacing.huge },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
  },
  input: {
    flex: 1,
    minHeight: layout.minTouchTarget,
    maxHeight: 120,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.background,
    color: colors.text,
    fontSize: typography.body.fontSize,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  send: {
    width: layout.minTouchTarget,
    height: layout.minTouchTarget,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendDisabled: { opacity: 0.4 },
});
