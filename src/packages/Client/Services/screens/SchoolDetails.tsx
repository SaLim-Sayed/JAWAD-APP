import React, { useState } from "react";
import { FlatList, ScrollView, View, TouchableOpacity } from "react-native";
import AppHeader from "@/components/UI/AppHeader";
import AppText from "@/components/UI/AppText";
import AppWrapper from "@/components/UI/AppWrapper";
import Divider from "@/components/UI/Divider";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { t } from "@/lib";
import { navigationEnums } from "@/provider/navigationEnums";
import useAppRouteParams from "@/provider/useAppRouteParams";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import SchoolHeader from "../components/SchoolHeader";
import SchoolDescription from "../components/SchoolDescription";
import LocationCard from "@/components/UI/MapCard";
import AppButton from "@/components/UI/AppButton";
import { GetSchoolDetailsResponse } from "../../home/@types/school.types";
import { GetStablesResponse } from "../../home/@types/stable.type";
import { showGlobalToast } from "@/hooks/useGlobalToast";
import { useAuthStore } from "@/store/useAuthStore";

const SchoolDetails = () => {
  const { navigate } = useGlobalNavigation();
  const { id } = useAppRouteParams("SCHOOL_DETAILS");
const {authData} = useAuthStore()
  const { data, isLoading } = useApiQuery<GetSchoolDetailsResponse>({
    url: apiKeys.school.getSchoolDetail(id),
    key: ["getSchool", id],
  });

 

  // 🆕 State for selected price
  const [selectedPrice, setSelectedPrice] = useState<any>(null);

  const handleSelectHorse = () => {
    if (!selectedPrice) {
      showGlobalToast({ type: "error", title: "Error", body: t("horse.please_select") });
      return;
    }

    // Pass selected price as param
    navigate(navigationEnums.EVENT_BOOKING, {
      id,
      type: "Training",
      // @ts-ignore
      price: selectedPrice.cost, 
    });
  };

  return (
    <AppWrapper>
      <AppHeader title={data?.school?.name} showBackButton />
      <View className="bg-white h-full">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 220,
            marginHorizontal: 10,
            flexGrow: 1,
          }}
        >
          {/* @ts-ignore */}
          <SchoolHeader school={data?.school!} />

          <LoaderBoundary isLoading={isLoading}>
            <Divider containerStyle={{ height: 2 }} className="h-[3px] my-4" />

            {/* @ts-ignore */}
            <SchoolDescription school={data?.school!} />

            <LocationCard
              city={data?.school?.city!}
              region={data?.school?.region!}
              address={data?.school?.address!}
              mapUrl={data?.school?.location!}
            />

            <View>
              <AppText className="text-brownColor-300 tajawal-semibold-16">
                {t("horse.price")}
              </AppText>
              <FlatList
                // @ts-ignore
                data={data?.school?.price!}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  const isSelected = selectedPrice?.name === item.name;
                  return (
                    <TouchableOpacity
                      onPress={() => setSelectedPrice(item)}
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: isSelected ? "#8B4513" : "#ccc",
                        borderRadius: 8,
                        marginVertical: 5,
                      }}
                    >
                      <AppText
                        className={
                          isSelected
                            ? "text-brownColor-300 tajawal-semibold-16"
                            : "text-brownColor-100 tajawal-light-16"
                        }
                      >
                        {item.name}
                      </AppText>
                      <AppText
                        className={
                          isSelected
                            ? "text-brownColor-300 tajawal-semibold-16"
                            : "text-brownColor-100 tajawal-light-16"
                        }
                      >
                        {item.cost}
                      </AppText>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
          </LoaderBoundary>

         { authData?.role === "auth" && <AppButton
            title={t("Global.select")}
            onPress={handleSelectHorse}
            className="w-[98%]"
            variant="solid"
          />}
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default SchoolDetails;
