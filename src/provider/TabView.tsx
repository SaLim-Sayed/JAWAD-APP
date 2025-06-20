import LiveTV from '@/screens/Live/LiveTV';
import Movies from '@/screens/Movies/Movies';
import Profile from '@/screens/Profile/Profile';
import Series from '@/screens/Series/Series';
import { useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { CustomTabBar } from './CustomTabBar';

export const TabView = () => {
    const tabs = [
        { name: 'liveTV', component: LiveTV, label: 'TV Live' },
        { name: 'movies', component: Movies, label: 'Movies' },
        { name: 'series', component: Series, label: 'Series' },
        { name: 'profile', component: Profile, label: 'More' },
    ];
    const [activeTab, setActiveTab] = useState('liveTV');
    const fadeAnim = useRef(new Animated.Value(1)).current;

    const handleTabChange = (tabName: string) => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            setActiveTab(tabName);
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }).start();
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <CustomTabBar
                tabs={tabs}
                initialTab={activeTab}
                onTabChange={handleTabChange}
            />
        </View>
    );
};
