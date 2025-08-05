import { images } from "@/assets/images";
import AppWrapper from "@/components/UI/AppWrapper";
import ServiceCard from "@/components/UI/ServiceCard";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { ScrollView, View } from "react-native";
import ServiceHeader from "../components/HomeHeader";
import AppHeader from "@/components/UI/AppHeader";
import { t } from "@/lib";


const ServicesScreen = () => {
  const { navigate } = useGlobalNavigation();
  const services = [
    {
      id: 1,
      title: t("Global.rides"),
      image: images.horseRide,
      onPress: () => {
        navigate(navigationEnums.RIDES)
      },
    },
    {
      id: 2,
      title: t("Global.photo_sessions"),
      image: images.photoSession,
      onPress: () => {
        navigate(navigationEnums.PHOTOS)
      },
    },
  ];
  return (
    <AppWrapper>
      <AppHeader title={t("Global.services")} showBackButton  />
      <View className="bg-white flex-1 pt-4">
        <ScrollView
          contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between",gap: 8, paddingHorizontal: 8, paddingBottom: 32 }}
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