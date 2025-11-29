import { View, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useTheme } from '../../hooks/useTheme';

interface PlayerTurnIndicatorProps {
  activePlayer: 'X' | 'O';
}

export function PlayerTurnIndicator({ activePlayer }: PlayerTurnIndicatorProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.playerBox,
          activePlayer === 'X' && styles.playerBoxActive,
        ]}
      >
        <Text style={[styles.playerText, { color: theme.markerX }]}>✕</Text>
      </View>
      <Animated.View entering={FadeIn} exiting={FadeOut}>
        <Text style={{ color: theme.textColor, fontSize: 18, marginHorizontal: 10 }}>
          VS
        </Text>
      </Animated.View>
      <View
        style={[
          styles.playerBox,
          activePlayer === 'O' && styles.playerBoxActive,
        ]}
      >
        <Text style={[styles.playerText, { color: theme.markerO }]}>⭕</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  playerBox: {
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 10,
    opacity: 0.5,
    transform: [{ scale: 0.9 }],
  },
  playerBoxActive: {
    opacity: 1,
    backgroundColor: '#241B4A',
    transform: [{ scale: 1.0 }],
  },
  playerText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});
