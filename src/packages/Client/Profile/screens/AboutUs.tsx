import { View, Text, FlatList, ScrollView } from 'react-native'
import React from 'react'
import AppWrapper from '@/components/UI/AppWrapper'
import AppHeader from '@/components/UI/AppHeader'
import { UserProfile } from '../components/UserProfile'
import SummaryItem from '../../Events/components/SummaryItem'
import DescriptionItem from '@/components/UI/DescriptionItem'
import { t } from '@/lib'
import AppText from '@/components/UI/AppText'

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
            <AppHeader title={t('About.title')} showBackButton />
            <ScrollView className='bg-white p-3'>
                <AppText className='text-brownColor-400 tajawal-semibold-16'>{t('About.description')}</AppText>
            </ScrollView>
        </AppWrapper>
    )
}