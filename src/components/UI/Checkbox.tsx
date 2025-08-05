
// components/FilterModal.tsx
import React from "react";
import { Text, TouchableOpacity } from "react-native";

// Built-in Checkbox Component
interface CheckboxProps {
    checked: boolean;
    onPress: () => void;
    size?: number;
    checkedColor?: string;
    uncheckedColor?: string;
    borderColor?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onPress,
    size = 20,
    checkedColor = "#493225",
    uncheckedColor = "transparent",
    borderColor = "#493225",
}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: size,
                height: size,
                borderWidth: 2,
                borderColor: checked ? checkedColor : borderColor,
                backgroundColor: checked ? checkedColor : uncheckedColor,
                borderRadius: 4,
                justifyContent: "center",
                alignItems: "center",
                marginRight: 8,
            }}
            activeOpacity={0.7}
        >
            {checked && (
                <Text
                    style={{
                        color: "white",
                        fontSize: size * 0.7,
                        fontWeight: "bold",
                    }}
                >
                    ✓
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default Checkbox;
