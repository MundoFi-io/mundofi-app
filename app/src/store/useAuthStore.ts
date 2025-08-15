import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface CDPUser {
  userId: string;
  email?: string;
  evmAccounts: Array<{
    address: string;
    network: string;
  }>;
  isNewUser: boolean;
}

export interface WalletInfo {
  name: string;
  address: string;
  network: string;
  createdAt: string;
}

interface AuthState {
  user: CDPUser | null;
  wallet: WalletInfo | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  // Actions
  setUser: (user: CDPUser | null) => void;
  setWallet: (wallet: WalletInfo | null) => void;
  setLoading: (loading: boolean) => void;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      wallet: null,
      isLoading: false,
      isAuthenticated: false,
      
      setUser: (user) => 
        set((state) => ({ 
          ...state, 
          user, 
          isAuthenticated: !!user || !!state.wallet,
          isLoading: false 
        })),
      
      setWallet: (wallet) => 
        set((state) => ({ 
          ...state, 
          wallet,
          isAuthenticated: !!wallet || !!state.user
        })),
      
      setLoading: (isLoading) => 
        set((state) => ({ 
          ...state, 
          isLoading 
        })),
      
      signOut: async () => {
        console.log('Signing out user...');
        
        // With embedded wallets, CDP session is managed by the provider
        // We only need to clear local authentication state
        set((state) => ({ 
          ...state, 
          user: null, 
          wallet: null,
          isAuthenticated: false,
          isLoading: false 
        }));
        
        console.log('Local sign out completed');
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        wallet: state.wallet,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
