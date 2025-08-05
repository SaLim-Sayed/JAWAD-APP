// components/FilterModal.tsx
import React, { useState } from "react";
import { Modal, View, ScrollView, Text, Pressable, TouchableOpacity } from "react-native";
import StarRating, { StarRatingDisplay } from "react-native-star-rating-widget";
import AppButton from "@/components/UI/AppButton";

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

// Filter types
type FilterCategory = "nationality" | "level" | "feature" | "color" | "service";

interface FilterOptions {
  nationality: string[];
  level: string[];
  feature: string[];
  color: string[];
  service: string[];
}

interface Filters {
  nationality: string[];
  level: string[];
  feature: string[];
  color: string[];
  service: string[];
  rating: number;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  currentFilters: Filters;
}

const options: FilterOptions = {
  nationality: ["Saudi", "Egyptian", "Kuwaiti"],
  level: ["Beginner", "Intermediate", "Advanced"],
  feature: ["Indoor", "Outdoor", "Trainer Available"],
  color: ["White", "Brown", "Black"],
  service: ["Riding", "Training", "Boarding"],
};

const FilterModal: React.FC<FilterModalProps> = ({ 
  visible, 
  onClose, 
  onApply, 
  currentFilters 
}) => {
  const [localFilters, setLocalFilters] = useState<Filters>(currentFilters);

  const toggleOption = (category: FilterCategory, value: string): void => {
    const updated = localFilters[category].includes(value)
      ? localFilters[category].filter((v) => v !== value)
      : [...localFilters[category], value];
    setLocalFilters({ ...localFilters, [category]: updated });
  };

  const handleRatingChange = (rating: number): void => {
    setLocalFilters({ ...localFilters, rating });
  };

  const handleApply = (): void => {
    onApply(localFilters);
  };

  const handleClose = (): void => {
    onClose();
  };

  const resetFilters = (): void => {
    const emptyFilters: Filters = {
      nationality: [],
      level: [],
      feature: [],
      color: [],
      service: [],
      rating: 0,
    };
    setLocalFilters(emptyFilters);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1 bg-white px-4 pt-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <Text className="text-xl font-bold">Filters</Text>
          <TouchableOpacity onPress={resetFilters}>
            <Text className="text-blue-500 font-medium">Reset All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {(Object.keys(options) as FilterCategory[]).map((category) => (
            <View key={category} className="mb-6">
              <Text className="text-lg font-semibold capitalize mb-3">
                {category}
              </Text>
              {options[category].map((option) => (
                <Pressable
                  key={option}
                  onPress={() => toggleOption(category, option)}
                  className="flex-row items-center py-2"
                  android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
                >
                  <Checkbox
                    checked={localFilters[category].includes(option)}
                    onPress={() => toggleOption(category, option)}
                  />
                  <Text className="text-base text-gray-800">{option}</Text>
                </Pressable>
              ))}
            </View>
          ))}

          {/* Rating Section */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-3">Minimum Rating</Text>
            <View className="flex-row items-center">
              <StarRating
                rating={localFilters.rating}
                onChange={handleRatingChange}
                starSize={30}
                starStyle={{ marginHorizontal: 2 }}
              />
              <Text className="ml-3 text-base text-gray-600">
                {localFilters.rating > 0 ? `${localFilters.rating} stars` : "Any rating"}
              </Text>
            </View>
          </View>

          {/* Applied Filters Summary */}
          <View className="mb-6">
            <Text className="text-lg font-semibold mb-3">Applied Filters</Text>
            <View className="flex-row flex-wrap">
              {(Object.keys(localFilters) as (keyof Filters)[]).map((category) => {
                if (category === "rating") {
                  return localFilters.rating > 0 ? (
                    <View
                      key="rating"
                      className="bg-blue-100 px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      <Text className="text-brownColor-400 text-sm">
                        {localFilters.rating}+ stars
                      </Text>
                    </View>
                  ) : null;
                }
                
                return localFilters[category as FilterCategory].map((item) => (
                  <View
                    key={`${category}-${item}`}
                    className="bg-blue-100 px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    <Text className="text-brownColor-400 text-sm">{item}</Text>
                  </View>
                ));
              })}
            </View>
            {Object.values(localFilters).every((arr) => 
              Array.isArray(arr) ? arr.length === 0 : arr === 0
            ) && (
              <Text className="text-gray-500 italic">No filters applied</Text>
            )}
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View className="pt-4 pb-6 border-t border-gray-200">
          <AppButton 
            title="Apply Filters" 
            onPress={handleApply}
            className="mb-3"
          />
          <AppButton
            title="Cancel"
            variant="outline"
            onPress={handleClose}
          />
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;