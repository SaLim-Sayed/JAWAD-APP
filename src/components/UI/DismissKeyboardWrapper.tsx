import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { View } from "react-native";

 
  
  export const DismissKeyboardWrapper = ({ children }: { children: React.ReactNode }) => (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
  