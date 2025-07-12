import React from "react";
import { View } from "react-native";
import { Icons } from "@/constants";

export const TabBarIcon = ({ route, focused }: { route: { name: string }, focused: boolean }) => {
  const iconSize = 24;
  let IconComponent;

  switch (route.name) {
    case 'home': IconComponent = Icons.home; break;
    case 'event': IconComponent = Icons.discountShape; break;
    case 'service': IconComponent = Icons.service; break;
    case 'profile': IconComponent = Icons.profile; break;
    default: return null;
  }

  if (focused) {
    return (
      <View
        style={{
          backgroundColor: '#E7E7E7',
          borderRadius: 999,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 30,
        }}
      >
        <View className='border-b-transparent border-[#E7E7E7] border-[35px] border-t-[50px] rounded-[99999px] rounded-b-none flex items-center justify-center'>
          <View className='bg-[#5E3E2C] mb-4 rounded-full flex items-center justify-center h-[50px] p-2 w-[50px]'>
            <IconComponent width={iconSize} height={iconSize} stroke="#fff" color="#fff" />
          </View>
        </View>
      </View>
    );
  }
  return <IconComponent width={iconSize} height={iconSize} color="#fff" />;
};