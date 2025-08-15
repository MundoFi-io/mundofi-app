import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions,
  SafeAreaView,
  TextInput 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from './ui/Button';
import theme from '../styles/theme';

const { width, height } = Dimensions.get('window');

// Helper function to format numbers with commas
const formatNumberWithCommas = (num: string) => {
  // Remove existing commas and non-numeric characters except decimal point
  const cleanNum = num.replace(/[^\d.]/g, '');
  
  if (cleanNum === '' || cleanNum === '0') return '0';
  
  // Split by decimal point
  const parts = cleanNum.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1];
  
  // Add commas to integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  // Return with decimal if it exists
  return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

// Step 1: Amount Selection (25% of screen)
const AmountSelection = ({ onSelectAmount, onClose }: { onSelectAmount: (amount: number | 'custom') => void; onClose: () => void }) => {
  const presetAmounts = [10, 25, 50, 100, 200];
  const [selectedAmount, setSelectedAmount] = useState(10);

  const handleAmountSelect = (amount: number | 'custom') => {
    if (typeof amount === 'number') {
      setSelectedAmount(amount);
    }
    onSelectAmount(amount);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.bottomSheet}>
        <TouchableOpacity style={styles.closeButtonBottomSheet} onPress={onClose}>
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.bottomSheetTitle}>Transfer to savings</Text>
        
        <View style={styles.amountGrid}>
          {presetAmounts.map((amount) => (
            <TouchableOpacity 
              key={amount}
              style={[
                styles.amountButton,
                selectedAmount === amount ? styles.amountButtonSelected : null
              ]}
              onPress={() => handleAmountSelect(amount)}
            >
              <Text style={[
                styles.amountButtonText,
                selectedAmount === amount ? styles.amountButtonTextSelected : null
              ]}>
                ${formatNumberWithCommas(amount.toString())}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity 
            style={styles.amountButton}
            onPress={() => handleAmountSelect('custom')}
          >
            <Text style={styles.amountButtonText}>•••</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSheetButtonContainer}>
          <Button
            title="Continue"
            onPress={() => onSelectAmount(selectedAmount)}
            variant="success"
            fullWidth={true}
          />
        </View>
      </View>
    </View>
  );
};

// Step 2: Custom Amount Entry
const CustomAmountEntry = ({ onEnterAmount, onClose }: { onEnterAmount: (amount: number) => void; onClose: () => void }) => {
  const [rawAmount, setRawAmount] = useState('0');
  
  const handleNumberPress = (number: string) => {
    if (number === '.') {
      if (!rawAmount.includes('.')) {
        setRawAmount(prev => prev === '0' ? '0.' : prev + '.');
      }
    } else if (number === 'backspace') {
      setRawAmount(prev => {
        const newAmount = prev.slice(0, -1);
        return newAmount || '0';
      });
    } else {
      setRawAmount(prev => prev === '0' ? number : prev + number);
    }
  };

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', 'backspace']
  ];

  return (
    <View style={styles.fullScreenOverlay}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Transfer to savings</Text>
          
          <View style={styles.amountDisplay}>
            <Text style={styles.amountDisplayText}>${formatNumberWithCommas(rawAmount)}</Text>
          </View>

        <View style={styles.keypad}>
          {keypadNumbers.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keypadRow}>
              {row.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.keypadButton}
                  onPress={() => handleNumberPress(key)}
                >
                  {key === 'backspace' ? (
                    <Ionicons name="backspace" size={24} color="#FFFFFF" />
                  ) : (
                    <Text style={styles.keypadButtonText}>{key}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.bottomButtonContainer}>
          <Button
            title="Continue"
            onPress={() => onEnterAmount(parseFloat(rawAmount))}
            variant="success"
            fullWidth={true}
          />
        </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

// Step 3: Wallet Selection
const WalletSelection = ({ onSelectWallet, onClose }: { onSelectWallet: (wallet: any) => void; onClose: () => void }) => {
  const mockWallets = [
    { id: '1', name: 'Main Wallet', balance: 1250.50, currency: 'USDC' },
    { id: '2', name: 'Trading Wallet', balance: 0.045, currency: 'BTC' },
    { id: '3', name: 'Savings Wallet', balance: 2.5, currency: 'ETH' },
  ];

  return (
    <View style={styles.fullScreenOverlay}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Select wallet</Text>
        
        <View style={styles.walletList}>
          {mockWallets.map((wallet) => (
            <TouchableOpacity 
              key={wallet.id}
              style={styles.walletOption}
              onPress={() => onSelectWallet(wallet)}
            >
              <View style={styles.walletIcon}>
                <Text style={styles.walletIconText}>
                  {wallet.currency === 'USDC' ? '💵' : wallet.currency === 'BTC' ? '₿' : 'Ξ'}
                </Text>
              </View>
              <View style={styles.walletInfo}>
                <Text style={styles.walletName}>{wallet.name}</Text>
                <Text style={styles.walletBalance}>
                  {formatNumberWithCommas(wallet.balance.toString())} {wallet.currency} available
                </Text>
              </View>
              <View style={styles.walletSelector}>
                <View style={styles.radioButton} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomButtonContainer}>
          <Button
            title="Continue"
            onPress={() => onSelectWallet(mockWallets[0])}
            variant="success"
            fullWidth={true}
          />
        </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

// Step 4: Transfer Confirmation
const TransferConfirmation = ({ 
  amount, 
  goal, 
  wallet, 
  onTransfer, 
  onClose 
}: { 
  amount: number; 
  goal: any; 
  wallet: any; 
  onTransfer: () => void; 
  onClose: () => void; 
}) => {
  return (
    <View style={styles.fullScreenOverlay}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <View style={styles.transferIcon}>
            <Ionicons name="arrow-down" size={24} color="#22C55E" />
          </View>

          <Text style={styles.modalTitle}>Transfer ${formatNumberWithCommas(amount.toString())} to savings</Text>
        
        <View style={styles.transferDetails}>
          <View style={styles.transferRow}>
            <Text style={styles.transferLabel}>Amount</Text>
            <Text style={styles.transferValue}>${formatNumberWithCommas(amount.toString())}</Text>
          </View>
          <View style={styles.transferRow}>
            <Text style={styles.transferLabel}>Type</Text>
            <Text style={styles.transferValue}>One-time transfer</Text>
          </View>
          <View style={styles.transferRow}>
            <Text style={styles.transferLabel}>Transfer</Text>
            <Text style={styles.transferValue}>Instantly</Text>
          </View>
        </View>

        <View style={styles.paymentMethod}>
          <View style={styles.walletIcon}>
            <Text style={styles.walletIconText}>
              {wallet?.currency === 'USDC' ? '💵' : wallet?.currency === 'BTC' ? '₿' : 'Ξ'}
            </Text>
          </View>
          <View>
            <Text style={styles.paymentMethodText}>{wallet?.name || 'Main Wallet'}</Text>
            <Text style={styles.paymentMethodSubtext}>
              {formatNumberWithCommas(wallet?.balance?.toString() || '0')} {wallet?.currency || 'USDC'} available
            </Text>
          </View>
          <Ionicons name="chevron-down" size={16} color="#6B7280" />
        </View>

        <View style={styles.bottomButtonContainer}>
          <Button
            title={`Transfer $${formatNumberWithCommas(amount.toString())}`}
            onPress={onTransfer}
            variant="success"
            fullWidth={true}
          />
        </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

// Step 5: PIN Entry (Final Security Step)
const PINEntry = ({ onEnterPIN, onClose }: { onEnterPIN: (pin: string) => void; onClose: () => void }) => {
  const [pin, setPIN] = useState('');

  const handleNumberPress = (number: string) => {
    if (number === 'backspace') {
      setPIN(prev => prev.slice(0, -1));
    } else if (pin.length < 6) {
      setPIN(prev => prev + number);
    }
  };

  React.useEffect(() => {
    if (pin.length === 6) {
      onEnterPIN(pin);
    }
  }, [pin]);

  const keypadNumbers = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'backspace']
  ];

  return (
    <View style={styles.fullScreenOverlay}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <Text style={styles.modalTitle}>Enter PIN to confirm</Text>
        
        <View style={styles.pinDisplay}>
          {[...Array(6)].map((_, index) => (
            <View 
              key={index}
              style={[
                styles.pinDot,
                index < pin.length ? styles.pinDotFilled : null
              ]}
            />
          ))}
        </View>

        <View style={styles.keypad}>
          {keypadNumbers.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keypadRow}>
              {row.map((key) => (
                <TouchableOpacity
                  key={key || `empty-${rowIndex}`}
                  style={styles.keypadButton}
                  onPress={() => key && handleNumberPress(key)}
                  disabled={!key}
                >
                  {key === 'backspace' ? (
                    <Ionicons name="backspace" size={24} color="#FFFFFF" />
                  ) : key ? (
                    <Text style={styles.keypadButtonText}>{key}</Text>
                  ) : null}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
        </View>
      </SafeAreaView>
    </View>
  );
};



// Main Modal Component
interface AddFundsModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: (amount: number) => void;
  goal: {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    percentage: number;
    cryptoType: string;
    cryptoIcon: string;
  };
}

export default function AddFundsModal({ visible, onClose, onSuccess, goal }: AddFundsModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(10);
  const [enteredPIN, setEnteredPIN] = useState('');
  const [selectedWallet, setSelectedWallet] = useState(null);

  const resetModal = () => {
    setCurrentStep(1);
    setSelectedAmount(10);
    setEnteredPIN('');
    setSelectedWallet(null);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleSelectAmount = (amount: number | 'custom') => {
    if (amount === 'custom') {
      setCurrentStep(2);
    } else {
      setSelectedAmount(amount);
      setCurrentStep(3);
    }
  };

  const handleEnterAmount = (amount: number) => {
    setSelectedAmount(amount);
    setCurrentStep(3);
  };

  const handleSelectWallet = (wallet: any) => {
    setSelectedWallet(wallet);
    setCurrentStep(4);
  };

  const handleTransfer = () => {
    // Show PIN entry for final security
    setCurrentStep(5);
  };

  const handleEnterPIN = (pin: string) => {
    setEnteredPIN(pin);
    // Process the transfer after PIN is entered
    console.log('Transfer confirmed:', {
      amount: selectedAmount,
      goal: goal.id,
      wallet: selectedWallet,
      pin: pin
    });
    
    // Call success callback with the amount
    if (onSuccess) {
      onSuccess(selectedAmount);
    }
    
    handleClose();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <AmountSelection onSelectAmount={handleSelectAmount} onClose={handleClose} />;
      case 2:
        return <CustomAmountEntry onEnterAmount={handleEnterAmount} onClose={handleClose} />;
      case 3:
        return <WalletSelection onSelectWallet={handleSelectWallet} onClose={handleClose} />;
      case 4:
        return (
          <TransferConfirmation 
            amount={selectedAmount}
            goal={goal}
            wallet={selectedWallet}
            onTransfer={handleTransfer}
            onClose={handleClose}
          />
        );
      case 5:
        return <PINEntry onEnterPIN={handleEnterPIN} onClose={handleClose} />;
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
      presentationStyle="overFullScreen"
    >
      {renderCurrentStep()}
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: theme.components.modal.overlay.backgroundColor,
    justifyContent: 'flex-end',
  },
  fullScreenOverlay: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
  },
  bottomSheet: {
    height: height * 0.40,
    backgroundColor: theme.colors.background.primary,
    borderTopLeftRadius: theme.borderRadius.xl,
    borderTopRightRadius: theme.borderRadius.xl,
    padding: theme.spacing[6],
    paddingTop: theme.spacing[4],
  },
  closeButtonBottomSheet: {
    position: 'absolute',
    top: 16,
    right: 24,
    zIndex: 1,
  },
  bottomSheetTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginTop: theme.spacing[3],
    marginBottom: theme.spacing[8],
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    right: 24,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    textAlign: 'center',
    marginTop: theme.spacing[20],
    marginBottom: theme.spacing[10],
  },
  
  // Amount Selection Styles
  amountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  amountButton: {
    width: (width - 72) / 3,
    height: 50,
    backgroundColor: theme.colors.background.tertiary,
    borderRadius: theme.borderRadius.md,
    borderWidth: 2,
    borderColor: theme.colors.border.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing[3],
  },
  amountButtonSelected: {
    borderColor: '#0CE98A',
    backgroundColor: '#003D23',
  },
  amountButtonText: {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.text.primary,
  },
  amountButtonTextSelected: {
    color: '#0CE98A',
  },
  continueButton: {
    ...theme.components.button.success,
    borderRadius: theme.borderRadius.full,
    paddingVertical: theme.spacing[4],
    alignItems: 'center',
    marginTop: theme.spacing[4],
  },
  continueButtonText: {
    ...theme.textStyles.button,
    fontSize: theme.typography.fontSize.lg,
    color: theme.colors.text.inverse,
  },

  // Custom Amount Entry Styles
  amountDisplay: {
    alignItems: 'center',
    marginVertical: 60,
  },
  amountDisplayText: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  keypad: {
    flex: 1,
    justifyContent: 'center',
    maxHeight: 300,
  },
  keypadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  keypadButton: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keypadButtonText: {
    fontSize: 32,
    color: '#FFFFFF',
  },

  // PIN Entry Styles
  pinDisplay: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 60,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#333333',
    marginHorizontal: 8,
  },
  pinDotFilled: {
    backgroundColor: theme.colors.text.primary,
  },

  // Wallet Selection Styles
  walletList: {
    flex: 1,
    marginBottom: 40,
  },
  walletOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    marginBottom: 12,
  },
  walletIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  walletIconText: {
    fontSize: 20,
  },
  walletInfo: {
    flex: 1,
  },
  walletName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  walletBalance: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  walletSelector: {
    marginLeft: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#22C55E',
    backgroundColor: '#22C55E',
  },

  // Confirmation Styles
  transferIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
  },
  transferDetails: {
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
  },
  transferRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  transferLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  transferValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1F1F1F',
    borderRadius: 12,
    padding: 16,
    marginVertical: 20,
  },
  paymentIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  paymentMethodSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  confirmButton: {
    backgroundColor: '#22C55E',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  bottomButtonContainer: {
    position: 'absolute',
    bottom: 32,
    left: 24,
    right: 24,
  },
  bottomSheetButtonContainer: {
    marginTop: 34,
  },
});
