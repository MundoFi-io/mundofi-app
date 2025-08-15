import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ActionChoiceScreen() {
  const navigation = useNavigation();

  const handleCreateWallet = () => {
    // Flow A: New crypto users → CDP Embedded Wallet
    // @ts-ignore - navigation type will be fixed later
    navigation.navigate('CreateWalletFlow');
  };

  const handleConnectWallet = () => {
    // Flow B: Native crypto users → CDP Import or WalletConnect
    // @ts-ignore - navigation type will be fixed later
    navigation.navigate('ConnectWalletFlow');
  };

  const handleBackToWelcome = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB'
      }}>
        <TouchableOpacity 
          onPress={handleBackToWelcome}
          style={{
            padding: 8,
            marginRight: 8
          }}
        >
          <Text style={{ fontSize: 16, color: '#3B82F6' }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#1F2937'
        }}>
          Choose Your Action
        </Text>
      </View>

      <View style={{ 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        paddingHorizontal: 24 
      }}>
        
        {/* Title */}
        <Text style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#1F2937',
          textAlign: 'center',
          marginBottom: 8
        }}>
          How would you like to start?
        </Text>

        <Text style={{
          fontSize: 16,
          color: '#6B7280',
          textAlign: 'center',
          marginBottom: 48,
          lineHeight: 24
        }}>
          Choose the option that best fits your experience{'\n'}with crypto wallets
        </Text>

        {/* Action Options */}
        <View style={{ width: '100%', marginBottom: 32 }}>
          
          {/* Create First Wallet Option */}
          <TouchableOpacity
            onPress={handleCreateWallet}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 2,
              borderColor: '#3B82F6',
              borderRadius: 16,
              padding: 24,
              marginBottom: 16,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8
            }}>
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: '#EBF4FF',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16
              }}>
                <Text style={{
                  color: '#3B82F6',
                  fontSize: 20,
                  fontWeight: 'bold'
                }}>+</Text>
              </View>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1F2937'
              }}>
                Create My First Wallet
              </Text>
            </View>
            
            <Text style={{
              fontSize: 14,
              color: '#6B7280',
              lineHeight: 20,
              marginLeft: 56
            }}>
              New to crypto? We'll help you set up the Coinbase Wallet app and get you started safely.
            </Text>
            
            <View style={{
              flexDirection: 'row',
              marginTop: 12,
              marginLeft: 56
            }}>
              <Text style={{
                fontSize: 12,
                color: '#3B82F6',
                fontWeight: '500'
              }}>
                ✓ Guided setup  ✓ Secure app  ✓ Full control
              </Text>
            </View>
          </TouchableOpacity>

          {/* Connect Existing Wallet Option */}
          <TouchableOpacity
            onPress={handleConnectWallet}
            style={{
              backgroundColor: '#FFFFFF',
              borderWidth: 2,
              borderColor: '#E5E7EB',
              borderRadius: 16,
              padding: 24,
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.1,
              shadowRadius: 3.84,
              elevation: 5,
            }}
          >
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 8
            }}>
              <View style={{
                width: 40,
                height: 40,
                backgroundColor: '#F3F4F6',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16
              }}>
                <Text style={{
                  color: '#6B7280',
                  fontSize: 18,
                  fontWeight: 'bold'
                }}>🔗</Text>
              </View>
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#1F2937'
              }}>
                I Have a Wallet
              </Text>
            </View>
            
            <Text style={{
              fontSize: 14,
              color: '#6B7280',
              lineHeight: 20,
              marginLeft: 56
            }}>
              Already using crypto? Connect your existing wallet or import one you've used before.
            </Text>
            
            <View style={{
              flexDirection: 'row',
              marginTop: 12,
              marginLeft: 56
            }}>
              <Text style={{
                fontSize: 12,
                color: '#6B7280',
                fontWeight: '500'
              }}>
                ✓ MetaMask  ✓ Trust Wallet  ✓ Coinbase  ✓ More
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Help Text */}
        <Text style={{
          fontSize: 14,
          color: '#9CA3AF',
          textAlign: 'center',
          lineHeight: 20
        }}>
          Don't worry, you can always add more wallets later{'\n'}and switch between them easily
        </Text>
      </View>
    </SafeAreaView>
  );
}
