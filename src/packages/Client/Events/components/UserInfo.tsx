import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import UserCard from '@/components/UI/UserCard'
import { images } from '@/assets/images'
import { GroupBooking } from './GroupBooking'
import { useAuthStore } from '@/store/useAuthStore'
import { useApiQuery } from '@/hooks'
import { apiKeys } from '@/hooks/apiKeys'
import { useLanguage } from '@/store'

export default function UserInfo({ onNext }: { onNext: () => void }) {
  const { authData } = useAuthStore();
  const { language } = useLanguage()

  const { data: userDetails, isLoading: userDetailsLoading } = useApiQuery({
    url: apiKeys.auth.getUserDetails,
    key: ["getUserDetails"],
  });



  const isStable = authData.role === "stable";
  const isPhotographer = authData.role === "photographer";
  const isAuth = authData.role === "auth";

  const userName = isAuth ? userDetails?.details?.name : "Guest";
  return (
    <ScrollView
      className="px-4 pt-6  w-full h-[80%] bg-white rounded-xl gap-4"
    >
      <UserCard role="User" name={userName} phone={userDetails?.details?.phone} avatar={images.family} />
      <GroupBooking onNext={onNext} />
    </ScrollView>
  )
}