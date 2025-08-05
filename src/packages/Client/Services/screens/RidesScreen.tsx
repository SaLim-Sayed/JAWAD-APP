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
   const userName = "All Stable";
   const [search, setSearch] = useState("");
  return (
    <AppWrapper>
      <AppHeader title={userName} showBackButton={true} />
      <View className="bg-white flex-1 pt-6  pb-6">
          <View className="flex-row px-3 w-full mb-3 justify-between items-center gap-4">
            <SearchInput  value={search} onChange={setSearch} />
            <AppButton
              className="w-12 h-12 bg-brownColor-400 items-center justify-center"
              onPress={() => { }}
              startIcon={<Icons.filter />}
            />
            
          </View>

          <BestStableSection search={search} />
       </View>
    </AppWrapper>
  );
};

export default RidesScreen;