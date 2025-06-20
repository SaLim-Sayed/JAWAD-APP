import { cn } from "@/lib/utils";
import React from "react";
import { Pressable, Text, View } from "react-native";

// Generic props with type inference
type TabSwitcherProps<T extends readonly string[]> = {
  tabs: T;
  selectedTab: T[number];
  onTabChange: (tab: T[number]) => void;
};

export function TabSwitcher<T extends readonly string[]>({
  tabs,
  selectedTab,
  onTabChange,
}: TabSwitcherProps<T>) {
  return (
    <View className="flex-row justify-center mb-6 rounded-lg overflow-hidden bg-[#37415c]">
      {tabs.map((tab) => (
        <Pressable
          key={tab}
          className={cn(
            "flex-1 py-4 items-center",
            selectedTab === tab ? "bg-white rounded-lg" : ""
          )}
          onPress={() => onTabChange(tab)}
        >
          <Text
            className={cn(
              "text-base font-semibold",
              selectedTab === tab ? "text-black" : "text-white"
            )}
          >
            {tab.toUpperCase()}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
