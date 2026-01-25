import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Divider from "@/components/UI/Divider";
import { HorseDetail } from "../@types/horse.types";
import { t } from "@/lib";
import { useAuthStore } from "@/store/useAuthStore";

const HorseDescription = ({ horse }: { horse: HorseDetail }) => {
 
  const {authData}=useAuthStore()
  const fields = [
    {label: t('horse.name'), valueKey: 'name'},
    {label: t('horse.description'), valueKey: 'description'},
    {label: t('horse.gender'), valueKey: 'gender'},
    {label: t('horse.level'), valueKey: 'level'},
    {label: t('horse.type'), valueKey: 'type'},
    {label: t('horse.feature'), valueKey: 'feature'},
    {label: t('horse.price'), valueKey: 'price',currency:authData?.nationality==='Foreign'?'USD':'EGP'},
  ];

  console.log(authData?.nationality);
  return (
    <View className="mx-1 p-3 bg-[#FAF7F5] rounded-xl">
      {fields.map((field, idx) => (
        <React.Fragment key={field.valueKey}>
          <Col>
            <AppText className="text-brownColor-300 tajawal-semibold-16">
              {field.label}
            </AppText>
            <AppText className="text-brownColor-100 tajawal-light-16">
              {horse[field.valueKey as keyof typeof horse]} - 
              {field.currency &&  
                 field.currency
               }
            </AppText>
          </Col>
          {idx < fields.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default HorseDescription;
