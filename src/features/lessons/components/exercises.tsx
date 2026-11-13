import Ionicons from '@expo/vector-icons/Ionicons';
import { useMemo } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { colors, layout, radius, spacing, typography } from '@/core/theme';
import type { FillBlankStep, OrderStep, PromptFixStep, TheoryStep } from '@/features/courses/types';
import { shuffleDifferent, type PromptCheckResult } from '@/features/lessons/evaluate';
import { AppText } from '@/ui';

export function hashSeed(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) hash = (hash * 31 + text.charCodeAt(i)) | 0;
  return Math.abs(hash) + 1;
}

/* ---------- Teoria ---------- */

export function TheoryView({ step }: { step: TheoryStep }) {
  const { t } = useTranslation();
  return (
    <View style={styles.block}>
      <AppText variant="title">{step.title}</AppText>
      {step.paragraphs.map((paragraph) => (
        <AppText key={paragraph} style={styles.paragraph}>
          {paragraph}
        </AppText>
      ))}
      {step.example ? (
        <View style={styles.example}>
          <AppText variant="overline" color="accent">
            {t('player.example')}
          </AppText>
          <AppText style={styles.mono}>{step.example}</AppText>
        </View>
      ) : null}
      {step.tip ? (
        <View style={styles.tip}>
          <Ionicons name="bulb" size={18} color={colors.xp} />
          <View style={styles.flex}>
            <AppText variant="overline" color="xp">
              {t('player.tip')}
            </AppText>
            <AppText color="secondary">{step.tip}</AppText>
          </View>
        </View>
      ) : null}
    </View>
  );
}

/* ---------- Opzioni (scelta multipla, completa la frase, vero/falso) ---------- */

interface OptionListProps {
  options: string[];
  selectedIndex: number | null;
  onSelect: (index: number) => void;
  checked: boolean;
  correctIndex: number;
}

export function OptionList({
  options,
  selectedIndex,
  onSelect,
  checked,
  correctIndex,
}: OptionListProps) {
  return (
    <View style={styles.options} accessibilityRole="radiogroup">
      {options.map((option, index) => {
        const selected = selectedIndex === index;
        const isCorrect = checked && index === correctIndex;
        const isWrong = checked && selected && index !== correctIndex;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(index)}
            disabled={checked}
            accessibilityRole="radio"
            accessibilityState={{ selected, disabled: checked }}
            accessibilityLabel={option}
            testID={`option-${index}`}
            style={({ pressed }) => [
              styles.option,
              selected && styles.optionSelected,
              isCorrect && styles.optionCorrect,
              isWrong && styles.optionWrong,
              pressed && !checked && styles.optionPressed,
            ]}
          >
            <View style={[styles.radio, selected && styles.radioSelected]}>
              {isCorrect ? (
                <Ionicons name="checkmark" size={14} color={colors.success} />
              ) : isWrong ? (
                <Ionicons name="close" size={14} color={colors.danger} />
              ) : null}
            </View>
            <AppText style={styles.flex}>{option}</AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

export function FillBlankSentence({
  step,
  selectedIndex,
}: {
  step: FillBlankStep;
  selectedIndex: number | null;
}) {
  const [before, after] = step.sentence.split('___');
  const word = selectedIndex !== null ? step.options[selectedIndex] : null;
  return (
    <AppText variant="heading" style={styles.sentence}>
      {before}
      <AppText variant="heading" color={word ? 'accent' : 'muted'}>
        {word ?? '_____'}
      </AppText>
      {after}
    </AppText>
  );
}

/* ---------- Ordinamento ---------- */

interface OrderViewProps {
  step: OrderStep;
  value: string[];
  onChange: (items: string[]) => void;
  checked: boolean;
  correct: boolean;
}

export function OrderView({ step, value, onChange, checked, correct }: OrderViewProps) {
  const { t } = useTranslation();
  const pool = useMemo(() => shuffleDifferent(step.items, hashSeed(step.id)), [step]);
  const remaining = pool.filter((item) => !value.includes(item));

  return (
    <View style={styles.block}>
      <AppText color="secondary">{t('player.orderHint')}</AppText>

      <View
        style={[
          styles.orderAnswer,
          checked && (correct ? styles.optionCorrect : styles.optionWrong),
        ]}
      >
        <AppText variant="overline" color="muted">
          {t('player.yourOrder')}
        </AppText>
        {value.map((item, index) => (
          <Pressable
            key={item}
            disabled={checked}
            onPress={() => onChange(value.filter((v) => v !== item))}
            accessibilityRole="button"
            accessibilityLabel={`${index + 1}. ${item}`}
            style={styles.orderItem}
          >
            <View style={styles.orderNumber}>
              <AppText variant="caption">{index + 1}</AppText>
            </View>
            <AppText style={styles.flex}>{item}</AppText>
          </Pressable>
        ))}
      </View>

      <View style={styles.options}>
        {remaining.map((item, index) => (
          <Pressable
            key={item}
            testID={`order-pool-${index}`}
            disabled={checked}
            onPress={() => onChange([...value, item])}
            accessibilityRole="button"
            accessibilityLabel={item}
            style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
          >
            <Ionicons name="add-circle-outline" size={18} color={colors.primary} />
            <AppText style={styles.flex}>{item}</AppText>
          </Pressable>
        ))}
      </View>

      {value.length > 0 && !checked ? (
        <Pressable onPress={() => onChange([])} accessibilityRole="button" hitSlop={8}>
          <AppText variant="bodyStrong" color="accent">
            {t('player.orderReset')}
          </AppText>
        </Pressable>
      ) : null}

      {checked && !correct ? (
        <View style={styles.example}>
          {step.items.map((item, index) => (
            <AppText key={item} color="secondary">
              {index + 1}. {item}
            </AppText>
          ))}
        </View>
      ) : null}
    </View>
  );
}

/* ---------- Migliora il prompt ---------- */

interface PromptFixViewProps {
  step: PromptFixStep;
  text: string;
  onChange: (text: string) => void;
  checked: boolean;
  checks?: PromptCheckResult[];
  minLength: number;
}

export function PromptFixView({
  step,
  text,
  onChange,
  checked,
  checks,
  minLength,
}: PromptFixViewProps) {
  const { t } = useTranslation();
  const tooShort = text.trim().length < minLength;

  return (
    <View style={styles.block}>
      <AppText variant="heading">{step.instruction}</AppText>

      <View style={styles.example}>
        <AppText variant="overline" color="muted">
          {t('player.weakPrompt')}
        </AppText>
        <AppText style={styles.mono}>{step.weakPrompt}</AppText>
      </View>

      <AppText variant="overline" color="accent">
        {t('player.yourPrompt')}
      </AppText>
      <TextInput
        value={text}
        onChangeText={onChange}
        editable={!checked}
        multiline
        placeholder={t('player.promptPlaceholder')}
        placeholderTextColor={colors.textMuted}
        accessibilityLabel={t('player.yourPrompt')}
        style={styles.textArea}
        testID="prompt-input"
      />
      {!checked && tooShort ? (
        <AppText variant="caption" color="muted">
          {t('player.promptTooShort', { count: minLength })}
        </AppText>
      ) : null}

      {!checked ? (
        <View style={styles.checklist}>
          <AppText variant="overline" color="muted">
            {t('player.checksTitle')}
          </AppText>
          {step.checks.map((check) => (
            <View key={check.label} style={styles.checkRow}>
              <Ionicons name="ellipse-outline" size={14} color={colors.textMuted} />
              <AppText variant="caption" color="secondary">
                {check.label}
              </AppText>
            </View>
          ))}
        </View>
      ) : (
        <>
          <View style={styles.checklist}>
            <AppText variant="overline" color="muted">
              {t('player.checksTitle')}
            </AppText>
            {(checks ?? []).map((check) => (
              <View key={check.label} style={styles.checkRow}>
                <Ionicons
                  name={check.passed ? 'checkmark-circle' : 'close-circle'}
                  size={16}
                  color={check.passed ? colors.success : colors.danger}
                />
                <AppText variant="caption" color={check.passed ? 'success' : 'danger'}>
                  {check.label}
                </AppText>
              </View>
            ))}
          </View>
          <View style={styles.example}>
            <AppText variant="overline" color="accent">
              {t('player.sampleAnswer')}
            </AppText>
            <AppText style={styles.mono}>{step.sampleAnswer}</AppText>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  block: { gap: spacing.md },
  flex: { flex: 1 },
  paragraph: { ...typography.body, fontSize: 16, lineHeight: 25 },
  sentence: { lineHeight: 32 },
  example: {
    gap: spacing.xs,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  mono: { fontFamily: 'monospace', fontSize: 14, lineHeight: 21, color: colors.textSecondary },
  tip: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.warningSoft,
  },
  options: { gap: spacing.sm },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    minHeight: layout.minTouchTarget + 8,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
  },
  optionPressed: { backgroundColor: colors.surfacePressed },
  optionSelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  optionCorrect: { borderColor: colors.success, backgroundColor: colors.successSoft },
  optionWrong: { borderColor: colors.danger, backgroundColor: colors.dangerSoft },
  radio: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: colors.primary },
  orderAnswer: {
    gap: spacing.sm,
    minHeight: 80,
    padding: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.borderStrong,
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.sm,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceElevated,
  },
  orderNumber: {
    width: 24,
    height: 24,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    minHeight: 130,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
    textAlignVertical: 'top',
  },
  checklist: { gap: spacing.xs },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
});
