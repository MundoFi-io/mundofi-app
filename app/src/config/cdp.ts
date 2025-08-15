// App configuration for MundoFi using Coinbase Wallet Mobile SDK
// No CDP credentials needed - uses external Coinbase Wallet app

export const APP_CONFIG = {
  APP_NAME: process.env.EXPO_PUBLIC_APP_NAME || 'MundoFi',
  APP_DESCRIPTION: process.env.EXPO_PUBLIC_APP_DESCRIPTION || 'Social, goal-based crypto savings with self-custody',
  APP_URL: process.env.EXPO_PUBLIC_APP_URL || 'https://mundofi.app',
  APP_ICON: process.env.EXPO_PUBLIC_APP_ICON || 'https://mundofi.app/icon.png',
  
  // Deep link configuration for Coinbase Wallet Mobile SDK
  CALLBACK_URL: process.env.EXPO_PUBLIC_CALLBACK_URL || 'https://mundofi.app/callback',
} as const;

export type AppConfig = typeof APP_CONFIG;
