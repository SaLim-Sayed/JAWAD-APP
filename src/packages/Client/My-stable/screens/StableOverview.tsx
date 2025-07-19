import AppLayout from '@/components/UI/AppLayout'
import React from 'react'
import StableOverviews from '../components/StableOverviews'

export default function StableOverview() {
  return (
    <AppLayout title="Stable Overview" isScrollable={false} showBackButton>
         <StableOverviews/>
     </AppLayout>
  )
}