import { Pressable } from "react-native";
import { TabBarIcon } from "./TabBarIcon";

export const tabScreenOptions = ({ route }: any) => ({
  headerShown: false,
  tabBarShowLabel: true,
  tabBarButton: (props: any) => (
    // @ts-ignore
    <Pressable android_ripple={{ color: 'transparent' }} {...props} />
  ),
  tabBarLabelStyle: { fontSize: 14 },
  tabBarIcon: ({ focused }: { focused: boolean }) => TabBarIcon({ route, focused }),
  tabBarActiveTintColor: '#5E3E2C',
  tabBarPressColor: 'transparent',
  headerPressColor: "transparent",
  tabBarInactiveTintColor: '#999',
  tabBarStyle: {
    height: 100,
    borderRadius: 16,
    position: 'absolute',
    paddingHorizontal: 12,
    bottom: 20,
    backgroundColor: '#E7E7E7',
  },
});