import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { images } from '@/assets/images';
import Wrapper from '@/provider/Wrapper';
import Image from './Image';
import Navbar from '@/packages/Onboarding/components/Navbar';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get("window").height;

interface AppWrapperProps {
   children: React.ReactNode;
  style?: ViewStyle;
  showBackdrop?: boolean;
  backdropColors?: string[]; // Default: semi-white overlay
}

const AuthWrapper: React.FC<AppWrapperProps> = ({
  children,
  style,
   showBackdrop = true,
  backdropColors = ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.5)'],
}) => {
  const { goBack } = useGlobalNavigation();

  return (
    <Wrapper>
      <Image style={[styles.image, style]} source={images.onboard1} background>
        {showBackdrop && (
          <LinearGradient
            colors={backdropColors}
            style={StyleSheet.absoluteFillObject}
          />
        )}

        <Navbar handleBack={goBack} />

        <View className="flex-1 bg-transparent">
            <View className="flex-[0.9] w-[95%] flex-row justify-center items-center bg-white/80 rounded-3xl mt-[100px] mx-auto">
            <ScrollView
              className="flex-1  w-full"
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              keyboardShouldPersistTaps="handled"
            >
              <View className="w-[95%]  flex-1    p-4">
                 {children}
              </View>
            </ScrollView>
          </View>
        </View>
      </Image>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default AuthWrapper;
