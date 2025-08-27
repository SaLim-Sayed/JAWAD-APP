import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "@/components/UI/AppText";
import Image from "@/components/UI/Image";
import { images } from "@/assets/images";

const QuoteCard: React.FC = () => (
  <View  className=" flex-1  flex-row items-center justify-center w-full    mx-2 overflow-hidden">           
    <Image source={images.heroImage} style={styles.bgImage} resizeMode="cover"  />
  </View>
);

const styles = StyleSheet.create({
  outer: { width: "90%",  alignItems: "center",justifyContent:"center",    },
  bgImage: {    position: "relative", direction: "ltr" , width: "88%",height: 205 },
  quoteCard: { borderRadius: 18, overflow: "hidden", width: "100%", height: 149, marginTop: 112, position: "absolute", bottom: 0, left: 0, right: 0 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(119, 77, 4,0.38)" },
  innerOverlay: { padding: 16, ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(119, 77, 4,0.38)", justifyContent: "center" },
});

export default QuoteCard;