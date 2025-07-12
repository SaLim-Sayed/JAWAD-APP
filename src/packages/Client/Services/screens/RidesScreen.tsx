import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppWrapper from "@/components/UI/AppWrapper";
import SearchInput from "@/components/UI/SearchInput";
import { Icons } from "@/constants";
import React, { useState } from "react";
import { View } from "react-native";
import BestStableSection from "../components/BestStableSection";
import { bestStables } from "./mock";

 

const RidesScreen = () => {
  // Header user info
  const userName = "George Mikhaiel";
   const [search, setSearch] = useState("");
  return (
    <AppWrapper>
      <AppHeader title={userName} showBackButton={true} />
      <View className="bg-white flex-1 pt-6  pb-60">
       
          {/* Search */}
          <View className="flex-row px-3 w-full mb-3 justify-between items-center gap-4">

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
       </View>
    </AppWrapper>
  );
};

export default RidesScreen;