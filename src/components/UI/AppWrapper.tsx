import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
  Keyboard,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabView } from '@/provider/TabView';
import SafeAreaLayout from '@/provider/SafeAreaLayout';
import Wrapper from '@/provider/Wrapper';
import Image from './Image';
import { images } from '@/assets/images';

interface AppWrapperProps {
  isTabView?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
  showBackdrop?: boolean;
  backdropColors?: string[]; // e.g. ['rgba(0,0,0,0.5)', 'transparent']
}

const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  style,
  isTabView = false,
  showBackdrop = true,
  backdropColors = ['rgba(255,255,255,0.5)', 'rgba(255,255,255,0.5)'],
}) => {
  return (
    <Wrapper>
      <Image style={[styles.image, style]} source={images.onboard1} background>
        {showBackdrop && (
          <LinearGradient
            colors={backdropColors}
            style={StyleSheet.absoluteFillObject}
          />
        )}

        
        {children}
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

export default AppWrapper;
