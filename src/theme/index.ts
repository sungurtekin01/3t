import { Colors, Theme } from './types';

export const theme: Record<'light' | 'dark', Theme> = {
  light: {
    backgroundColor: Colors.white,
    textColor: Colors.black,
    primaryButton: '#7F5AF0',
    primaryButtonShadow: '#6247AA',
    markerX: '#FF7DE3',
    markerO: '#7DF9FF',
    cellBackground: '#1A1238',
    hintGlow: '#A3F9A3',
    modalOverlay: 'rgba(0, 0, 0, 0.7)',
    modalContainer: '#241B4A',
  },
  dark: {
    backgroundColor: Colors.black,
    textColor: Colors.white,
    // Same colors for dark mode (game aesthetic doesn't change)
    primaryButton: '#7F5AF0',
    primaryButtonShadow: '#6247AA',
    markerX: '#FF7DE3',
    markerO: '#7DF9FF',
    cellBackground: '#1A1238',
    hintGlow: '#A3F9A3',
    modalOverlay: 'rgba(0, 0, 0, 0.7)',
    modalContainer: '#241B4A',
  },
};
