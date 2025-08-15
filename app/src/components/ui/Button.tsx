import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import theme from '../../styles/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'brandPrimary' | 'success' | 'danger';
  size?: 'sm' | 'base' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'base',
  disabled = false,
  loading = false,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getButtonStyle = () => {
    const baseStyle: ViewStyle = {
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled || loading ? 0.6 : 1,
    };

    // Variant-specific styles
    switch (variant) {
      case 'primary':
        baseStyle.backgroundColor = '#F2F2F2';
        break;
      case 'secondary':
        baseStyle.backgroundColor = '#000000';
        baseStyle.borderWidth = 1;
        baseStyle.borderColor = '#222531';
        break;
      case 'brandPrimary':
        baseStyle.backgroundColor = '#001847';
        break;
      case 'success':
        baseStyle.backgroundColor = '#003D23';
        break;
      case 'danger':
        baseStyle.backgroundColor = '#3D0000';
        break;
    }

    if (fullWidth) {
      baseStyle.width = '100%';
    }

    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle: TextStyle = {
      fontFamily: theme.typography.fontFamily.primaryMedium,
      fontSize: 16,
      textAlign: 'center',
    };

    // Variant-specific text colors
    switch (variant) {
      case 'primary':
        baseTextStyle.color = '#000000'; // Dark text for light background
        break;
      case 'secondary':
        baseTextStyle.color = '#F2F2F2';
        break;
      case 'brandPrimary':
        baseTextStyle.color = '#4C86FF';
        break;
      case 'success':
        baseTextStyle.color = '#0CE98A';
        break;
      case 'danger':
        baseTextStyle.color = '#F43434';
        break;
    }

    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={getTextStyle().color} 
          size="small" 
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
