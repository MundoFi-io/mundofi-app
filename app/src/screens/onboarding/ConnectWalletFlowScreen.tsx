import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar, Alert, ActivityIndicator, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/useAuthStore';
import theme from '../../styles/theme';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

type FlowStep = 'connect' | 'naming' | 'security';

export default function ConnectWalletFlowScreen() {
  const navigation = useNavigation();
  const { setWallet } = useAuthStore();
  
  const [currentStep, setCurrentStep] = useState<FlowStep>('connect');
  const [walletName, setWalletName] = useState('');
  const [pin, setPin] = useState('');
  const [connectedAddress, setConnectedAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    if (currentStep === 'connect') {
      navigation.goBack();
    } else if (currentStep === 'naming') {
      setCurrentStep('connect');
      setError(null);
    } else if (currentStep === 'security') {
      setCurrentStep('naming');
      setError(null);
    }
  };

  const handleWalletConnect = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔗 Connecting via WalletConnect...');
      
      // Simulate WalletConnect connection with a random address
      // In a real implementation, this would use the WalletConnect modal
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const randomAddress = '0x' + Array.from({length: 40}, () => 
        Math.floor(Math.random()*16).toString(16)
      ).join('');
      
      setConnectedAddress(randomAddress);
      setCurrentStep('naming');
      console.log('✅ WalletConnect wallet connected:', randomAddress);
      
    } catch (error) {
      console.error('❌ WalletConnect connection failed:', error);
      setError('Unable to connect wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletNaming = async () => {
    if (!walletName.trim()) {
      setError('Please enter a name for your wallet');
      return;
    }

    setCurrentStep('security');
    setError(null);
    console.log('✅ Wallet named:', walletName.trim());
  };

  const handlePinChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '').substring(0, 6);
    setPin(numericValue);
  };



  const handlePinSetup = async () => {
    if (pin.length !== 6) {
      setError('Please enter a 6-digit PIN');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🔐 Setting up PIN and finalizing wallet connection...');
      
      const walletInfo = {
        name: walletName.trim(),
        address: connectedAddress,
        network: 'base-sepolia',
        createdAt: new Date().toISOString(),
        pin: pin, // Store PIN (in real app, this would be hashed/encrypted)
        justCreated: true, // Flag for dashboard success popup
      };
      
      console.log('✅ External wallet setup complete:', { ...walletInfo, pin: '******' });
      
      // Set wallet in store (triggers navigation to dashboard)
      setWallet(walletInfo);

      console.log('🎉 External wallet setup complete - navigating to dashboard!');

    } catch (error) {
      console.error('❌ PIN setup failed:', error);
      setError('Failed to set up PIN. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderConnectStep = () => (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* Main Content */}
        <View style={{ marginBottom: 60 }}>
          <Text style={{
            fontSize: 34,
            fontFamily: theme.typography.fontFamily.primaryMedium,
            color: theme.colors.text.primary,
            textAlign: 'left',
            lineHeight: 42,
            marginBottom: 24
          }}>
            Connect Your Wallet
          </Text>

          <Text style={{
            fontSize: 16,
            fontFamily: theme.typography.fontFamily.primary,
            color: theme.colors.text.secondary,
            textAlign: 'left',
            lineHeight: 24,
            marginBottom: 40
          }}>
            Connect your existing crypto wallet using{'\n'}WalletConnect to get started.
          </Text>

          {/* WalletConnect Option */}
          <TouchableOpacity
            onPress={handleWalletConnect}
            disabled={isLoading}
            style={{
              backgroundColor: theme.colors.background.secondary,
              borderWidth: 1,
              borderColor: isLoading ? theme.colors.success[500] : theme.colors.primary[500],
              borderRadius: 16,
              padding: 20,
              width: '100%',
              opacity: isLoading ? 0.7 : 1.0,
              marginBottom: 16
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: theme.colors.background.tertiary,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16
              }}>
                {isLoading ? (
                  <ActivityIndicator color={theme.colors.success[500]} size="small" />
                ) : (
                  <Text style={{ fontSize: 18 }}>🔗</Text>
                )}
              </View>
              <Text style={{ 
                fontSize: 18, 
                fontFamily: theme.typography.fontFamily.primaryMedium,
                color: theme.colors.text.primary
              }}>
                {isLoading ? 'Connecting...' : 'WalletConnect'}
              </Text>
            </View>
            <Text style={{ 
              fontSize: 14, 
              fontFamily: theme.typography.fontFamily.primary,
              color: theme.colors.text.secondary,
              lineHeight: 20 
            }}>
              Connect MetaMask, Trust Wallet, Coinbase Wallet, and 300+ other wallets
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Button */}
      <View style={{ paddingBottom: 34 }}>
        <Button
          title={isLoading ? "Connecting..." : "Connect Wallet"}
          onPress={handleWalletConnect}
          variant="primary"
          fullWidth={true}
          disabled={isLoading}
          loading={isLoading}
        />
        
        {error && (
          <View style={{ 
            marginTop: 16,
            padding: 16, 
            backgroundColor: theme.colors.background.tertiary, 
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.colors.error[500]
          }}>
            <Text style={{ 
              color: theme.colors.error[500], 
              textAlign: 'center', 
              fontSize: 14,
              fontFamily: theme.typography.fontFamily.primary
            }}>
              {error}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderNamingStep = () => (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* Main Content */}
        <View style={{ marginBottom: 60 }}>
          <Text style={{
            fontSize: 34,
            fontFamily: theme.typography.fontFamily.primaryMedium,
            color: theme.colors.text.primary,
            textAlign: 'left',
            lineHeight: 42,
            marginBottom: 24
          }}>
            Name Your Wallet
          </Text>

          <Text style={{
            fontSize: 16,
            fontFamily: theme.typography.fontFamily.primary,
            color: theme.colors.text.secondary,
            textAlign: 'left',
            lineHeight: 24,
            marginBottom: 16
          }}>
            Choose a name to help you identify this{'\n'}connected wallet.
          </Text>

          {/* Connected Address Display */}
          <View style={{
            backgroundColor: theme.colors.background.secondary,
            borderRadius: 8,
            padding: 12,
            marginBottom: 24,
            borderWidth: 1,
            borderColor: theme.colors.border.primary,
          }}>
            <Text style={{
              fontSize: 14,
              fontFamily: theme.typography.fontFamily.primary,
              color: theme.colors.text.primary,
              textAlign: 'center',
            }}>
              Connected: {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
            </Text>
          </View>

          {/* Wallet Name Input */}
          <Input
            placeholder="Enter wallet name"
            value={walletName}
            onChangeText={setWalletName}
            autoCapitalize="words"
            maxLength={30}
            containerStyle={{ marginBottom: 20 }}
          />

          {/* Quick name suggestions */}
          <View style={{ 
            flexDirection: 'row', 
            flexWrap: 'wrap', 
            marginBottom: 16
          }}>
            {['My wallet', 'MetaMask', 'Trust wallet'].map((suggestion) => (
              <TouchableOpacity
                key={suggestion}
                onPress={() => setWalletName(suggestion)}
                style={{
                  backgroundColor: theme.colors.primary[900],
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                  marginRight: 16,
                  marginBottom: 12,
                }}
              >
                <Text style={{
                  fontSize: 14,
                  color: theme.colors.text.brandPrimary,
                  fontFamily: theme.typography.fontFamily.primary,
                  fontWeight: '400'
                }}>
                  {suggestion}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      {/* Bottom Button */}
      <View style={{ paddingBottom: 34 }}>
        <Button
          title="Continue"
          onPress={handleWalletNaming}
          variant="primary"
          fullWidth={true}
        />
        
        {error && (
          <View style={{ 
            marginTop: 16,
            padding: 16, 
            backgroundColor: theme.colors.background.tertiary, 
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.colors.error[500]
          }}>
            <Text style={{ 
              color: theme.colors.error[500], 
              textAlign: 'center', 
              fontSize: 14,
              fontFamily: theme.typography.fontFamily.primary
            }}>
              {error}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderSecurityStep = () => (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {/* Main Content */}
        <View style={{ marginBottom: 60 }}>
          <Text style={{
            fontSize: 34,
            fontFamily: theme.typography.fontFamily.primaryMedium,
            color: theme.colors.text.primary,
            textAlign: 'left',
            lineHeight: 42,
            marginBottom: 24
          }}>
            Create Your PIN
          </Text>

          <Text style={{
            fontSize: 16,
            fontFamily: theme.typography.fontFamily.primary,
            color: theme.colors.text.secondary,
            textAlign: 'left',
            lineHeight: 24,
            marginBottom: 40
          }}>
            Choose a 6-digit PIN only you know to keep your{'\n'}wallet safe.
          </Text>

          {/* PIN Input */}
          <Input
            placeholder="Enter 6-digit PIN"
            value={pin}
            onChangeText={handlePinChange}
            keyboardType="numeric"
            secureTextEntry={true}
            maxLength={6}
            containerStyle={{ marginBottom: 16 }}
          />
        </View>
      </View>

      {/* Bottom Button */}
      <View style={{ paddingBottom: 34 }}>
        <Button
          title={isLoading ? "Securing..." : "Secure wallet"}
          onPress={handlePinSetup}
          variant="primary"
          fullWidth={true}
          disabled={isLoading || pin.length !== 6}
          loading={isLoading}
        />
        
        {error && (
          <View style={{ 
            marginTop: 16,
            padding: 16, 
            backgroundColor: theme.colors.background.tertiary, 
            borderRadius: 12,
            borderWidth: 1,
            borderColor: theme.colors.error[500]
          }}>
            <Text style={{ 
              color: theme.colors.error[500], 
              textAlign: 'center', 
              fontSize: 14,
              fontFamily: theme.typography.fontFamily.primary
            }}>
              {error}
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'connect':
        return renderConnectStep();
      case 'naming':
        return renderNamingStep();
      case 'security':
        return renderSecurityStep();
      default:
        return renderConnectStep();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background.primary }}>
      <StatusBar barStyle="light-content" />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          paddingHorizontal: 20, 
          paddingTop: 20,
          paddingBottom: 10
        }}>
          <TouchableOpacity
            onPress={handleBack}
            style={{
              padding: 12,
              borderRadius: 24
            }}
          >
            <Text style={{ 
              fontSize: 24, 
              color: theme.colors.text.primary,
              fontFamily: theme.typography.fontFamily.primary
            }}>←</Text>
          </TouchableOpacity>
        </View>

        {/* Content */}
        {renderCurrentStep()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
