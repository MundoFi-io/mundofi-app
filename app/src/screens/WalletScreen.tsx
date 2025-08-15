import React from 'react';
import { View, Text } from 'react-native';

export default function ActivityScreen() {
  return (
    <View className="flex-1 bg-white items-center justify-center">
      <Text className="text-2xl font-bold text-gray-800">Activity</Text>
      <Text className="text-gray-600 mt-2">All your financial activity and transactions</Text>
    </View>
  );
}
