import { cn } from '@/lib';
import React from 'react';
import { View } from 'react-native';
 
type Props = {
  className?: string;
  children: React.ReactNode;
  justify?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  items?: 'start' | 'end' | 'center' | 'between' | 'around' | 'evenly';
  gap?: number;
};

export default function Col({
  className = '',
  children,
  justify = 'start',
  items = 'start',
  gap = 0,
}: Props) {
  const justifyClass = `justify-${justify}`;
  const itemsClass = `items-${items}`;

  const childrenArray = React.Children.toArray(children);
  const spacedChildren = childrenArray.map((child, index) => {
    const isLast = index === childrenArray.length - 1;
    return (
      <View key={index} style={{ marginBottom: isLast ? 0 : gap }}>
        {child}
      </View>
    );
  });

  return (
    <View className={cn('flex w-full  flex-col', justifyClass, itemsClass, className)}>
      {spacedChildren}
    </View>
  );
}
