import { images } from "@/assets/images";
import AppWrapper from "@/components/UI/AppWrapper";
import SearchInput from "@/components/UI/SearchInput";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import BestStableSection from "../components/BestStableSection";
import ServiceHeadr from "../components/HomeHeader";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import AppButton from "@/components/UI/AppButton";

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
  {
    id: 2,
    image: images.villarreal,
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
  }, {
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

const Services = () => {
  // Header user info
  const userName = "George Mikhaiel";
  const location = "Fifth Settlement";
  const [search, setSearch] = useState("");
  return (
    <AppWrapper>
      <ServiceHeadr userName={userName} location={location} />
      <View className="bg-white pt-6  pb-60">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 220,
            marginHorizontal: 10,
            flexGrow: 1,

          }}
        >
          {/* Search */}
          <View className="flex-row w-full mb-3 justify-between items-center gap-4">

            <SearchInput  value={search} onChange={setSearch} />

            <AppButton
              className="w-12 h-12 bg-brownColor-400 items-center justify-center"
              onPress={() => { }}
              startIcon={<Icons.filter />}
            />
            <AppButton
              className="w-12 h-12 bg-brownColor-400 items-center justify-center"
              onPress={() => { }}
              startIcon={<Icons.locationTick />}
            />
          </View>

          {/* The Best Stable Section */}
          <BestStableSection bestStables={bestStables} />
          {/* The Events Section */}
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default Services;