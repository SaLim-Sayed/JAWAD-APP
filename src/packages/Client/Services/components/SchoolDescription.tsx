import React from "react";
import { View } from "react-native";
import { useTranslation } from "react-i18next";
import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Divider from "@/components/UI/Divider";
import { t } from "@/lib";
import { TSchool, TSchoolProps } from "../../home/@types/school.types";
import LocationCard from "@/components/UI/MapCard";

const SchoolDescription = ({ school }: { school: TSchoolProps }) => {

  const fields = [
    { label: t("horse.name"), valueKey: "name" },
    { label: t("horse.description"), valueKey: "description" },
    { label: t("horse.address"), valueKey: "address" },
    { label: t("horse.region"), valueKey: "region" },
    { label: t("horse.city"), valueKey: "city" },
  ];

  return (
    <View className="mx-1 p-3 bg-[#FAF7F5] rounded-xl">

      {fields.map((field, idx) => (
        <React.Fragment key={field.valueKey}>
          <Col>
            <AppText className="text-brownColor-300 tajawal-semibold-16">
              {field.label}
            </AppText>

            <AppText className="text-brownColor-100 tajawal-light-16">
             {/* @ts-ignore */}
              {school[field.valueKey as keyof typeof school]}
            </AppText>
          </Col>

          {idx < fields.length - 1 && <Divider />}
        </React.Fragment>
      ))}

    </View>
  );
};

export default SchoolDescription;
