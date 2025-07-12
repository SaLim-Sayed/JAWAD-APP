import { View, Text, FlatList } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import AppHeader from '@/components/UI/AppHeader'
import { events } from './envent.data'
import EventCard from '@/components/UI/EventCard'
import { navigationEnums } from '@/provider/navigationEnums'
import useGlobalNavigation from '@/provider/useGlobalNavigation'
import { GetEventsResponse } from '../../home/@types/event.type'
import { useApiQuery } from '@/hooks'
import { apiKeys } from '@/hooks/apiKeys'
 
export default function Events() {
    const { navigate } = useGlobalNavigation();
      const { data } = useApiQuery<GetEventsResponse>({
        key: ["getEvent"],
        url: apiKeys.event.getEvent+1,
      })
    return (
    <AppWrapper>
      <AppHeader title={"Event"} showBackButton />
      <FlatList
        data={data?.events}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => <EventCard event={item} onStart={() => navigate(navigationEnums.EVENT_DETAILS, { id: item._id })} />}
        keyExtractor={(item) => item._id.toString()}
        ListFooterComponent={<View className="h-44" />}
      />
    </AppWrapper>
  )
}