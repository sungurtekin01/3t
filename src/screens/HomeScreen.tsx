import { StyleSheet, Text, View } from 'react-native';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme';

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>3T - Milestone 1 Test</Text>
      <Text style={styles.subtitle}>Design System & PrimaryButton</Text>

      <PrimaryButton
        title="1 Player"
        onPress={() => console.log('1 Player pressed')}
        accessibilityLabel="One player game"
      />

      <PrimaryButton
        title="2 Players"
        onPress={() => console.log('2 Players pressed')}
        accessibilityLabel="Two player game"
      />

      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>✅ Design System Created</Text>
        <Text style={styles.statusText}>✅ Theme Exports Working</Text>
        <Text style={styles.statusText}>✅ PrimaryButton Component</Text>
        <Text style={styles.statusText}>✅ Press Animations Active</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F8FF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: colors.textPrimary,
    marginBottom: 40,
  },
  statusContainer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: colors.white,
    borderRadius: 15,
    alignItems: 'flex-start',
  },
  statusText: {
    fontSize: 14,
    color: colors.textPrimary,
    marginVertical: 4,
  },
});
