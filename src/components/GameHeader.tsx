import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import { useGameStore } from '../store/gameStore';
import { colors, spacing, typography } from '../theme';

export const GameHeader: React.FC = () => {
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const gameOver = useGameStore((state) => state.gameOver);
  const winner = useGameStore((state) => state.winner);

  const getMessage = () => {
    if (gameOver) {
      if (winner === 'draw') {
        return "It's a Draw!";
      }
      return `${winner} Wins!`;
    }
    return `${currentPlayer}'s Turn`;
  };

  const getMessageColor = () => {
    if (gameOver) {
      if (winner === 'draw') {
        return colors.draw;
      }
      return winner === 'X' ? colors.xSymbol : colors.oSymbol;
    }
    return currentPlayer === 'X' ? colors.xSymbol : colors.oSymbol;
  };

  return (
    <View style={styles.container}>
      <Animated.View
        key={getMessage()}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}
      >
        <Text style={[styles.text, { color: getMessageColor() }]}>
          {getMessage()}
        </Text>
      </Animated.View>

      {!gameOver && (
        <View style={styles.indicatorContainer}>
          <View
            style={[
              styles.indicator,
              currentPlayer === 'X' ? styles.xIndicator : styles.oIndicator,
            ]}
          >
            <Text style={styles.indicatorText}>{currentPlayer}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  text: {
    fontSize: typography.fontSize.medium,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  indicatorContainer: {
    marginTop: spacing.xs,
  },
  indicator: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },
  xIndicator: {
    borderColor: colors.xSymbol,
    backgroundColor: colors.xSymbol + '20', // 20% opacity
  },
  oIndicator: {
    borderColor: colors.oSymbol,
    backgroundColor: colors.oSymbol + '20', // 20% opacity
  },
  indicatorText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
});
