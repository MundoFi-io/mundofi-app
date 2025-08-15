import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from '../components/CircularProgress';
import theme from '../styles/theme';

interface TrustActivityItem {
  id: string;
  type: 'contribution' | 'holding_streak' | 'swap_efficiency' | 'portfolio_risk' | 'consistency';
  title: string;
  description: string;
  impact: number; // positive or negative score impact
  date: string;
}

const TrustScreen: React.FC = () => {
  // Mock trust score data
  const trustScore = 742; // Out of 850 (like credit scores)
  const scoreChange = 12; // Change this month
  const scoreRange = getScoreRange(trustScore);
  
  // Mock trust activities based on on-chain behavior
  const mockTrustActivities: TrustActivityItem[] = [
    {
      id: '1',
      type: 'contribution',
      title: 'Consistent Savings',
      description: 'Regular contributions to goals for 3 months',
      impact: 15,
      date: '2 days ago',
    },
    {
      id: '2',
      type: 'holding_streak',
      title: 'Diamond Hands',
      description: 'Held positions during 20% market dip',
      impact: 8,
      date: '1 week ago',
    },
    {
      id: '3',
      type: 'swap_efficiency',
      title: 'Smart Swapping',
      description: 'Optimal timing on DCA purchases',
      impact: 5,
      date: '3 days ago',
    },
    {
      id: '4',
      type: 'portfolio_risk',
      title: 'Risk Management',
      description: 'Balanced portfolio allocation (70/30 stable/growth)',
      impact: 10,
      date: '1 week ago',
    },
    {
      id: '5',
      type: 'consistency',
      title: 'Goal Completion',
      description: 'Successfully completed Emergency Fund goal',
      impact: 25,
      date: '2 weeks ago',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Financial Trust</Text>
          <TouchableOpacity style={styles.shareButton}>
            <Ionicons name="share-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Trust Score Circle */}
        <View style={styles.scoreSection}>
          <Text style={styles.scoreTitle}>Trust Score</Text>
          <View style={styles.circleContainer}>
            <CircularProgress 
              size={220}
              percentage={Math.round((trustScore / 850) * 100)}
              currentAmount={trustScore}
              targetAmount={850}
              showAmounts={false}
            />
            <View style={styles.scoreContent}>
              <Text style={styles.scoreNumber}>{trustScore}</Text>
              <Text style={styles.scoreRange}>{scoreRange}</Text>
              <Text style={styles.scoreChange}>
                +{scoreChange} this month
              </Text>
            </View>
          </View>
        </View>

        {/* Score Range Info */}
        <View style={styles.rangeSection}>
          <Text style={styles.rangeTitle}>Score Ranges</Text>
          <View style={styles.rangeItems}>
            <ScoreRangeItem range="800-850" label="Excellent" current={trustScore >= 800} />
            <ScoreRangeItem range="740-799" label="Very Good" current={trustScore >= 740 && trustScore < 800} />
            <ScoreRangeItem range="670-739" label="Good" current={trustScore >= 670 && trustScore < 740} />
            <ScoreRangeItem range="580-669" label="Fair" current={trustScore >= 580 && trustScore < 670} />
            <ScoreRangeItem range="300-579" label="Poor" current={trustScore >= 300 && trustScore < 580} />
          </View>
        </View>

        {/* Trust Building Activities */}
        <View style={styles.activitiesSection}>
          <Text style={styles.activitiesTitle}>Recent Activity</Text>
          <Text style={styles.activitiesSubtitle}>
            On-chain behaviors that build your financial trust
          </Text>
          
          {mockTrustActivities.map((activity) => (
            <TrustActivityItem key={activity.id} activity={activity} />
          ))}
        </View>

        {/* Download Report Button */}
        <TouchableOpacity style={styles.downloadButton}>
          <Ionicons name="download-outline" size={20} color="#000000" />
          <Text style={styles.downloadButtonText}>Download Trust Report</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper function to get score range category
function getScoreRange(score: number): string {
  if (score >= 800) return 'Excellent';
  if (score >= 740) return 'Very Good';
  if (score >= 670) return 'Good';
  if (score >= 580) return 'Fair';
  return 'Poor';
}

// Score Range Item Component
interface ScoreRangeItemProps {
  range: string;
  label: string;
  current: boolean;
}

const ScoreRangeItem: React.FC<ScoreRangeItemProps> = ({ range, label, current }) => (
  <View style={[styles.rangeItem, current && styles.rangeItemCurrent]}>
    <Text style={[styles.rangeItemRange, current && styles.rangeItemTextCurrent]}>
      {range}
    </Text>
    <Text style={[styles.rangeItemLabel, current && styles.rangeItemTextCurrent]}>
      {label}
    </Text>
    {current && <Ionicons name="checkmark-circle" size={20} color="#22C55E" />}
  </View>
);

// Trust Activity Item Component
interface TrustActivityItemProps {
  activity: TrustActivityItem;
}

const TrustActivityItem: React.FC<TrustActivityItemProps> = ({ activity }) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'contribution': return 'wallet-outline';
      case 'holding_streak': return 'diamond-outline';
      case 'swap_efficiency': return 'swap-horizontal-outline';
      case 'portfolio_risk': return 'pie-chart-outline';
      case 'consistency': return 'trophy-outline';
      default: return 'star-outline';
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact > 15) return '#22C55E'; // Green for high positive impact
    if (impact > 5) return '#3B82F6'; // Blue for moderate positive impact
    return '#8B5CF6'; // Purple for low positive impact
  };

  return (
    <View style={styles.activityItem}>
      <View style={styles.activityIcon}>
        <Ionicons 
          name={getActivityIcon(activity.type) as any}
          size={24} 
          color="#FFFFFF" 
        />
      </View>
      <View style={styles.activityContent}>
        <View style={styles.activityHeader}>
          <Text style={styles.activityTitle}>{activity.title}</Text>
          <Text style={[styles.activityImpact, { color: getImpactColor(activity.impact) }]}>
            +{activity.impact}
          </Text>
        </View>
        <Text style={styles.activityDescription}>{activity.description}</Text>
        <Text style={styles.activityDate}>{activity.date}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  shareButton: {
    padding: 8,
  },
  scoreSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  scoreTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 24,
  },
  circleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scoreRange: {
    fontSize: 18,
    fontWeight: '500',
    color: '#22C55E',
    marginTop: 4,
  },
  scoreChange: {
    fontSize: 14,
    color: '#22C55E',
    marginTop: 8,
  },
  rangeSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  rangeTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  rangeItems: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
  },
  rangeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  rangeItemCurrent: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: -12,
  },
  rangeItemRange: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.secondary,
    flex: 1,
  },
  rangeItemLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text.secondary,
    flex: 1,
    textAlign: 'center',
  },
  rangeItemTextCurrent: {
    color: '#FFFFFF',
  },
  activitiesSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  activitiesTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  activitiesSubtitle: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  activityImpact: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activityDescription: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  activityDate: {
    fontSize: 12,
    color: '#888888',
  },
  downloadButton: {
    flexDirection: 'row',
    backgroundColor: '#22C55E',
    borderRadius: 25,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
  },
});

export default TrustScreen;