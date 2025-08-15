// CDP Configuration for Embedded Wallets (React Native)
export const CDP_CONFIG = {
  projectId: process.env.EXPO_PUBLIC_CDP_PROJECT_ID!,
  basePath: 'https://api.cdp.coinbase.com',
  useMock: true, // Use mock mode for demo/grant purposes
  debugging: true, // Enable debugging to see what's happening
};

console.log('🔧 CDP Config loaded:', {
  projectId: CDP_CONFIG.projectId ? '✅ Present' : '❌ Missing',
  basePath: CDP_CONFIG.basePath,
  debugging: CDP_CONFIG.debugging,
  useMock: CDP_CONFIG.useMock,
});
