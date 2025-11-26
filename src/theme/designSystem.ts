/**
 * 3T Design System
 * Comprehensive design tokens for the children's tic-tac-toe app
 * Based on design-spec.json
 */

export const colors = {
  // Primary brand colors
  primary: '#FF6347',
  primaryShadow: '#C44D38',

  // Game symbols
  xSymbol: '#3498DB',
  oSymbol: '#E74C3C',

  // Backgrounds
  white: '#FFFFFF',
  black: '#000000',
  modalBackground: '#F0F8FF',
  backdropOverlay: 'rgba(0, 0, 0, 0.6)',

  // Text colors
  textPrimary: '#333333',
  textWhite: '#FFFFFF',

  // Game result colors
  win: '#2ECC71',
  draw: '#F39C12',
} as const;

export const typography = {
  // Font families
  fontFamily: {
    rounded: 'System', // Using system default rounded font
    default: 'System',
  },

  // Font sizes
  fontSize: {
    small: 14,
    medium: 24,
    large: 28,
    xlarge: 48,
    symbol: 64,
  },

  // Font weights
  fontWeight: {
    regular: '400',
    semibold: '600',
    bold: '700',
  },
} as const;

export const spacing = {
  // Margins and padding
  xs: 8,
  sm: 10,
  md: 15,
  lg: 20,
  xl: 30,
  xxl: 40,

  // Component-specific spacing
  buttonVertical: 20,
  buttonHorizontal: 40,
  cellMargin: 8,
  logoMargin: 16,
} as const;

export const borderRadius = {
  small: 15,
  medium: 20,
  large: 30,
  pill: 100, // For fully rounded buttons
} as const;

export const shadows = {
  // Button shadow - strong, flat shadow for depth
  button: {
    shadowColor: colors.primaryShadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 8, // Android
  },

  // Cell shadow - subtle elevation
  cell: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },

  // Modal shadow - pronounced for overlay effect
  modal: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 20,
  },

  // Speech bubble shadow
  speechBubble: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
} as const;

export const sizes = {
  // Component dimensions
  logo: {
    width: 150,
    height: 150,
  },
  cell: {
    width: 100,
    height: 100,
  },
  buttonIcon: {
    width: 30,
    height: 30,
  },
  turnIndicator: {
    width: 50,
    height: 50,
  },
  mascot: {
    width: 80,
    height: 80,
  },
  speechBubbleMaxWidth: 150,
} as const;

export const animations = {
  // Animation timing
  buttonPress: {
    scale: 0.95,
    duration: 200,
  },
  aiDelay: 500, // milliseconds before AI moves
  hintIdleTime: 4000, // milliseconds before showing hint
} as const;

// Type exports for TypeScript
export type ColorKeys = keyof typeof colors;
export type SpacingKeys = keyof typeof spacing;
export type BorderRadiusKeys = keyof typeof borderRadius;
export type ShadowKeys = keyof typeof shadows;
