import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import theme from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  variant?: 'base' | 'elevated';
  style?: ViewStyle;
  padding?: keyof typeof theme.spacing;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'base',
  style,
  padding,
}) => {
  const getCardStyle = () => {
    const baseStyle = { ...theme.components.card[variant] };
    
    if (padding !== undefined) {
      baseStyle.padding = theme.spacing[padding];
    }
    
    return baseStyle;
  };

  return (
    <View style={[getCardStyle(), style]}>
      {children}
    </View>
  );
};

export default Card;
