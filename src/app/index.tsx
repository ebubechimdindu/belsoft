import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import Animated, {
  withTiming,
  Easing,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Cashpoint from '../assets/images/CashPoint-logo.png';
import Icon from '../assets/images/icon.png';
import Text from '../assets/images/CashPoint-Text.png';
import { horizontalScale } from '@/src/util/metric';

const { width, height } = Dimensions.get('window');

const duration1 = 403;
const duration2 = 400;

const App = () => {
  const [image, setImage] = useState('icon');
  const firstImageScale = useSharedValue(1);
  const firstImageOpacity = useSharedValue(1);
  const firstImageTranslateX = useSharedValue(horizontalScale(width / 2 )-horizontalScale(60)); // Center adjustment
  const secondImageTranslateX = useSharedValue(horizontalScale(width));

  const firstImageStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: firstImageTranslateX.value },
      { scale: firstImageScale.value }
    ],
    opacity: firstImageOpacity.value,
  }));

  const secondImageStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: secondImageTranslateX.value }],
  }));

  useEffect(() => {
    setTimeout(() => {
      firstImageScale.value = withTiming(0.5, { duration: duration1, easing: Easing.ease });
      firstImageTranslateX.value = withTiming(horizontalScale(0), { duration: duration1, easing: Easing.ease });
      
      setTimeout(() => setImage('cashpoint'), 420);

      secondImageTranslateX.value = withTiming(horizontalScale(0), { duration: duration2, easing: Easing.ease });

      if (image === 'icon') {
        setTimeout(() => {
          router.replace('/signIn');
          SplashScreen.hideAsync();
        }, 1100);
      }
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={styles.imageContainer}>
        <Animated.Image
          source={image === 'icon' ? Icon : Cashpoint}
          resizeMode='contain'
          style={[image === 'icon' ? styles.image1 : styles.image2, image === 'icon' && firstImageStyle]}
        />
        <Animated.Image
          source={Text}
          resizeMode='contain'
          style={[styles.image2, secondImageStyle]}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFBC01',
    paddingHorizontal: horizontalScale(100),
    position: 'relative',
  },
  imageContainer: {
    position: 'absolute',
    width: width,
    height: 190,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  image1: {
    width: horizontalScale(200),
    height: 190,
  },
  image2: {
    height: 115,
  },
});

export default App;
