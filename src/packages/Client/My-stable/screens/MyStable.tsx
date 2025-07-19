import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import CreateHorse from '../components/CreateHorse'
import AppHeader from '@/components/UI/AppHeader'
import MyStableMenu from '../components/MyStableMenu'
import AppLayout from '@/components/UI/AppLayout'

export default function MyStable() {
  return (
    <AppLayout title="My Stable" showBackButton>
         <MyStableMenu/>
     </AppLayout>
  )
}