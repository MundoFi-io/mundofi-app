import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './BottomTabNavigator';
import GoalCreatedScreen from '../screens/GoalCreatedScreen';
import GoalDetailScreen from '../screens/GoalDetailScreen';
import CreateGoalScreen from '../screens/CreateGoalScreen';
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
// ActionChoiceScreen removed - functionality merged into WelcomeScreen
import CreateWalletFlowScreen from '../screens/onboarding/CreateWalletFlowScreen';
import ConnectWalletFlowScreen from '../screens/onboarding/ConnectWalletFlowScreen';
import { useAuthStore } from '../store/useAuthStore';
import theme from '../styles/theme';

export type RootStackParamList = {
  Welcome: undefined;
  CreateWalletFlow: undefined;
  ConnectWalletFlow: undefined;
  Dashboard: undefined;
  MainTabs: undefined;
  GoalCreated: undefined;
  CreateGoal: undefined;
  GoalDetail: {
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

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuthStore();

  // Show loading screen while checking authentication state
  if (isLoading) {
    return (
      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: theme.colors.background.primary 
      }}>
        <View style={{
          width: 60,
          height: 60,
          backgroundColor: theme.colors.primary[500],
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <Text style={{
            color: theme.colors.text.inverse,
            fontSize: 24,
            fontWeight: 'bold'
          }}>M</Text>
        </View>
        <Text style={{
          fontSize: 16,
          color: theme.colors.text.secondary
        }}>
          Loading...
        </Text>
      </View>
    );
  }

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.background.primary,
        },
        headerTintColor: theme.colors.text.primary,
        headerTitleStyle: {
          color: theme.colors.text.primary,
        },
      }}
    >
      {!isAuthenticated ? (
        // Onboarding Stack - ActionChoice functionality merged into Welcome
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="CreateWalletFlow" component={CreateWalletFlowScreen} />
          <Stack.Screen name="ConnectWalletFlow" component={ConnectWalletFlowScreen} />
        </>
      ) : (
        // Main App Stack
        <>
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen 
            name="GoalCreated" 
            component={GoalCreatedScreen}
            options={{
              headerShown: true,
              title: 'Goal Created',
              presentation: 'modal'
            }}
          />
          <Stack.Screen 
            name="CreateGoal" 
            component={CreateGoalScreen}
            options={{
              headerShown: false,
              presentation: 'modal'
            }}
          />
          <Stack.Screen 
            name="GoalDetail" 
            component={GoalDetailScreen}
            options={{
              headerShown: false,
              presentation: 'card'
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
