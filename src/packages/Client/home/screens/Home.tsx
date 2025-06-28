import React, { useState } from "react";
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
import SearchInput from "@/components/UI/SearchInput";

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
  const [search, setSearch] = useState("");
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
          <View className="px-4">
            <SearchInput value={search} onChange={setSearch} />
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