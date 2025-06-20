import { isAndroid } from '@/hooks';
import React from 'react';
import SafeAreaLayout from './SafeAreaLayout';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({children}) => {
  return isAndroid ? <SafeAreaLayout>{children}</SafeAreaLayout> : <>{children}</>;
};

export default Wrapper;
