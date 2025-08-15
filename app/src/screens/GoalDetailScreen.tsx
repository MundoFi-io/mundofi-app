import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView, Modal, Pressable, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CircularProgress from '../components/CircularProgress';
import ActivityItem from '../components/ActivityItem';
import AddFundsModal from '../components/AddFundsModal';
import Button from '../components/ui/Button';
import theme from '../styles/theme';

interface GoalDetailProps {
  route: {
    params: {
      goal: {
        id: string;
        title: string;
        targetAmount: number;
        currentAmount: number;
        percentage: number;
        cryptoType: string;
        cryptoIcon: string;
      };
      showSuccessPopup?: boolean;
      fromCreateGoal?: boolean;
    };
  };
  navigation: {
    goBack: () => void;
    navigate: (screen: string, params?: any) => void;
  };
}

// Mock activity data - will replace with real data later
const mockActivities = [
  {
    id: '1',
    type: 'added_funds',
    name: 'Added funds',
    amount: 500,
    time: '5 min ago',
  },
  {
    id: '2',
    type: 'added_funds',
    name: 'Added funds',
    amount: 250,
    time: '1 hr ago',
  },
  {
    id: '3',
    type: 'goal_started',
    name: 'Goal started',
    amount: null,
    time: 'Aug 10',
  },
  {
    id: '4',
    type: 'added_funds',
    name: 'Added funds',
    amount: 1000,
    time: 'Aug 8',
  },
  {
    id: '5',
    type: 'added_funds',
    name: 'Added funds',
    amount: 750,
    time: 'Aug 5',
  },
];

export default function GoalDetailScreen({ route, navigation }: GoalDetailProps) {
  const { goal, showSuccessPopup = false, fromCreateGoal = false } = route.params;
  const [showAddFundsModal, setShowAddFundsModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(showSuccessPopup);
  const [showFundsAddedNotification, setShowFundsAddedNotification] = useState(false);
  const [addedAmount, setAddedAmount] = useState(0);
  const slideAnim = useRef(new Animated.Value(-100)).current;

  // Determine if this is a newly created goal
  const isNewGoal = goal.currentAmount === 0 && goal.percentage === 0;
  
  // Show success popup with auto-hide if coming from goal creation
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2500); // Show for 2.5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);
  
  // Activity data based on goal state
  const getGoalActivities = () => {
    if (isNewGoal) {
      // For new goals, show only the "goal created" activity
      return [
        {
          id: 'created',
          type: 'goal_started',
          name: 'Goal started',
          amount: null,
          time: 'Just now',
        }
      ];
    } else {
      // For existing goals, show mock activities (would be replaced with real data)
      return mockActivities;
    }
  };

  const activities = getGoalActivities();

  const handleBack = () => {
    if (fromCreateGoal) {
      // If coming from Create Goal, navigate to Goals tab within MainTabs
      (navigation as any).navigate('MainTabs', { screen: 'Goals' });
    } else {
      // Otherwise, use normal back navigation
      navigation.goBack();
    }
  };

  const handleEdit = () => {
    // Navigate to edit screen (will implement later)
    console.log('Edit goal:', goal.id);
  };

  const handleAddFunds = () => {
    setShowAddFundsModal(true);
  };

  const handleCloseModal = () => {
    setShowAddFundsModal(false);
  };

  const handleFundsAdded = (amount: number) => {
    setAddedAmount(amount);
    setShowFundsAddedNotification(true);
    
    // Reset animation to starting position
    slideAnim.setValue(-100);
    
    // Slide down animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    
    // Auto-hide notification after 2 seconds
    setTimeout(() => {
      // Slide up animation
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowFundsAddedNotification(false);
      });
    }, 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Funds Added Success Notification */}
      {showFundsAddedNotification && (
        <Animated.View 
          style={[
            styles.successNotification,
            {
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.successNotificationContent}>
            <Ionicons name="checkmark-circle" size={20} color={theme.colors.text.inverse} />
            <Text style={styles.successNotificationText}>
              Added ${addedAmount} to {goal.title}
            </Text>
          </View>
        </Animated.View>
      )}
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color={theme.colors.text.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit} style={styles.headerButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Goal Title with Crypto Info */}
        <View style={styles.goalHeader}>
          <View style={styles.goalTitleRow}>
            <Text style={styles.goalTitle}>{goal.title}</Text>
            <View style={styles.cryptoBadge}>
              <Text style={styles.cryptoIcon}>{goal.cryptoIcon}</Text>
              <Text style={styles.cryptoType}>{goal.cryptoType}</Text>
            </View>
          </View>
        </View>

        {/* Circular Progress */}
        <View style={styles.progressContainer}>
          <CircularProgress
            currentAmount={goal.currentAmount}
            targetAmount={goal.targetAmount}
            percentage={goal.percentage}
            progressColor="#02D279"
          />
        </View>

        {/* Activity History */}
        <View style={styles.activitySection}>
          <Text style={styles.activityTitle}>All Activity</Text>
          
          {isNewGoal && (
            <View style={styles.emptyStateContainer}>
              <View style={styles.emptyStateIcon}>
                <Ionicons name="rocket-outline" size={32} color={theme.colors.primary[500]} />
              </View>
              <Text style={styles.emptyStateTitle}>Ready to Start Saving!</Text>
              <Text style={styles.emptyStateMessage}>
                Your goal has been created successfully. Tap "Add Funds" below to make your first deposit and start working towards your {goal.title} goal.
              </Text>
            </View>
          )}
          
          <View style={styles.activityList}>
            {activities.map((activity) => (
              <ActivityItem
                key={activity.id}
                type={activity.type}
                name={activity.name}
                amount={activity.amount}
                time={activity.time}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Funds Button */}
      <View style={styles.bottomContainer}>
        <Button
          title="Add Funds"
          onPress={handleAddFunds}
          variant="success"
          fullWidth={true}
        />
      </View>

      {/* Add Funds Modal */}
      <AddFundsModal 
        visible={showAddFundsModal}
        onClose={handleCloseModal}
        onSuccess={handleFundsAdded}
        goal={goal}
      />

      {/* Goal Created Success Popup */}
      <Modal
        visible={showSuccess}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <Pressable
          style={styles.successModalOverlay}
          onPress={() => setShowSuccess(false)}
        >
          <Pressable
            style={styles.successModalContent}
            onPress={(e: any) => e.stopPropagation()}
          >
            {/* Success Animation Area */}
            <View style={styles.successIconContainer}>
              <Text style={styles.successIcon}>🎉</Text>
            </View>
            
            <Text style={styles.successTitle}>Goal Created!</Text>
            
            <Text style={styles.successMessage}>
              Your "{goal.title}" goal has been created successfully!
            </Text>

            <Text style={styles.successSubtext}>
              Ready to start saving? Tap "Add Funds" below.
            </Text>
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  headerButton: {
    padding: 8,
  },
  editButtonText: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: '600',
    color: theme.colors.text.primary,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  goalHeader: {
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 10,
  },
  goalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalTitle: {
    fontSize: 32,
    fontFamily: theme.typography.fontFamily.primaryMedium,
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginRight: 12,
  },
  cryptoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.background.tertiary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
  },
  cryptoIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  cryptoType: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.primary,
    fontWeight: '500',
    color: theme.colors.text.primary,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 32,
    paddingHorizontal: 20,
  },
  activitySection: {
    marginBottom: 32,
  },
  activityTitle: {
    fontSize: 20,
    fontFamily: theme.typography.fontFamily.primaryMedium,
    color: theme.colors.text.primary,
    marginBottom: 16,
  },
  activityList: {
    backgroundColor: theme.colors.background.secondary,
    color: theme.colors.text.primary, 
    fontFamily: theme.typography.fontFamily.primary, 
    fontWeight: '500',
    borderRadius: 12,
    paddingVertical: 16,
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 12,
    marginBottom: 16,
  },
  emptyStateIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: theme.colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: theme.typography.fontFamily.primaryMedium,
    color: theme.colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateMessage: {
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  successModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModalContent: {
    backgroundColor: theme.colors.background.secondary,
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    maxWidth: 300,
  },
  successIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.background.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  successIcon: {
    fontSize: 40,
  },
  successTitle: {
    fontSize: 24,
    fontFamily: theme.typography.fontFamily.primaryMedium,
    color: theme.colors.success[500],
    textAlign: 'center',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 16,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 8,
  },
  successSubtext: {
    fontSize: 12,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.tertiary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  successNotification: {
    position: 'absolute',
    top: 50, // Move below status bar
    left: 0,
    right: 0,
    backgroundColor: '#22C55E',
    paddingVertical: 16,
    paddingHorizontal: 16,
    zIndex: 1000,
    elevation: 1000,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  successNotificationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successNotificationText: {
    color: theme.colors.text.inverse,
    fontSize: 14,
    fontFamily: theme.typography.fontFamily.primaryMedium,
    marginLeft: 8,
  },
});
