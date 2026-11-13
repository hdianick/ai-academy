/**
 * Design token di AI Academy.
 * Tema principale: dark (blu notte / nero) con accenti viola e blu elettrico.
 * Tutti i componenti devono usare questi token, mai colori "hardcoded".
 */

export const palette = {
  night950: '#070B1A',
  night900: '#0B1124',
  night800: '#111A33',
  night700: '#1A2547',
  night600: '#26335E',
  white: '#FFFFFF',
  slate300: '#B7C0DA',
  slate400: '#8A94B3',
  slate500: '#646E8F',
  violet400: '#A78BFA',
  violet500: '#8B5CF6',
  violet600: '#7C3AED',
  electric400: '#38BDF8',
  electric500: '#3B82F6',
  electric600: '#2563EB',
  amber400: '#FBBF24',
  orange500: '#F97316',
  green400: '#4ADE80',
  green500: '#22C55E',
  red400: '#F87171',
  red500: '#EF4444',
} as const;

export const colors = {
  background: palette.night950,
  surface: palette.night900,
  surfaceElevated: palette.night800,
  surfacePressed: palette.night700,
  border: palette.night700,
  borderStrong: palette.night600,

  text: palette.white,
  textSecondary: palette.slate300,
  textMuted: palette.slate400,
  textDisabled: palette.slate500,
  textOnAccent: palette.white,

  primary: palette.violet500,
  primaryPressed: palette.violet600,
  primarySoft: 'rgba(139, 92, 246, 0.16)',
  secondary: palette.electric500,
  secondaryPressed: palette.electric600,
  secondarySoft: 'rgba(59, 130, 246, 0.16)',
  accent: palette.electric400,

  xp: palette.amber400,
  streak: palette.orange500,
  success: palette.green400,
  successSoft: 'rgba(74, 222, 128, 0.14)',
  danger: palette.red400,
  dangerSoft: 'rgba(248, 113, 113, 0.14)',
  warning: palette.amber400,
  warningSoft: 'rgba(251, 191, 36, 0.14)',

  overlay: 'rgba(7, 11, 26, 0.72)',
} as const;

/** Gradiente di brand (viola → blu elettrico), per CTA e hero. */
export const gradients = {
  brand: [palette.violet500, palette.electric500] as const,
  brandSoft: ['rgba(139, 92, 246, 0.24)', 'rgba(59, 130, 246, 0.12)'] as const,
};

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: '800' },
  title: { fontSize: 26, lineHeight: 32, fontWeight: '700' },
  heading: { fontSize: 20, lineHeight: 26, fontWeight: '700' },
  subheading: { fontSize: 17, lineHeight: 24, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 22, fontWeight: '400' },
  bodyStrong: { fontSize: 15, lineHeight: 22, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '500' },
  overline: { fontSize: 11, lineHeight: 14, fontWeight: '700', letterSpacing: 1.2 },
} as const;

export type TypographyVariant = keyof typeof typography;

export const layout = {
  /** Larghezza massima del contenuto su tablet/web. */
  maxContentWidth: 760,
  /** Area minima toccabile (accessibilità). */
  minTouchTarget: 44,
  tabBarHeight: 64,
} as const;

export const theme = { colors, gradients, spacing, radius, typography, layout } as const;
export type Theme = typeof theme;
