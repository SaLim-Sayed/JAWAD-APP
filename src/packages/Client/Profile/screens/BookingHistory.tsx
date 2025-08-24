import AppHeader from '@/components/UI/AppHeader'
import AppWrapper from '@/components/UI/AppWrapper'
import BookingCard from '@/components/UI/BookingCard'
import { useApiQuery } from '@/hooks'
import { apiKeys } from '@/hooks/apiKeys'
import { navigationEnums } from '@/provider/navigationEnums'
import useGlobalNavigation from '@/provider/useGlobalNavigation'
import React, { useState } from 'react'
import { ActivityIndicator, FlatList, View } from 'react-native'
import { GetBookingsResponse } from '../@types/booking.'
import LoaderBoundary from '@/components/UI/LoaderBoundary'
import { t } from '@/lib'

export default function BookingHistory() {
  const { navigate } = useGlobalNavigation()

  const { data: bookingData, isLoading } = useApiQuery<GetBookingsResponse>({
    url: apiKeys.booking.getBooking,
    key: ["getBooking"],
  });

  const [visibleCount, setVisibleCount] = useState(5)

  const loadMore = () => {
    if (bookingData && visibleCount < bookingData.booking.length) {
      setVisibleCount(prev => prev + 5)
    }
  }

  return (
    <AppWrapper>
      <AppHeader title={t('ProfileMenu.history')} showBackButton />
         <LoaderBoundary isLoading={isLoading}>
          <FlatList
            data={bookingData?.booking.slice(0, visibleCount)}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <BookingCard
                {...item}
                onPress={() => {
                  navigate(navigationEnums.BOOKING_DETAILS, { id: item._id,item:item });
                }}
              />
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}  
            ListFooterComponent={
              <View style={{height: 200 ,paddingBottom: 200}} />
            }
          />
          </LoaderBoundary>
       
     </AppWrapper>
  )
}
