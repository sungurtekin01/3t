import { View, Text, Modal, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { ResultAnimation } from './ResultAnimation';
import { GameStatus } from '../../stores/gameStore';

interface GameOverModalProps {
  visible: boolean;
  gameStatus: GameStatus;
  onPlayAgain: () => void;
}

export function GameOverModal({ visible, gameStatus, onPlayAgain }: GameOverModalProps) {
  const theme = useTheme();

  if (gameStatus === 'playing') {
    return null;
  }

  const getAnimationType = (): 'win' | 'draw' | 'lose' => {
    if (gameStatus === 'DRAW') return 'draw';
    if (gameStatus === 'X_WINS') return 'win';
    return 'lose';
  };

  const getResultMessage = (): string => {
    if (gameStatus === 'DRAW') return "It's a Draw!";
    if (gameStatus === 'X_WINS') return 'You Win!';
    return 'Coach Wins!';
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onPlayAgain}
    >
      <View style={[styles.overlay, { backgroundColor: theme.modalOverlay }]}>
        <View style={[styles.container, { backgroundColor: theme.modalContainer }]}>
          <ResultAnimation type={getAnimationType()} />

          <Text style={[styles.message, { color: theme.textColor }]}>
            {getResultMessage()}
          </Text>

          <Pressable
            onPress={onPlayAgain}
            style={[styles.button, { backgroundColor: theme.primaryButton }]}
          >
            <Text style={styles.buttonText}>Play Again</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: 320,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  message: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 24,
  },
  button: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
