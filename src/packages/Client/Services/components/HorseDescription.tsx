import React from "react";
import { View } from "react-native";
import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Divider from "@/components/UI/Divider";
import useAppRouteParams from "@/provider/useAppRouteParams";

 const dummyHorse = {
  name: "ZIZI",
  description:
    "Nostrils: wide, with thin skin around them. Tail: high, short, stiff. Neck: arched and long. Back: The back is short, as the number of vertebrae in the Arabian",
  gender: "Female",
  level: "Advanced",
  features: "running",
  price: "100$",
};

const fields = [
  { label: "Horse Name", valueKey: "name" },
  { label: "Horse Description", valueKey: "description" },
  { label: "Horse Gender", valueKey: "gender" },
  { label: "Horse Level", valueKey: "level" },
  { label: "Horse Features", valueKey: "features" },
  { label: "Price", valueKey: "price" },
];

const HorseDescription = () => {
  const { id } = useAppRouteParams("HORSE_DETAILS");
 
  return (
    <View className="mx-1  p-3 bg-[#FAF7F5] rounded-xl">
      {fields.map((field, idx) => (
        <React.Fragment key={field.valueKey}>
          <Col>
            <AppText className="text-brownColor-300 tajawal-semibold-16">
              {field.label}
            </AppText>
            <AppText className="text-brownColor-100 tajawal-light-16">
              {dummyHorse[field.valueKey as keyof typeof dummyHorse]}
            </AppText>
          </Col>
          {idx < fields.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </View>
  );
};

export default HorseDescription;