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
import { bestStables, horseDate } from "./mock";
import HorseList from "../components/HorseList";

 

const Horses = () => {
  // Header user info
  const userName = "George Mikhaiel";
   const [search, setSearch] = useState("");
  return (
    <AppWrapper>
      <ServiceHeadr userName={userName} />
      <View className="bg-white pt-6  pb-60">
       
          {/* Search */}
          <View className="flex-row px-3 w-full mb-3 justify-between items-center gap-4">

            <SearchInput  value={search} onChange={setSearch} />

            <AppButton
              className="w-12 h-12 bg-brownColor-400 items-center justify-center"
              onPress={() => { }}
              startIcon={<Icons.filter />}
            />
           x
          </View>

          {/* The Best Stable Section */}
          <HorseList horses={horseDate} />
          {/* The Events Section */}
       </View>
    </AppWrapper>
  );
};

export default Horses;