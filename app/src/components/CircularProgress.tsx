import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface CircularProgressProps {
  currentAmount: number;
  targetAmount: number;
  percentage: number;
  size?: number;
  showAmounts?: boolean;
  progressColor?: string;
}

export default function CircularProgress({ 
  currentAmount, 
  targetAmount, 
  percentage,
  size = 200,
  showAmounts = true,
  progressColor = '#22C55E'
}: CircularProgressProps) {
  const strokeWidth = size >= 220 ? 14 : 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.container}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#333333"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress Circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      
      {/* Center Content */}
      {showAmounts && (
        <View style={styles.centerContent}>
          <Text style={styles.currentAmount}>${currentAmount.toLocaleString()}</Text>
          <Text style={styles.targetText}>of ${targetAmount.toLocaleString()} goal</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  targetText: {
    fontSize: 16,
    color: '#CCCCCC',
  },
});
