import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import UserCard from '@/components/UI/UserCard'
import { images } from '@/assets/images'
import { GroupBooking } from './GroupBooking'

export default function UserInfo({onNext}: {onNext: () => void}) {
  return (
    <ScrollView
    className="px-4 pt-6  w-full h-[80%] bg-white rounded-xl gap-4"
    >
        <UserCard role="User" name="John Doe" phone="123456789" avatar={images.family} />
        <GroupBooking onNext={onNext} />
    </ScrollView>
  )
}