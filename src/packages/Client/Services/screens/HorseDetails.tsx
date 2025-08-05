import AppButton from "@/components/UI/AppButton";
import AppLayout from "@/components/UI/AppLayout";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { navigationEnums } from "@/provider/navigationEnums";
import useAppRouteParams from "@/provider/useAppRouteParams";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useHorseStore } from "@/store/useHorseStore";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { GetHorseDetailResponse } from "../@types/horse.types";
import HorseDescription from "../components/HorseDescription";
import HorseDetailsHeader from "../components/HorseDetailsHeader";
import { t } from "i18next";

const HorseDetails = () => {
  const { id } = useAppRouteParams("HORSE_DETAILS");
  const { navigate } = useGlobalNavigation();
  
  // Horse store hooks
  const { 
     setSelectedHorse, 
    storeHorse,
    isHorseInCart, 
    isHorseStored,
    getCartItemsCount 
  } = useHorseStore();

  const { data, isLoading, refetch, isFetching } = useApiQuery<GetHorseDetailResponse>({
    key: ["getHorseDetails", id],
    url: apiKeys.horse.horseDetails + id,
  });

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  );

  const title = data?.horse?.name;
  const horse = data?.horse;

  const handleSelectHorse = () => {
    if (horse) {
      // Add to cart and set as selected
       setSelectedHorse(horse);
      
      // Navigate to booking or cart
      navigate(navigationEnums.EVENT_BOOKING, { id, type: "Photo session" });
    }
  };

  const handleStoreHorse = () => {
    if (horse) {
      // Store horse in the store for later use
      storeHorse(horse);
      setSelectedHorse(horse);
      Alert.alert('Success', 'Horse has been stored successfully!');
    }
  };

  // Check if horse is already in cart or stored
  const isInCart = horse ? isHorseInCart(horse._id, "Photo_session") : false;
  const isStored = horse ? isHorseStored(horse._id) : false;
  const cartCount = getCartItemsCount();
  const {authData}=useAuthStore()
  const isadmin=authData?.role==='stable'||authData?.role==='photographer'

  return (
    <AppLayout title={title} isScrollable={false} showBackButton>
      <View className="bg-white flex-1 h-full">
        <LoaderBoundary isLoading={isLoading || isFetching}>
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 80,
              marginHorizontal: 10,
              flexGrow: 1,
            }}
          >
            {(!isLoading && data) && (
              <>
                <HorseDetailsHeader horse={data?.horse!} />
                <HorseDescription horse={data?.horse!} />
              </>
            )}
          </ScrollView>
        </LoaderBoundary>
        
        <Row gap={4} justify="between" className="mt-4 mb-10">
          <AppButton
            title={ t("Global.select")}
            onPress={handleSelectHorse}
            className="w-[80%]"
            variant="solid"
          />
          <AppButton
            title={isStored ? t("Global.stored") : t("Global.add_to_cart") }
            variant={isStored ? "solid" : "outline"}
            onPress={handleStoreHorse}
            className="w-[80%]"
            endIcon={<Icons.cardTick />}
            disabled={isStored}
          />
        </Row>
        
       
      </View>
    </AppLayout>
  );
};

export default HorseDetails;