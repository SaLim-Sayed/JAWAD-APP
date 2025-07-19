import AppWrapper from "@/components/UI/AppWrapper";
import CompleteModal from "@/components/UI/CompleteModal";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import PhotographyCard from "@/components/UI/PhotographyCard";
import SearchInput from "@/components/UI/SearchInput";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { GetPhotographersResponse } from "../../Photo-session/@types/photography.types";
import HorseSection from "../../Services/components/HorseSection";
import BestStableSection from "../components/BestStableSection";
import EventsSection from "../components/EventsSection";
import HomeHeader from "../components/HomeHeader";
import QuoteCard from "../components/QuoteCard";
import { GetStableDetailsResponse } from "../../Services/@types/horse.types";
import { useLanguage } from "@/store";

const HomeScreen = () => {
  const { navigate } = useGlobalNavigation();
const {language}=useLanguage()
  const { authData } = useAuthStore();
  const [search, setSearch] = useState("");

  const [completeModalVisible, setCompleteModalVisible] = useState(authData.isCompleted === false);
  const { data, isLoading } = useApiQuery<GetPhotographersResponse>({
    url: apiKeys.photographer.getPhotograoher,
    key: ["getPhotograoher"],
  });

  const { data: stableData, isLoading: stableLoading } = useApiQuery<GetStableDetailsResponse>({
    url: apiKeys.stable.stableDetail(authData.id),
    key: ["getPhotograoherDetails"],
  });


  const userName = authData.role === "stable" ? stableData?.stable.name[language] : data?.photographers.find((photographer) => photographer._id === authData.id)?.name ;
  const location = authData.role === "stable" ? stableData?.stable.city[language] : data?.photographers.find((photographer) => photographer._id === authData.id)?.city ;

  const showStableSection = ["auth", "photographer"].includes(authData.role);
  const showHorseSection = ["stable"].includes(authData.role);
  const showEventsSection = ["auth", "photographer", "stable"].includes(authData.role);

  return (
    <AppWrapper>
      <HomeHeader userName={userName||""} location={location||""} />
      <View className="bg-white flex-1 rounded-t-3xl -mt-6 pt-6  ">
        <LoaderBoundary isLoading={isLoading}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 220,
              flexGrow: 1,
            }}
          >

             <View className="px-4">
              <SearchInput value={search} onChange={setSearch} />
              <QuoteCard />
            </View>

            {showStableSection && <BestStableSection />}
            {showHorseSection && <HorseSection stableId={authData.id} />}
            {showEventsSection && <EventsSection />}



            <FlatList
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
              ListFooterComponent={<View className="h-44" />}
            />
          </ScrollView>
        </LoaderBoundary>
      </View>
      <CompleteModal visible={completeModalVisible} onClose={() => { setCompleteModalVisible(false) }} />
    </AppWrapper>
  );
};

export default HomeScreen;
