import AppText from "@/components/UI/AppText";
import useAppRouteParams from "@/provider/useAppRouteParams";
import React from "react";
import { View } from "react-native";

// Dummy data for best stables/events



const StableDescription = () => {
  const { id } = useAppRouteParams("STABLE_SERVICES_DETAILS")
  console.log(id)
 
  return (
    <View className="my-3 ">
       <AppText className="text-brownColor-300 text-center tajawal-16  ">
       Lorem ipsum dolor sit amet consectetur. Sagittis consectetur sed lacus sem sed duis. Nisi imperdiet orci auctor amet lorem libero eu egestas. Non varius ut libero ullamcorper et enim faucibus nec vitae. Auctor sed 
       </AppText>
    </View>
  );
};

export default StableDescription;