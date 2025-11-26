import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { PrimaryButton } from '../components/PrimaryButton';
import { colors, spacing } from '../theme';

export function MainMenuScreen() {
  const router = useRouter();

  const handleSinglePlayer = () => {
    router.push('/game?mode=single');
  };

  const handleMultiPlayer = () => {
    router.push('/game?mode=multi');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Logo placeholder - will be replaced with actual logo later */}
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>3T</Text>
        </View>

        <Text style={styles.tagline}>A Fun Game of Noughts & Crosses!</Text>

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="1P"
            onPress={handleSinglePlayer}
            accessibilityLabel="One player game"
          />
          <PrimaryButton
            title="2P"
            onPress={handleMultiPlayer}
            accessibilityLabel="Two player game"
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
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  logoContainer: {
    width: 150,
    height: 150,
    backgroundColor: colors.primary,
    borderRadius: 75,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.logoMargin,
  },
  logoText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: colors.textWhite,
  },
  tagline: {
    fontSize: 20,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
