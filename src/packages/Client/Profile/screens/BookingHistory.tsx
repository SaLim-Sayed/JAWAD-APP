import { images } from '@/assets/images'
import AppHeader from '@/components/UI/AppHeader'
import AppWrapper from '@/components/UI/AppWrapper'
import React from 'react'
import { ContactUs } from '../components/ContactUs'
import { FlatList, View } from 'react-native'
import BookingCard from '@/components/UI/BookingCard'
 import useGlobalNavigation from '@/provider/useGlobalNavigation'
import { navigationEnums } from '@/provider/navigationEnums'
import { useApiQuery } from '@/hooks'
import { apiKeys } from '@/hooks/apiKeys'
 
export default function BookingHistory() {
  const horse1 = images.horseImg; // replace with your horse asset
  const horse2 = images.horseImg;
  const horse3 = images.horseImg;
    // const { data, isLoading } = useApiQuery({
    //     url: apiKeys.booking.getBooking,
    //     key: ["getBooking"],
    //   });
const { navigate } = useGlobalNavigation()
  const bookingData = [
    {
      horseImage: images.horseImg,
      location: "Pyramids (Saqqara)",
      date: "15 JUN. 2024",
      price: "250 $",
      time: "12:12",
      highlightTime: true,
    },
    {
      horseImage: images.horseImg,
      location: "Pyramids (Saqqara)",
      date: "15 JUN. 2024",
      price: "250 $",
    },
    {
      horseImage: images.horseImg,
      location: "Pyramids (Saqqara)",
      date: "15 JUN. 2024",
      price: "250 $",
    },
  ];
  return (
    <AppWrapper >
      <AppHeader title="Booking History" showBackButton />
      <View style={{ paddingHorizontal: 20, paddingTop: 12 }}>
        <FlatList
          data={bookingData}
          renderItem={({ item, index }) => (
            <BookingCard key={index} {...item} onPress={()=>{navigate(navigationEnums.BOOKING_DETAILS, { id: 1 })}}  />
          )}
        />
      </View>    
    </AppWrapper>
  )
}