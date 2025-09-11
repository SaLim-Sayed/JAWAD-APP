import React from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const { width } = Dimensions.get("window");
 
export default function YouTubeEmbed({embedUrl}: {embedUrl: string}) {
  return (
    <View style={styles.container}>
      <WebView
        style={styles.webview}
        source={{ uri: embedUrl }}
        allowsFullscreenVideo
        javaScriptEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: (width * 9) / 16, // 16:9 ratio
  },
  webview: {
    flex: 1,
  },
});
