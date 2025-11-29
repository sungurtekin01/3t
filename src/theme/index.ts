import { Colors, Theme } from './types';

export const theme: Record<'light' | 'dark', Theme> = {
  light: {
    backgroundColor: Colors.white,
    textColor: Colors.black,
    primaryButton: '#7F5AF0',
    primaryButtonShadow: '#6247AA',
    markerX: '#FF7DE3',
    markerO: '#FFD700',
    cellBackground: '#E8DFF5',
    hintGlow: '#A3F9A3',
    modalOverlay: 'rgba(0, 0, 0, 0.7)',
    modalContainer: '#F5F0FF',
  },
  dark: {
    backgroundColor: Colors.black,
    textColor: Colors.white,
    // Same colors for dark mode (game aesthetic doesn't change)
    primaryButton: '#7F5AF0',
    primaryButtonShadow: '#6247AA',
    markerX: '#FF7DE3',
    markerO: '#FFD700',
    cellBackground: '#E8DFF5',
    hintGlow: '#A3F9A3',
    modalOverlay: 'rgba(0, 0, 0, 0.7)',
    modalContainer: '#F5F0FF',
  },
};
