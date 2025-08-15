// Mock implementation of Coinbase CDP hooks for device testing
// This allows the app to work on physical devices without native SDK

export const useSignInWithEmail = () => ({
  signInWithEmail: async ({ email }: { email: string }) => {
    console.log('🎭 Mock: Sending email to', email);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('✅ Mock: Email sent successfully');
    return { success: true };
  }
});

export const useVerifyEmailOTP = () => ({
  verifyEmailOTP: async ({ email, otp }: { email: string; otp: string }) => {
    console.log('🎭 Mock: Verifying OTP', otp, 'for', email);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (otp === '123456') {
      console.log('✅ Mock: OTP verified successfully');
      return { success: true };
    } else {
      throw new Error('Invalid OTP');
    }
  }
});

export const useIsSignedIn = () => ({
  isSignedIn: false // Always false in mock mode
});

export const useEvmAddress = () => {
  // Return a demo address for mock mode
  return '0x742d35Cc6639C0532fEb42da5b5e6a01E4E8e2E7';
};
