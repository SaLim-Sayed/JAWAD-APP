import { View, Text, FlatList } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import AppHeader from '@/components/UI/AppHeader'
import { events } from './envent.data'
import EventCard from '@/components/UI/EventCard'
import { navigationEnums } from '@/provider/navigationEnums'
import useGlobalNavigation from '@/provider/useGlobalNavigation'
 
export default function Events() {
    const { navigate } = useGlobalNavigation();
    return (
    <AppWrapper>
      <AppHeader title={"Event"} showBackButton />
      <FlatList
        data={events}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => <EventCard event={item} onStart={() => navigate(navigationEnums.EVENT_DETAILS, { id: item.id })} />}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={<View className="h-44" />}
      />
    </AppWrapper>
  )
}