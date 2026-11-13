import Ionicons from '@expo/vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View, type ScrollViewInstance } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

import { colors, layout, radius, spacing } from '@/core/theme';
import type { ExerciseStep, LessonStep } from '@/features/courses/types';
import {
  evaluateExercise,
  PROMPT_MIN_LENGTH,
  type EvaluationResult,
  type ExerciseAnswer,
} from '@/features/lessons/evaluate';
import { AppText, Button, IconButton, ProgressBar } from '@/ui';

import { FillBlankSentence, OptionList, OrderView, PromptFixView, TheoryView } from './exercises';

function feedbackHaptic(success: boolean) {
  if (Platform.OS === 'web') return;
  void Haptics.notificationAsync(
    success ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
  ).catch(() => undefined);
}

function initialAnswer(step: LessonStep): ExerciseAnswer | null {
  switch (step.type) {
    case 'order':
      return { type: 'order', items: [] };
    case 'promptFix':
      return { type: 'promptFix', text: '' };
    default:
      return null;
  }
}

function isAnswerReady(step: LessonStep, answer: ExerciseAnswer | null): boolean {
  if (!answer) return false;
  switch (answer.type) {
    case 'order':
      return step.type === 'order' && answer.items.length === step.items.length;
    case 'promptFix':
      return answer.text.trim().length >= PROMPT_MIN_LENGTH;
    default:
      return true;
  }
}

function correctAnswerText(
  step: ExerciseStep,
  t: (key: 'player.trueLabel' | 'player.falseLabel') => string,
) {
  switch (step.type) {
    case 'multipleChoice':
    case 'fillBlank':
      return step.options[step.correctIndex];
    case 'trueFalse':
      return step.answer ? t('player.trueLabel') : t('player.falseLabel');
    default:
      return undefined;
  }
}

export interface ActivityPlayerProps {
  steps: LessonStep[];
  onClose: () => void;
  /** Chiamato alla fine con l'esito di ogni esercizio (teoria esclusa). */
  onComplete: (results: boolean[]) => void;
  /** Se presente, mostra il pulsante per chiedere chiarimenti al tutor sullo step corrente. */
  onAskTutor?: (question: string) => void;
}

/** Testo dello step da usare come domanda per il tutor. */
export function stepTopic(step: LessonStep): string {
  switch (step.type) {
    case 'theory':
      return step.title;
    case 'multipleChoice':
      return step.question;
    case 'trueFalse':
      return step.statement;
    case 'fillBlank':
      return step.sentence.replace('___', '…');
    case 'order':
    case 'promptFix':
      return step.instruction;
  }
}

export function ActivityPlayer({ steps, onClose, onComplete, onAskTutor }: ActivityPlayerProps) {
  const { t } = useTranslation();
  const scrollRef = useRef<ScrollViewInstance>(null);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<ExerciseAnswer | null>(() =>
    steps[0] ? initialAnswer(steps[0]) : null,
  );
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [results, setResults] = useState<boolean[]>([]);

  const step = steps[index];
  if (!step) return null;

  const isTheory = step.type === 'theory';
  const checked = result !== null;
  const isLast = index === steps.length - 1;

  const goNext = (nextResults: boolean[]) => {
    if (isLast) {
      onComplete(nextResults);
      return;
    }
    const nextStep = steps[index + 1];
    setIndex(index + 1);
    setAnswer(nextStep ? initialAnswer(nextStep) : null);
    setResult(null);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const check = () => {
    if (isTheory || !answer) return;
    const evaluation = evaluateExercise(step, answer);
    feedbackHaptic(evaluation.correct);
    setResult(evaluation);
    setResults((previous) => [...previous, evaluation.correct]);
  };

  const onPrimary = () => {
    if (isTheory) goNext(results);
    else if (!checked) check();
    else goNext(results);
  };

  const selectedIndex =
    answer && (answer.type === 'multipleChoice' || answer.type === 'fillBlank')
      ? answer.selectedIndex
      : null;

  const renderStep = () => {
    switch (step.type) {
      case 'theory':
        return <TheoryView step={step} />;
      case 'multipleChoice':
        return (
          <View style={styles.block}>
            <AppText variant="overline" color="accent">
              {t('player.chooseAnswer')}
            </AppText>
            <AppText variant="heading">{step.question}</AppText>
            <OptionList
              options={step.options}
              selectedIndex={selectedIndex}
              onSelect={(i) => setAnswer({ type: 'multipleChoice', selectedIndex: i })}
              checked={checked}
              correctIndex={step.correctIndex}
            />
          </View>
        );
      case 'fillBlank':
        return (
          <View style={styles.block}>
            <AppText variant="overline" color="accent">
              {t('player.completeSentence')}
            </AppText>
            <FillBlankSentence step={step} selectedIndex={selectedIndex} />
            <OptionList
              options={step.options}
              selectedIndex={selectedIndex}
              onSelect={(i) => setAnswer({ type: 'fillBlank', selectedIndex: i })}
              checked={checked}
              correctIndex={step.correctIndex}
            />
          </View>
        );
      case 'trueFalse': {
        const value = answer?.type === 'trueFalse' ? answer.value : null;
        return (
          <View style={styles.block}>
            <AppText variant="overline" color="accent">
              {t('player.statement')}
            </AppText>
            <AppText variant="heading">{step.statement}</AppText>
            <OptionList
              options={[t('player.trueLabel'), t('player.falseLabel')]}
              selectedIndex={value === null ? null : value ? 0 : 1}
              onSelect={(i) => setAnswer({ type: 'trueFalse', value: i === 0 })}
              checked={checked}
              correctIndex={step.answer ? 0 : 1}
            />
          </View>
        );
      }
      case 'order':
        return (
          <View style={styles.block}>
            <AppText variant="heading">{step.instruction}</AppText>
            <OrderView
              step={step}
              value={answer?.type === 'order' ? answer.items : []}
              onChange={(items) => setAnswer({ type: 'order', items })}
              checked={checked}
              correct={Boolean(result?.correct)}
            />
          </View>
        );
      case 'promptFix':
        return (
          <PromptFixView
            step={step}
            text={answer?.type === 'promptFix' ? answer.text : ''}
            onChange={(text) => setAnswer({ type: 'promptFix', text })}
            checked={checked}
            checks={result?.checks}
            minLength={PROMPT_MIN_LENGTH}
          />
        );
    }
  };

  const primaryLabel = isTheory || checked ? t('player.continue') : t('player.check');
  const primaryDisabled = !isTheory && !checked && !isAnswerReady(step, answer);
  const correctText =
    !isTheory && result && !result.correct ? correctAnswerText(step, t) : undefined;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.topBar}>
        <IconButton icon="close" onPress={onClose} accessibilityLabel={t('player.close')} />
        <View style={styles.flex}>
          <ProgressBar
            progress={(index + (checked || isTheory ? 1 : 0)) / steps.length}
            height={10}
            accessibilityLabel={t('player.stepOf', { current: index + 1, total: steps.length })}
          />
        </View>
        <AppText variant="caption" color="muted">
          {t('player.stepOf', { current: index + 1, total: steps.length })}
        </AppText>
        {onAskTutor ? (
          <IconButton
            icon="chatbubble-ellipses-outline"
            onPress={() => onAskTutor(stepTopic(step))}
            accessibilityLabel={t('tutor.askAboutStep')}
            testID="ask-tutor"
          />
        ) : null}
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner} key={step.id}>
          {renderStep()}
        </View>
      </ScrollView>

      <View
        style={[
          styles.footer,
          checked && (result?.correct ? styles.footerCorrect : styles.footerWrong),
        ]}
      >
        <View style={styles.inner}>
          {checked && step.type !== 'theory' ? (
            <View
              style={styles.feedback}
              accessibilityLiveRegion="polite"
              accessibilityRole="alert"
            >
              <View style={styles.feedbackTitle}>
                <Ionicons
                  name={result?.correct ? 'checkmark-circle' : 'close-circle'}
                  size={22}
                  color={result?.correct ? colors.success : colors.danger}
                />
                <AppText variant="heading" color={result?.correct ? 'success' : 'danger'}>
                  {result?.correct ? t('player.correct') : t('player.incorrect')}
                </AppText>
              </View>
              {correctText ? (
                <AppText variant="bodyStrong">
                  {t('player.correctAnswer', { answer: correctText })}
                </AppText>
              ) : null}
              {'explanation' in step ? (
                <AppText color="secondary">{step.explanation}</AppText>
              ) : null}
            </View>
          ) : null}
          <Button
            label={primaryLabel}
            onPress={onPrimary}
            disabled={primaryDisabled}
            fullWidth
            testID="player-primary"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  flex: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
  },
  content: { paddingVertical: spacing.lg, paddingBottom: spacing.huge },
  inner: {
    width: '100%',
    maxWidth: layout.maxContentWidth,
    alignSelf: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  block: { gap: spacing.md },
  footer: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
  },
  footerCorrect: { backgroundColor: colors.successSurface, borderTopColor: colors.success },
  footerWrong: { backgroundColor: colors.dangerSurface, borderTopColor: colors.danger },
  feedback: { gap: spacing.xs },
  feedbackTitle: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});
