import React from "react";
import { View } from "react-native";
import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Divider from "@/components/UI/Divider";
import { HorseDetail } from "../@types/horse.types";

 
const fields = [
  { label: "Horse Name", valueKey: "name" },
  { label: "Horse Description", valueKey: "description" },
  { label: "Horse Gender", valueKey: "gender" },
  { label: "Horse Level", valueKey: "level" },
  { label: "Horse Features", valueKey: "features" },
  { label: "Price", valueKey: "price" },
];

const HorseDescription = ({horse}: {horse: HorseDetail}) => {
 
  return (
    <View className="mx-1  p-3 bg-[#FAF7F5] rounded-xl">
      {fields.map((field, idx) => (
        <React.Fragment key={field.valueKey}>
          <Col>
            <AppText className="text-brownColor-300 tajawal-semibold-16">
              {field.label}
            </AppText>
            <AppText className="text-brownColor-100 tajawal-light-16">
              {horse[field.valueKey as keyof typeof horse]}
            </AppText>
          </Col>
          {idx < fields.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default HorseDescription;