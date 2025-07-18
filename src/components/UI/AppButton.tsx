import { cn } from '@/lib';
import React from 'react';
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native';
import Image from './Image';

interface AppButtonProps extends TouchableOpacityProps {
  title?: string;
  loading?: boolean;
  className?: string;
  textClassName?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: 'solid' | 'outline'; // ✅ New prop
}

export default function AppButton({
  title,
  onPress,
  disabled,
  loading = false,
  className = '',
  textClassName = '',
  startIcon,
  endIcon,
  variant = 'solid', // ✅ default is solid
  ...props
}: AppButtonProps) {
  const isDisabled = disabled || loading;

  const isOutline = variant === 'outline';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={cn(
        'rounded-xl m-2 py-4 w-[95%] h-[52px] flex-row justify-center items-center',
        isOutline
          ? 'bg-transparent border border-brownColor-400'
          : isDisabled
            ? 'bg-brownColor-50'
            : 'bg-brownColor-400',
        className
      )}
      {...props}
    >
      <View className="flex-row items-center gap-2">
        {startIcon && <Image source={startIcon} className="w-6 h-6" />}

        {title && (
          <Text
            className={cn(
              'text-center font-bold',
              isOutline
                ? 'text-brownColor-400'
                : isDisabled
                  ? 'text-brownColor-200'
                  : 'text-white',
              textClassName
            )}
          >
            {title}
          </Text>
        )}

        {loading && <ActivityIndicator className="ml-1" />}

        {endIcon && <Image source={endIcon} className="w-6 h-6" />}
      </View>
    </TouchableOpacity>
  );
}
