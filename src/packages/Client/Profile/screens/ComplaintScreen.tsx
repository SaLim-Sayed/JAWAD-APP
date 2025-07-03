import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import AppHeader from '@/components/UI/AppHeader'
import { UserProfile } from '../components/UserProfile'

export default function ComplaintScreen() {
  return (
    <AppWrapper >
        <AppHeader title="Complaint" showBackButton />
        <UserProfile /> 
    </AppWrapper>
  )
}