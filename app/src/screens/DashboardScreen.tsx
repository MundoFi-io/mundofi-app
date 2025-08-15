import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  SafeAreaView, 
  Modal, 
  Pressable,
  StyleSheet,
  FlatList
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../store/useAuthStore';
import theme from '../styles/theme';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  balance: number;
  price: number;
  value: number;
  change24h: number;
}

interface Goal {
  id: string;
  title: string;
  currentAmount: number;
  targetAmount: number;
  cryptoType: string;
  cryptoIcon: string;
}

export default function DashboardScreen() {
  const { user, wallet, signOut: clearLocalState, setWallet } = useAuthStore();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const navigation = useNavigation();

  // Mock data - would come from wallet/API in production
  const mockAssets: Asset[] = [
    {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      balance: 0.12095957,
      price: 36287.00,
      value: 4389.26,
      change24h: 2.5,
    },
    {
      id: '2',
      name: 'USD Coin',
      symbol: 'USDC',
      icon: '$',
      balance: 826.742,
      price: 1.00,
      value: 826.74,
      change24h: 0.0,
    },
    {
      id: '3',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'Ξ',
      balance: 1.5432,
      price: 2045.67,
      value: 3156.89,
      change24h: -1.2,
    },
    {
      id: '4',
      name: 'Solana',
      symbol: 'SOL',
      icon: '◎',
      balance: 3.4192,
      price: 167.03,
      value: 571.01,
      change24h: 4.8,
    },
  ];

  const mockGoals: Goal[] = [
    {
      id: '1',
      title: 'Emergency Fund',
      currentAmount: 2500,
      targetAmount: 5000,
      cryptoType: 'USDC',
      cryptoIcon: '$',
    },
    {
      id: '2',
      title: 'Car Savings',
      currentAmount: 8500,
      targetAmount: 15000,
      cryptoType: 'BTC',
      cryptoIcon: '₿',
    },
    {
      id: '3',
      title: 'Vacation Fund',
      currentAmount: 1200,
      targetAmount: 3000,
      cryptoType: 'ETH',
      cryptoIcon: 'Ξ',
    },
  ];

  const totalPortfolioValue = mockAssets.reduce((sum, asset) => sum + asset.value, 0);
  const activeWalletName = wallet?.name || 'Main Wallet';

  // Check for wallet creation success on mount
  useEffect(() => {
    if (wallet?.justCreated) {
      setShowSuccessPopup(true);
      
      // Auto-hide after 2 seconds
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
        clearJustCreatedFlag();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [wallet]);

  const clearJustCreatedFlag = () => {
    if (wallet?.justCreated) {
      // Remove the justCreated flag
      const updatedWallet = { ...wallet };
      delete updatedWallet.justCreated;
      setWallet(updatedWallet);
    }
  };

  const handleClosePopup = () => {
    setShowSuccessPopup(false);
    clearJustCreatedFlag();
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out? This will disconnect your wallet and clear your session.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              // Clear local authentication state
              // Note: Coinbase Wallet Mobile SDK uses external wallet app
              // No need to sign out from the wallet itself
              await clearLocalState();
              console.log('✅ Wallet disconnected and local state cleared');
              
              Alert.alert('Sign Out', 'Successfully signed out. You can connect a wallet again anytime.');
            } catch (error) {
              console.error('❌ Sign out error:', error);
              Alert.alert('Sign Out', 'There was an issue signing out, but your session has been cleared.');
            }
          },
        },
      ]
    );
  };

  const renderAssetItem = ({ item }: { item: Asset }) => (
    <TouchableOpacity style={styles.assetItem}>
      <View style={styles.assetIcon}>
        <Text style={styles.assetIconText}>{item.icon}</Text>
      </View>
      
      <View style={styles.assetContent}>
        <View style={styles.assetHeader}>
          <Text style={styles.assetName}>{item.name}</Text>
          <Text style={styles.assetValue}>${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
        </View>
        
        <View style={styles.assetFooter}>
          <Text style={styles.assetPrice}>
            ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
          <Text style={[styles.assetChange, { color: item.change24h >= 0 ? '#22C55E' : '#EF4444' }]}>
            {item.change24h >= 0 ? '+' : ''}{item.change24h.toFixed(2)}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderGoalItem = ({ item }: { item: Goal }) => {
    const percentage = Math.round((item.currentAmount / item.targetAmount) * 100);
    return (
      <TouchableOpacity 
        style={styles.goalItem}
        onPress={() => {
          // Navigate to goal details - casting to any to avoid TS navigation issues for now
          (navigation as any).navigate('GoalDetail', { 
            goal: {
              id: item.id,
              title: item.title,
              targetAmount: item.targetAmount,
              currentAmount: item.currentAmount,
              percentage,
              cryptoType: item.cryptoType,
              cryptoIcon: item.cryptoIcon,
            }
          });
        }}
      >
        <View style={styles.goalIcon}>
          <Text style={styles.goalIconText}>{item.cryptoIcon}</Text>
        </View>
        
        <View style={styles.goalContent}>
          <View style={styles.goalHeader}>
            <Text style={styles.goalName}>{item.title}</Text>
            <Text style={styles.goalValue}>
              ${item.currentAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          
          <View style={styles.goalFooter}>
            <Text style={styles.goalProgress}>
              {percentage}% of ${item.targetAmount.toLocaleString()}
            </Text>
            <Text style={styles.goalType}>{item.cryptoType}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Top Navigation */}
        <View style={styles.topNav}>
          <TouchableOpacity 
            style={styles.walletSelector}
            onPress={() => setShowWalletDropdown(true)}
          >
            <Text style={styles.walletName}>{activeWalletName}</Text>
            <Ionicons name="chevron-down" size={20} color="#FFFFFF" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => {
              // Navigate to settings/profile - placeholder for now
              Alert.alert('Settings', 'Settings screen coming soon!');
            }}
          >
            <Ionicons name="person-circle-outline" size={32} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Total Balance Widget */}
        <View style={styles.balanceWidget}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>
            ${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Text>
          <Text style={styles.balanceSubtext}>Across all assets</Text>
        </View>

        {/* Assets Breakdown */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Assets</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={mockAssets}
            renderItem={renderAssetItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Active Goals Overview */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Active Goals</Text>
            <TouchableOpacity onPress={() => (navigation as any).navigate('Goals')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <FlatList
            data={mockGoals}
            renderItem={renderGoalItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>

        {/* Development Section */}
        <View style={styles.devSection}>
          <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
            <Text style={styles.signOutText}>🔧 Sign Out (Dev)</Text>
          </TouchableOpacity>
          <Text style={styles.devText}>
            Development build - Sign out button for testing authentication flows
          </Text>
        </View>

      </ScrollView>

      {/* Wallet Creation Success Popup */}
      <Modal
        visible={showSuccessPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={handleClosePopup}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleClosePopup}
        >
          <Pressable
            style={{
              backgroundColor: '#000000',
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
            }}
            onPress={(e) => e.stopPropagation()}
          >
            {/* Confetti Animation Area */}
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: '#ECFDF5',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}>
              <Text style={{ fontSize: 40 }}>🎉</Text>
            </View>
            
            <Text style={{
              fontSize: 32,
              fontFamily: theme.typography.fontFamily.primaryMedium,
              fontWeight: 'bold',
              color: theme.colors.text.brandPrimary,
              textAlign: 'center',
              marginBottom: 8,
            }}>
              Wallet Created!
            </Text>
            
            <Text style={{
              fontSize: 16,
              color: theme.colors.text.secondary,
              textAlign: 'center',
              lineHeight: 24,
              marginBottom: 8,
            }}>
              Start building trust with your new wallet.
            </Text>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Wallet Dropdown Modal */}
      <Modal
        visible={showWalletDropdown}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowWalletDropdown(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowWalletDropdown(false)}
        >
          <View style={styles.walletDropdown}>
            <TouchableOpacity style={styles.walletOption}>
              <Ionicons name="wallet-outline" size={24} color="#FFFFFF" />
              <Text style={styles.walletOptionText}>{activeWalletName}</Text>
              <Ionicons name="checkmark" size={20} color="#22C55E" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.walletOption}>
              <Ionicons name="add-circle-outline" size={24} color="#FFFFFF" />
              <Text style={styles.walletOptionText}>Connect Wallet</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  walletSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  walletName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  profileButton: {
    padding: 4,
  },
  balanceWidget: {
    backgroundColor: '#1F1F1F',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 20,
    marginBottom: 32,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  balanceSubtext: {
    fontSize: 14,
    color: '#888888',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
  },
  assetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  assetIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  assetIconText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  assetContent: {
    flex: 1,
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  assetValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  assetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assetPrice: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  assetChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  goalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  goalIconText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  goalContent: {
    flex: 1,
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  goalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  goalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  goalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  goalProgress: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  goalType: {
    fontSize: 14,
    color: '#888888',
    fontWeight: '500',
  },
  devSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 12,
  },
  signOutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  devText: {
    fontSize: 12,
    color: '#888888',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletDropdown: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 8,
    marginHorizontal: 20,
    minWidth: 200,
  },
  walletOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  walletOptionText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
    flex: 1,
  },
});
