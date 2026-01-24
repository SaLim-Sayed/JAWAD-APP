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
  variant = 'solid',
  ...props
}: AppButtonProps) {
  const isDisabled = disabled || loading;
  const isOutline = variant === 'outline';
  const [isPressed, setIsPressed] = React.useState(false);

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      activeOpacity={0.9}
      disabled={isDisabled}
      className={cn(
        'rounded-2xl m-2 py-4 w-[95%] h-[56px] flex-row justify-center items-center',
        'shadow-sm', // Add shadow for depth
        isPressed && 'scale-[0.98]', // Scale effect
        isOutline
          ? 'bg-brownColor-50 border border-brownColor-400'
          : isDisabled
            ? 'bg-brownColor-50'
            : 'bg-brownColor-400',
        className
      )}
      style={!isOutline && !isDisabled ? {
        shadowColor: "#684735",
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
      } : {}}
      {...props}
    >
      <View className="flex-row items-center gap-3">
        {startIcon && <Image source={startIcon} className="w-6 h-6" />}

        {title && (
          <Text
            className={cn(
              'text-center font-bold text-lg',
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

        {loading && <ActivityIndicator color={isOutline ? "#684735" : "#fff"} className="ml-2" />}

        {endIcon && <Image source={endIcon} className="w-6 h-6" />}
      </View>
    </TouchableOpacity>
  );
}
