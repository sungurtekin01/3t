import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { PrimaryButton } from '../components/game/PrimaryButton';
import { useTheme } from '../hooks/useTheme';

export function HomeScreen() {
  const theme = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.container}>
        <Text style={styles.mascot}>🎮</Text>
        <Text style={[styles.title, { color: theme.primaryButton }]}>3T</Text>
        <Text style={[styles.subtitle]}>Tic Tac Toe Fun!</Text>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Play vs. Friend"
            icon="people"
            onPress={() => router.push({ pathname: '/game', params: { mode: 'vs-friend' } })}
          />
          <PrimaryButton
            title="Play vs. Coach"
            icon="game-controller"
            onPress={() => router.push({ pathname: '/game', params: { mode: 'vs-coach' } })}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  mascot: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.15)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 6,
  },
  subtitle: {
    fontSize: 24,
    color: '#FF0000',
    textAlign: 'center',
    marginTop: -10,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
});
