import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';
import { showGlobalToast } from '@/hooks/useGlobalToast';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
 
class NotificationService {
  async requestPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('✅ Notification permission granted.');
    
      return true;
    } else {
      console.log('❌ Notification permission denied.');
      return false;
    }
  }

  async getFcmToken() {
    try {
      const token = await messaging().getToken();
      if (token) {
        console.log('🔹 FCM Token:', token);
        await AsyncStorage.setItem('fcmToken', token);
      }
      return token;
    } catch (error) {
      console.log('❌ Error getting FCM token:', error);
      return null;
    }
  }

  async initNotificationListeners() {
    // Foreground message listener
    messaging().onMessage(async (remoteMessage) => {
      console.log('📩 Foreground Notification:', remoteMessage);

      const title = remoteMessage.notification?.title || 'Notification';
      const body = remoteMessage.notification?.body || 'You have a new message';

      if (Platform.OS === 'ios') {
        Alert.alert(title, body);
      } else {
        showGlobalToast({ type: 'info', title, body });
      }
    });

    // Background listener
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('📦 Background Notification:', remoteMessage);
    });

    // When app opened from background state
    messaging().onNotificationOpenedApp((remoteMessage) => {
      console.log('🔔 Opened from background:', remoteMessage);
      this.handleNotificationNavigation(remoteMessage.data);
    });

    // When app opened from killed state
    const initialMessage = await messaging().getInitialNotification();
    if (initialMessage) {
      console.log('🚀 Opened from quit state:', initialMessage);
      this.handleNotificationNavigation(initialMessage.data);
    }
  }
  

  // 💡 Navigate user based on notification payload
  handleNotificationNavigation(data: any) {
    if (!data) return;

    const screen = data?.screen;
    const id = data?.id;

   
  }

  async init() {
    const permissionGranted = await this.requestPermission();
    if (permissionGranted) {
      await this.getFcmToken();
      await this.initNotificationListeners();
    }
  }
}

export const notificationService = new NotificationService();
