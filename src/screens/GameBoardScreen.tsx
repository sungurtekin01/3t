import { View, StyleSheet, SafeAreaView, Pressable, Text, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { GameBoardCell } from '../components/game/GameBoardCell';
import { PlayerTurnIndicator } from '../components/game/PlayerTurnIndicator';
import { useGameStore } from '../stores/gameStore';
import { useTheme } from '../hooks/useTheme';

export function GameBoardScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ mode: string }>();

  const { board, currentPlayer, gameStatus, makeMove, resetGame, setGameMode } = useGameStore();

  // Calculate responsive cell size
  const screenWidth = Dimensions.get('window').width;
  const isTablet = screenWidth >= 600;
  const cellSize = isTablet ? 130 : 100;

  useEffect(() => {
    setGameMode(params.mode as 'vs-friend' | 'vs-coach');
    resetGame();
  }, [params.mode]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.container}>
        {/* Header with back button */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <Text style={{ color: theme.textColor, fontSize: 18 }}>← Back</Text>
          </Pressable>
        </View>

        {/* Turn indicator */}
        <PlayerTurnIndicator activePlayer={currentPlayer} />

        {/* Game board */}
        <View style={styles.board}>
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <GameBoardCell
                key={`${rowIndex}-${colIndex}`}
                value={cell}
                onPress={() => makeMove(rowIndex, colIndex)}
                cellSize={cellSize}
              />
            ))
          )}
        </View>

        {/* Debug status (will be replaced with modal in M3) */}
        {gameStatus !== 'playing' && (
          <View style={styles.statusContainer}>
            <Text style={{ color: theme.textColor, fontSize: 24, marginBottom: 10 }}>
              {gameStatus === 'DRAW' ? "It's a Draw!" : `Player ${gameStatus.split('_')[0]} Wins!`}
            </Text>
            <Pressable onPress={resetGame} style={styles.resetButton}>
              <Text style={styles.resetButtonText}>Play Again</Text>
            </Pressable>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    maxWidth: 500,
  },
  statusContainer: { marginTop: 30, alignItems: 'center' },
  resetButton: {
    backgroundColor: '#7F5AF0',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 15,
  },
  resetButtonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});
