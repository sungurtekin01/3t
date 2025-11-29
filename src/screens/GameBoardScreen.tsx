import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useTheme } from '../hooks/useTheme';

export function GameBoardScreen() {
  const theme = useTheme();
  const params = useLocalSearchParams<{ mode: string }>();

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <Text style={{ color: theme.textColor, fontSize: 24 }}>
        Game Mode: {params.mode}
      </Text>
      <Text style={{ color: theme.textColor, fontSize: 18, marginTop: 20 }}>
        (Game board will be here)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
