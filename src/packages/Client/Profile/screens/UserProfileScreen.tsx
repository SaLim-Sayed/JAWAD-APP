import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import AppHeader from '@/components/UI/AppHeader'
import { UserProfile } from '../components/UserProfile'
import { SchoolProfile } from '../components/SchoolProfile'
import { useAuthStore } from '@/store/useAuthStore'
import { t } from '@/lib'

export default function UserProfileScreen() {
  const { authData } = useAuthStore();
  const isSchool = authData.role === "school";

  return (
    <AppWrapper >
        <AppHeader title={t("ProfileMenu.profile")} showBackButton />
        {isSchool ? <SchoolProfile /> : <UserProfile />}
    </AppWrapper>
  )
}