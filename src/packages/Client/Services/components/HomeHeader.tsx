import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "@/components/UI/AppText";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import Image from "@/components/UI/Image";
import { images } from "@/assets/images";
import { TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Divider from "@/components/UI/Divider";

interface ServiceHeadrProps {
  userName: string;
  location: string;
}

const ServiceHeadr: React.FC<ServiceHeadrProps> = ({ userName, location }) => (
  <View className="h-28 bg-white flex-col justify-between items-center">
    <AppText className="text-brownColor-400 mt-16" >
      {userName}
    </AppText>
    <Divider/>
  </View>
);


export default ServiceHeadr;