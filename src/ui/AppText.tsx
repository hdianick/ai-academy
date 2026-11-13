import { StyleSheet, Text, type TextProps } from 'react-native';

import { colors, typography, type TypographyVariant } from '@/core/theme';

type TextColor = 'primary' | 'secondary' | 'muted' | 'accent' | 'success' | 'danger' | 'xp';

const colorMap: Record<TextColor, string> = {
  primary: colors.text,
  secondary: colors.textSecondary,
  muted: colors.textMuted,
  accent: colors.accent,
  success: colors.success,
  danger: colors.danger,
  xp: colors.xp,
};

export interface AppTextProps extends TextProps {
  variant?: TypographyVariant;
  color?: TextColor;
  align?: 'left' | 'center' | 'right';
}

/** Testo tipografico unico dell'app: usa sempre questo al posto di <Text>. */
export function AppText({
  variant = 'body',
  color = 'primary',
  align,
  style,
  accessibilityRole,
  ...rest
}: AppTextProps) {
  const isHeading = variant === 'display' || variant === 'title' || variant === 'heading';
  return (
    <Text
      accessibilityRole={accessibilityRole ?? (isHeading ? 'header' : undefined)}
      style={[
        styles.base,
        typography[variant],
        { color: colorMap[color] },
        align && { textAlign: align },
        variant === 'overline' && styles.overline,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: { includeFontPadding: false },
  overline: { textTransform: 'uppercase' },
});
