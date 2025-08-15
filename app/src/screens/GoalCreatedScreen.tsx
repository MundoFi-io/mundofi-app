import React from 'react';
import { View, Text } from 'react-native';

export default function GoalCreatedScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1F2937' }}>Goal Created!</Text>
      <Text style={{ color: '#6B7280', marginTop: 8 }}>Your new savings goal has been created successfully</Text>
      <Text style={{ fontSize: 14, color: '#9CA3AF', marginTop: 16 }}>Placeholder screen - will be enhanced later</Text>
    </View>
  );
}
