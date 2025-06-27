import React from "react";
import { View, ScrollView, TextInput } from "react-native";
import HomeHeader from "../components/HomeHeader";
import QuoteCard from "../components/QuoteCard";
import BestStableSection from "../components/BestStableSection";
import EventsSection from "../components/EventsSection";
import { images } from "@/assets/images";
import AppText from "@/components/UI/AppText";
import HomeBottomNav from "../components/HomeBottomNav";
import { Input } from "@/components";
import { Icons } from "@/constants";
import { useForm } from "react-hook-form";
import AppWrapper from "@/components/UI/AppWrapper";

// Dummy data for best stables/events
const bestStables = [
  {
    id: 1,
    image: images.pyramids,
    name: "Pyramids (Saqqara)",
    type: "Fantasy Stable",
    rating: 3.2,
  },
  {
    id: 2,
    image: images.villarreal,
    name: "Pyramids (Saqqara)",
    type: "Fantasy Stable",
    rating: 3.2,
  },
];

const events = [
  {
    id: 1,
    image: images.family,
    name: "Pyramids (Saqqara)",
    date: "15 JUN. 2024",
    price: "250 $",
  },
];

const HomeScreen = () => {
  // Header user info
  const userName = "George Mikhaiel";
  const location = "Fifth Settlement";
  const control = useForm();

  return (
    <AppWrapper>
      <HomeHeader userName={userName} location={location} />
      <View className="bg-white rounded-t-3xl -mt-6 pt-6 pb-60">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 220,
            flexGrow: 1,

          }}
        >
          {/* Search */}
          <View className="bg-white rounded-2xl border border-brownColor-300   flex-row items-center mx-6  px-4 h-11 shadow mb-3  justify-center">
            <Icons.search color="#999" width={20} height={20} />
            <TextInput
              style={{ color: "#684735", fontSize: 16, paddingHorizontal: 8 }}
              placeholder="Search"
              placeholderTextColor={"#684735"}
              className="w-full py-2"
              onChangeText={(text) => { }}
            />
          </View>
          {/* Quote Card */}
          <QuoteCard />
          {/* The Best Stable Section */}
          <BestStableSection bestStables={bestStables} />
          {/* The Events Section */}
          <EventsSection events={events} />
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default HomeScreen;