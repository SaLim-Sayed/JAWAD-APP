import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Pressable, StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Icons } from '@/constants';
import OnboardingScreen from '@/packages/Onboarding/OnboardingScreen';
import SplashScreen from '@/packages/Splash/SplashScreen';
import { I18nContext } from '@/provider/Language/I18nContext';
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import Profile from '@/screens/Profile/Profile';
import { useAuthStore } from '@/store/useAuthStore';
import LoginScreen from '@/packages/Sign-in/screens/LoginScreen';
import { SignUpScreen } from '@/packages/Sign-up/screens/SignUpScreen';
import ForgetScreen from '@/packages/Sign-in/screens/ForgetScreen';
import { DismissKeyboardWrapper } from '@/components/UI/DismissKeyboardWrapper';
import OtpScreen from '@/packages/Sign-in/screens/OtpScreen';
import ChangePassword from '@/packages/Sign-in/screens/ChangePassword';
import SuccessScreen from '@/packages/Sign-in/screens/SuccessScreen';

// React Query client
const queryClient = new QueryClient();

// Define tab params
export type MainTabParamList = {
  home: undefined;
  stable: undefined;
  service: undefined;
  profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator();

// Main Bottom Tabs
function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarButton: (props) => (
          // @ts-ignore
          <Pressable android_ripple={{ color: 'transparent' }} {...props} />
        ),
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarIcon: ({ focused }) => {
          const iconSize = 24;
          let IconComponent;

          switch (route.name) {
            case 'home':
              IconComponent = Icons.home;
              break;
            case 'stable':
              IconComponent = Icons.stable;
              break;
            case 'service':
              IconComponent = Icons.service;
              break;
            case 'profile':
              IconComponent = Icons.profile;
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
                  marginBottom: 40,

                }}
              >
                <View className=' border-b-transparent  border-[#E7E7E7]  border-[40px]  rounded-[100px]  rounded-b-none flex items-center justify-center '>
                  <View className='bg-[#5E3E2C]  rounded-full  flex items-center justify-center h-[55px] p-4 w-[55px]'>
                    <IconComponent width={iconSize} height={iconSize} stroke="#fff" color="#fff" />
                  </View>
                </View>
              </View>
            );
          }

          return (
            <IconComponent width={iconSize} height={iconSize} color="#fff" />
          );
        },
        tabBarActiveTintColor: '#5E3E2C',
        tabBarPressColor: 'transparent',
        headerPressColor: "transparent",
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 100,
          borderRadius: 16,
          position: 'absolute',
          paddingHorizontal: 40,

          bottom: 30,
          backgroundColor: '#E7E7E7',

        },
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="stable" component={Profile} options={{ tabBarLabel: 'Stable' }} />
      <Tab.Screen name="service" component={Profile} options={{ tabBarLabel: 'Service' }} />
      <Tab.Screen name="profile" component={Profile} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}
function ClientTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarButton: (props) => (
          // @ts-ignore
          <Pressable android_ripple={{ color: 'transparent' }} {...props} />
        ),
        tabBarLabelStyle: {
          fontSize: 14,
        },
        tabBarIcon: ({ focused }) => {
          const iconSize = 24;
          let IconComponent;

          switch (route.name) {
            case 'home':
              IconComponent = Icons.home;
              break;
            case 'stable':
              IconComponent = Icons.stable;
              break;
            case 'service':
              IconComponent = Icons.service;
              break;
            case 'profile':
              IconComponent = Icons.profile;
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
                  marginBottom: 40,

                }}
              >
                <View className=' border-b-transparent  border-[#E7E7E7]  border-[40px]  rounded-[100px]  rounded-b-none flex items-center justify-center '>
                  <View className='bg-[#5E3E2C]  rounded-full  flex items-center justify-center h-[55px] p-4 w-[55px]'>
                    <IconComponent width={iconSize} height={iconSize} stroke="#fff" color="#fff" />
                  </View>
                </View>
              </View>
            );
          }

          return (
            <IconComponent width={iconSize} height={iconSize} color="#fff" />
          );
        },
        tabBarActiveTintColor: '#5E3E2C',
        tabBarPressColor: 'transparent',
        headerPressColor: "transparent",
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          height: 100,
          borderRadius: 16,
          position: 'absolute',
          paddingHorizontal: 40,

          bottom: 30,
          backgroundColor: '#E7E7E7',

        },
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="stable" component={Profile} options={{ tabBarLabel: 'Stable' }} />
      <Tab.Screen name="service" component={Profile} options={{ tabBarLabel: 'Service' }} />
      <Tab.Screen name="profile" component={Profile} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

// Auth flow if not logged in
function OnboardingNavigator() {
  return (
    <Stack.Navigator initialRouteName="success" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboard1" component={OnboardingScreen} />
      <Stack.Screen name="onboard2" component={OnboardingScreen} />
      <Stack.Screen name="onboard3" component={OnboardingScreen} />
      <Stack.Screen name="preLogin" component={Profile} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signUp" component={SignUpScreen} />
      <Stack.Screen name="forget-password" component={ForgetScreen} />
      <Stack.Screen name="otp" component={OtpScreen} />
      <Stack.Screen name="change-password" component={ChangePassword} />
      <Stack.Screen name="success" component={SuccessScreen} />

    </Stack.Navigator>
  );
}


// Main flow if logged in
function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
      <Stack.Screen name="Main" component={AdminTabs} />
      <Stack.Screen name="home" component={Profile} />
      <Stack.Screen name="stable" component={Profile} />
      <Stack.Screen name="service" component={Profile} />
      <Stack.Screen name="series/stream" component={Profile} />
      <Stack.Screen name="series/details" component={Profile} />
      <Stack.Screen name="movies" component={Profile} />
      <Stack.Screen name="movies/details" component={Profile} />
      <Stack.Screen name="movies/stream" component={Profile} />
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="profile/settings" component={Profile} />
      <Stack.Screen name="profile/playlist" component={Profile} />
      <Stack.Screen name="profile/language" component={Profile} />
      <Stack.Screen name="profile/clearCache" component={Profile} />
      <Stack.Screen name="profile/applicationInfo" component={Profile} />
    </Stack.Navigator>
  );
}

// Root App
function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Delay for 500ms

    return () => clearTimeout(timeout); // Cleanup on unmount
  }, []);
  const { isLoggedIn, activeApp } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      useAuthStore.setState({ activeApp: 'Onboarding' });
    }
  }, [isLoggedIn]);

  if (showSplash) return <SplashScreen />;
  return activeApp === 'Onboarding' ? <OnboardingNavigator /> : activeApp === 'Client' ? <ClientTabs /> : activeApp === 'Admin' ? <AdminTabs /> : <MainNavigator />;
}

export default function Root() {

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" hidden={true} backgroundColor="#293442" />
      <DismissKeyboardWrapper>
      <NavigationContainer>
        <I18nContext>
          <App />
        </I18nContext>

        <Toast visibilityTime={500} />
      </NavigationContainer>
      </DismissKeyboardWrapper>
    </QueryClientProvider>
  );
}
