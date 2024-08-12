import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, Platform } from 'react-native';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withSpring, withTiming, withSequence } from 'react-native-reanimated';
import { Send, WalletMinimal, ScanLine } from 'lucide-react-native';
import { COLORS } from '@/src/assets/theme/colors';
import { HomeIcon, ProfileIcon } from '../assets/theme/icons';
import { moderateScale } from '@/src/util/metric';

const duration = 200;

const TabBar = ({ state, descriptors, navigation }) => {
  // State to track if it's the first time the component is rendered
  const [firstTime, setFirstTime] = useState(true);
  // State to track if the animation is ongoing
  const [isAnimating, setIsAnimating] = useState(false); 
  // Shared value to control the vertical position of the tab bar
  const animationProgress = useSharedValue(0);
  // Shared value to control the opacity of the tab bar
  const opacity = useSharedValue(1);

  // Animated style for the tab bar that moves it vertically and adjusts its opacity
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: animationProgress.value }],
    opacity: opacity.value,
  }));

  useEffect(() => {
    // Only run the animation after the first render
    if (!firstTime) {
      setIsAnimating(true); // Start the animation

      // Sequence of animations for the tab bar's position
      animationProgress.value = withSequence(
        withTiming(-400, { duration, easing: Easing.inOut(Easing.ease) }), // Move tab bar up off-screen
        withTiming(400, { duration: 1 }), // Move tab bar back down quickly (off-screen)
        withTiming(0, { duration: 200, easing: Easing.inOut(Easing.ease) }), // Bring tab bar back to its original position
        withSpring(-20, { // Bounce up slightly
          duration: 50,
          damping: 3,
          stiffness: 100,
          overshootClamping: true,
          restDisplacementThreshold: 0.01,
          restSpeedThreshold: 0.1,
        }),
        withSpring(0, { // Bounce back to the original position
          duration: 50,
          damping: 3,
          stiffness: 100,
          overshootClamping: true,
        })
      );

      // Animation sequence for the opacity
      opacity.value = withTiming(0, {
        duration,
        easing: Easing.inOut(Easing.ease),
      }, () => {
        opacity.value = withTiming(1, { duration: 200, easing: Easing.inOut(Easing.ease) }); // Restore opacity after fade-out
      });

      // This is to check when the animation has ended to change the position of the tabbar
      setTimeout(() => {
        setIsAnimating(false); // Animation is finished
      }, 550);

    }
    setFirstTime(false); // Mark the component as no longer being the first render
  }, [state.index]);

  return (
    <Animated.View
      style={[styles.tabBar, isAnimating && { position: 'absolute' } , animatedStyle, Platform.OS === 'ios' && styles.iosTabBar]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        // Skip rendering certain routes
        if (['_sitemap', '+not-found'].includes(route.name)) return null;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Determine the correct icon to render for each tab
        const IconComponent = {
          index: (props) => <HomeIcon isFocused={isFocused} />,
          send: (props) => <Send {...props} color={COLORS.primary} size={moderateScale(29)} />,
          scan: () => (
            <View style={styles.scanContainer}>
              <View style={styles.scanBackground}>
                <View style={styles.scan}>
                  <ScanLine color={COLORS.primary} size={moderateScale(30)} strokeWidth={4} />
                </View>
              </View>
            </View>
          ),
          pay: (props) => <WalletMinimal {...props} color={COLORS.primary} size={moderateScale(29)} />,
          profile: (props) => <ProfileIcon isFocused={isFocused} />,
        }[route.name];

        return (
          <Pressable
            key={route.name}
            style={styles.item}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {IconComponent ? (
              IconComponent({ style: { opacity: isFocused ? 1 : 0.9 } })
            ) : (
              <Text>?</Text>
            )}
            <Text
              style={{
                opacity: isFocused ? 1 : 0.7,
                fontSize: 10,
                color: COLORS.primary,
              }}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </Animated.View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBar: {
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.backgroundDark,
    paddingBottom: 30,
    paddingTop: 17,
    paddingHorizontal: 0,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  iosTabBar: {
    position: 'absolute',
    paddingBottom: 30,
    paddingTop: 17,
    paddingHorizontal: 0,
  },
  item: {
    flex: 1,
    width: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  scanBackground: {
    backgroundColor: COLORS.backgroundLight,
    height: 78,
    width: 78,
    padding: 42,
    borderRadius: 88,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scan: {
    backgroundColor: COLORS.secondary,
    height: 60,
    width: 60,
    padding: 35,
    borderRadius: 88,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanContainer: {
    backgroundColor: COLORS.primary,
    position: 'absolute',
    bottom: -30,
    height: 80,
    width: 80,
    padding: 48,
    borderRadius: 88,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
