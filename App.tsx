import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Pressable, StatusBar, View } from 'react-native';
import Toast from 'react-native-toast-message';

import { Icons } from '@/constants';
import { I18nContext } from '@/provider/Language/I18nContext';
import { navigationEnums } from '@/provider/navigationEnums';
import { NavigationParamsList } from '@/provider/NavigationParamsList';
import { useAuthStore } from '@/store/useAuthStore';

import ChangePassword from '@/packages/Auth/screens/ChangePassword';
import ChangeSuccessScreen from '@/packages/Auth/screens/ChangeSuccessScreen';
import ForgetScreen from '@/packages/Auth/screens/ForgetScreen';
import LoginScreen from '@/packages/Auth/screens/LoginScreen';
import OtpScreen from '@/packages/Auth/screens/OtpScreen';
import RegisterSuccessScreen from '@/packages/Auth/screens/RegisterSuccessScreen';
import { SignUpScreen } from '@/packages/Auth/screens/SignUpScreen';
import OnboardingScreen from '@/packages/Onboarding/OnboardingScreen';
import SplashScreen from '@/packages/Splash/SplashScreen';

import HomeScreen from '@/packages/Client/home/screens/Home';
import HorseDetails from '@/packages/Client/Services/screens/HorseDetails';
import Horses from '@/packages/Client/Services/screens/Horses';
import PhotoSessionDetails from '@/packages/Client/Services/screens/PhotoSessionDetails';
import PhotoSessionScreen from '@/packages/Client/Services/screens/PhotoSessionScreen';
import { default as RidesScreen, default as Services } from '@/packages/Client/Services/screens/RidesScreen';
import ServicesScreen from '@/packages/Client/Services/screens/ServicesScreen';
import StableServicesDetails from '@/packages/Client/Services/screens/StableServicesDetails';
 import { useSplashStore } from '@/store/useSplashStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from '@/packages/Client/Profile/screens/Profile';
import Events from '@/packages/Client/Events/screens/Events';
import EventDetails from '@/packages/Client/Events/screens/EventDetails';
import BookingScreen from '@/packages/Client/Events/screens/BookingScreen';
import BookingSuccessScreen from '@/packages/Client/Events/screens/BookingSuccessScreen';

// React Query client
const queryClient = new QueryClient();

// Define tab params
export type MainTabParamList = {
  home: undefined;
  event: undefined;
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
    case 'event': IconComponent = Icons.discountShape; break;
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
      <Tab.Screen name={navigationEnums.HOME} component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="service" component={Services} options={{ tabBarLabel: 'Service' }} />
      <Tab.Screen name="event" component={Events} options={{ tabBarLabel: 'Stable' }} />
      <Tab.Screen name="profile" component={Profile} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
}

// Main Bottom Tabs for Client (if you want to differentiate)
function ClientTabs() {
  return (
    // @ts-ignore
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name={navigationEnums.HOME} component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name="service" component={ServicesScreen} options={{ tabBarLabel: 'Service' }} />
      <Tab.Screen name="event" component={Events} options={{ tabBarLabel: 'Stable' }} />
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
      <Stack.Screen name={navigationEnums.HOME} component={ClientTabs} />
      <Stack.Screen name="stable" component={Profile} />
      <Stack.Screen name={navigationEnums.STABLE_SERVICES_DETAILS} component={StableServicesDetails} />
      <Stack.Screen name={navigationEnums.HORSES} component={Horses} />
      <Stack.Screen name={navigationEnums.HORSE_DETAILS} component={HorseDetails} />
      <Stack.Screen name={navigationEnums.SERVICES} component={ServicesScreen} />
      <Stack.Screen name={navigationEnums.RIDES} component={RidesScreen} />
      <Stack.Screen name={navigationEnums.PHOTOS} component={PhotoSessionScreen} />
      <Stack.Screen name={navigationEnums.PHOTO_SESSION_DETAILS} component={PhotoSessionDetails} />
      <Stack.Screen name={navigationEnums.PROFILE} component={Profile} />
      <Stack.Screen name={navigationEnums.EVENTS} component={Events} />
      <Stack.Screen name={navigationEnums.EVENT_DETAILS} component={EventDetails} />
      <Stack.Screen name={navigationEnums.EVENT_BOOKING} component={BookingScreen} />
      <Stack.Screen name={navigationEnums.EVENT_BOOKING_SUCCESS} component={BookingSuccessScreen} />
    </Stack.Navigator>)
}

// Main flow if logged in
function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, fullScreenGestureEnabled: true }}>
      <Stack.Screen name="home" component={AdminTabs} />
      <Stack.Screen name={navigationEnums.HOME} component={HomeScreen} />

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
  const {showSplash, setShowSplash} = useSplashStore();
  const { isLoggedIn, activeApp, loadAuthState } = useAuthStore();


  useEffect(() => {
    const init = async () => {
      await loadAuthState();
      setShowSplash(false);
    };

    init();
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      useAuthStore.setState({ activeApp: 'Onboarding' });
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
  const [initialState, setInitialState] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem("PERSISTENCE_KEY");
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        if (state) {
          setInitialState(state);
        }
      } finally {
        setIsReady(true);
      }
    };

    restoreState();
  }, []);

  if (!isReady) {
    return <SplashScreen />;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="light-content" hidden={true} backgroundColor="#293442" />
      <NavigationContainer
        initialState={initialState}
        onStateChange={(state) =>
          AsyncStorage.setItem("PERSISTENCE_KEY", JSON.stringify(state))
        }
      >
        <I18nContext>
          <App />
        </I18nContext>
        <Toast visibilityTime={500} />
      </NavigationContainer>
    </QueryClientProvider>
  );
}