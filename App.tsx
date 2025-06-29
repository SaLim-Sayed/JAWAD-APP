import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Pressable, StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Icons } from '@/constants';
import { I18nContext } from '@/provider/Language/I18nContext';
import { navigationEnums } from '@/provider/navigationEnums';
import { NavigationParamsList } from '@/provider/NavigationParamsList';
import { useAuthStore } from '@/store/useAuthStore';

import SplashScreen from '@/packages/Splash/SplashScreen';
import OnboardingScreen from '@/packages/Onboarding/OnboardingScreen';
import LoginScreen from '@/packages/Auth/screens/LoginScreen';
import { SignUpScreen } from '@/packages/Auth/screens/SignUpScreen';
import ForgetScreen from '@/packages/Auth/screens/ForgetScreen';
import OtpScreen from '@/packages/Auth/screens/OtpScreen';
import ChangePassword from '@/packages/Auth/screens/ChangePassword';
import ChangeSuccessScreen from '@/packages/Auth/screens/ChangeSuccessScreen';
import RegisterSuccessScreen from '@/packages/Auth/screens/RegisterSuccessScreen';

import HomeScreen from '@/packages/Client/home/screens/Home';
import Services from '@/packages/Client/Services/screens/RidesScreen';
import Profile from '@/screens/Profile/Profile';
import { DismissKeyboardWrapper } from '@/components/UI/DismissKeyboardWrapper';
import StableServicesDetails from '@/packages/Client/Services/screens/StableServicesDetails';
import Horses from '@/packages/Client/Services/screens/Horses';
import HorseDetails from '@/packages/Client/Services/screens/HorseDetails';
import ServicesScreen from '@/packages/Client/Services/screens/ServicesScreen';
import RidesScreen from '@/packages/Client/Services/screens/RidesScreen';
import PhotoSessionScreen from '@/packages/Client/Services/screens/PhotoSessionScreen';
import PhotoSessionDetails from '@/packages/Client/Services/screens/PhotoSessionDetails';

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
const Stack = createNativeStackNavigator<NavigationParamsList>();

// Helper for Tab Icon
const TabBarIcon = ({ route, focused }: { route: { name: string }, focused: boolean }) => {
  const iconSize = 24;
  let IconComponent;

  switch (route.name) {
    case 'home': IconComponent = Icons.home; break;
    case 'stable': IconComponent = Icons.stable; break;
    case 'service': IconComponent = Icons.service; break;
    case 'profile': IconComponent = Icons.profile; break;
    default: return null;
  }

  if (focused) {
    return (
      <View
        style={{
          backgroundColor: '#E7E7E7',
          borderRadius: 999,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 30,
        }}
      >
        <View className='border-b-transparent border-[#E7E7E7]  border-[35px] border-t-[50px] rounded-[99999px] rounded-b-none flex items-center justify-center'>
          <View className='bg-[#5E3E2C] mb-4 rounded-full flex items-center justify-center h-[50px] p-2 w-[50px]'>
            <IconComponent width={iconSize} height={iconSize} stroke="#fff" color="#fff" />
          </View>
        </View>
      </View>
    );
  }
  return <IconComponent width={iconSize} height={iconSize} color="#fff" />;
};

const tabScreenOptions = ({ route }: any) => ({
  headerShown: false,
  tabBarShowLabel: true,
  tabBarButton: (props: any) => (
    // @ts-ignore
    <Pressable android_ripple={{ color: 'transparent' }} {...props} />
  ),
  tabBarLabelStyle: { fontSize: 14 },
  tabBarIcon: ({ focused }: { focused: boolean }) => TabBarIcon({ route, focused }),
  tabBarActiveTintColor: '#5E3E2C',
  tabBarPressColor: 'transparent',
  headerPressColor: "transparent",
  tabBarInactiveTintColor: '#999',
  tabBarStyle: {
    height: 100,
    borderRadius: 16,
    position: 'absolute',
    paddingHorizontal: 12,
    bottom: 20,
    backgroundColor: '#E7E7E7',
  },
});

// Main Bottom Tabs for Admin
function AdminTabs() {
  return (
    // @ts-ignore
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="service" component={Services} options={{ tabBarLabel: 'Service' }} />
      <Tab.Screen name="stable" component={Profile} options={{ tabBarLabel: 'Stable' }} />
      <Tab.Screen name="profile" component={Profile} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

// Main Bottom Tabs for Client (if you want to differentiate)
function ClientTabs() {
  return (
    // @ts-ignore
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name="home" component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="service" component={ServicesScreen} options={{ tabBarLabel: 'Service' }} />
      <Tab.Screen name="stable" component={Profile} options={{ tabBarLabel: 'Stable' }} />
      <Tab.Screen name="profile" component={Profile} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

// Auth flow if not logged in
function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={navigationEnums.ONBOARD1} component={OnboardingScreen} />
      <Stack.Screen name="onboard2" component={OnboardingScreen} />
      <Stack.Screen name="onboard3" component={OnboardingScreen} />
      <Stack.Screen name={navigationEnums.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={navigationEnums.SIGNUP_SCREEN} component={SignUpScreen} />
      <Stack.Screen name={navigationEnums.FORGET_PASSWORD_SCREEN} component={ForgetScreen} />
      <Stack.Screen name={navigationEnums.OTP_SCREEN} component={OtpScreen} />
      <Stack.Screen name={navigationEnums.CHANGE_PASSWORD_SCREEN} component={ChangePassword} />
      <Stack.Screen name={navigationEnums.CHANGE_PASSWORD_SUCCESS_SCREEN} component={ChangeSuccessScreen} />
      <Stack.Screen name={navigationEnums.REGISTER_SUCCESS_SCREEN} component={RegisterSuccessScreen} />
    </Stack.Navigator>
  );
}

function ClientNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
      <Stack.Screen name="Main" component={ClientTabs} />
      <Stack.Screen name="stable" component={Profile} />
      <Stack.Screen name={navigationEnums.STABLE_SERVICES_DETAILS} component={StableServicesDetails} />
      <Stack.Screen name={navigationEnums.HORSES} component={Horses} />
      <Stack.Screen name={navigationEnums.HORSE_DETAILS} component={HorseDetails} />
      <Stack.Screen name={navigationEnums.SERVICES} component={ServicesScreen} />
      <Stack.Screen name={navigationEnums.RIDES} component={RidesScreen} />
      <Stack.Screen name={navigationEnums.PHOTOS} component={PhotoSessionScreen} />
      <Stack.Screen name={navigationEnums.PHOTO_SESSION_DETAILS} component={PhotoSessionDetails} />
    </Stack.Navigator>)
}

// Main flow if logged in
function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
      <Stack.Screen name="Main" component={AdminTabs} />
      <Stack.Screen name="home" component={HomeScreen} />

      <Stack.Screen name={navigationEnums.STABLE_SERVICES_DETAILS} component={StableServicesDetails} />
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
  const { isLoggedIn, activeApp } = useAuthStore();

  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      // useAuthStore.setState({ activeApp: 'Onboarding' });
    }
  }, [isLoggedIn]);

  if (showSplash) return <SplashScreen />;

  // Choose navigator based on activeApp
  switch (activeApp) {
    case 'Onboarding': return <OnboardingNavigator />;
    case 'Client': return <ClientNavigator />;
    case 'Admin': return <AdminTabs />;
    default: return <MainNavigator />;
  }
}

export default function Root() {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" hidden={true} backgroundColor="#293442" />
      <NavigationContainer>
        <I18nContext>
          <App />
        </I18nContext>
        <Toast visibilityTime={500} />
      </NavigationContainer>
    </QueryClientProvider>
  );
}