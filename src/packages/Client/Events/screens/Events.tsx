import AppHeader from '@/components/UI/AppHeader'
import AppWrapper from '@/components/UI/AppWrapper'
import EventCard from '@/components/UI/EventCard'
import { useApiQuery } from '@/hooks'
import { apiKeys } from '@/hooks/apiKeys'
import { t } from '@/lib'
import { navigationEnums } from '@/provider/navigationEnums'
import useGlobalNavigation from '@/provider/useGlobalNavigation'
import React from 'react'
import { FlatList, View } from 'react-native'
import { GetEventsResponse } from '../../home/@types/event.type'
 
export default function Events() {
    const { navigate } = useGlobalNavigation();
      const { data } = useApiQuery<GetEventsResponse>({
        key: ["getEvent"],
        url: apiKeys.event.getEvent+1,
      })
    return (
    <AppWrapper>
      <AppHeader title={t('Global.events')} showBackButton />
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