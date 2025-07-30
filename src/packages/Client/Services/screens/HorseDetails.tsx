import AppButton from "@/components/UI/AppButton";
import AppLayout from "@/components/UI/AppLayout";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import useAppRouteParams from "@/provider/useAppRouteParams";
import React from "react";
import { ActivityIndicator, ScrollView, View, Text, Alert } from "react-native";
import { GetHorseDetailResponse } from "../@types/horse.types";
import ServiceHeadr from "../components/HomeHeader";
import HorseDescription from "../components/HorseDescription";
import HorseDetailsHeader from "../components/HorseDetailsHeader";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import { useFocusEffect } from "@react-navigation/native";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { navigationEnums } from "@/provider/navigationEnums";
import { useHorseStore } from "@/store/useHorseStore";

const HorseDetails = () => {
  const { id } = useAppRouteParams("HORSE_DETAILS");
  const { navigate } = useGlobalNavigation();
  
  // Horse store hooks
  const { 
    addToCart, 
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
      addToCart(horse, "Photo_session");
      setSelectedHorse(horse);
      
      // Navigate to booking or cart
      navigate(navigationEnums.EVENT_BOOKING, { id, type: "Photo_session" });
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
            title={isInCart ? "Added to Cart" : "Select"}
            onPress={handleSelectHorse}
            className="w-[90%]"
            variant={isInCart ? "solid" : "outline"}
          />
          <AppButton
            title={isStored ? "Stored" : "Store"}
            variant="outline"
            onPress={handleStoreHorse}
            className="w-[80%]"
            endIcon={<Icons.cardTick />}
            disabled={isStored}
          />
        </Row>
        
        {/* Optional: Show cart badge if items exist */}
        {cartCount > 0 && (
          <View className="absolute top-4 right-4 bg-red-500 rounded-full w-6 h-6 items-center justify-center">
            <Text className="text-white text-xs font-bold">{cartCount}</Text>
          </View>
        )}
      </View>
    </AppLayout>
  );
};

export default HorseDetails;