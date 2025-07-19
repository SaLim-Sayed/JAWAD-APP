import { images } from "@/assets/images";
import AppText from "@/components/UI/AppText";
import Image from "@/components/UI/Image";
import { Icons } from "@/constants";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";

interface HomeHeaderProps {
  userName: string;
  location: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ userName, location }) => {
  const { t } = useTranslation()
  return (
  <View style={styles.root}>
    <Image source={images.onboard3} style={styles.bgImage} />
    <View style={styles.overlay} />
    <View style={styles.content}>
      <AppText className="text-white  tajawal-semibold-16  mb-1 ">{t("Global.welcome")} 🐎</AppText>
      <AppText className="text-white tajawal-semibold-16 mb-1">{userName}</AppText>
      <View className="bg-brownColor-300 flex-row items-center w-48 rounded-full p-2 my-2 gap-2">
        <Image source={Icons.locationTick} tint="white"   />
        <AppText className="text-white tajawal-semibold-16">{location}</AppText>
      </View>
    </View>
    <View style={styles.icons}>
      <TouchableOpacity><Icons.notification color="#fff" width={48} height={48} /></TouchableOpacity>
      <TouchableOpacity><Icons.shoppingCart color="#fff" width={48} height={48} /></TouchableOpacity>
    </View>
  </View>
) };

const styles = StyleSheet.create({
  root: { height: 220, position: "relative", justifyContent: "center" },
  bgImage: { width: "100%", height: "100%", position: "absolute",paddingHorizontal:16, },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(30,22,16,0.4)" },
  content: { position: "absolute", left: 4, right: 4, bottom: 32, padding:16 },
  icons: { position: "absolute", right: 24, top: 44, flexDirection: "column", gap: 16 }
});

export default HomeHeader;