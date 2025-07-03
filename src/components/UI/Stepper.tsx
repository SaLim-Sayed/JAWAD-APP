import { TouchableOpacity, View } from "react-native";
import Row from "./Row";
import React from "react";
import Col from "./Col";
import Image from "./Image";
import AppText from "./AppText"; 

interface Step {
    id: string;
    icon: any;
    component: React.ReactNode;
  }
  
  interface StepperProps {
    steps: Step[];
    currentStepIndex: number;
    setCurrentStepIndex: (index: number) => void;
  }
  
 export const Stepper: React.FC<StepperProps> = ({
    steps,
    currentStepIndex,
    setCurrentStepIndex,
  }) => {
    return (
      <View className="w-full">
        {/* Header Step Icons */}
        <Row items="center" justify="center" gap={6} className=" py-6">
          {steps.map((step, index) => {
            const isActive = index === currentStepIndex;
  
            return (
              <Row items="center" justify="evenly" key={step.id}>
              <TouchableOpacity onPress={() => setCurrentStepIndex(index)} key={step.id}>
                <Col items="center"  >
                  <Image
                    source={step.icon}
                    stroke={isActive ? "#05C212" : "none"}
                     className={`w-8 h-8 ${
                      isActive ? "bg-brownColor-400 rounded-full" : "opacity-40"
                    }`}
                  />
                  <AppText className={isActive ? "text-[#05C212] " : "text-brownColor-300 font-bold"}>{step.id}</AppText>
                </Col>
  
                
              </TouchableOpacity>{index < steps.length - 1 && (
                  <View className="w-8 h-[1px] bg-brownColor-300" />
                )}
              </Row>
              );
          })}
        </Row>
  
        {/* Render current step component */}
        <View className="px-4">
          {steps[currentStepIndex]?.component}
        </View>
      </View>
    );
  };
  