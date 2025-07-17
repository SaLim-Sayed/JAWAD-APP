import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Dimensions, ImageSourcePropType, ActivityIndicator } from "react-native";

const { width, height } = Dimensions.get("window");

 const splashImage: ImageSourcePropType = require("@/assets/images/splash.png");

const AppLoader = () => {
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loopAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );

    loopAnimation.start();

    return () => loopAnimation.stop();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={splashImage}
        style={[styles.image, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
      <ActivityIndicator  size={"large"} color="#493225" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0)",  
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.6,
    height: width * 0.6,
  },
});

export default AppLoader;
