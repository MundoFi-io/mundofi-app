import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import theme from '../styles/theme';

interface GoalCardProps {
  id: string;
  title: string;
  percentage: number;
  currentAmount: number;
  targetAmount: number;
  cryptoType: string;
  cryptoIcon: string;
  onPress?: (goal: {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    percentage: number;
    cryptoType: string;
    cryptoIcon: string;
  }) => void;
}

export default function GoalCard({ id, title, percentage, currentAmount, targetAmount, cryptoType, cryptoIcon, onPress }: GoalCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress({ id, title, targetAmount, currentAmount, percentage, cryptoType, cryptoIcon });
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress} activeOpacity={0.7}>
      {/* Header with Title and Crypto Type */}
      <View style={styles.header}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.cryptoBadge}>
          <Text style={styles.cryptoIcon}>{cryptoIcon}</Text>
          <Text style={styles.cryptoType}>{cryptoType}</Text>
        </View>
      </View>
      
      {/* Progress Bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>Progress</Text>
          <Text style={styles.progressPercentage}>{percentage}%</Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View 
            style={[styles.progressBar, { width: `${percentage}%` }]}
          />
        </View>
      </View>

      {/* Amount Information */}
      <View style={styles.amountSection}>
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>Saved</Text>
          <Text style={styles.amountValue}>
            ${currentAmount.toLocaleString()}
          </Text>
        </View>
        <View style={styles.amountRow}>
          <Text style={styles.amountLabel}>Target</Text>
          <Text style={styles.amountValue}>
            ${targetAmount.toLocaleString()}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    ...theme.components.card.elevated,
    backgroundColor: theme.colors.background.secondary,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
    padding: theme.spacing[4],
    borderRadius: theme.borderRadius.lg,
    ...theme.shadows.base,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing[3],
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text.primary,
    flex: 1,
    marginRight: theme.spacing[2],
  },
  cryptoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.tertiary,
    paddingHorizontal: theme.spacing[2],
    paddingVertical: theme.spacing[1],
    borderRadius: theme.borderRadius.md,
  },
  cryptoIcon: {
    fontSize: theme.typography.fontSize.xs,
    marginRight: theme.spacing[1],
  },
  cryptoType: {
    fontSize: theme.typography.fontSize.xs,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
  },
  progressSection: {
    marginBottom: theme.spacing[3],
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing[2],
  },
  progressLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  progressPercentage: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.primary[500],
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: theme.colors.neutral[700],
    borderRadius: theme.borderRadius.sm,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary[500],
    borderRadius: theme.borderRadius.sm,
  },
  amountSection: {
    gap: theme.spacing[1],
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  amountValue: {
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text.primary,
  },
});
