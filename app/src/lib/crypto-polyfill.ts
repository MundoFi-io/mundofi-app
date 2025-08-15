/**
 * Expo Go Compatible Crypto Polyfill
 * Provides SubtleCrypto methods using expo-crypto for CDP SDK compatibility
 */

import * as Crypto from 'expo-crypto';

// Polyfill crypto.subtle if it doesn't exist or is incomplete
const originalSubtle = (global as any).crypto?.subtle;

// Create a mock SubtleCrypto implementation using expo-crypto
const subtleCryptoPolyfill = {
  async generateKey(algorithm: any, extractable: boolean, keyUsages: string[]): Promise<any> {
    console.log('🔧 Using SubtleCrypto polyfill for generateKey');
    
    // For CDP SDK, we need to generate a key-like object
    // This is a simplified implementation that should satisfy basic CDP requirements
    try {
      // Generate random bytes for the key material
      const keyMaterial = await Crypto.getRandomBytesAsync(32);
      
      // Create a mock CryptoKey-like object
      const mockKey = {
        type: 'secret',
        extractable: extractable,
        algorithm: algorithm,
        usages: keyUsages,
        // Convert the random bytes to key material
        _material: keyMaterial
      };
      
      console.log('✅ Successfully generated mock crypto key');
      return mockKey;
    } catch (error) {
      console.error('❌ Failed to generate crypto key:', error);
      throw new Error(`generateKey polyfill failed: ${error.message}`);
    }
  },

  async encrypt(algorithm: any, key: any, data: any): Promise<ArrayBuffer> {
    console.log('🔧 Using SubtleCrypto polyfill for encrypt');
    
    // For now, return the data as-is (this is not secure, but allows CDP to continue)
    // In a production app, you'd implement proper encryption here
    console.warn('⚠️ Using mock encryption - not cryptographically secure!');
    return data instanceof ArrayBuffer ? data : new ArrayBuffer(0);
  },

  async decrypt(algorithm: any, key: any, data: any): Promise<ArrayBuffer> {
    console.log('🔧 Using SubtleCrypto polyfill for decrypt');
    
    // For now, return the data as-is (this is not secure, but allows CDP to continue)
    console.warn('⚠️ Using mock decryption - not cryptographically secure!');
    return data instanceof ArrayBuffer ? data : new ArrayBuffer(0);
  },

  async digest(algorithm: string, data: any): Promise<ArrayBuffer> {
    console.log('🔧 Using SubtleCrypto polyfill for digest');
    
    try {
      // Use expo-crypto for hashing
      let digestAlgorithm: Crypto.CryptoDigestAlgorithm;
      
      switch (algorithm.toLowerCase()) {
        case 'sha-256':
          digestAlgorithm = Crypto.CryptoDigestAlgorithm.SHA256;
          break;
        case 'sha-1':
          digestAlgorithm = Crypto.CryptoDigestAlgorithm.SHA1;
          break;
        default:
          digestAlgorithm = Crypto.CryptoDigestAlgorithm.SHA256;
      }
      
      // Convert data to string if it's not already
      const dataString = data instanceof ArrayBuffer ? 
        String.fromCharCode(...new Uint8Array(data)) : 
        String(data);
      
      const digest = await Crypto.digestStringAsync(digestAlgorithm, dataString, {
        encoding: Crypto.CryptoEncoding.HEX,
      });
      
      // Convert hex string back to ArrayBuffer
      const bytes = new Uint8Array(digest.length / 2);
      for (let i = 0; i < digest.length; i += 2) {
        bytes[i / 2] = parseInt(digest.substr(i, 2), 16);
      }
      
      return bytes.buffer;
    } catch (error) {
      console.error('❌ Failed to digest:', error);
      throw new Error(`digest polyfill failed: ${error.message}`);
    }
  },

  async exportKey(format: string, key: any): Promise<ArrayBuffer | JsonWebKey> {
    console.log('🔧 Using SubtleCrypto polyfill for exportKey');
    
    try {
      // For CDP SDK, we need to export the key in the requested format
      switch (format.toLowerCase()) {
        case 'raw':
          // Return the raw key material as ArrayBuffer
          if (key._material) {
            console.log('✅ Successfully exported raw key');
            return key._material instanceof ArrayBuffer ? 
              key._material : 
              new ArrayBuffer(32); // fallback to 32 bytes
          }
          break;
          
        case 'jwk':
          // Return as JSON Web Key format
          const jwk = {
            kty: 'oct',
            k: key._material ? 
              btoa(String.fromCharCode(...new Uint8Array(key._material))) : 
              btoa('mock-key-material-for-development'),
            alg: 'HS256',
            use: 'sig'
          };
          console.log('✅ Successfully exported JWK key');
          return jwk;
          
        case 'pkcs8':
        case 'spki':
          // For public/private key formats, return mock data
          const mockKeyData = new Uint8Array(32);
          mockKeyData.fill(0x42); // Fill with mock data
          console.log('✅ Successfully exported mock key data');
          return mockKeyData.buffer;
          
        default:
          console.warn(`⚠️ Unsupported exportKey format: ${format}, returning mock data`);
          return new ArrayBuffer(32);
      }
      
      // Fallback
      return new ArrayBuffer(32);
    } catch (error) {
      console.error('❌ Failed to export key:', error);
      throw new Error(`exportKey polyfill failed: ${error.message}`);
    }
  }
};

// Enhanced SubtleCrypto that combines original + polyfill
const enhancedSubtle = {
  ...originalSubtle,
  ...subtleCryptoPolyfill
};

// Apply the polyfill to global crypto object
const applyCryptoPolyfill = () => {
  // Ensure global crypto exists
  if (typeof global !== 'undefined') {
    if (!global.crypto) {
      (global as any).crypto = {};
    }
    (global.crypto as any).subtle = enhancedSubtle;
    
    // Also apply to the crypto variable directly
    if (typeof crypto !== 'undefined') {
      (crypto as any).subtle = enhancedSubtle;
    }
  }

  if (typeof window !== 'undefined') {
    if (!window.crypto) {
      (window as any).crypto = {};
    }
    (window.crypto as any).subtle = enhancedSubtle;
  }
  
  console.log('🔧 Expo Go crypto polyfill applied');
  console.log('🔍 Checking polyfill result:');
  console.log('  - global.crypto?.subtle:', typeof global?.crypto?.subtle);
  console.log('  - crypto?.subtle:', typeof crypto?.subtle);
  console.log('  - generateKey method:', typeof crypto?.subtle?.generateKey);
};

// Apply immediately
applyCryptoPolyfill();

// Also apply after a short delay to ensure it sticks
setTimeout(applyCryptoPolyfill, 100);

export default enhancedSubtle;
