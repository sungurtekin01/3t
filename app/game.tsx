import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { GameBoard } from '../src/components/GameBoard';
import { GameHeader } from '../src/components/GameHeader';
import { PrimaryButton } from '../src/components/PrimaryButton';
import { useGameStore } from '../src/store/gameStore';
import { colors, spacing } from '../src/theme';

export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const mode = params.mode as 'single' | 'multi';

  const setMode = useGameStore((state) => state.setMode);
  const resetGame = useGameStore((state) => state.resetGame);
  const gameOver = useGameStore((state) => state.gameOver);

  // Set game mode and reset when screen loads
  useEffect(() => {
    setMode(mode || 'multi');
    resetGame();
  }, [mode, setMode, resetGame]);

  const handlePlayAgain = () => {
    resetGame();
  };

  const handleBackToMenu = () => {
    resetGame();
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <GameHeader />
        <GameBoard />

        <View style={styles.buttonContainer}>
          {gameOver && (
            <PrimaryButton
              title="Play Again"
              onPress={handlePlayAgain}
              accessibilityLabel="Play another game"
            />
          )}
          <PrimaryButton
            title="Back to Menu"
            onPress={handleBackToMenu}
            accessibilityLabel="Back to main menu"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.modalBackground,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
