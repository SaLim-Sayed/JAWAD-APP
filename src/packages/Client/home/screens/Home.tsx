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
import { GetPhotographersResponse, GetPhotographerOwnDataResponse } from "../../Photo-session/@types/photography.types";
import { GetStableDetailsResponse } from "../../Services/@types/horse.types";
import HorseSection from "../../Services/components/HorseSection";
import BestStableSection from "../components/BestStableSection";
import EventsSection from "../components/EventsSection";
import HomeHeader from "../components/HomeHeader";
import QuoteCard from "../components/QuoteCard";
import PhotographerDashboard from "../components/PhotographerDashboard";
import SchoolDashboard from "../components/SchoolDashboard";
import { GetSchoolDetailsResponse } from "../@types/stable.type";
import AppText from "@/components/UI/AppText";
import { t } from "i18next";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = () => {
  const { navigate } = useGlobalNavigation();
  const { language } = useLanguage()
  const { authData } = useAuthStore();
  console.log({ authData })
  const [search, setSearch] = useState("");

  const isStable = authData.role === "stable";
  const isPhotographer = authData.role === "photographer";
  const isAuth = authData.role === "auth";
  const isSchool = authData.role === "school";

  // Fetch photographer list (for non-photographer users or when photographer views others)
  const { data, isLoading, refetch } = useApiQuery<GetPhotographersResponse>({
    url: apiKeys.photographer.getPhotograoher,
    key: ["getPhotograoher"],
    enabled: !isPhotographer, // Only fetch when not a photographer
  });


  // Fetch photographer's own data when logged in as photographer
  const { data: photographerOwnData, isLoading: photographerOwnLoading, refetch: photographerOwnRefetch } = useApiQuery<GetPhotographerOwnDataResponse | GetPhotographersResponse>({
    url: apiKeys.photographer.getPhotograoher,
    key: ["getPhotographerOwnData", authData.id],
    enabled: isPhotographer && !!authData.id,
  });
  useFocusEffect(
    React.useCallback(() => {
      refetch();
      photographerOwnRefetch();
    }, []),
  );

  console.log('photographerOwnData', data);


  const { data: userDetails, isLoading: userDetailsLoading } = useApiQuery({
    url: apiKeys.auth.getUserDetails,
    key: ["getUserDetails"],
    enabled: isAuth,
  });

  const { data: stableData, isLoading: stableLoading } = useApiQuery<GetStableDetailsResponse>({
    url: apiKeys.stable.stableDetail(authData.id),
    key: ["getStableDetails", authData.id],
    enabled: isStable && !!authData.id,
  });

  const { data: schoolData, isLoading: schoolLoading } = useApiQuery<GetSchoolDetailsResponse>({
    url: apiKeys.school.getSchoolDetail(authData.id),
    key: ["getSchool", authData.id],
    enabled: isSchool && !!authData.id,
  });
  console.log({ schoolData })

  // Get photographer name and location from own data
  let photographerName: string | undefined;
  let photographerCity: string | undefined;

  if (isPhotographer && photographerOwnData) {
    if ('photographer' in photographerOwnData) {
      photographerName = photographerOwnData.photographer?.name;
      photographerCity = photographerOwnData.photographer?.city;
    } else if ('_id' in photographerOwnData) {
      photographerName = photographerOwnData.name;
      photographerCity = photographerOwnData.city;
    } else if ('photographers' in photographerOwnData) {
      const found = photographerOwnData.photographers?.find((p) => p._id === authData.id);
      photographerName = found?.name;
      photographerCity = found?.city;
    }
  }

  // Get user name and location based on role
  const userName = isStable
    ? stableData?.stable.name[language]
    : isPhotographer
      ? photographerName || data?.photographers.find((photographer) => photographer._id === authData.id)?.name || "Guest"
      : isAuth
        ? userDetails?.details?.name
        : isSchool
          ? schoolData?.school.name
          : "Guest";

  const location = isStable
    ? stableData?.stable.city[language]
    : isPhotographer
      ? photographerCity || data?.photographers.find((photographer) => photographer._id === authData.id)?.city || t("Global.Egypt")
      : isAuth
        ? userDetails?.details?.city || t("Global.Egypt")
        : isSchool
          ? schoolData?.school.city
          : t("Global.Egypt");

  const showStableSection = ["auth", "photographer", "school"].includes(authData.role);
  const showHorseSection = ["stable"].includes(authData.role);
  const showEventsSection = ["auth", "photographer", "stable", "school"].includes(authData.role);

  const loading = stableLoading || userDetailsLoading || isLoading || (isPhotographer && photographerOwnLoading) || (isSchool && schoolLoading);
  // If photographer, show their dashboard
  if (isPhotographer) {
    return (
      <AppWrapper>
        <HomeHeader userName={userName || ""} location={location || ""} />
        <View className="bg-white flex-1 rounded-t-3xl -mt-10  ">
          <LoaderBoundary isLoading={loading}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <QuoteCard />

              <PhotographerDashboard photographerId={authData.id} />
            </ScrollView>
          </LoaderBoundary>
        </View>
      </AppWrapper>
    );
  }

  // If school, show their dashboard
  if (isSchool) {
    return (
      <AppWrapper>
        <HomeHeader userName={userName || ""} location={location || ""} />
        <View className="bg-white flex-1 rounded-t-3xl -mt-10  ">
          <LoaderBoundary isLoading={loading}>
            <ScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <QuoteCard />

              <SchoolDashboard schoolId={authData.id} />
            </ScrollView>
          </LoaderBoundary>
        </View>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
      <HomeHeader userName={userName || ""} location={location || ""} />
      <View className="bg-white flex-1 rounded-t-3xl -mt-10  ">
        <LoaderBoundary isLoading={loading}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
            }}
          >
            <QuoteCard />

            {showStableSection && <BestStableSection onSeeAll={() => navigate(navigationEnums.RIDES)} />}
            {showHorseSection && <HorseSection stableId={authData.id} />}
            {showEventsSection && <EventsSection />}

            <FlatList
              ListHeaderComponent={<View className="px-4 flex-row justify-between items-center">
                <AppText className="text-brownColor-400 p-2 font-bold tajawal-semibold-20">{t("Global.photographer")}</AppText>
                <TouchableOpacity onPress={() => navigate(navigationEnums.PHOTOS)}>
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
