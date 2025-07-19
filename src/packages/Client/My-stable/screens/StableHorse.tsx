import AppLayout from '@/components/UI/AppLayout'
import LoaderBoundary from '@/components/UI/LoaderBoundary'
import { useApiQuery } from '@/hooks'
import { apiKeys } from '@/hooks/apiKeys'
import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'
import { GetHorsesResponse } from '../../Services/@types/horse.types'
import HorseList from '../components/HorseList'
import { useFocusEffect } from '@react-navigation/native'
import AppButton from '@/components/UI/AppButton'
import useGlobalNavigation from '@/provider/useGlobalNavigation'
import { navigationEnums } from '@/provider/navigationEnums'
import { Icons } from '@/constants'
 
export default function StableHorse() {
  const { authData } = useAuthStore()
  const { data  ,isLoading,refetch} = useApiQuery<GetHorsesResponse>({
    url: apiKeys.horse.getHorse(authData?.id as string),
    key: [apiKeys.stable.stableDetail(authData?.id as string)],
  })
  const{navigate} = useGlobalNavigation()
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch])
  )
  return (
    <AppLayout title="Stable Horse" showBackButton>
      <AppButton title="Add Horse" variant='outline' onPress={()=>navigate(navigationEnums.HORSE_CREATE)} endIcon={<Icons.addOutline/>}/>
      <LoaderBoundary isLoading={isLoading}>
         <HorseList horses={data?.horses!} refetch={refetch}/>
      </LoaderBoundary>
     </AppLayout>
  )
}