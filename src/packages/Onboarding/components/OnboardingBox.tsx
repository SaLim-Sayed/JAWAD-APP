import AppText from "@/components/UI/AppText";
import { Icons } from "@/constants";
import LanguageSwitcher from "@/provider/Language/LanguageSwitcher";
import { navigationEnums } from "@/provider/navigationEnums";
import { Role } from "@/provider/NavigationParamsList";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useAuthStore } from "@/store/useAuthStore";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  ImageBackground,
  Modal,
  Pressable,
  StatusBar,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { OnboardBoxProps } from "../@types/OnboardItem";
import NavButton from "./NavbarButton";

export default function OnboardingBox({
  item,
  currentButtons,
  handleNext,
  handleBack,
}: OnboardBoxProps) {
  const { navigate } = useGlobalNavigation()
  const { width } = Dimensions.get("window");
  const { i18n, t } = useTranslation();
  const isRTL = i18n.dir() === "rtl";
  const { setActiveApp, setRole } = useAuthStore();
  const [showBusinessModal, setShowBusinessModal] = useState(false);

  const openBusinessModal = () => setShowBusinessModal(true);
  const closeBusinessModal = () => setShowBusinessModal(false);

  const leftButton =
    currentButtons?.[0] && !currentButtons[0]?.disabled
      ? currentButtons[0]
      : null;

  const rightButton =
    currentButtons?.[1] && !currentButtons[1]?.disabled
      ? currentButtons[1]
      : null;

  const navigateToLogin = (role: Role) => {
    setTimeout(() => {
      navigate(navigationEnums.LOGIN_SCREEN, { role })
      setRole(role)
    }, 0);
  }
  const navigateToSignUp = () => {
    setTimeout(() => {
      navigate(navigationEnums.SIGNUP_SCREEN)
    }, 0);
  }
  return (
    <ImageBackground
      source={item.image}
      style={{ width, height: "100%" }}
      resizeMode="cover"
      className="justify-end"
    >
      <StatusBar
        hidden={false}
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <LanguageSwitcher />

      <View
        className={`bg-white/60 relative rounded-3xl p-8 mx-4 mb-8 ${!item.description ? "bg-transparent" : ""
          }`}
      >
        {item?.title && (
          <AppText className="tajawal-medium-20 text-center mb-4 text-brownColor-300">
            {t(item.title)}
          </AppText>
        )}

        {item.description ? (
          <AppText className="text-brownColor-300 text-center mb-8 tajawal-16">
            {t(item.description)}
          </AppText>
        ) : (
          <View className="items-center">
            <AppText className="text-brownColor-400  text-center mb-4 tajawal-semibold-18">
              Choose your role
            </AppText>
            <TouchableOpacity onPress={() => navigateToLogin("auth")} className="bg-brownColor-400 px-6 py-2 rounded-2xl mb-4 w-full items-center">
              <AppText className="text-brownColor-50 tajawal-semibold-16">
                Login as  User
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => openBusinessModal()} className="bg-brownColor-400 px-6 py-2 rounded-2xl mb-4 w-full items-center">
              <AppText className="text-brownColor-50 tajawal-semibold-16">
                Login as  Business owner
              </AppText>
            </TouchableOpacity>


            <TouchableOpacity
              onPress={() => setActiveApp("Client")}
              className="bg-brownColor-50 px-6 py-2 rounded-2xl mb-4 w-full items-center"
            >
              <AppText className="text-brownColor-400 tajawal-semibold-16">
                {t("View as a Guest")}
              </AppText>
            </TouchableOpacity>
          </View>
        )}

        {(leftButton || rightButton) && (
          <View className="absolute -bottom-4 left-10 right-10 px-8">
            <View
              className={`flex-row   mx-auto gap-4 justify-between ${isRTL ? "flex-row-reverse" : ""
                }`}
            >
              {leftButton && (
                <NavButton
                  text={t(leftButton.text)}
                  onPress={isRTL ? handleNext : handleBack}
                  iconLeft={
                    isRTL ? <View className="flex items-center justify-center h-12 p-4 w-12 rounded-full bg-amber-950">
                      <Icons.arrowLeft className="text-white" />
                    </View> : undefined
                  }
                  iconRight={
                    !isRTL ? <View className="flex items-center justify-center h-12 p-4 w-12 rounded-full bg-amber-950">
                      <Icons.arrowLeft className="text-white" />
                    </View> : undefined
                  }
                />
              )}

              {rightButton && (
                <NavButton
                  text={t(rightButton.text)}
                  onPress={isRTL ? handleBack : handleNext}
                  iconLeft={!isRTL ? <View className="flex items-center justify-center h-12 p-4 w-12 rounded-full bg-amber-950">
                    <Icons.arrowRight className="text-white" />
                  </View> : undefined}
                  iconRight={
                    isRTL ?
                      <View className="flex items-center justify-center h-12 p-4 w-12 rounded-full bg-amber-950">
                        <Icons.arrowRight className="text-white" />
                      </View>
                      : undefined
                  }
                />
              )}
            </View>
          </View>
        )}
      </View>
      <Modal
        visible={showBusinessModal}
        transparent
        animationType="slide"
        onRequestClose={closeBusinessModal}
      >
        <TouchableWithoutFeedback onPress={closeBusinessModal}>
          <View className="flex-1 justify-center items-center bg-black/50">
            <View className="bg-white w-11/12 rounded-2xl p-6">

              <AppText className="text-center mb-4 tajawal-semibold-18 text-brownColor-400">
                Choose your business role
              </AppText>

              <TouchableOpacity onPress={() => { closeBusinessModal(); navigateToLogin("photographer"); }} className="bg-brownColor-400 px-6 py-2 rounded-2xl mb-3 w-full items-center">
                <AppText className="text-white tajawal-semibold-16">Photographer</AppText>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { closeBusinessModal(); navigateToLogin("stable"); }} className="bg-brownColor-400 px-6 py-2 rounded-2xl mb-3 w-full items-center">
                <AppText className="text-white tajawal-semibold-16">Stable</AppText>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => { closeBusinessModal(); navigateToLogin("school"); }} className="bg-brownColor-400 px-6 py-2 rounded-2xl mb-3 w-full items-center">
                <AppText className="text-white tajawal-semibold-16">School</AppText>
              </TouchableOpacity>

              <Pressable onPress={closeBusinessModal} className="mt-2 items-center">
                <AppText className="text-brownColor-400 tajawal-14 underline">Cancel</AppText>
              </Pressable>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

    </ImageBackground>
  );
}
