import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { colors, layout, radius, spacing, typography } from '@/core/theme';

export interface SearchFieldProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
  accessibilityLabel: string;
  clearLabel: string;
}

export function SearchField({
  value,
  onChangeText,
  placeholder,
  accessibilityLabel,
  clearLabel,
}: SearchFieldProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={colors.textMuted} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        accessibilityLabel={accessibilityLabel}
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="search"
        style={styles.input}
      />
      {value.length > 0 ? (
        <Pressable
          onPress={() => onChangeText('')}
          accessibilityRole="button"
          accessibilityLabel={clearLabel}
          hitSlop={10}
        >
          <Ionicons name="close-circle" size={18} color={colors.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    minHeight: layout.minTouchTarget + 4,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body.fontSize,
    paddingVertical: spacing.md,
    outlineStyle: 'none',
  } as object,
});
