import { StatusBar, View } from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const SafeAreaLayout = ({ children }: { children: React.ReactNode }) => {
 
  return (
    <SafeAreaView
      style={{ flex: 1 }}
      edges={["left",  "right",  ]}
     >
            <StatusBar barStyle="light-content" hidden={true} backgroundColor="transparent" />
        {children} 
    </SafeAreaView>
  );
};

export default SafeAreaLayout;
