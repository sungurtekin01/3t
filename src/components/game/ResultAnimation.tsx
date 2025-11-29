import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

type AnimationType = 'win' | 'draw' | 'lose';

interface ResultAnimationProps {
  type: AnimationType;
}

// Import JSON files directly
const winAnimation = require('../../../assets/lottie/win.json');
const drawAnimation = require('../../../assets/lottie/draw.json');
const loseAnimation = require('../../../assets/lottie/lose.json');

export function ResultAnimation({ type }: ResultAnimationProps) {
  // Determine which animation to show
  const getAnimationSource = () => {
    switch (type) {
      case 'win':
        return winAnimation;
      case 'draw':
        return drawAnimation;
      case 'lose':
        return loseAnimation;
      default:
        return winAnimation;
    }
  };

  return (
    <View style={styles.container}>
      <LottieView
        source={getAnimationSource()}
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
