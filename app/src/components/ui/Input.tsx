import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import theme from '../../styles/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  inputStyle,
  ...textInputProps
}) => {
  const [focused, setFocused] = useState(false);

  const getInputStyle = () => {
    const baseStyle = { ...theme.components.input.base };
    
    // Show focus state when input is focused (includes typing state)
    if (focused) {
      return { ...baseStyle, ...theme.components.input.focused };
    }
    
    // Show error state
    if (error) {
      return { ...baseStyle, borderColor: theme.colors.error[500] };
    }
    
    // Default state (includes "Value Entered" state)
    return baseStyle;
  };

  return (
    <View style={containerStyle}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}
      <TextInput
        style={[getInputStyle(), inputStyle]}
        placeholderTextColor={theme.colors.text.tertiary} // #4C5461
        selectionColor={theme.colors.border.focus} // #4C86FF cursor color
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...textInputProps}
      />
      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing[1],
  },
  error: {
    color: theme.colors.error[500],
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.primary,
    marginTop: theme.spacing[1],
  },
});

export default Input;
