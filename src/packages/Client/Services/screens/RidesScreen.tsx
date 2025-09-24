import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppWrapper from "@/components/UI/AppWrapper";
import SearchInput from "@/components/UI/SearchInput";
import { Icons } from "@/constants";
import React, { useState } from "react";
import { View } from "react-native";
import BestStableSection from "../components/BestStableSection";
import FilterModal from "@/components/UI/FilterModal";
import { t } from "@/lib";




const RidesScreen = () => {
   const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({
    level: [],
    vehicles: [],
    feature: [],
    color: [],
    rating: 0,
    city: [], 
  });

  return (
    <AppWrapper>
      <AppHeader title={t("Global.stables")} showBackButton={true} />
      <View className="bg-white flex-1 pt-6 pb-6">
        <View className="flex-row px-3 w-full mb-3 justify-between items-center gap-4">
          <SearchInput value={search} onChange={setSearch} />
          <AppButton
            className="w-12 h-12 bg-brownColor-400 items-center justify-center"
            onPress={() => setShowFilterModal(true)}
            startIcon={<Icons.filter />}
          />
        </View>

        <BestStableSection search={search} filters={filters} />
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApply={(selectedFilters: any) => {
            setFilters(selectedFilters);
            setShowFilterModal(false);
          }}
          currentFilters={filters}
        />
      </View>
    </AppWrapper>
  );
};

export default RidesScreen;
