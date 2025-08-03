import AppWrapper from "@/components/UI/AppWrapper";
import Divider from "@/components/UI/Divider";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import StableCard from "@/components/UI/StableCard";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { navigationEnums } from "@/provider/navigationEnums";
import useAppRouteParams from "@/provider/useAppRouteParams";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { FlatList, ScrollView, View } from "react-native";
import { GetStablesResponse } from "../../home/@types/stable.type";
import { GetPhotographersResponse } from "../../Photo-session/@types/photography.types";
import ServiceHeadr from "../components/HomeHeader";
import PhotoSessionHeader from "../components/PhotoSessionHeader";
import { photoSessionData } from "./mock";

const PhotoSessionDetails = () => {
  const { navigate } = useGlobalNavigation();

  const { id } = useAppRouteParams("PHOTO_SESSION_DETAILS")
    const { data, isLoading } = useApiQuery<GetPhotographersResponse>({
      url: apiKeys.photographer.getPhotograoher,
      key: ["getPhotograoher"],
    });
    const { data:stablesData, isLoading:stableLoading } = useApiQuery<GetStablesResponse>({
      url: apiKeys.photographer.getStables(id),
      key: ["getStables",id],
    });
    const photographer=data?.photographers.find((photographer)=>photographer._id===id)
 
  const title = photoSessionData.find((photoSession) => photoSession.id === id)?.name;
  return (
    <AppWrapper>
      <ServiceHeadr title={title} showBackButton />
      <View className="bg-white  h-full ">
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 220,
            marginHorizontal: 10,
            flexGrow: 1,

          }}
        >
        
          <PhotoSessionHeader photographer={photographer!} />
          <Divider containerStyle={{ height: 2 }} className="h-[3px]" />

          <LoaderBoundary isLoading={stableLoading}>
                <FlatList
                    numColumns={2}
                    data={stablesData?.stables}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item._id.toString()}
                    columnWrapperStyle={{ gap: 6 }}
                    contentContainerStyle={{
                        alignItems: "center", gap: 20, paddingBottom: 220,
                    }}
                    renderItem={({ item }) => (
                        <StableCard
                        id={item._id}
                            image={item.picUrl}
                            name={item.name}
                            type={item.region}
                            rating={item.totalRating}
                            onPressStart={() => { navigate(navigationEnums.STABLE_SERVICES_DETAILS, { id: item._id }) }}
                        />
                    )}
                />
            </LoaderBoundary>
 
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default PhotoSessionDetails;