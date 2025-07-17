import AppHeader from '@/components/UI/AppHeader';
import AppWrapper from '@/components/UI/AppWrapper';
import { useAuthStore } from '@/store/useAuthStore';
import React from 'react';
import ProfileMenu from '../components/ProfileMenu';

export default function Profile() {
  const { setActiveApp,logout } = useAuthStore();


  return (
    <AppWrapper>
      <AppHeader title="Profile" />
      <ProfileMenu onLogout={() => logout()} />
    </AppWrapper>
  )
}