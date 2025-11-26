import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../src/components/PrimaryButton';
import { colors, spacing } from '../src/theme';

export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const mode = params.mode as string;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Game Screen</Text>
        <Text style={styles.subtitle}>
          Mode: {mode === 'single' ? '1 Player' : '2 Players'}
        </Text>

        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>🎮</Text>
          <Text style={styles.placeholderSubtext}>
            Game board will go here
          </Text>
        </View>

        <PrimaryButton
          title="Back to Menu"
          onPress={() => router.back()}
          accessibilityLabel="Back to main menu"
        />
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
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: 20,
    color: colors.textPrimary,
    marginBottom: spacing.xxl,
  },
  placeholder: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  placeholderText: {
    fontSize: 80,
    marginBottom: spacing.md,
  },
  placeholderSubtext: {
    fontSize: 16,
    color: colors.textPrimary,
    opacity: 0.6,
  },
});
