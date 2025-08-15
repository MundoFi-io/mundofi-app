import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import AppNavigator from './src/navigation/AppNavigator';
import { CDP_CONFIG } from './src/lib/cdp';
// Coinbase Wallet Mobile SDK - imported conditionally to avoid native module errors

// Try to import the provider - let's see if it exists for React Native
let CDPHooksProvider: any;
try {
  CDPHooksProvider = require('@coinbase/cdp-hooks').CDPHooksProvider;
} catch (error) {
  console.log('CDPHooksProvider not available:', error);
  CDPHooksProvider = null;
}

export default function App() {
  useEffect(() => {
    console.log('🔧 Setting up wallet integrations for React Native...');
    console.log('CDP Config:', CDP_CONFIG);
    console.log('CDPHooksProvider available:', !!CDPHooksProvider);
    
    // Initialize Coinbase Wallet Mobile SDK for Flow B (only in development builds)
    try {
      const coinbaseWallet = require('./src/lib/coinbaseWallet');
      coinbaseWallet.initializeCoinbaseWallet();
      console.log('✅ Coinbase Wallet Mobile SDK initialized');
    } catch (error) {
      console.log('🎭 Coinbase Wallet Mobile SDK not available (using Expo Go) - this is expected for device testing');
    }
  }, []);

  const AppContent = () => (
    <ActionSheetProvider>
      <NavigationContainer>
        <AppNavigator />
        <StatusBar style="light" />
      </NavigationContainer>
    </ActionSheetProvider>
  );

  // If we have a provider, wrap the app
  if (CDPHooksProvider) {
    return (
      <CDPHooksProvider config={CDP_CONFIG}>
        <AppContent />
      </CDPHooksProvider>
    );
  }

  // Otherwise, run without provider (for now)
  return <AppContent />;
}
