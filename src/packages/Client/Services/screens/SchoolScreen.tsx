import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppText from "@/components/UI/AppText";
import AppWrapper from "@/components/UI/AppWrapper";
import FilterModal from "@/components/UI/FilterModal";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import SearchInput from "@/components/UI/SearchInput";
import { Icons } from "@/constants";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { t } from "@/lib";
import React, { useState } from "react";
import { View } from "react-native";
import { SchoolsResponse } from "../../home/@types/school.types";
import SchoolList from "../components/SchoolList";

const SchoolScreen = () => {
  const [search, setSearch] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({

    city: [],
  });

  const queryParams = new URLSearchParams({
    search,

    ...(filters.city.length && { city: filters.city.join(",") }),
    });

  const { data, isLoading } = useApiQuery<SchoolsResponse>({
    url: `${apiKeys.school.getSchool}?${queryParams.toString()}`,
    key: ["getSchool", search, filters],
  });
  // Header user info
  return (
    <AppWrapper>
      <AppHeader title={t("Global.schools")} showBackButton />
      <View className="bg-white pt-6  flex-1 pb-6">

        {/* Search */}
        <View className="flex-row px-3 w-full mb-3 justify-between items-center gap-4">

          <SearchInput value={search} onChange={setSearch} />

          <AppButton
            className="w-12 h-12 bg-brownColor-400 items-center justify-center"
            onPress={() => setShowFilterModal(true)}
            startIcon={<Icons.filter />}
          />

        </View>

        <LoaderBoundary isLoading={isLoading}>
          {data?.schools ? (
            <SchoolList
              schools={data?.schools!} />
          ) : (
            <View className="flex-1 items-center justify-center">
              <AppText className="text-brownColor-400 text-2xl">{t("Global.no_data")}</AppText>
            </View>
          )}
        </LoaderBoundary>
        <FilterModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApply={(selectedFilters: any) => {
            setFilters({ city: selectedFilters.city || [] });
            setShowFilterModal(false);
          }}
          currentFilters={filters}
          allowedFilters={["city"]}
        />
      </View>
    </AppWrapper>
  );
};

export default SchoolScreen;