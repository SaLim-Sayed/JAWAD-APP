import { Stepper } from "@/components/UI/Stepper";
import { Icons } from "@/constants";
import React, { useState } from "react";
import Events from "./Events";
import ServicesScreen from "../../Services/screens/ServicesScreen";
import RidesScreen from "../../Services/screens/RidesScreen";
import UserInfo from "../components/UserInfo";
import useAppRouteParams from "@/provider/useAppRouteParams";
import AppWrapper from "@/components/UI/AppWrapper";
import AppHeader from "@/components/UI/AppHeader";
import GroupBookingSummary from "../components/GroupBookingSummary";
import { FormProvider } from "react-hook-form";
import { View } from "react-native";
import BookingPayment from "../components/BookingPayment";

export default function BookingScreen() {

  const { id } = useAppRouteParams("EVENT_BOOKING")
  const steps = [
   
    {
      id: "events",
      icon: Icons.camera,
      component: <UserInfo onNext={() => { setCurrentStepIndex(currentStepIndex + 1) }}  />,

    },
    {
      id: "review",
      icon: Icons.clipboardTick,
      component: <GroupBookingSummary hasFemaleRiders type="group" date="2025-07-03" riders={5} gender="male" promo="" perPerson={100} taxes={10} total={110} onNext={() => { setCurrentStepIndex(currentStepIndex + 1) }} />,
    },
    {
      id: "payment",
      icon: Icons.cardTick,
      component: <BookingPayment onNext={() => { setCurrentStepIndex(currentStepIndex + 1) }} onBack={() => { setCurrentStepIndex(currentStepIndex - 1) }} />,
    },
  ];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  return (
    <AppWrapper>
      <View className="w-full bg-white flex-1 ">
      <AppHeader title="Booking" showBackButton />
      <Stepper steps={steps} setCurrentStepIndex={setCurrentStepIndex} currentStepIndex={currentStepIndex} />
      </View>
    </AppWrapper>
  );
}
