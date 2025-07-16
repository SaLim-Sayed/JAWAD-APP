import { images } from "@/assets/images";
import AppWrapper from "@/components/UI/AppWrapper";
import SearchInput from "@/components/UI/SearchInput";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import BestStableSection from "../components/BestStableSection";
import EventsSection from "../components/EventsSection";
import HomeHeader from "../components/HomeHeader";
import QuoteCard from "../components/QuoteCard";
import { useAuthStore } from "@/store/useAuthStore";
import HorseSection from "../../Services/components/HorseSection";
import { FlatList } from "react-native";
import { navigationEnums } from "@/provider/navigationEnums";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { GetPhotographersResponse } from "../../Photo-session/@types/photography.types";
import PhotographyCard from "@/components/UI/PhotographyCard";
import useGlobalNavigation from "@/provider/useGlobalNavigation";


const HomeScreen = () => {
  const { navigate}=useGlobalNavigation()
  const userName = "George Mikhaiel";
  const location = "Fifth Settlement";
  const { token, role } = useAuthStore()
  const {data } = useApiQuery<GetPhotographersResponse>({
    url: apiKeys.photographer.getPhotograoher,
    key:["getPhotograoher"]
  })
  console.log({ role })
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
            {/* Quote Card */}
            <QuoteCard />
          </View>

          {/* The Best Stable Section */}
          {role === "auth"||role === "photographer" && <BestStableSection />}
          {role === "stable"||role === "photographer" && <HorseSection />}

          {/* The Events Section */}
          {role === "auth"||role === "photographer" && <EventsSection />}
          {/* {
            role === "photographer" && <FlatList
              data={data?.photographers}
              style={{ marginTop: 20 }}
              renderItem={({ item }) => <PhotographyCard Photography={item} onStart={() => navigate(navigationEnums.PHOTO_SESSION_DETAILS, { id: item._id })} />}
              keyExtractor={(item) => item._id.toString()}
              ListFooterComponent={<View className="h-44" />}
            />
          } */}
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default HomeScreen;