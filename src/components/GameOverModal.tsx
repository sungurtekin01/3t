import React, { useEffect } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useGameStore } from '../store/gameStore';
import {
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from '../theme';
import { PrimaryButton } from './PrimaryButton';

interface GameOverModalProps {
  visible: boolean;
  onPlayAgain: () => void;
  onMainMenu: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  visible,
  onPlayAgain,
  onMainMenu,
}) => {
  const winner = useGameStore((state) => state.winner);
  const scale = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
    } else {
      scale.value = 0;
    }
  }, [visible, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const getResultText = () => {
    if (winner === 'draw') return "It's a Draw!";
    return `${winner} Wins!`;
  };

  const getResultColor = () => {
    if (winner === 'draw') return colors.draw;
    return colors.win;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.backdrop}>
        <Animated.View style={[styles.modalContainer, animatedStyle]}>
          <Text style={[styles.resultText, { color: getResultColor() }]}>
            {getResultText()}
          </Text>

          <View style={styles.buttonContainer}>
            <PrimaryButton
              title="Play Again"
              onPress={onPlayAgain}
              accessibilityLabel="Play another game"
            />
            <PrimaryButton
              title="Main Menu"
              onPress={onMainMenu}
              accessibilityLabel="Return to main menu"
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.backdropOverlay,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: colors.modalBackground,
    borderRadius: borderRadius.large,
    padding: spacing.xl,
    alignItems: 'center',
    marginHorizontal: spacing.xxl,
    minWidth: 300,
    ...shadows.modal,
  },
  resultText: {
    fontSize: typography.fontSize.xlarge,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.sm,
  },
});
