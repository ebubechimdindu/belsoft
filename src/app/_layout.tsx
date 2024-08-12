import { View, Text } from 'react-native';
import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    'Manrope-Light': require('../../node_modules/@expo-google-fonts/manrope/Manrope_300Light.ttf'),
    'Manrope-Regular': require('../../node_modules/@expo-google-fonts/manrope/Manrope_400Regular.ttf'),
    'Manrope-Medium': require('../../node_modules/@expo-google-fonts/manrope/Manrope_500Medium.ttf'),
    'Manrope-SemiBold': require('../../node_modules/@expo-google-fonts/manrope/Manrope_600SemiBold.ttf'),
    'Manrope-Bold': require('../../node_modules/@expo-google-fonts/manrope/Manrope_700Bold.ttf'),
    'Manrope-ExtraBold': require('../../node_modules/@expo-google-fonts/manrope/Manrope_800ExtraBold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);


  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="signIn"
          options={{
            headerShown: false,
            headerTitle: '',
          }}
        />
      </Stack>
    </>
  );
};

export default RootLayout;
