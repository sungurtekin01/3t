import React, { useEffect } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  UIManager,
} from 'react-native';

import { borderRadius, colors, shadows, sizes } from '../theme';

// Enable LayoutAnimation on Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type CellValue = 'X' | 'O' | null;

interface GameBoardCellProps {
  value: CellValue;
  row: number;
  col: number;
  onPress: (row: number, col: number) => void;
  disabled?: boolean;
}

export const GameBoardCell: React.FC<GameBoardCellProps> = ({
  value,
  row,
  col,
  onPress,
  disabled = false,
}) => {
  // Trigger spring animation when value changes
  useEffect(() => {
    if (value) {
      LayoutAnimation.spring();
    }
  }, [value]);

  const handlePress = () => {
    if (!disabled && !value) {
      onPress(row, col);
    }
  };

  const getAccessibilityLabel = () => {
    if (value === 'X') return `Cell ${row + 1}, ${col + 1}: X`;
    if (value === 'O') return `Cell ${row + 1}, ${col + 1}: O`;
    return `Cell ${row + 1}, ${col + 1}: Empty`;
  };

  return (
    <Pressable
      style={[styles.cell, disabled && styles.cellDisabled]}
      onPress={handlePress}
      accessibilityLabel={getAccessibilityLabel()}
      accessibilityRole="button"
      accessibilityState={{
        disabled: disabled || !!value,
      }}
    >
      {value && (
        <Text
          style={[
            styles.symbol,
            value === 'X' ? styles.xSymbol : styles.oSymbol,
          ]}
        >
          {value}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cell: {
    width: sizes.cell.width,
    height: sizes.cell.height,
    backgroundColor: colors.white,
    borderRadius: borderRadius.medium,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
    ...shadows.cell,
  },
  cellDisabled: {
    opacity: 0.6,
  },
  symbol: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  xSymbol: {
    color: colors.xSymbol,
  },
  oSymbol: {
    color: colors.oSymbol,
  },
});
