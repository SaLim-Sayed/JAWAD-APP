import AppLayout from '@/components/UI/AppLayout';
import { t } from '@/lib';
import { useAuthStore } from '@/store/useAuthStore';
import React from 'react';
import ProfileMenu from '../components/ProfileMenu';

export default function Profile() {
  const {  logout } = useAuthStore();


  return (
    <AppLayout isScrollable={false} title={t("ProfileMenu.profile")}>
      <ProfileMenu onLogout={() => logout()} />
    </AppLayout>
  )
}