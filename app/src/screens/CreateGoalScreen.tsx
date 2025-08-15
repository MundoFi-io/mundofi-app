import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import theme from '../styles/theme';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

interface Asset {
  id: string;
  name: string;
  symbol: string;
  icon: string;
  price: number;
  color: string;
}

interface Wallet {
  id: string;
  name: string;
  address: string;
  balance: number;
  network: string;
}

const CreateGoalScreen: React.FC = () => {
  const navigation = useNavigation();
  
  // Form state
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [targetDate, setTargetDate] = useState<Date | null>(null);

  // Format number with commas
  const formatCurrency = (value: string) => {
    // Remove all non-digits
    const numericValue = value.replace(/[^0-9]/g, '');
    
    // Add commas
    if (numericValue.length === 0) return '';
    
    // Convert to number and format with commas
    const formatted = Number(numericValue).toLocaleString('en-US');
    return formatted;
  };

  const handleAmountChange = (text: string) => {
    // Remove dollar sign and spaces if user types them
    const cleanText = text.replace(/[$\s]/g, '');
    const formattedValue = formatCurrency(cleanText);
    setTargetAmount(formattedValue);
  };

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  
  // Modal states
  const [showAssetPicker, setShowAssetPicker] = useState(false);
  const [showWalletPicker, setShowWalletPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Mock data - would come from API/wallet in production
  const availableAssets: Asset[] = [
    {
      id: '1',
      name: 'Bitcoin',
      symbol: 'BTC',
      icon: '₿',
      price: 36287.00,
      color: '#F7931A',
    },
    {
      id: '2',
      name: 'USD Coin',
      symbol: 'USDC',
      icon: '$',
      price: 1.00,
      color: '#2775CA',
    },
    {
      id: '3',
      name: 'Ethereum',
      symbol: 'ETH',
      icon: 'Ξ',
      price: 2045.67,
      color: '#627EEA',
    },
    {
      id: '4',
      name: 'Solana',
      symbol: 'SOL',
      icon: '◎',
      price: 167.03,
      color: '#9945FF',
    },
  ];

  const availableWallets: Wallet[] = [
    {
      id: '1',
      name: 'Main Wallet',
      address: '0x3b23dfe496cbbe6bb347cea402877a47bc861d66',
      balance: 8943.90,
      network: 'Base Sepolia',
    },
    {
      id: '2',
      name: 'Savings Wallet',
      address: '0x8f24c7e7b9a6c3d2e1a0f9b8c7d6e5f4a3b2c1d0',
      balance: 2156.43,
      network: 'Base Sepolia',
    },
    {
      id: '3',
      name: 'DeFi Wallet',
      address: '0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b',
      balance: 752.18,
      network: 'Ethereum',
    },
  ];

  const handleCreateGoal = async () => {
    // Validation
    if (!goalName.trim()) {
      Alert.alert('Error', 'Please enter a goal name');
      return;
    }
    // Parse target amount by removing commas and converting to number
    const numericTargetAmount = parseFloat(targetAmount.replace(/,/g, ''));
    if (!targetAmount || isNaN(numericTargetAmount) || numericTargetAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid target amount');
      return;
    }
    if (!selectedAsset) {
      Alert.alert('Error', 'Please select an asset to save in');
      return;
    }
    if (!selectedWallet) {
      Alert.alert('Error', 'Please select a wallet for this goal');
      return;
    }

    setIsCreating(true);

    try {
      // Simulate API call to create goal
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newGoal = {
        id: Date.now().toString(),
        title: goalName.trim(),
        targetAmount: numericTargetAmount,
        currentAmount: 0,
        percentage: 0,
        cryptoType: selectedAsset.symbol,
        cryptoIcon: selectedAsset.icon,
        asset: selectedAsset,
        wallet: selectedWallet,
        targetDate: targetDate,
        createdAt: new Date(),
        justCreated: true,
      };

      console.log('✅ Goal created:', newGoal);
      
      // Navigate directly to GoalDetail with showSuccess flag
      (navigation as any).navigate('GoalDetail', { 
        goal: newGoal, 
        showSuccessPopup: true,
        fromCreateGoal: true
      });
      
    } catch (error) {
      console.error('❌ Error creating goal:', error);
      Alert.alert('Error', 'Failed to create goal. Please try again.');
    } finally {
      setIsCreating(false);
    }
  };



  const handleDateChange = (event: any, selectedDate?: Date) => {
    // Only update the date, don't close the modal
    if (selectedDate) {
      setTargetDate(selectedDate);
    }
  };

  const renderAssetItem = ({ item }: { item: Asset }) => (
    <TouchableOpacity
      style={[
        styles.assetItem,
        selectedAsset?.id === item.id && styles.selectedItem,
      ]}
      onPress={() => {
        setSelectedAsset(item);
        setShowAssetPicker(false);
      }}
    >
      <View style={[styles.assetIcon, { backgroundColor: item.color + '20' }]}>
        <Text style={[styles.assetIconText, { color: item.color }]}>
          {item.icon}
        </Text>
      </View>
      <View style={styles.assetContent}>
        <Text style={styles.assetName}>{item.name}</Text>
        <Text style={styles.assetSymbol}>{item.symbol}</Text>
      </View>
      <Text style={styles.assetPrice}>
        ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
      </Text>
      {selectedAsset?.id === item.id && (
        <Ionicons name="checkmark-circle" size={24} color="#22C55E" />
      )}
    </TouchableOpacity>
  );

  const renderWalletItem = ({ item }: { item: Wallet }) => (
    <TouchableOpacity
      style={[
        styles.walletItem,
        selectedWallet?.id === item.id && styles.selectedItem,
      ]}
      onPress={() => {
        setSelectedWallet(item);
        setShowWalletPicker(false);
      }}
    >
      <View style={styles.walletIcon}>
        <Ionicons name="wallet-outline" size={24} color="#FFFFFF" />
      </View>
      <View style={styles.walletContent}>
        <Text style={styles.walletName}>{item.name}</Text>
        <Text style={styles.walletAddress}>
          {item.address.slice(0, 6)}...{item.address.slice(-4)}
        </Text>
        <Text style={styles.walletNetwork}>{item.network}</Text>
      </View>
      <View style={styles.walletBalanceContainer}>
        <Text style={styles.walletBalance}>
          ${item.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </Text>
        {selectedWallet?.id === item.id && (
          <Ionicons name="checkmark-circle" size={20} color="#22C55E" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Goal</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Goal Name */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Goal Name</Text>
          <Input
            placeholder="e.g., Emergency Fund, Car Down Payment"
            value={goalName}
            onChangeText={setGoalName}
            maxLength={50}
          />
        </View>

        {/* Target Amount */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Amount</Text>
          <Input
            placeholder="$0"
            value={targetAmount ? `$${targetAmount}` : ''}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
          />
        </View>

        {/* Target Date (Optional) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Target Date <Text style={styles.optionalText}>(Optional)</Text>
          </Text>
          <TouchableOpacity
            style={styles.datePickerButton}
            onPress={() => setShowDatePicker(true)}
          >
            <View style={styles.datePickerContent}>
              <Ionicons name="calendar-outline" size={20} color={theme.colors.text.secondary} />
              <Text style={targetDate ? styles.selectedDateText : styles.datePickerPlaceholder}>
                {targetDate 
                  ? targetDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })
                  : 'Select target date'
                }
              </Text>
            </View>
            {targetDate && (
              <TouchableOpacity
                onPress={() => setTargetDate(null)}
                style={styles.clearDateButton}
                backgroundColor={theme.colors.background.primary}
              >
                <Ionicons name="close-circle" size={20} color={theme.colors.text.tertiary} />
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>

        {/* Asset Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Asset to Save In</Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowAssetPicker(true)}
          >
            {selectedAsset ? (
              <View style={styles.selectedAssetDisplay}>
                <View style={[styles.selectedAssetIcon, { backgroundColor: selectedAsset.color + '20' }]}>
                  <Text style={[styles.selectedAssetIconText, { color: selectedAsset.color }]}>
                    {selectedAsset.icon}
                  </Text>
                </View>
                <View>
                  <Text style={styles.selectedAssetName}>{selectedAsset.name}</Text>
                  <Text style={styles.selectedAssetSymbol}>{selectedAsset.symbol}</Text>
                </View>
              </View>
            ) : (
              <Text style={styles.pickerPlaceholder}>Select Asset</Text>
            )}
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Wallet Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Link to Wallet</Text>
          <Text style={styles.sectionDescription}>
            Choose which wallet will be the primary address for this goal
          </Text>
          <TouchableOpacity
            style={styles.pickerButton}
            onPress={() => setShowWalletPicker(true)}
          >
            {selectedWallet ? (
              <View style={styles.selectedWalletDisplay}>
                <View style={styles.selectedWalletIcon}>
                  <Ionicons name="wallet-outline" size={20} color="#FFFFFF" />
                </View>
                <View>
                  <Text style={styles.selectedWalletName}>{selectedWallet.name}</Text>
                  <Text style={styles.selectedWalletAddress}>
                    {selectedWallet.address.slice(0, 12)}...{selectedWallet.address.slice(-6)}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={styles.pickerPlaceholder}>Select Wallet</Text>
            )}
            <Ionicons name="chevron-forward" size={20} color={theme.colors.text.secondary} />
          </TouchableOpacity>
        </View>

        {/* Multi-Wallet Info */}
        {selectedAsset && (
          <View style={styles.infoSection}>
            <View style={styles.infoHeader}>
              <Ionicons name="information-circle-outline" size={20} color="#3B82F6" />
              <Text style={styles.infoTitle}>Multi-Wallet Deposits</Text>
            </View>
            <Text style={styles.infoText}>
              You can add funds from any wallet. Deposits in other assets (USD, BTC, ETH, etc.) 
              will be automatically swapped to {selectedAsset.symbol} using Coinbase's trading API.
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Create Button */}
      <View style={styles.bottomSection}>
        <Button
          title={isCreating ? 'Creating Goal...' : 'Create Goal'}
          onPress={handleCreateGoal}
          variant={(goalName && targetAmount && selectedAsset && selectedWallet && !isCreating) ? 'primary' : 'secondary'}
          disabled={!goalName || !targetAmount || !selectedAsset || !selectedWallet || isCreating}
          loading={isCreating}
          fullWidth={true}
        />
      </View>

      {/* Asset Picker Modal */}
      <Modal
        visible={showAssetPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAssetPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Asset</Text>
              <TouchableOpacity onPress={() => setShowAssetPicker(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={availableAssets}
              renderItem={renderAssetItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      {/* Wallet Picker Modal */}
      <Modal
        visible={showWalletPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowWalletPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Wallet</Text>
              <TouchableOpacity onPress={() => setShowWalletPicker(false)}>
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={availableWallets}
              renderItem={renderWalletItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      {/* iOS Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowDatePicker(false)}
      >
        <View style={styles.datePickerModalOverlay}>
          <View style={styles.datePickerModalContent}>
            <View style={styles.datePickerHeader}>
              <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                <Text style={styles.datePickerCancel}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.datePickerTitle}>Select Target Date</Text>
              <TouchableOpacity 
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.datePickerDone}>Done</Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              value={targetDate || new Date()}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              minimumDate={new Date()}
              themeVariant="dark"
              style={styles.datePicker}
            />
          </View>
        </View>
      </Modal>


    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: theme.typography.fontSize.xl,
    fontFamily: theme.typography.fontFamily.primaryMedium,
    color: theme.colors.text.primary,
    flex: 1,
    textAlign: 'center',
  },
  headerRight: {
    width: 32,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primaryMedium,
    color: theme.colors.text.primary,
    marginBottom: 8,
  },
  optionalText: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.tertiary,
  },
  sectionDescription: {
    fontSize: theme.typography.fontSize.sm,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.secondary,
    marginBottom: 12,
  },

  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
  },
  pickerPlaceholder: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.tertiary,
  },
  selectedAssetDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedAssetIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedAssetIconText: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedAssetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  selectedAssetSymbol: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  selectedWalletDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectedWalletIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  selectedWalletName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  selectedWalletAddress: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    fontFamily: 'monospace',
  },
  infoSection: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderLeftWidth: 3,
    borderLeftColor: '#3B82F6',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  infoText: {
    fontSize: 14,
    color: theme.colors.text.secondary,
    lineHeight: 20,
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },
  createButton: {
    ...theme.components.button.success,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing[4],
    alignItems: 'center',
  },
  createButtonDisabled: {
    backgroundColor: theme.colors.neutral[600],
    opacity: 0.6,
  },
  createButtonText: {
    ...theme.textStyles.button,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.inverse,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#1F1F1F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 40,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  assetItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  selectedItem: {
    backgroundColor: '#22C55E20',
  },
  assetIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  assetIconText: {
    fontSize: 18,
    fontWeight: '600',
  },
  assetContent: {
    flex: 1,
  },
  assetName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  assetSymbol: {
    fontSize: 14,
    color: theme.colors.text.secondary,
  },
  assetPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginRight: 12,
  },
  walletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  walletIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#333333',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  walletContent: {
    flex: 1,
  },
  walletName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  walletAddress: {
    fontSize: 12,
    color: theme.colors.text.secondary,
    fontFamily: 'monospace',
    marginTop: 2,
  },
  walletNetwork: {
    fontSize: 12,
    color: '#888888',
    marginTop: 2,
  },
  walletBalanceContainer: {
    alignItems: 'flex-end',
  },
  walletBalance: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background.primary,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: theme.colors.border.primary,
  },
  datePickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedDateText: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.primary,
    marginLeft: 12,
  },
  datePickerPlaceholder: {
    fontSize: theme.typography.fontSize.base,
    fontFamily: theme.typography.fontFamily.primary,
    color: theme.colors.text.tertiary,
    marginLeft: 12,
  },
  clearDateButton: {
    padding: 4,
  },
  datePickerModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  datePickerModalContent: {
    backgroundColor: '#1F1F1F',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  datePickerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  datePickerCancel: {
    fontSize: 16,
    color: '#888888',
  },
  datePickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  datePickerDone: {
    fontSize: 16,
    fontWeight: '600',
    color: '#22C55E',
  },
  datePicker: {
    marginTop: 20,
  },
});

export default CreateGoalScreen;
