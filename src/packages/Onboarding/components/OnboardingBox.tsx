import React from "react";
import {
  Dimensions,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  View,
  I18nManager,
} from "react-native";
import AppText from "@/components/UI/AppText";
import { Icons } from "@/constants";
import { useAuthStore } from "@/store/useAuthStore";
import { OnboardBoxProps } from "../@types/OnboardItem";
import NavButton from "./NavbarButton";
import { useTranslation } from "react-i18next";
 import LanguageSwitcher from "@/provider/Language/LanguageSwitcher";

export default function OnboardingBox({
  item,
  currentButtons,
  handleNext,
  handleBack,
}: OnboardBoxProps) {
  const { width } = Dimensions.get("window");
  const { i18n, t } = useTranslation();
  const isRTL = i18n.dir() === "rtl";

  const leftButton =
    currentButtons?.[0] && !currentButtons[0]?.disabled
      ? currentButtons[0]
      : null;

  const rightButton =
    currentButtons?.[1] && !currentButtons[1]?.disabled
      ? currentButtons[1]
      : null;

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
            <LanguageSwitcher/>

       <View
        className={`bg-white/60 relative rounded-3xl p-8 mx-4 mb-8 ${
          !item.description ? "bg-transparent" : ""
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
            <TouchableOpacity className="bg-brownColor-400 px-6 py-2 rounded-2xl mb-4 w-full items-center">
              <AppText className="text-brownColor-50 tajawal-semibold-16">
                {t("Sign In")}
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity className="bg-brownColor-400 px-6 py-2 rounded-2xl mb-4 w-full items-center">
              <AppText className="text-brownColor-50 tajawal-semibold-16">
                {t("Sign up")}
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => useAuthStore.getState().setActiveApp("Client")}
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
              className={`flex-row   mx-auto gap-4 justify-between ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {leftButton && (
                <NavButton
                  text={t(leftButton.text)}
                  onPress={isRTL ? handleNext : handleBack}
                  iconLeft={
                    <View className="flex items-center justify-center h-12 p-4 w-12 rounded-full bg-amber-950">
                      <Icons.arrowLeft className="text-white" />
                    </View>
                  }
                />
              )}

              {rightButton && (
                <NavButton
                  text={t(rightButton.text)}
                  onPress={isRTL ? handleBack : handleNext}
                  iconRight={
                    <View className="flex items-center justify-center h-12 p-4 w-12 rounded-full bg-amber-950">
                      <Icons.arrowRight className="text-white" />
                    </View>
                  }
                />
              )}
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}
