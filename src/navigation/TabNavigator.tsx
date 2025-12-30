
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Icons } from '@/constants';
import { navigationEnums } from '@/provider/navigationEnums';
import { useAuthStore } from '@/store/useAuthStore';

import HomeScreen from '@/packages/Client/home/screens/Home';
import Services from '@/packages/Client/Services/screens/RidesScreen';
import Events from '@/packages/Client/Events/screens/Events';
import Profile from '@/packages/Client/Profile/screens/Profile';
import MyStable from '@/packages/Client/My-stable/screens/MyStable';
import ServicesScreen from '@/packages/Client/Services/screens/ServicesScreen';
import PhotographerStablesManagement from '@/packages/Client/Photographer/screens/PhotographerStablesManagement';
import AddScreen from '@/packages/Client/home/screens/AddScreen';

export type MainTabParamList = {
    home: undefined;
    event: undefined;
    service: undefined;
    myStable: undefined;
    add: undefined;
    profile: undefined;
    "photographer/stables": undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const TabBarIcon = ({
    route,
    focused,
}: {
    route: { name: string };
    focused: boolean;
}) => {
    const iconSize = 24;

    let IconComponent;
    let FocusedIconComponent;

    switch (route.name) {
        case 'home':
            IconComponent = Icons.homeOutline;
            FocusedIconComponent = Icons.home;
            break;
        case 'event':
            IconComponent = Icons.event;
            FocusedIconComponent = Icons.eventOutline;
            break;
        case 'service':
            IconComponent = Icons.serviceOutline;
            FocusedIconComponent = Icons.service;
            break;
        case 'profile':
            IconComponent = Icons.profileOutline;
            FocusedIconComponent = Icons.profile;
            break;
        case 'add':
            IconComponent = Icons.addOutline;
            FocusedIconComponent = Icons.add;
            break;
        case 'myStable':
            IconComponent = Icons.stableOutline;
            FocusedIconComponent = Icons.stable;
            break;
        case 'photographer/stables':
            IconComponent = Icons.stableOutline;
            FocusedIconComponent = Icons.stable;
            break;
        default:
            return null;
    }

    if (focused) {
        return (
            <View
                style={{
                    backgroundColor: '#E7E7E7',
                    borderRadius: 999,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                }}>
                <View className="border-b-transparent border-[#E7E7E7] border-[35px] border-t-[20px] rounded-[99999px] rounded-b-none flex items-center justify-center">
                    <View className="bg-[#5E3E2C] rounded-full flex items-center justify-center h-[30px] p-2 w-[30px]">
                        <FocusedIconComponent
                            width={iconSize}
                            height={iconSize}
                            stroke="#fff"
                            color="#fff"
                        />
                    </View>
                </View>
            </View>
        );
    }

    return (
        <IconComponent
            width={iconSize}
            height={iconSize}
            stroke="#9C9D9E"
            color="#9C9D9E"
        />
    );
};

const tabScreenOptions = ({ route }: any) => ({
    headerShown: false,
    tabBarShowLabel: true,
    tabBarButton: (props: any) => (
        // @ts-ignore
        <Pressable android_ripple={{ color: 'transparent' }} {...props} />
    ),
    tabBarLabelStyle: { fontSize: 13, fontWeight: '600' as const, paddingBottom: 5 },
    tabBarIcon: ({ focused }: { focused: boolean }) => TabBarIcon({ route, focused }),
    tabBarActiveTintColor: '#5E3E2C',
    tabBarPressColor: 'transparent',
    headerPressColor: 'transparent',
    tabBarInactiveTintColor: '#999',
    tabBarStyle: {
        height: 90,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        borderTopWidth: 0,
        elevation: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 5.00,
        position: 'absolute' as const,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export function AdminTabs() {
    return (
        // @ts-ignore
        <Tab.Navigator screenOptions={tabScreenOptions}>
            <Tab.Screen
                name={navigationEnums.HOME}
                component={HomeScreen}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="service"
                component={Services}
                options={{ tabBarLabel: 'Service' }}
            />
            <Tab.Screen
                name="event"
                component={Events}
                options={{ tabBarLabel: 'Events' }}
            />
            <Tab.Screen
                name="profile"
                component={Profile}
                options={{ tabBarLabel: 'Profile' }}
            />
        </Tab.Navigator>
    );
}

export function ClientTabs() {
    const { t } = useTranslation();
    const { authData } = useAuthStore();
    return (
        // @ts-ignore
        <Tab.Navigator screenOptions={tabScreenOptions}>
            <Tab.Screen
                name={navigationEnums.HOME}
                component={HomeScreen}
                options={{ tabBarLabel: t('Global.Home') }}
            />
            {authData?.role === 'stable' && (
                <Tab.Screen
                    name="myStable"
                    component={MyStable}
                    options={{ tabBarLabel: t('Global.My Stable') }}
                />
            )}
            {authData?.role !== 'stable' && authData?.role !== 'photographer' && authData?.role !== 'school' && (
                <Tab.Screen
                    name="service"
                    component={ServicesScreen}
                    options={{ tabBarLabel: t('Global.Services') }}
                />
            )}
            {authData?.role !== 'stable' && authData?.role !== 'photographer' && authData?.role !== 'school' && (
                <Tab.Screen
                    name="event"
                    component={Events}
                    options={{ tabBarLabel: t('Global.Events') }}
                />
            )}
            {authData?.role === 'photographer' && (
                <Tab.Screen
                    name={navigationEnums.PHOTOGRAPHER_STABLES}
                    component={PhotographerStablesManagement}
                    options={{ tabBarLabel: t('Global.Stables') || 'Stables' }}
                />
            )}
            {authData?.role === 'stable' && (
                <Tab.Screen
                    name="add"
                    component={AddScreen}
                    options={{ tabBarLabel: t('Global.Add') }}
                />
            )}
            <Tab.Screen
                name="profile"
                component={Profile}
                options={{ tabBarLabel: t('Global.Profile') }}
            />
        </Tab.Navigator>
    );
}
