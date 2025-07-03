import { View, Text } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import AppHeader from '@/components/UI/AppHeader'
import { ContactUs } from '../components/ContactUs'

export default function ContactUsScreen() {
  return (
    <AppWrapper >
        <AppHeader title="Contact Us" showBackButton />
        <ContactUs /> 
    </AppWrapper>
  )
}