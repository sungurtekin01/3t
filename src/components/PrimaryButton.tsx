import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import {
  animations,
  borderRadius,
  colors,
  shadows,
  spacing,
  typography,
} from '../theme';

interface PrimaryButtonProps {
  title: string;
  icon?: React.ReactNode;
  onPress: () => void;
  accessibilityLabel?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  icon,
  onPress,
  accessibilityLabel,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(animations.buttonPress.scale, {
      damping: 10,
      stiffness: 100,
    });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, {
      damping: 10,
      stiffness: 100,
    });
  };

  return (
    <View style={styles.buttonWrapper}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        accessibilityLabel={accessibilityLabel || title}
        accessibilityRole="button"
      >
        <Animated.View style={[styles.container, animatedStyle]}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={styles.text}>{title}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.buttonVertical,
    paddingHorizontal: spacing.buttonHorizontal,
    borderRadius: borderRadius.pill,
    marginVertical: spacing.sm,
    width: '80%',
    ...shadows.button,
  },
  iconContainer: {
    width: 30,
    height: 30,
    marginRight: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.textWhite,
    fontSize: typography.fontSize.large,
    fontWeight: typography.fontWeight.bold,
  },
});
