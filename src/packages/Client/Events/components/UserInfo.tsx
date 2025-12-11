import { images } from '@/assets/images'
import UserCard from '@/components/UI/UserCard'
import { useApiQuery } from '@/hooks'
import { apiKeys } from '@/hooks/apiKeys'
import { useLanguage } from '@/store'
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'
import { ScrollView, View } from 'react-native'
import { GroupBooking } from './GroupBooking'

export default function UserInfo({ onNext,setPaymentUrl }: { onNext: () => void ,setPaymentUrl:(url:string)=>void}) {
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
    <View
      className="px-4 pt-6  w-full h-[80%] bg-white rounded-xl gap-4"
    >
      <UserCard role="User" name={userName} phone={userDetails?.details?.phone} avatar={images.family} />
      <GroupBooking  />
    </View>
  )
}