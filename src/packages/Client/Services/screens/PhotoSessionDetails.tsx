import AppButton from "@/components/UI/AppButton";
import AppWrapper from "@/components/UI/AppWrapper";
import Divider from "@/components/UI/Divider";
import useAppRouteParams from "@/provider/useAppRouteParams";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import ServiceHeadr from "../components/HomeHeader";
import PhotoSessionHeader from "../components/PhotoSessionHeader";
import { photoSessionData } from "./mock";
import { useTranslation } from "react-i18next";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { GetPhotographersResponse } from "../../Photo-session/@types/photography.types";
 // Dummy data for best stables/events



const PhotoSessionDetails = () => {
  const { id } = useAppRouteParams("PHOTO_SESSION_DETAILS")
    const { data, isLoading } = useApiQuery<GetPhotographersResponse>({
      url: apiKeys.photographer.getPhotograoher,
      key: ["getPhotograoher"],
    });
  const { t } = useTranslation()
  console.log(data)
  const photographer=data?.photographers.find((photographer)=>photographer._id===id)
  console.log(id)
  // Header user info
  const userName = "George Mikhaiel";
  const location = "Fifth Settlement";
  const [search, setSearch] = useState("");
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



          <AppButton
            title={t("Global.start_now")}
            onPress={() => { }}
            className="my-4"
          />
          <AppButton
            title="Add to cart"
            variant="outline"
            onPress={() => { }}

          />
        </ScrollView>
      </View>
    </AppWrapper>
  );
};

export default PhotoSessionDetails;