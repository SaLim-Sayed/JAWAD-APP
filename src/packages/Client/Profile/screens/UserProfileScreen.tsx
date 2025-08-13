import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import AppHeader from '@/components/UI/AppHeader'
import { UserProfile } from '../components/UserProfile'
import { t } from '@/lib'

export default function UserProfileScreen() {
  return (
    <AppWrapper >
        <AppHeader title={t("ProfileMenu.profile")} showBackButton />
        <UserProfile /> 
    </AppWrapper>
  )
}