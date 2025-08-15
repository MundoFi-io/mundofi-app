import React, { useState } from 'react';
import { 
  View, Text, TouchableOpacity, SafeAreaView, StatusBar, Alert, TextInput,
  ActivityIndicator, KeyboardAvoidingView, Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../store/useAuthStore';
import theme, { colors } from '../../styles/theme';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
// Import Coinbase hooks with fallback to mock for device testing
let useSignInWithEmail, useVerifyEmailOTP, useIsSignedIn, useEvmAddress;

try {
  // Try to import real CDP hooks (works in development builds)
  const cdpHooks = require('@coinbase/cdp-hooks');
  useSignInWithEmail = cdpHooks.useSignInWithEmail;
  useVerifyEmailOTP = cdpHooks.useVerifyEmailOTP;
  useIsSignedIn = cdpHooks.useIsSignedIn;
  useEvmAddress = cdpHooks.useEvmAddress;
  console.log('✅ Using real Coinbase CDP hooks');
} catch (error) {
  // Fall back to mock hooks for Expo Go / device testing
  const mockHooks = require('../../lib/coinbase-hooks-mock');
  useSignInWithEmail = mockHooks.useSignInWithEmail;
  useVerifyEmailOTP = mockHooks.useVerifyEmailOTP;
  useIsSignedIn = mockHooks.useIsSignedIn;
  useEvmAddress = mockHooks.useEvmAddress;
  console.log('🎭 Using mock Coinbase CDP hooks for device compatibility');
}

type FlowStep = 'email' | 'otp' | 'naming' | 'security';

export default function CreateWalletFlowScreen() {
  const navigation = useNavigation();
  const { setWallet } = useAuthStore();
  
  // Embedded Wallet Hooks
  const { signInWithEmail } = useSignInWithEmail();
  const { verifyEmailOTP } = useVerifyEmailOTP();
  const { isSignedIn } = useIsSignedIn();
  const evmAddress = useEvmAddress();
  
  const [currentStep, setCurrentStep] = useState<FlowStep>('email');
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [walletName, setWalletName] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [otpFocused, setOtpFocused] = useState(false);

  const handleBack = () => {
    if (currentStep === 'email') {
      // Go back to ActionChoiceScreen since email is now the first step
    navigation.goBack();
    } else if (currentStep === 'otp') {
      setCurrentStep('email');
      setError(null);
    } else if (currentStep === 'naming') {
      setCurrentStep('otp');
      setError(null);
    } else if (currentStep === 'security') {
      setCurrentStep('naming');
      setError(null);
    } else {
      // Fallback - go back to email step
      setCurrentStep('email');
      setError(null);
    }
  };

  // No longer needed - we start directly at email step

  const handleEmailSubmit = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log('📧 Starting email authentication for:', email);
      await signInWithEmail({ email });
      setCurrentStep('otp');
      console.log('✅ Email sent successfully');
    } catch (error) {
      console.error('❌ Email authentication failed:', error);
      setError('Failed to send verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async () => {
    if (!otp.trim() || otp.length !== 6) {
      setError('Please enter the 6-digit verification code');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      console.log('🔐 Verifying OTP...');
      
      // Demo/Grant Mode: Accept demo code "123456" 
      if (otp === '123456') {
        console.log('✅ Demo code accepted - proceeding to wallet naming');
        setCurrentStep('naming');
        return;
      }
      
      // Try real verification in mock mode
      await verifyEmailOTP({ email, otp });
      
      // OTP verified, proceed to naming step
      console.log('✅ OTP verified - proceeding to wallet naming');
      setCurrentStep('naming');
      
    } catch (error) {
      console.error('❌ OTP verification failed:', error);
      setError('Invalid verification code. For demo purposes, use code: 123456');
    } finally {
      setIsLoading(false);
    }
  };

  const handleWalletNaming = async () => {
    if (!walletName.trim()) {
      setError('Please enter a name for your wallet');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🏷️ Wallet named successfully, proceeding to security setup...');
      
      // Wallet naming complete, move to security step
      setCurrentStep('security');
      console.log('✅ Wallet named:', walletName.trim());

    } catch (error) {
      console.error('❌ Wallet creation failed:', error);
      setError('Failed to create wallet. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinSetup = async () => {
    if (pin.length !== 6) {
      setError('Please enter a 6-digit PIN');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('🔐 Setting up PIN and finalizing wallet creation...');
      
      // Create the wallet with the provided name and PIN
      const demoAddress = '0x742d35Cc6639C0532fEb42da5b5e6a01E4E8e2E7';
      const walletAddress = typeof evmAddress === 'string' ? evmAddress : demoAddress;
      
      const walletInfo = {
        name: walletName.trim(),
        address: walletAddress,
        network: 'base-sepolia',
        createdAt: new Date().toISOString(),
        pin: pin, // Store PIN (in real app, this would be hashed/encrypted)
      };
      
      console.log('✅ Wallet created with PIN security:', { ...walletInfo, pin: '******' });
      
      // Add flag to trigger dashboard success popup
      const walletInfoWithSuccess = {
        ...walletInfo,
        justCreated: true, // Flag for dashboard to show success popup
      };
      
      // Set wallet in store (triggers navigation to dashboard)
      setWallet(walletInfoWithSuccess);

      console.log('🎉 Wallet setup complete - navigating to dashboard!');

    } catch (error) {
      console.error('❌ PIN setup failed:', error);
      setError('Failed to set up PIN. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = () => {
    // Navigation happens automatically via wallet state change
    // The success screen is already showing the connected wallet
    console.log('✅ Wallet setup completed - navigating to main app');
  };

  // Removed renderWelcomeStep - users now go directly to email entry

  const renderEmailStep = () => (
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
            Your Wallet. Your Control.
          </Text>

        <Text style={{
            fontSize: 16,
            fontFamily: theme.typography.fontFamily.primary,
            color: theme.colors.text.secondary,
            textAlign: 'left',
            lineHeight: 24,
            marginBottom: 40
          }}>
            Enter your email to receive a code and start building{'\n'}real-world trust.
        </Text>

          {/* Email Input */}
          <Input
            placeholder="Enter email address"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            containerStyle={{ marginBottom: 16 }}
          />
        </View>
      </View>

      {/* Bottom Button */}
      <View style={{ paddingBottom: 34 }}>
        <Button
          title={isLoading ? "Sending..." : "Send Code"}
          onPress={handleEmailSubmit}
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

  const renderOTPStep = () => (
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
            Enter Verification Code
          </Text>

          <Text style={{
            fontSize: 16,
            fontFamily: theme.typography.fontFamily.primary,
            color: theme.colors.text.secondary,
            textAlign: 'left',
            lineHeight: 24,
            marginBottom: 8
          }}>
            Check your email for the 6-digit code
          </Text>

          <Text style={{
            fontSize: 14,
            fontFamily: theme.typography.fontFamily.primary,
            color: theme.colors.text.tertiary,
            textAlign: 'left',
            marginBottom: 40
          }}>
            Sent to: {email}
          </Text>


          {/* OTP Input */}
          <TextInput
            style={{
              ...theme.components.input.base,
              ...(otpFocused ? theme.components.input.focused : {}),
              fontSize: 18,
              fontFamily: theme.typography.fontFamily.primaryMedium,
              textAlign: 'center',
              letterSpacing: 4,
              marginBottom: 16
            }}
            placeholder="000000"
            placeholderTextColor={theme.colors.text.tertiary}
            selectionColor={theme.colors.border.focus}
            value={otp}
            onChangeText={setOTP}
            onFocus={() => setOtpFocused(true)}
            onBlur={() => setOtpFocused(false)}
            keyboardType="number-pad"
            maxLength={6}
            autoFocus
          />
        </View>
      </View>

      {/* Bottom Button */}
      <View style={{ paddingBottom: 34 }}>
        <Button
          title={isLoading ? "Verifying..." : "Create Wallet"}
          onPress={handleOTPSubmit}
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

  const renderConnectingStep = () => (
    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
      <View style={{ alignItems: 'center' }}>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        <Text style={{ 
          fontSize: 28, 
          fontFamily: theme.typography.fontFamily.primaryMedium,
          color: theme.colors.text.primary, 
          marginTop: 32, 
          textAlign: 'center' 
        }}>
          Creating Your Wallet...
        </Text>
        <Text style={{
          fontSize: 16,
          fontFamily: theme.typography.fontFamily.primary,
          color: theme.colors.text.secondary, 
          textAlign: 'center',
          marginTop: 16,
          lineHeight: 24
        }}>
          Setting up your secure embedded wallet{'\n'}This will just take a moment
        </Text>
      </View>
    </View>
  );

  // Removed renderSuccessStep - now using direct navigation to dashboard with success popup

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
            marginBottom: 40
          }}>
            Choose a name so you can easily recognize this{'\n'}wallet and keep your savings organized.
          </Text>

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
            {['Emergency fund', 'Travel fund', 'My savings'].map((suggestion) => (
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
                  color: colors.text.brandPrimary,
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
          title={isLoading ? "Creating..." : "Create wallet"}
          onPress={handleWalletNaming}
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

  const handlePinChange = (value: string) => {
    // Only allow numeric input and limit to 6 digits
    const numericValue = value.replace(/[^0-9]/g, '').substring(0, 6);
    setPin(numericValue);
  };



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

  // Removed renderSuccessPopup - now handled on dashboard screen

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'email':
        return renderEmailStep();
      case 'otp':
        return renderOTPStep();
      case 'naming':
        return renderNamingStep();
      case 'security':
        return renderSecurityStep();
      default:
        return renderEmailStep();
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