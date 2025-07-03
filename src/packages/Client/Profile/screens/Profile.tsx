import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import AppButton from '@/components/UI/AppButton'
import { useAuthStore } from '@/store/useAuthStore';
import ProfileMenu from '../components/ProfileMenu';
import AppHeader from '@/components/UI/AppHeader';

export default function Profile() {
        const { isLoggedIn, activeApp, loadAuthState,setActiveApp } = useAuthStore();
    

  return (
    <AppWrapper>
      <AppHeader title="Profile" />
      <ProfileMenu onLogout={() => setActiveApp('Onboarding')} /> 
    </AppWrapper>
  )
}