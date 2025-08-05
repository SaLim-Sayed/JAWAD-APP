import AppHeader from "@/components/UI/AppHeader";
import AppWrapper from "@/components/UI/AppWrapper";
import { Icons } from "@/constants";
import { t } from "i18next";
import React, { useState } from "react";
import { View } from "react-native";
import BookingPayment from "../components/BookingPayment";
import { Payment } from "../components/Payment";
import UserInfo from "../components/UserInfo";

export default function BookingScreen() {

 const [paymentUrl,setPaymentUrl] = useState('') 
 
  const steps = [

    {
      id: "events",
      icon: Icons.camera,
      component: <UserInfo setPaymentUrl={setPaymentUrl} onNext={() => { setCurrentStepIndex(currentStepIndex + 1) }} />,

    },
    {
      id: "review",
      icon: Icons.cardTick,
      component: <Payment paymentUrl={paymentUrl} onNext={() => { setCurrentStepIndex(currentStepIndex + 1) }} />,
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
        <AppHeader title={t("Global.booking")} showBackButton />
        <UserInfo setPaymentUrl={setPaymentUrl} onNext={() => { setCurrentStepIndex(currentStepIndex + 1) }} />
        {/* <Stepper steps={steps} setCurrentStepIndex={setCurrentStepIndex} currentStepIndex={currentStepIndex} /> */}
      </View>
    </AppWrapper>
  );
}
