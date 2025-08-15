import React from 'react';
import { Text, TextStyle } from 'react-native';
import theme from '../../styles/theme';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'bodySecondary' | 'caption' | 'button';
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
  onPress?: () => void;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color,
  style,
  numberOfLines,
  onPress,
}) => {
  const getTextStyle = () => {
    const baseStyle = { ...theme.textStyles[variant] };
    
    if (color) {
      baseStyle.color = color;
    }
    
    return baseStyle;
  };

  return (
    <Text
      style={[getTextStyle(), style]}
      numberOfLines={numberOfLines}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

export default Typography;
