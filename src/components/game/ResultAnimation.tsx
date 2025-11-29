import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

type AnimationType = 'win' | 'draw' | 'lose';

interface ResultAnimationProps {
  type: AnimationType;
}

const ANIMATION_SOURCE = {
  win: require('../../../assets/lottie/win.json'),
  draw: require('../../../assets/lottie/draw.json'),
  lose: require('../../../assets/lottie/lose.json'),
};

export function ResultAnimation({ type }: ResultAnimationProps) {
  return (
    <View style={styles.container}>
      <LottieView
        source={ANIMATION_SOURCE[type]}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 150,
    height: 150,
  },
});
