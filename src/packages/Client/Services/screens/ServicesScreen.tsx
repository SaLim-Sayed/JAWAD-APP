import React from "react";
import { View, Text, ScrollView } from "react-native";
import AppWrapper from "@/components/UI/AppWrapper";
import ServiceCard from "@/components/UI/ServiceCard";
import { images } from "@/assets/images";
import ServiceHeader from "../components/HomeHeader"; 
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";


const ServicesScreen = () => {
  const { navigate } = useGlobalNavigation();
  const services = [
    {
      id: 1,
      title: "Rids",
      image: images.horseRide,
      onPress: () => {
        navigate(navigationEnums.RIDES)
      },
    },
    {
      id: 2,
      title: "Photo session",
      image: images.photoSession,
      onPress: () => {
        navigate(navigationEnums.PHOTOS)
      },
    },
  ];
  return (
    <AppWrapper>
      <ServiceHeader title={"Services"} />
      <View className="bg-white flex-1 pt-4">
        <ScrollView
          contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", paddingHorizontal: 8, paddingBottom: 32 }}
          showsVerticalScrollIndicator={false}
        >
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              image={service.image}
              onPress={() => {
                service.onPress();
              }}
            />
          ))}
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default ServicesScreen;