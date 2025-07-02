import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import AppButton from '@/components/UI/AppButton'
import { useAuthStore } from '@/store/useAuthStore';

export default function Profile() {
        const { isLoggedIn, activeApp, loadAuthState,setActiveApp } = useAuthStore();
    
  return (
    <AppWrapper>
        <AppButton
        className='mt-20'
            title="Logout"
            onPress={() => setActiveApp('Onboarding')}
        />  

    </AppWrapper>
  )
}