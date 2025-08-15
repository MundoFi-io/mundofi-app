import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import theme from '../styles/theme';

interface ActivityItemProps {
  type: 'added_funds' | 'withdrew_funds' | 'goal_started' | 'goal_completed';
  name: string;
  amount: number | null;
  time: string;
}

export default function ActivityItem({ type, name, amount, time }: ActivityItemProps) {
  const getActivityIcon = (activityType: string) => {
    switch (activityType) {
      case 'added_funds':
        return { name: 'add-circle', color: '#22C55E' };
      case 'withdrew_funds':
        return { name: 'remove-circle', color: '#EF4444' };
      case 'goal_started':
        return { name: 'flag', color: '#3B82F6' };
      case 'goal_completed':
        return { name: 'checkmark-circle', color: '#22C55E' };
      default:
        return { name: 'ellipse', color: '#6B7280' };
    }
  };

  const getAmountStyle = (activityType: string) => {
    switch (activityType) {
      case 'added_funds':
        return { color: '#22C55E', prefix: '+' };
      case 'withdrew_funds':
        return { color: '#EF4444', prefix: '-' };
      default:
        return { color: '#6B7280', prefix: '' };
    }
  };

  const icon = getActivityIcon(type);
  const amountStyle = getAmountStyle(type);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon.name as any} size={24} color={icon.color} />
      </View>
      
      <View style={styles.content}>
        <View style={styles.mainRow}>
          <Text style={styles.activityName}>{name}</Text>
          {amount && (
            <Text style={[styles.amount, { color: amountStyle.color }]}>
              {amountStyle.prefix}${amount.toLocaleString()}
            </Text>
          )}
        </View>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  iconContainer: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  mainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityName: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.primary,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
});
