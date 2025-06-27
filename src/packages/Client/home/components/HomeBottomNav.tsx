import React from "react";
import { View, TouchableOpacity } from "react-native";
import Row from "@/components/UI/Row";
import AppText from "@/components/UI/AppText";
import { Icons } from "@/constants";

const HomeBottomNav: React.FC = () => (
  <View className="absolute left-0 right-0 bottom-0 px-6 pb-4 pt-2">
    <Row className="bg-[#F8F8F8] rounded-3xl py-2 px-6 justify-between shadow">
      <TouchableOpacity>
        <Icons.home color="#5E3E2C" width={28} height={28} />
        <AppText className="text-brownColor-400 text-xs mt-1 text-center">Home</AppText>
      </TouchableOpacity>
      <TouchableOpacity>{/* <Icons.headset color="#999" width={28} height={28} /> */}</TouchableOpacity>
      <TouchableOpacity>{/* <Icons.starOutline color="#999" width={28} height={28} /> */}</TouchableOpacity>
      <TouchableOpacity>
        <Icons.profile color="#999" width={28} height={28} />
      </TouchableOpacity>
    </Row>
  </View>
);

export default HomeBottomNav;