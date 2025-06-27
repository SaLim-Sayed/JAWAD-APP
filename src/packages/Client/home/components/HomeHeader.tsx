import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "@/components/UI/AppText";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import Image from "@/components/UI/Image";
import { images } from "@/assets/images";
import { TouchableOpacity } from "react-native";

interface HomeHeaderProps {
  userName: string;
  location: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ userName, location }) => (
  <View style={styles.root}>
    <Image source={images.onboard3} style={styles.bgImage} />
    <View style={styles.overlay} />
    <View style={styles.content}>
      <AppText className="text-white text-base font-medium mb-1">Welcome 🐎</AppText>
      <AppText className="text-white text-2xl font-bold mb-1">{userName}</AppText>
      <Row className="bg-brownColor-300 items-center w-48 rounded-full p-2 my-2 gap-2">
        <Image source={Icons.locationTick} tint="white"   />
        <AppText className="text-white    ">{location}</AppText>
      </Row>
    </View>
    <View style={styles.icons}>
      <TouchableOpacity><Icons.notification color="#fff" width={48} height={48} /></TouchableOpacity>
      <TouchableOpacity><Icons.shoppingCart color="#fff" width={48} height={48} /></TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  root: { height: 220, position: "relative", justifyContent: "center" },
  bgImage: { width: "100%", height: "100%", position: "absolute",paddingHorizontal:16, },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(30,22,16,0.4)" },
  content: { position: "absolute", left: 4, right: 4, bottom: 32, padding:16 },
  icons: { position: "absolute", right: 24, top: 44, flexDirection: "column", gap: 16 }
});

export default HomeHeader;