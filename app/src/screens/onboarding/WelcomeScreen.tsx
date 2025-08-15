import React from 'react';
import { View, Text, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import theme from '../../styles/theme';
import Button from '../../components/ui/Button';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const handleCreateWallet = () => {
    // Flow A: New crypto users → CDP Embedded Wallet
    // @ts-ignore - navigation type will be fixed later
    navigation.navigate('CreateWalletFlow');
  };

  const handleAddExistingWallet = () => {
    // Flow B: Existing crypto users → CDP Import or WalletConnect
    // @ts-ignore - navigation type will be fixed later
    navigation.navigate('ConnectWalletFlow');
  };

  return (
    <ImageBackground 
      source={require('../../../assets/earth-background.jpg')} 
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        
        {/* MundoFi Watermark - Top Center */}
        <View style={{
          paddingTop: 24,
          paddingBottom:240,
          alignItems: 'center'
        }}>
          <Text style={{
            fontSize: 22,
            fontFamily: theme.typography.fontFamily.primaryMedium,
            color: theme.colors.text.primary,
            textAlign: 'center'
          }}>
            mundofi
          </Text>
        </View>
        
        <View style={{ 
          flex: 1,
          paddingHorizontal: 20 
        }}>
        
        {/* Content Area - Centered */}
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          {/* Main Content */}
          <View style={{ 
            alignItems: 'flex-start'
          }}>
            <Text style={{
              fontSize: 34,
              fontFamily: theme.typography.fontFamily.primaryMedium,
              color: theme.colors.text.primary,
              textAlign: 'left',
              lineHeight: 42,
              marginBottom: 24
            }}>
              Save smarter.{'\n'}Build real-world trust.
            </Text>

            {/* Features List */}
            <View style={{ width: '100%' }}>
              <FeatureItem 
                title="Set goals solo or with friends"
                description=""
              />
              <FeatureItem 
                title="Fund with cash, card, or crypto"
                description=""
              />
              <FeatureItem 
                title="Access your money anytime"
                description=""
              />
              <FeatureItem 
                title="Build the kind of trust banks can't give you"
                description=""
              />
            </View>
          </View>
        </View>

        {/* Buttons - Fixed at bottom */}
        <View style={{
          paddingBottom: 0
        }}>
          <Button
            title="Create new wallet"
            onPress={handleCreateWallet}
            variant="primary"
            fullWidth={true}
          />
          <View style={{ height: 16 }} />
          <Button
            title="Add existing wallet"
            onPress={handleAddExistingWallet}
            variant="secondary"
            fullWidth={true}
          />
        </View>
        
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

// Feature item component
function FeatureItem({ title, description }: { title: string; description: string }) {
  return (
    <View style={{ 
      flexDirection: 'row', 
      alignItems: 'flex-start',
      marginBottom: 16 
    }}>
      <View style={{
        width: 6,
        height: 6,
        backgroundColor: theme.colors.text.secondary,
        borderRadius: 4,
        marginRight: 10,
        marginTop: 10
      }} />
      <View style={{ flex: 1 }}>
        <Text style={{
          fontSize: 16,
          fontFamily: theme.typography.fontFamily.primary,
          color: theme.colors.text.secondary,
          lineHeight: 21
        }}>
          {title}
        </Text>
        {description ? (
          <Text style={{
            fontSize: 14,
            fontFamily: theme.typography.fontFamily.primary,
            color: theme.colors.text.secondary,
            lineHeight: 20,
            marginTop: 2
          }}>
            {description}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
