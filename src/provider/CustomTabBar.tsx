import AppText from '@/components/UI/AppText';
import { Icons } from '@/constants';
import { cn } from '@/lib';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import useGlobalNavigation from './useGlobalNavigation';

export interface TabItem {
    name: string;
    label: string;
    component: React.ComponentType<any>;
}

export interface CustomTabBarProps {
    tabs: TabItem[];
    initialTab?: string;
    onTabChange?: (tabName: string) => void;
}

export const CustomTabBar: React.FC<CustomTabBarProps> = ({
    tabs,
    initialTab = tabs[0].name,
    onTabChange
}) => {
    const { navigate, goBack } = useGlobalNavigation();
    const route = useRoute();
    const [activeTab, setActiveTab] = useState(initialTab);
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        let currentRouteName = route.name;
    
        // إذا كان route يبدأ بـ profile، نجبره يصير "profile"
        if (currentRouteName.startsWith('profile')) {
            currentRouteName = 'profile';
        }
    
        if (currentRouteName && currentRouteName !== activeTab) {
            setActiveTab(currentRouteName);
            if (onTabChange) {
                onTabChange(currentRouteName);
            }
        }
    }, [route.name, onTabChange, navigate, goBack]);
    const handleTabPress = (tabName: any) => {
        if (tabName === activeTab) return; 

        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 150,
            useNativeDriver: true,
        }).start(() => {
            setActiveTab(tabName);
            if (onTabChange) {
                onTabChange(tabName);
            }
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }).start();
        });

        navigate(tabName);
    };

    const getIcon = (tabName: string) => {
        const isActive = activeTab === tabName;
        switch (tabName) {
            case 'liveTV':
                return isActive ? (
                    <Icons.dark_live width={32} height={32} />
                ) : (
                    <Icons.live width={32} height={32} />
                );
            case 'movies':
                return isActive ? (
                    <Icons.dark_movie width={32} height={32} />
                ) : (
                    <Icons.movie width={32} height={32} />
                );
            case 'series':
                return isActive ? (
                    <Icons.dark_series width={32} height={32} />
                ) : (
                    <Icons.series width={32} height={32} />
                );
            case 'profile':
                return isActive ? (
                    <Icons.dark_more width={32} height={32} />
                ) : (
                    <Icons.more width={32} height={32} />
                );
            default:
                return null;
        }
    };

 
    return (
        <View style={{ flex: 1 }}>
             <View className="shadow-xl shadow-slate-200" style={styles.container}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.name}
                        onPress={() => handleTabPress(tab.name)}
                        style={[styles.tabButton]}
                        accessibilityRole="button"
                        accessibilityState={{ selected: activeTab === tab.name }}
                    >
                        {getIcon(tab.name)}
                        <AppText className={cn(
                            "text-[14px] font-[400]",
                            activeTab === tab.name ? 'text-black' : 'text-zinc-400'
                        )}>
                            {tab.label}
                        </AppText>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 40,
        left: 16,
        right: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        height: 66,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    tabButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
});
