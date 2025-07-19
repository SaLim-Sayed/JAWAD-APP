import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import CreateHorse from '../components/CreateHorse'
import AppHeader from '@/components/UI/AppHeader'
import AppLayout from '@/components/UI/AppLayout'

export default function AddHorse() {
  return (
    <AppLayout isScrollable={false}   title="Add horse" showBackButton >
       <CreateHorse/>
    </AppLayout>
  )
}