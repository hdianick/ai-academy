import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { formatRate, theoryScript } from '@/features/audio/narration';
import { useAudioSettings } from '@/features/audio/settings';
import { hasVoiceFor, isSpeechSupported, speakChunks, stopSpeaking } from '@/features/audio/speech';
import { content } from '@/data/content/registry';

import { colors, layout, radius, spacing } from '@/core/theme';
import type { TheoryStep } from '@/features/courses/types';
import { AppText, Button, Chip, IconButton, ProgressBar } from '@/ui';

import { TheoryView } from './exercises';
import { StudyFrame } from './StudyFrame';

export interface TheoryReaderProps {
  pages: TheoryStep[];
  page: number;
  /** Pagina più avanzata già raggiunta: si può saltare liberamente fino a qui. */
  maxVisited: number;
  onPageChange: (page: number) => void;
  onClose: () => void;
  onFinish: () => void;
  finishLabel?: string;
  onAskTutor?: (question: string) => void;
}

/** Lettura della teoria a pagine, con Indietro/Avanti e salto alle pagine già lette. */
export function TheoryReader({
  pages,
  page,
  maxVisited,
  onPageChange,
  onClose,
  onFinish,
  finishLabel,
  onAskTutor,
}: TheoryReaderProps) {
  const { t } = useTranslation();
  const [listening, setListening] = useState(false);
  const [voiceAvailable, setVoiceAvailable] = useState<boolean | null>(null);
  const speechLanguage = content().speechLanguage;
  const rate = useAudioSettings((s) => s.rate);
  const autoAdvance = useAudioSettings((s) => s.autoAdvance);
  const cycleRate = useAudioSettings((s) => s.cycleRate);
  const current = pages[page];
  const isFirst = page === 0;
  const isLast = page === pages.length - 1;
  const canSpeak = isSpeechSupported();

  useEffect(() => {
    if (!canSpeak) return;
    let active = true;
    void hasVoiceFor(speechLanguage).then((value) => active && setVoiceAvailable(value));
    return () => {
      active = false;
    };
  }, [canSpeak, speechLanguage]);

  // Legge la pagina corrente; a fine pagina passa alla successiva (modalità ascolto).
  useEffect(() => {
    if (!listening || !current) return;
    speakChunks(
      theoryScript(current, { tip: t('lesson.tipSpoken'), example: t('lesson.exampleSpoken') }),
      {
        language: speechLanguage,
        rate,
        onDone: () => {
          if (!isLast && autoAdvance) onPageChange(page + 1);
          else setListening(false);
        },
        onError: () => setListening(false),
      },
    );
    return () => stopSpeaking();
    // La lettura riparte solo quando cambiano pagina, velocità o stato di ascolto.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listening, current?.id, rate]);

  if (!current) return null;

  return (
    <StudyFrame
      scrollKey={current.id}
      header={
        <>
          <View style={styles.topRow}>
            <IconButton icon="close" onPress={onClose} accessibilityLabel={t('player.close')} />
            <View style={styles.flex}>
              <ProgressBar
                progress={(page + 1) / pages.length}
                height={10}
                accessibilityLabel={t('lesson.theoryProgress', {
                  current: page + 1,
                  total: pages.length,
                })}
              />
            </View>
            {canSpeak ? (
              <IconButton
                icon={listening ? 'stop-circle-outline' : 'volume-high-outline'}
                onPress={() => setListening((v) => !v)}
                accessibilityLabel={listening ? t('lesson.stopListening') : t('lesson.listen')}
                testID="theory-listen"
              />
            ) : null}
            {onAskTutor ? (
              <IconButton
                icon="chatbubble-ellipses-outline"
                onPress={() => onAskTutor(current.title)}
                accessibilityLabel={t('tutor.askAboutStep')}
                testID="ask-tutor"
              />
            ) : null}
          </View>
          {listening ? (
            <View style={styles.listeningRow} testID="theory-listening">
              <Ionicons name="pulse" size={16} color={colors.accent} />
              <AppText variant="caption" color="accent" style={styles.flex}>
                {t('lesson.listening')}
              </AppText>
              <Chip
                label={t('lesson.speed', { rate: formatRate(rate) })}
                onPress={cycleRate}
                testID="theory-speed"
              />
            </View>
          ) : null}
          {listening && voiceAvailable === false ? (
            <AppText variant="caption" color="muted">
              {t('lesson.noVoice')}
            </AppText>
          ) : null}
          <View style={styles.dotsRow}>
            <AppText variant="caption" color="muted" testID="theory-progress">
              {t('lesson.theoryProgress', { current: page + 1, total: pages.length })}
            </AppText>
            <View style={styles.dots}>
              {pages.map((p, index) => {
                const reachable = index <= maxVisited;
                return (
                  <Pressable
                    key={p.id}
                    disabled={!reachable}
                    onPress={() => onPageChange(index)}
                    accessibilityRole="button"
                    accessibilityLabel={t('lesson.goToPage', { page: index + 1 })}
                    accessibilityState={{ selected: index === page, disabled: !reachable }}
                    hitSlop={6}
                    testID={`theory-dot-${index}`}
                    style={[
                      styles.dot,
                      reachable && styles.dotVisited,
                      index === page && styles.dotActive,
                    ]}
                  />
                );
              })}
            </View>
          </View>
        </>
      }
      footer={
        <View style={styles.footerRow}>
          <View style={styles.flex}>
            <Button
              label={t('lesson.previous')}
              variant="secondary"
              onPress={() => onPageChange(page - 1)}
              disabled={isFirst}
              fullWidth
              testID="theory-prev"
            />
          </View>
          <View style={styles.flexWide}>
            <Button
              label={isLast ? (finishLabel ?? t('lesson.startQuestions')) : t('lesson.next')}
              onPress={() => (isLast ? onFinish() : onPageChange(page + 1))}
              fullWidth
              testID="theory-next"
            />
          </View>
        </View>
      }
    >
      <TheoryView step={current} />
    </StudyFrame>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  flexWide: { flex: 2 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  listeningRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  dotsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  dots: { flexDirection: 'row', gap: spacing.sm },
  dot: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
    backgroundColor: colors.surfacePressed,
  },
  dotVisited: { backgroundColor: colors.primarySoft, borderWidth: 1, borderColor: colors.primary },
  dotActive: { backgroundColor: colors.primary, width: 22 },
  footerRow: { flexDirection: 'row', gap: spacing.sm, minHeight: layout.minTouchTarget },
});
