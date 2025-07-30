// components/Payment.tsx

import React, { useState, useEffect } from 'react';
import { Modal, SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { showGlobalToast } from '@/hooks/useGlobalToast';
import { navigationEnums } from '@/provider/navigationEnums';
import useGlobalNavigation from '@/provider/useGlobalNavigation';

export const Payment = ({ paymentUrl, onNext }: { paymentUrl: string; onNext: () => void }) => {
  const [showWebView, setShowWebView] = useState(true);
  const { navigate } = useGlobalNavigation();

  const handleClose = () => {
    setShowWebView(false);
    showGlobalToast({ type: 'info', title: 'Payment process cancelled' });
  };

  const handleWebViewNavigationStateChange = (navState: any) => {
    const { url } = navState;

    if (url.includes('success') || url.includes('completed') || url.includes('approved')) {
      setShowWebView(false);
      showGlobalToast({ type: 'success', title: 'Payment completed successfully' });
      navigate(navigationEnums.EVENT_BOOKING_SUCCESS);
    } else if (url.includes('cancel') || url.includes('failed') || url.includes('error')) {
      setShowWebView(false);
      showGlobalToast({ type: 'error', title: 'Payment was cancelled or failed' });
    }
  };

  if (!paymentUrl) return null;

  return (
    <Modal backdropColor="#fff" visible={showWebView} animationType="slide" presentationStyle="overFullScreen">
      
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Complete Payment</Text>
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
        </View>
        <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          style={styles.webview}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          scalesPageToFit
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          mixedContentMode="compatibility"
          thirdPartyCookiesEnabled
          sharedCookiesEnabled
        />
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  webview: {
    flex: 1,
  },
});
