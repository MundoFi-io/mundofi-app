// MundoFi Design System - Centralized Theme
// Update colors here to change entire app appearance instantly

export const colors = {
  // Primary Brand Colors
  primary: {
    50: '#EBF4FF',
    100: '#DBEAFE', 
    200: '#BFDBFE',
    300: '#93C5FD',
    400: '#60A5FA',
    500: '#4C86FF', // Main primary
    600: '#2563EB',
    700: '#1D4ED8',
    800: '#1E40AF',
    900: '#000F2E',
  },

  // Success Colors
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981',
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  // Warning Colors
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Error Colors
  error: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444',
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Neutral Colors (Dark Theme)
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#0F0F0F',
  },

  // Background Colors
  background: {
    primary: '#000000',      // Main background
    secondary: '#0F0F0F',    // Cards, modals
    tertiary: '#222531',     // Inputs, lower elements
    surface: '#2A2A2A',      // Elevated surfaces
  },

  // Text Colors
  text: {
    primary: '#F2F2F2',       // Main text
    brandPrimary: '#4C86FF',    // brand primary text
    secondary: '#99A1AF',    // Secondary text
    tertiary: '#4C5461' ,     // Disabled/placeholder
    inverse: '#000000',      // Text on light backgrounds
  },

  // Border Colors
  border: {
    primary: '#222531',      // Main borders
    secondary: '#222531',    // Subtle borders
    focus: '#4C86FF',        // Focus states
  },

  // Crypto Colors
  crypto: {
    bitcoin: '#F7931A',
    ethereum: '#627EEA', 
    usdc: '#2775CA',
    solana: '#9945FF',
  },
};

export const typography = {
  // Font Families
  fontFamily: {
    primary: 'Geist-Regular',
    primaryLight: 'Geist-Light',
    primaryMedium: 'Geist-Medium',
    mono: 'Menlo',
    system: 'System', // Fallback
  },

  // Font Sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Font Weights
  fontWeight: {
    thin: '100',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },

  // Line Heights
  lineHeight: {
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
  20: 80,
  24: 96,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  base: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 20,
  },
};

// Component Style Presets
export const components = {
  // Button Styles
  button: {
    primary: {
      backgroundColor: colors.primary[500],
      borderRadius: borderRadius.md,
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[6],
      ...shadows.base,
    },
    secondary: {
      backgroundColor: colors.background.tertiary,
      borderRadius: borderRadius.md,
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[6],
      borderWidth: 1,
      borderColor: colors.border.primary,
    },
    success: {
      backgroundColor: colors.success[500],
      borderRadius: borderRadius.md,
      paddingVertical: spacing[4],
      paddingHorizontal: spacing[6],
      ...shadows.base,
    },
  },

  // Input Styles
  input: {
    base: {
      backgroundColor: colors.background.primary, // Updated to #000000
      borderRadius: borderRadius.md,
      paddingVertical: spacing[3], // Updated to 12px
      paddingHorizontal: spacing[4], // Keeps 16px
      borderWidth: 1,
      borderColor: colors.border.primary, // #222531
      fontSize: typography.fontSize.base, // 16px
      fontFamily: typography.fontFamily.primary, // Geist-Regular
      color: colors.text.primary, // #F2F2F2
    },
    focused: {
      borderColor: colors.border.focus, // #4C86FF
      borderWidth: 1, // Keep consistent border width
    },
  },

  // Card Styles
  card: {
    base: {
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.lg,
      padding: spacing[4],
      ...shadows.base,
    },
    elevated: {
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.lg,
      padding: spacing[6],
      ...shadows.lg,
    },
  },

  // Modal Styles
  modal: {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    content: {
      backgroundColor: colors.background.secondary,
      borderRadius: borderRadius.xl,
      ...shadows.xl,
    },
  },
};

// Text Style Presets
export const textStyles = {
  h1: {
    fontFamily: typography.fontFamily.primaryMedium,
    fontSize: typography.fontSize['4xl'],
    lineHeight: typography.lineHeight.tight,
    color: colors.text.primary,
  },
  h2: {
    fontFamily: typography.fontFamily.primaryMedium,
    fontSize: typography.fontSize['3xl'],
    lineHeight: typography.lineHeight.tight,
    color: colors.text.primary,
  },
  h3: {
    fontFamily: typography.fontFamily.primaryMedium,
    fontSize: typography.fontSize['2xl'],
    lineHeight: typography.lineHeight.snug,
    color: colors.text.primary,
  },
  h4: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.xl,
    lineHeight: typography.lineHeight.snug,
    color: colors.text.primary,
  },
  body: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
    color: colors.text.primary,
  },
  bodySecondary: {
    fontFamily: typography.fontFamily.primary,
    fontSize: typography.fontSize.base,
    lineHeight: typography.lineHeight.normal,
    color: colors.text.secondary,
  },
  caption: {
    fontFamily: typography.fontFamily.primaryLight,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.lineHeight.normal,
    color: colors.text.tertiary,
  },
  button: {
    fontFamily: typography.fontFamily.primaryMedium,
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  components,
  textStyles,
};
