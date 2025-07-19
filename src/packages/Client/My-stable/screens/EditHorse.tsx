import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import CreateHorse from '../components/CreateHorse'
import AppHeader from '@/components/UI/AppHeader'
import EditHorseForm from '../components/EditHorseForm'
import AppLayout from '@/components/UI/AppLayout'

export default function EditHorse() {

  return (
    <AppLayout title="Edit Horse" isScrollable={false} showBackButton>
       <EditHorseForm/>
    </AppLayout>
  )
}