import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TabView } from '@/provider/TabView';
import SafeAreaLayout from '@/provider/SafeAreaLayout';
import { isAborted } from 'zod';
import Wrapper from '@/provider/Wrapper';

interface AppWrapperProps {
  isTabView?: boolean;
  children: React.ReactNode;
  style?: ViewStyle;
}
interface WrapperProps {
  child: React.ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  style,
  isTabView = false,
}) => {
  return (
    <Wrapper>
      <LinearGradient
        colors={['#fff', '#fff', '#fff']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={[{ flex: 1, position: 'relative' }, style]}>
        {children}
      </LinearGradient>
    </Wrapper>
  );
};

export default AppWrapper;
