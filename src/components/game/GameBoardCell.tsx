import { Pressable, Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface GameBoardCellProps {
  value: 'X' | 'O' | null;
  onPress: () => void;
  isHinted?: boolean;
  cellSize: number;
}

export function GameBoardCell({ value, onPress, isHinted = false, cellSize }: GameBoardCellProps) {
  const theme = useTheme();
  const scale = useSharedValue(0.5);

  // Animate marker placement
  useEffect(() => {
    if (value) {
      scale.value = withSpring(1, { damping: 10, stiffness: 200 });
    } else {
      scale.value = 0.5;
    }
  }, [value]);

  const markerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Pressable
      onPress={onPress}
      disabled={value !== null}
      style={[
        styles.cell,
        {
          backgroundColor: theme.cellBackground,
          width: cellSize,
          height: cellSize,
        },
        isHinted && {
          shadowColor: theme.hintGlow,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 1,
          shadowRadius: 15,
          elevation: 20,
        },
      ]}
    >
      {value && (
        <Animated.View style={markerStyle}>
          <Text
            style={[
              styles.marker,
              { color: value === 'X' ? theme.markerX : theme.markerO },
            ]}
          >
            {value === 'X' ? '✕' : '⭕'}
          </Text>
        </Animated.View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cell: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 8,
  },
  marker: {
    fontSize: 64,
    fontWeight: 'bold',
  },
});
