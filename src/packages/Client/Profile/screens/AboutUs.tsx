import { View, Text, FlatList } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import AppHeader from '@/components/UI/AppHeader'
import { UserProfile } from '../components/UserProfile'
import SummaryItem from '../../Events/components/SummaryItem'
import DescriptionItem from '@/components/UI/DescriptionItem'

export default function AboutUs() {
    const aboutUsSections = [
        {
            key: "about",
            title: "About us",
            content:
                "Lorem ipsum dolor sit amet consectetur. Sagittis consectetur sed lacus sem sed duis. Nisi imperdiet orci auctor amet lorem libero eu egestas. Non varius ut libero ullamcorper et enim faucibus nec vitae. Auctor sed elementum massa adipiscing eu. Eget convallis sem volutpat eu sapien pellentesque. Eu purus mollis laoreet mattis sit ut. Magna proin ipsum nascetur tincidunt nunc. Vulputate risus viverra nisi maecenas tincidunt. Nibh facilisi tellus nisl enim dapibus ullamcorper. Elit ipsum",
        },
        {
            key: "story",
            title: "Our story",
            content:
                "Lorem ipsum dolor sit amet consectetur. Sagittis consectetur sed lacus sem sed duis. Nisi imperdiet orci auctor amet lorem libero eu egestas. Non varius ut libero ullamcorper et enim faucibus nec vitae. Auctor sed elementum massa adipiscing eu. Eget convallis sem volutpat eu sapien pellentesqu",
        },
        {
            key: "mission",
            title: "Our Mission",
            content:
                "Lorem ipsum dolor sit amet consectetur. Sagittis consectetur sed lacus sem sed duis. Nisi imperdiet orci auctor amet lorem libero eu egestas. Non varius",
        },
        {
            key: "vision",
            title: "Our Vision",
            content:
                "Lorem ipsum dolor sit amet consectetur. Sagittis consectetur sed lacus sem sed duis. Nisi imperdiet orci auctor amet lorem libero eu egestas. Non varius",
        },
        {
            key: "followUs",
            title: "Follow Us on",
            content: "Social media platforms",
        },
    ];
    return (
        <AppWrapper >
            <AppHeader title="About Us" showBackButton />
            <View className='bg-white'>
                <FlatList

                    data={aboutUsSections}
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