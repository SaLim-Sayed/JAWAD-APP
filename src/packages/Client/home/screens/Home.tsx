import AppWrapper from "@/components/UI/AppWrapper";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import PhotographyCard from "@/components/UI/PhotographyCard";
import SearchInput from "@/components/UI/SearchInput";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useLanguage } from "@/store";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useState } from "react";
import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { GetPhotographersResponse } from "../../Photo-session/@types/photography.types";
import { GetStableDetailsResponse } from "../../Services/@types/horse.types";
import HorseSection from "../../Services/components/HorseSection";
import BestStableSection from "../components/BestStableSection";
import EventsSection from "../components/EventsSection";
import HomeHeader from "../components/HomeHeader";
import QuoteCard from "../components/QuoteCard";
import { GetSchoolDetailsResponse } from "../@types/stable.type";
import AppText from "@/components/UI/AppText";
import { t } from "i18next";

const HomeScreen = () => {
  const { navigate } = useGlobalNavigation();
  const { language } = useLanguage()
  const { authData } = useAuthStore();
  const [search, setSearch] = useState("");

  const { data, isLoading } = useApiQuery<GetPhotographersResponse>({
    url: apiKeys.photographer.getPhotograoher,
    key: ["getPhotograoher"],
  });


  const { data: userDetails, isLoading: userDetailsLoading } = useApiQuery({
    url: apiKeys.auth.getUserDetails,
    key: ["getUserDetails"],
  });

  const { data: stableData, isLoading: stableLoading } = useApiQuery<GetStableDetailsResponse>({
    url: apiKeys.stable.stableDetail(authData.id),
    key: ["getPhotograoherDetails"],
  });

  const { data: schoolData, isLoading: schoolLoading } = useApiQuery<GetSchoolDetailsResponse>({
    url: apiKeys.school.getSchoolDetail(authData.id),
    key: ["getSchool"],
  });
  console.log({ schoolData })

  const isStable = authData.role === "stable";
  const isPhotographer = authData.role === "photographer";
  const isAuth = authData.role === "auth";
  const isSchool = authData.role === "school";

  const userName = isStable ? stableData?.stable.name[language] : isPhotographer ? data?.photographers.find((photographer) => photographer._id === authData.id)?.name : isAuth ? userDetails?.details?.name : isSchool ? schoolData?.school.name : "Guest";
  const location = isStable ? stableData?.stable.city[language] : isPhotographer ? data?.photographers.find((photographer) => photographer._id === authData.id)?.city : isAuth ? userDetails?.details?.city || "Cairo" : isSchool ? schoolData?.school.city : "Cairo";

  const showStableSection = ["auth", "photographer", "school"].includes(authData.role);
  const showHorseSection = ["stable"].includes(authData.role);
  const showEventsSection = ["auth", "photographer", "stable", "school"].includes(authData.role);

  const loading = stableLoading || userDetailsLoading || isLoading;
  return (
    <AppWrapper>
      <HomeHeader userName={userName || ""} location={location || ""} />
      <View className="bg-white flex-1 rounded-t-3xl -mt-6 pt-6  ">
        <LoaderBoundary isLoading={loading}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >

            {/* <View className="px-4">
              <SearchInput value={search} onChange={setSearch} />
              <QuoteCard />
            </View> */}

            {showStableSection && <BestStableSection onSeeAll={() => navigate(navigationEnums.RIDES)} />}
            {showHorseSection && <HorseSection stableId={authData.id} />}
            {showEventsSection && <EventsSection />}

            <FlatList
              ListHeaderComponent={<View className="px-4 flex-row justify-between items-center">
                <AppText className="text-brownColor-400 p-2 font-bold tajawal-semibold-20">{t("Global.photographer")}</AppText>
                <TouchableOpacity onPress={()=>navigate(navigationEnums.PHOTOS)}>
                  <AppText className="text-brownColor-300 text-sm">{t("Global.see_all")}</AppText>
                </TouchableOpacity>
              </View>}
              data={data?.photographers}
              style={{ marginTop: 20 }}
              renderItem={({ item }) => (
                <PhotographyCard
                  Photography={item}
                  onStart={() =>
                    navigate(navigationEnums.PHOTO_SESSION_DETAILS, {
                      id: item._id,
                    })
                  }
                />
              )}
              keyExtractor={(item) => item._id.toString()}
              ListFooterComponent={<View className="h-24" />}
            />
          </ScrollView>
        </LoaderBoundary>
      </View>
    </AppWrapper>
  );
};

export default HomeScreen;
