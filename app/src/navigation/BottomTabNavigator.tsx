import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { TouchableOpacity, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DashboardScreen from '../screens/DashboardScreen';
import GoalsScreen from '../screens/GoalsScreen';
import ActivityScreen from '../screens/ActivityScreen';
import TrustScreen from '../screens/TrustScreen';
import theme from '../styles/theme';

const Tab = createBottomTabNavigator();

// Center Action Button Component
function CenterActionButton() {
  const { showActionSheetWithOptions } = useActionSheet();
  const navigation = useNavigation();

  const handlePress = () => {
    const options = ['Create Goal', 'Add Funds', 'Receive Funds'];
    
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: -1, // No cancel button, close on outside tap
      },
      (buttonIndex) => {
        switch (buttonIndex) {
          case 0: // Create Goal
            // @ts-ignore - navigation type will be fixed later
            navigation.navigate('CreateGoal');
            break;
          case 1: // Add Funds
            // TODO: Navigate to Add Funds flow
            console.log('Add Funds pressed');
            break;
          case 2: // Receive Funds
            // TODO: Navigate to Receive Funds screen
            console.log('Receive Funds pressed');
            break;
        }
      }
    );
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        width: 48,
        height: 48,
        backgroundColor: theme.colors.primary[500],
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      }}
    >
      <Text style={{
        color: theme.colors.text.inverse,
        fontSize: 24,
        fontWeight: 'bold'
      }}>+</Text>
    </TouchableOpacity>
  );
}

// Placeholder component for center tab
function PlaceholderScreen() {
  return <View />;
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.text.primary,
        tabBarInactiveTintColor: theme.colors.text.secondary,
        tabBarStyle: {
          backgroundColor: theme.colors.background.primary,
          borderTopWidth: 1,
          borderTopColor: theme.colors.border.primary,
          height: 90,
          paddingBottom: 20,
        },
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          title: 'Dashboard',
        }}
      />
      <Tab.Screen 
        name="Goals" 
        component={GoalsScreen}
        options={{
          title: 'Goals',
        }}
      />
      <Tab.Screen
        name="Actions"
        component={PlaceholderScreen}
        options={{
          title: '',
          tabBarButton: (props) => (
            <View style={{ flex: 1, alignItems: 'center' }}>
              <CenterActionButton />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Activity" 
        component={ActivityScreen}
        options={{
          title: 'Activity',
        }}
      />
      <Tab.Screen 
        name="Trust" 
        component={TrustScreen}
        options={{
          title: 'Trust',
        }}
      />
    </Tab.Navigator>
  );
}
