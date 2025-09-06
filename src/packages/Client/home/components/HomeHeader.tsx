import { images } from "@/assets/images";
import AppText from "@/components/UI/AppText";
import Image from "@/components/UI/Image";
import { Icons } from "@/constants";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { navigationEnums } from "@/provider/navigationEnums";
import { useHorseStore } from "@/store/useHorseStore";
import { usePutMutation } from "@/hooks/usePutMutation";
import { apiKeys } from "@/hooks/apiKeys";
import { useAuthStore } from "@/store/useAuthStore";
import { Switch, Portal, Dialog, Button } from "react-native-paper"; // ✅
import { useApiMutation } from "@/hooks";
import { showGlobalToast } from "@/hooks/useGlobalToast";

interface HomeHeaderProps {
  userName: string;
  location: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ userName, location }) => {
  const { t } = useTranslation();
  const { navigate } = useGlobalNavigation();
  const { authData ,stableEnabled,setStableEnabled} = useAuthStore();
 console.log({stableEnabled})
  const { getCartItemsCount } = useHorseStore();
  const cartCount = getCartItemsCount();

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingValue, setPendingValue] = useState<boolean | null>(null);

  const { mutate: disableStable, isPending: disabling } = useApiMutation({
    url: apiKeys.stable.disableStable(authData.id),
    method: "put",
  });



  const handleToggleStable = (newValue: boolean) => {
    setPendingValue(newValue);
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    if (pendingValue === false) {
      disableStable({}, {
        onSuccess: () => { setStableEnabled(false); showGlobalToast({ type: "success", title: "Stable Disabled", body: "Stable disabled successfully" }) }
      });
    } else {
      disableStable({}, {
        onSuccess: () => { setStableEnabled(true); showGlobalToast({ type: "success", title: "Stable Enabled", body: "Stable enabled successfully" }) }
      });
    }
    setShowConfirm(false);
  };

  return (
    <View style={styles.root}>
      <Image source={images.homeHorse} style={styles.bgImage} resizeMode="stretch" />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <AppText className="text-white tajawal-semibold-16 mb-1">
          {t("Global.welcome")} 🐎
        </AppText>
        <AppText className="text-white tajawal-semibold-16 capitalize mb-1">
          {userName}
        </AppText>
        <View className="bg-brownColor-300 flex-row items-center w-48 rounded-full p-1 my-2 gap-2">
          <Image source={Icons.locationTick} tint="white" />
          <AppText className="text-white ">{location}</AppText>
        </View>

        
      </View>

      <Portal>
        <Dialog style={{backgroundColor:"#fff"}} visible={showConfirm} onDismiss={() => setShowConfirm(false)}>
          <Dialog.Title>{t("Global.confirm")}</Dialog.Title>
          <Dialog.Content>
            <AppText className="text-brownColor-400 tajawal-semibold-16">
              {pendingValue
                ? t("Global.confirmEnableStable")
                : t("Global.confirmDisableStable")}
            </AppText>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowConfirm(false)}>{t("Global.cancel")}</Button>
            <Button onPress={handleConfirm}>{t("Global.ok")}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <View style={styles.icons}>
        <TouchableOpacity onPress={() => navigate(navigationEnums.CART)} style={styles.cartButton}>
          <Icons.shoppingCart color="#fff" width={48} height={48} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <AppText className="text-white tajawal-bold-10">{cartCount}</AppText>
            </View>
          )}
        </TouchableOpacity>
        {authData.role === "stable" && <View style={styles.switchRow}>
          <AppText className="text-white tajawal-semibold-14">
            {stableEnabled ? t("Global.stableEnabled") : t("Global.stableDisabled")}
          </AppText>
          <Switch
            value={stableEnabled}
            onValueChange={handleToggleStable}
            disabled={disabling}
            color="#34C759"
          />
        </View>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 220,
    position: "relative",
    justifyContent: "center",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    paddingHorizontal: 16,
    paddingTop: 106,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(30,22,16,0.4)",
  },
  content: {
    position: "absolute",
    alignItems:"flex-start",
    left: 4,
    right: 4,
    bottom: 32,
    padding: 16,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 12,
  },
  icons: {
    position: "absolute",
    right: 24,
    top: 44,
    flexDirection: "column",
    alignItems: "flex-end",
    gap: 16,
  },
  cartButton: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF3B30",
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
});

export default HomeHeader;
