import AppText from "@/components/UI/AppText";
import Divider from "@/components/UI/Divider";
import { Icons } from "@/constants";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import React from "react";
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";
 
interface HorseHeaderProps {
  title?: string; 
  userName?: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

const HorseHeader: React.FC<HorseHeaderProps> = ({ title, userName,onBack,showBackButton }) => {
  const { goBack } = useGlobalNavigation();
  return (
    <View style={styles.root}>
       <View style={{ height: Platform.OS === "ios" ? 44 : StatusBar.currentHeight }} />
      <View style={styles.headerContent}>
        {showBackButton && <TouchableOpacity onPress={onBack?onBack:goBack} style={styles.backButton} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} disabled={!showBackButton}>
          <Icons.backArrow width={24} height={24} />
        </TouchableOpacity>}
       {userName ? <View style={styles.title}>  
            <AppText className="tajawal-semibold-16 text-center text-brownColor-400">{userName}</AppText>
        </View> : <View style={styles.title}>
            <AppText className="tajawal-semibold-16 text-center text-brownColor-400">{title}</AppText>
        </View>}
        <View style={{ width: 32 }} />
      </View>
      <Divider/>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden"
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
  backButton: {
    width: 32,
    height: 32,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 20,
    color: "#222",
    fontFamily: "System",
    fontWeight: "400",
  },
  bold: {
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#E6E1DC",
    marginTop: 4,
    marginHorizontal: 0,
  },
});

export default HorseHeader;