import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import CreateHorse from '../../My-stable/components/CreateHorse'
import AppHeader from '@/components/UI/AppHeader'
import AppLayout from '@/components/UI/AppLayout'
import CreateEvent from '../components/CreateEvent'
import { t } from '@/lib'

export default function AddEvent() {
  return (
    <AppLayout isScrollable={false}   title={t("Global.add_event")} showBackButton >
       <CreateEvent/>
    </AppLayout>
  )
}