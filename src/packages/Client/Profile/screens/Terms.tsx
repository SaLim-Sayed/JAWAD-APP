import { View, Text, FlatList } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import AppHeader from '@/components/UI/AppHeader'
import { UserProfile } from '../components/UserProfile'
import SummaryItem from '../../Events/components/SummaryItem'
import DescriptionItem from '@/components/UI/DescriptionItem'

export default function Terms() {
      const checkInEtiquetteSections = [
        {
          key: "reservation",
          title: "Advanced Reservation is required",
          content:
            "Lorem ipsum dolor sit amet consectetur. Sagittis consectetur sed lacus sem sed duis. Nisi imperdiet orci auctor amet lorem libero eu egestas. Non varius ut libero ullamcorper et enim faucibus nec vitae. Auctor sed elementum massa adipiscing eu. Eget convallis sem volutpat eu sapien pellentesque. Eu purus mollis laoreet mattis sit ut. Magna proin ipsum nascetur tincidunt nunc. Vulputate risus viverra nisi maecenas tincidunt. Nibh facilisi tellus nisl enim dapibus ullamcorper. Elit ipsum metus scelerisque amet sit pharetra.",
        },
        {
          key: "faceCovering",
          title: "Face Covering",
          content:
            "Lorem ipsum dolor sit amet consectetur. Sagittis consectetur sed lacus sem sed duis. Nisi imperdiet orci auctor amet lorem libero eu egestas. Non varius ut libero ullamcorper et enim faucibus nec vitae. Auctor sed elementum massa adipiscing eu. Eget convallis sem volutpat eu sapien pellentesqu",
        },
        {
          key: "temperatureChecks",
          title: "Temperature Checks",
          content:
            "Temperature checks and hand sanitizer use will be required prior to entering the club. Scanless check-in . Our front desk team will ve wearing  face shields on top of face masks to allow safe and seamless entry to the club.",
        },
        {
          key: "towelService",
          title: "Towel Service",
          content:
            "Towel service is not available due to the current situation. Also, bringing your own towel is not advisable as stated in guidelines of both Ministry of Health and Ministry of Youth and Sports.",
        },
      ];
    return (
        <AppWrapper >
            <AppHeader title="Terms and Conditions" showBackButton />
            <View className='bg-white'>
                <FlatList

                    data={checkInEtiquetteSections}
                    keyExtractor={(item) => item.key}
                    style={{ margin: 16, backgroundColor: "#fff" }}
                    renderItem={({ item }) => (
                        <DescriptionItem
                            key={item.key}
                            label={item.title}
                            description={item.content}
                        />

                    )}
                    ListFooterComponent={<View className="h-80" />}
                />
            </View>
        </AppWrapper>
    )
}