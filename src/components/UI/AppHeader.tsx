import AppText from "@/components/UI/AppText";
import Divider from "@/components/UI/Divider";
import { Icons } from "@/constants";
import { isRTL } from "@/provider/constant";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useLanguage } from "@/store";
import React from "react";
import { Platform, StatusBar, StyleSheet, TouchableOpacity, View } from "react-native";

interface AppHeaderProps {
  title?: string;
  userName?: string;
  onBack?: () => void;
  showBackButton?: boolean;
  isModal?: boolean;
  customCloseButton?: () => void;
}

const AppHeader: React.FC<AppHeaderProps> = ({ title, userName, onBack, showBackButton, isModal,customCloseButton }) => {
  const { goBack } = useGlobalNavigation();
  const { language } = useLanguage()
  return (
    <View style={styles.root}>
      <View style={{ height: Platform.OS === "ios" ? 44 : (isModal ? 10 : StatusBar.currentHeight) }} />
      <View style={styles.headerContent}>
        {showBackButton && <TouchableOpacity onPress={onBack ? onBack : goBack} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} disabled={!showBackButton}>
          <Icons.backArrow style={{
            transform: [{ rotate: `${isRTL ? 180 : 0}deg` }],
          }} width={24} height={24} />
        </TouchableOpacity>}
        {userName ? <View style={styles.title}>
          <AppText className="tajawal-semibold-16 text-center  text-brownColor-400">{userName}</AppText>
        </View> : <View style={styles.title}>
          <AppText className="tajawal-semibold-16 text-center text-brownColor-400">{title}</AppText>
        </View>}
        {customCloseButton && <TouchableOpacity onPress={customCloseButton} style={styles.backButton} hitSlop={{ top: 10, bottom: 10, left: 5, right: 5 }} disabled={!customCloseButton}>
         <AppText className="tajawal-semibold-16 text-center text-brownColor-400">X</AppText>
        </TouchableOpacity>}
       </View>
      <Divider />
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
    marginTop: 8,
    minHeight: 40,
    paddingHorizontal: 26,
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

export default AppHeader;