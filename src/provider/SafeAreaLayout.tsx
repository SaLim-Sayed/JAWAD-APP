import { StatusBar, View } from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const SafeAreaLayout = ({ children }: { children: React.ReactNode }) => {
 
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["left", "right", "top"]}
     >
            <StatusBar barStyle="light-content" hidden={false} backgroundColor="#5E3E2C" />
        <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  );
};

export default SafeAreaLayout;
