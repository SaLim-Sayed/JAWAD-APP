import AppText from "@/components/UI/AppText";
import Divider from "@/components/UI/Divider";
import React from "react";
import { View } from "react-native";

interface ServiceHeadrProps {
  title?: string;
  userName?: string;
 }

const ServiceHeadr: React.FC<ServiceHeadrProps> = ({ title, userName }) => (
  <View className="h-28 bg-white flex-col justify-between items-center">
  {  title && <AppText className="text-brownColor-400 mt-16" >
      {title}
    </AppText>}
   { userName && <AppText className="text-brownColor-400 mt-16" >
      {userName}
    </AppText>}
    <Divider/>
  </View>
);


export default ServiceHeadr;