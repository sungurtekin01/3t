import { Colors, Theme } from './types';

// Export design system for 3T game
export * from './designSystem';

// Legacy theme for backwards compatibility
export const theme: Record<'light' | 'dark', Theme> = {
  light: {
    backgroundColor: Colors.white,
    textColor: Colors.black,
  },
  dark: {
    backgroundColor: Colors.black,
    textColor: Colors.white,
  },
};
