import React from "react";
import { View } from "react-native";
import AppLoader from "./AppLoader";

interface LoaderBoundaryProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const LoaderBoundary: React.FC<LoaderBoundaryProps> = ({ isLoading, children }) => {
  if (isLoading) {
    return <AppLoader />;
  }

  return <View className="flex-1">{children}</View>;
};

export default LoaderBoundary;
