import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import useGlobalNavigation from '@/provider/useGlobalNavigation'
import AppButton from '@/components/UI/AppButton'
import { t } from '@/lib'
import AppLayout from '@/components/UI/AppLayout'
import { navigationEnums } from '@/provider/navigationEnums'

export default function AddScreen() {
    const {navigate}=useGlobalNavigation()
  return (
    <AppLayout isScrollable={false}   title="Add horse" showBackButton >
        <AppButton title={t("Global.add_event")} onPress={()=>navigate(navigationEnums.EVENT_ADD)}/>
        <AppButton title={t("Global.add_horse")} onPress={()=>navigate(navigationEnums.HORSE_CREATE)}/>
          
       
</AppLayout>
    
  )
}