// Database schema types for MundoFi

export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  wallet_address?: string;
  trust_score?: number;
}

export interface SavingsGoal {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  target_amount: number;
  current_amount: number;
  target_date?: string;
  created_at: string;
  updated_at: string;
  status: 'active' | 'completed' | 'paused';
  crypto_type: string; // e.g., 'ETH', 'USDC', etc.
}

export interface Transaction {
  id: string;
  user_id: string;
  goal_id?: string;
  amount: number;
  crypto_type: string;
  transaction_type: 'deposit' | 'withdrawal' | 'transfer';
  wallet_address: string;
  transaction_hash?: string;
  created_at: string;
  status: 'pending' | 'completed' | 'failed';
}

export interface TrustMetrics {
  id: string;
  user_id: string;
  savings_consistency: number; // 0-100
  transaction_frequency: number; // transactions per month
  average_holding_period: number; // days
  goal_completion_rate: number; // 0-100
  total_saved: number;
  account_age_days: number;
  calculated_at: string;
}

// Supabase database type
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      savings_goals: {
        Row: SavingsGoal;
        Insert: Omit<SavingsGoal, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<SavingsGoal, 'id' | 'created_at'>>;
      };
      transactions: {
        Row: Transaction;
        Insert: Omit<Transaction, 'id' | 'created_at'>;
        Update: Partial<Omit<Transaction, 'id' | 'created_at'>>;
      };
      trust_metrics: {
        Row: TrustMetrics;
        Insert: Omit<TrustMetrics, 'id' | 'calculated_at'>;
        Update: Partial<Omit<TrustMetrics, 'id' | 'calculated_at'>>;
      };
    };
  };
}
