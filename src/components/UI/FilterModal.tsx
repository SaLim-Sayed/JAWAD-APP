// components/FilterModal.tsx
import AppButton from "@/components/UI/AppButton";
import { t } from "@/lib";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import Checkbox from "./Checkbox";
import Image from "./Image";
import { Icons } from "@/constants";
import AppText from "./AppText";
import { cities } from "@/constants/data";
import { useLanguage } from "@/store";

// ✅ updated categories
type FilterCategory = "level" | "feature" | "color" | "vehicles"|"city";

interface FilterOptions {
  level: string[];
  feature: string[];
  color: string[];
  vehicles: string[];
  city: any[]
}

interface Filters {
  level: string[];
  feature: string[];
  color: string[];
  rating: number;
  vehicles: string[];
  city: any[]
}

const FilterModal: React.FC<{
  visible: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  currentFilters: Partial<Filters>;
  allowedFilters?: FilterCategory[];
}> = ({ visible, onClose, onApply, currentFilters, allowedFilters }) => {
  const { language } = useLanguage()
  const options: FilterOptions = {
    level: ["beginner", "intermediate", "professional"],
    vehicles: ["arabic", "other", "camel", "vehicle", "carets"],
    feature: ["running", "dancing"],
    color: ["white", "brown", "black"],
    city: cities.map((city) => city[language]),
  };

  // Normalize currentFilters to include all fields with defaults
  const getNormalizedFilters = (filters: Partial<Filters>): Filters => ({
    level: filters?.level || [],
    feature: filters?.feature || [],
    color: filters?.color || [],
    rating: filters?.rating || 0,
    vehicles: filters?.vehicles || [],
    city: filters?.city || [],
  });

  const [localFilters, setLocalFilters] = useState<Filters>(getNormalizedFilters(currentFilters));

  const toggleOption = (category: FilterCategory, value: string) => {
    const updated = localFilters[category].includes(value)
      ? localFilters[category].filter((v) => v !== value)
      : [...localFilters[category], value];
    setLocalFilters({ ...localFilters, [category]: updated });
  };

  const handleRatingChange = (rating: number) => {
    setLocalFilters({ ...localFilters, rating });
  };

  const handleApply = () => {
    onApply(localFilters);
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (visible) {
      setLocalFilters(getNormalizedFilters(currentFilters));
    }
  }, [visible, currentFilters]);


  const resetFilters = () => {
    const emptyFilters: Filters = {
      level: [],
      vehicles: [],
      feature: [],
      color: [],
      rating: 0,
      city: [],
    };
    setLocalFilters(emptyFilters);
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View className="flex-1  h-full  bg-white px-4 pt-6">
        {/* Header */}
        <View className="flex-row justify-between items-center mb-6">
          <AppText className="text-xl text-brownColor-400 font-bold">{t("filters.title")}</AppText>
          <View className="flex-row items-center gap-2">
            <TouchableOpacity className="flex-row items-center gap-2" onPress={resetFilters}>
              <AppText className="text-blue-500 font-medium">{t("filters.resetAll")}</AppText>
            </TouchableOpacity>
            <TouchableOpacity className="flex-row items-center gap-2" onPress={handleClose}>
              <AppText className="text-red-800 font-medium">X</AppText>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 2,
            marginHorizontal: 10,
          }}
          style={{ height: 400 }}
        >
          {(Object.keys(options) as FilterCategory[])
            .filter((category) => !allowedFilters || allowedFilters.includes(category))
            .map((category,index) => (
            <View key={category+index} className="mb-6">
              <Text className="text-lg font-semibold text-brownColor-400 capitalize mb-3">
                {t(`filters.${category}`)}
              </Text>
              {options[category].map((option,index) => (
                <Pressable
                  key={option+index}
                  onPress={() => toggleOption(category, option)}
                  className="flex-row items-center py-2"
                  android_ripple={{ color: "rgba(0, 0, 0, 0.1)" }}
                >
                  <Checkbox
                    checked={localFilters[category].includes(option)}
                    onPress={() => toggleOption(category, option)}
                  />
                  <Text className="text-base text-gray-800">

                    {category === 'city'
                      ? option
                      : t(`filters.options.${option}`)}
                  </Text>
                </Pressable>
              ))}
            </View>
          ))}

          {/* Rating Section - only show if no allowedFilters specified (i.e., show all filters) */}
          {!allowedFilters && (
            <View className="mb-6">
              <Text className="text-lg font-semibold  text-brownColor-400  mb-3">{t("filters.minRating")}</Text>
              <View className="flex-row items-center">
                <StarRating
                  rating={localFilters.rating}
                  onChange={handleRatingChange}
                  starSize={30}
                  starStyle={{ marginHorizontal: 2 }}
                />
                <Text className="ml-3 text-base text-gray-600">
                  {localFilters.rating > 0
                    ? t("filters.starCount", { count: localFilters.rating })
                    : t("filters.anyRating")}
                </Text>
              </View>
            </View>
          )}

          {/* Applied Filters Summary */}
          <View className="mb-6">
            <Text className="text-lg  text-brownColor-400  font-semibold mb-3">{t("filters.applied")}</Text>
            <View className="flex-row flex-wrap">
              {(Object.keys(localFilters) as (keyof Filters)[])
                .filter((category) => {
                  if (allowedFilters) {
                    if (category === "rating") return false;
                    return allowedFilters.includes(category as FilterCategory);
                  }
                  return true;
                })
                .map((category) => {
                  if (category === "rating") {
                    return localFilters.rating > 0 ? (
                      <View
                        key="rating"
                        className="bg-blue-100 px-3 py-1 rounded-full mr-2 mb-2"
                      >
                        <Text className="text-brownColor-400 text-sm">
                          {t("filters.starCount", { count: localFilters.rating })}
                        </Text>
                      </View>
                    ) : null;
                  }

                  return localFilters[category as FilterCategory].map((item) => (
                    <View
                      key={`${category}-${item}`}
                      className="bg-blue-100 px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      <Text className="text-brownColor-400 text-sm">
                        {category === 'city' ? item : t(`filters.options.${item}`)}
                      </Text>
                    </View>
                  ));
                })}
            </View>
            {(() => {
              const hasAppliedFilters = (Object.keys(localFilters) as (keyof Filters)[])
                .filter((category) => {
                  if (allowedFilters) {
                    if (category === "rating") return false;
                    return allowedFilters.includes(category as FilterCategory);
                  }
                  return true;
                })
                .some((category) => {
                  if (category === "rating") {
                    return localFilters.rating > 0;
                  }
                  return (localFilters[category] as any[]).length > 0;
                });
              
              if (!hasAppliedFilters) {
                return <Text className="text-gray-500 italic">{t("filters.noApplied")}</Text>;
              }
              return null;
            })()}
          </View>
        </ScrollView>

        {/* Action Buttons */}
        <View className="pt-4 pb-6   border-t border-gray-200">
          <AppButton title={t("filters.apply")} onPress={handleApply} className="mb-3" />
          <AppButton title={t("filters.cancel")} variant="outline" onPress={handleClose} />
        </View>
      </View>
    </Modal>
  );
};

export default FilterModal;
