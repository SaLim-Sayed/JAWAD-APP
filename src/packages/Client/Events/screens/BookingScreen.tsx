import AppHeader from "@/components/UI/AppHeader";
import AppWrapper from "@/components/UI/AppWrapper";
import { Stepper } from "@/components/UI/Stepper";
import { Icons } from "@/constants";
import React, { useState } from "react";
import { View } from "react-native";
import BookingPayment from "../components/BookingPayment";
import GroupBookingSummary from "../components/GroupBookingSummary";
import UserInfo from "../components/UserInfo";

export default function BookingScreen() {

 
  const steps = [

    {
      id: "events",
      icon: Icons.camera,
      component: <UserInfo onNext={() => { setCurrentStepIndex(currentStepIndex + 1) }} />,

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
