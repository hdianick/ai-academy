import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { layout, spacing } from '@/core/theme';
import type { ExerciseStep } from '@/features/courses/types';
import { isAnswerReady } from '@/features/lessons/answers';
import { PROMPT_MIN_LENGTH, type ExerciseAnswer } from '@/features/lessons/evaluate';
import { AppText, Button, IconButton, ProgressBar } from '@/ui';

import { FillBlankSentence, OptionList, OrderView, PromptFixView } from './exercises';
import { StudyFrame } from './StudyFrame';

export interface QuestionSessionProps {
  questions: ExerciseStep[];
  index: number;
  answers: (ExerciseAnswer | null)[];
  onIndexChange: (index: number) => void;
  onAnswer: (index: number, answer: ExerciseAnswer) => void;
  onFinish: () => void;
  onClose: () => void;
  /** Se presente, mostra il pulsante per rileggere la teoria senza perdere le risposte. */
  onReviewTheory?: () => void;
}

/**
 * Sessione di domande senza correzione immediata: si risponde a tutte,
 * si può tornare indietro a cambiare una risposta, e alla fine arriva il resoconto.
 */
export function QuestionSession({
  questions,
  index,
  answers,
  onIndexChange,
  onAnswer,
  onFinish,
  onClose,
  onReviewTheory,
}: QuestionSessionProps) {
  const { t } = useTranslation();
  const step = questions[index];
  if (!step) return null;
  const answer = answers[index] ?? null;
  const isLast = index === questions.length - 1;
  const ready = isAnswerReady(step, answer);
  const selectedIndex =
    answer && (answer.type === 'multipleChoice' || answer.type === 'fillBlank')
      ? answer.selectedIndex
      : null;

  const renderQuestion = () => {
    switch (step.type) {
      case 'multipleChoice':
        return (
          <>
            <AppText variant="overline" color="accent">
              {t('player.chooseAnswer')}
            </AppText>
            <AppText variant="heading">{step.question}</AppText>
            <OptionList
              options={step.options}
              selectedIndex={selectedIndex}
              onSelect={(i) => onAnswer(index, { type: 'multipleChoice', selectedIndex: i })}
              checked={false}
              correctIndex={step.correctIndex}
            />
          </>
        );
      case 'fillBlank':
        return (
          <>
            <AppText variant="overline" color="accent">
              {t('player.completeSentence')}
            </AppText>
            <FillBlankSentence step={step} selectedIndex={selectedIndex} />
            <OptionList
              options={step.options}
              selectedIndex={selectedIndex}
              onSelect={(i) => onAnswer(index, { type: 'fillBlank', selectedIndex: i })}
              checked={false}
              correctIndex={step.correctIndex}
            />
          </>
        );
      case 'trueFalse': {
        const value = answer?.type === 'trueFalse' ? answer.value : null;
        return (
          <>
            <AppText variant="overline" color="accent">
              {t('player.statement')}
            </AppText>
            <AppText variant="heading">{step.statement}</AppText>
            <OptionList
              options={[t('player.trueLabel'), t('player.falseLabel')]}
              selectedIndex={value === null ? null : value ? 0 : 1}
              onSelect={(i) => onAnswer(index, { type: 'trueFalse', value: i === 0 })}
              checked={false}
              correctIndex={step.answer ? 0 : 1}
            />
          </>
        );
      }
      case 'order':
        return (
          <>
            <AppText variant="heading">{step.instruction}</AppText>
            <OrderView
              step={step}
              value={answer?.type === 'order' ? answer.items : []}
              onChange={(items) => onAnswer(index, { type: 'order', items })}
              checked={false}
              correct={false}
            />
          </>
        );
      case 'promptFix':
        return (
          <PromptFixView
            step={step}
            text={answer?.type === 'promptFix' ? answer.text : ''}
            onChange={(text) => onAnswer(index, { type: 'promptFix', text })}
            checked={false}
            minLength={PROMPT_MIN_LENGTH}
          />
        );
    }
  };

  return (
    <StudyFrame
      scrollKey={step.id}
      header={
        <>
          <View style={styles.topRow}>
            <IconButton icon="close" onPress={onClose} accessibilityLabel={t('player.close')} />
            <View style={styles.flex}>
              <ProgressBar
                progress={(index + 1) / questions.length}
                height={10}
                accessibilityLabel={t('lesson.questionsProgress', {
                  current: index + 1,
                  total: questions.length,
                })}
              />
            </View>
            {onReviewTheory ? (
              <IconButton
                icon="book-outline"
                onPress={onReviewTheory}
                accessibilityLabel={t('lesson.reviewTheory')}
                testID="review-theory"
              />
            ) : null}
          </View>
          <AppText variant="caption" color="muted" testID="question-progress">
            {t('lesson.questionsProgress', { current: index + 1, total: questions.length })}
          </AppText>
        </>
      }
      footer={
        <View style={styles.footerRow}>
          <View style={styles.flex}>
            <Button
              label={t('lesson.previous')}
              variant="secondary"
              onPress={() => onIndexChange(index - 1)}
              disabled={index === 0}
              fullWidth
              testID="question-prev"
            />
          </View>
          <View style={styles.flexWide}>
            <Button
              label={isLast ? t('lesson.finish') : t('lesson.next')}
              onPress={() => (isLast ? onFinish() : onIndexChange(index + 1))}
              disabled={!ready}
              fullWidth
              testID="question-next"
            />
          </View>
        </View>
      }
    >
      {index === 0 ? (
        <AppText variant="caption" color="muted">
          {t('lesson.questionsIntro')}
        </AppText>
      ) : null}
      {renderQuestion()}
    </StudyFrame>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  flexWide: { flex: 2 },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  footerRow: { flexDirection: 'row', gap: spacing.sm, minHeight: layout.minTouchTarget },
});
