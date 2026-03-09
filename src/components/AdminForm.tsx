import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { colors, fontSize, spacing, borderRadius } from '../constants/theme';

interface FieldConfig {
  key: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
  required?: boolean;
}

interface AdminFormProps {
  title: string;
  fields: FieldConfig[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onSubmit: () => void;
  submitLabel?: string;
  loading?: boolean;
  children?: React.ReactNode;
}

export function AdminForm({
  title,
  fields,
  values,
  onChange,
  onSubmit,
  submitLabel = 'Save',
  loading,
  children,
}: AdminFormProps) {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.title}>{title}</Text>

      {fields.map((field) => (
        <View key={field.key} style={styles.field}>
          <Text style={styles.label}>
            {field.label}
            {field.required && <Text style={styles.required}> *</Text>}
          </Text>
          <TextInput
            style={[styles.input, field.multiline && styles.inputMultiline]}
            value={values[field.key] ?? ''}
            onChangeText={(v) => onChange(field.key, v)}
            placeholder={field.placeholder}
            placeholderTextColor={colors.textLight}
            multiline={field.multiline}
            textAlignVertical={field.multiline ? 'top' : 'center'}
          />
        </View>
      ))}

      {children}

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={onSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} />
        ) : (
          <Text style={styles.buttonText}>{submitLabel}</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

export function PickerField({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { key: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {options.map((opt) => (
          <TouchableOpacity
            key={opt.key}
            style={[styles.chip, value === opt.key && styles.chipActive]}
            onPress={() => onChange(opt.key)}
          >
            <Text
              style={[
                styles.chipText,
                value === opt.key && styles.chipTextActive,
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.lg,
  },
  field: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  required: {
    color: colors.error,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    fontSize: fontSize.md,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  inputMultiline: {
    minHeight: 120,
    paddingTop: spacing.sm + 2,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: '700',
  },
  chipRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  chip: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: fontSize.sm,
    color: colors.text,
  },
  chipTextActive: {
    color: colors.white,
    fontWeight: '600',
  },
});
