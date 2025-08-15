import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import GoalCard from '../components/GoalCard';
import { RootStackParamList } from '../navigation/AppNavigator';
import theme from '../styles/theme';

type GoalsScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // Account for padding and gap

// Mock data for testing - will replace with real data later
const mockGoals = [
  {
    id: '1',
    title: 'Emergency Fund',
    targetAmount: 5000,
    currentAmount: 3350,
    percentage: 67,
    cryptoType: 'USDC',
    cryptoIcon: '💵',
  },
  {
    id: '2',
    title: 'New Car',
    targetAmount: 25000,
    currentAmount: 8750,
    percentage: 35,
    cryptoType: 'BTC',
    cryptoIcon: '₿',
  },
  {
    id: '3',
    title: 'Vacation',
    targetAmount: 3000,
    currentAmount: 2100,
    percentage: 70,
    cryptoType: 'ETH',
    cryptoIcon: 'Ξ',
  },
  {
    id: '4',
    title: 'Home Down Payment',
    targetAmount: 50000,
    currentAmount: 12500,
    percentage: 25,
    cryptoType: 'USDC',
    cryptoIcon: '💵',
  },
];

export default function GoalsScreen() {
  const navigation = useNavigation<GoalsScreenNavigationProp>();

  // Calculate totals from mock data
  const totalBalance = mockGoals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const activeGoalsCount = mockGoals.length;

  const handleGoalPress = (goal: {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    percentage: number;
    cryptoType: string;
    cryptoIcon: string;
  }) => {
    navigation.navigate('GoalDetail', { goal });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Goals</Text>
      </View>

      {/* Metrics Widget */}
      <View style={styles.metricsWidget}>
        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Total Balance</Text>
            <Text style={styles.metricValue}>
              ${totalBalance.toLocaleString()}
            </Text>
          </View>
          <View style={styles.metricItemRight}>
            <Text style={styles.metricLabel}>Active Goals</Text>
            <Text style={styles.metricValueBlue}>
              {activeGoalsCount}
            </Text>
          </View>
        </View>
      </View>

      {/* Goals Grid - 2x2 Layout */}
      <View style={styles.goalsContainer}>
        <View style={styles.goalsGrid}>
          {mockGoals.map((goal, index) => (
            <View key={goal.id} style={[styles.goalCardWrapper, { width: cardWidth }]}>
              <GoalCard
                id={goal.id}
                title={goal.title}
                percentage={goal.percentage}
                currentAmount={goal.currentAmount}
                targetAmount={goal.targetAmount}
                cryptoType={goal.cryptoType}
                cryptoIcon={goal.cryptoIcon}
                onPress={handleGoalPress}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    paddingTop: 64,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.background.primary,
  },
  headerTitle: {
    fontSize: 32,
    fontFamily: theme.typography.fontFamily.primaryMedium,
    color: theme.colors.text.primary,
  },
  metricsWidget: {
    marginHorizontal: 24,
    marginBottom: 24,
    padding: 16,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.md,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricItem: {
    flex: 1,
  },
  metricItemRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  metricLabel: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.secondary,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily.primaryMedium,
    color: theme.colors.text.primary,
  },
  metricValueBlue: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily.primaryMedium,
    color: theme.colors.primary[500],
  },
  goalsContainer: {
    paddingHorizontal: 20,
  },
  goalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  goalCardWrapper: {
    marginBottom: 16,
  },
});
