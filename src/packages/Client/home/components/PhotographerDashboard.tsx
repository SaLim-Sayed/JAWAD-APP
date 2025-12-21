import AppText from "@/components/UI/AppText";
import AppButton from "@/components/UI/AppButton";
import StableCard from "@/components/UI/StableCard";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import Divider from "@/components/UI/Divider";
import PictureGallery from "@/components/UI/PictureGallery";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useLanguage } from "@/store";
import { GetPhotographerOwnDataResponse, PhotographerPackage, GetPhotographersResponse, PhotographerDetails } from "../../Photo-session/@types/photography.types";
import { GetStablesResponse } from "../@types/stable.type";
import React from "react";
import { FlatList, ScrollView, View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { t } from "i18next";

interface PhotographerDashboardProps {
  photographerId: string;
}

const PhotographerDashboard: React.FC<PhotographerDashboardProps> = ({ photographerId }) => {
  const { navigate } = useGlobalNavigation();
  const { language } = useLanguage();

  const { data: photographerData, isLoading: photographerLoading } = useApiQuery<GetPhotographerOwnDataResponse | GetPhotographersResponse>({
    url: apiKeys.photographer.getPhotograoher,
    key: ["getPhotographerOwnData", photographerId],
    enabled: !!photographerId,
  });

  const { data: stablesData, isLoading: stablesLoading } = useApiQuery<GetStablesResponse>({
    url: apiKeys.photographer.getStables(photographerId),
    key: ["getPhotographerStables", photographerId],
    enabled: !!photographerId,
  });

  // Handle different response formats
  // If it's GetPhotographerOwnDataResponse with photographer property
  let photographer: PhotographerDetails | undefined;
  if (photographerData && 'photographer' in photographerData) {
    photographer = photographerData.photographer;
  } else if (photographerData && '_id' in photographerData) {
    // If API returns photographer directly
    photographer = photographerData as PhotographerDetails;
  } else if (photographerData && 'photographers' in photographerData) {
    // If API returns list, find the matching photographer
    const photographersList = (photographerData as GetPhotographersResponse).photographers;
    const found = photographersList?.find((p) => p._id === photographerId);
    if (found) {
      photographer = found as PhotographerDetails;
    }
  }

  const packages = photographer?.packages || [];
  const stables = stablesData?.stables || [];
  const pictures = photographer?.picUrls || [];

  return (
    <LoaderBoundary isLoading={photographerLoading || stablesLoading}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Update Profile Button */}
          <View style={styles.section}>
            <AppButton
              title={t("Global.update_profile") || "Update Profile"}
              onPress={() => {
                navigate(navigationEnums.UPDATE_PHOTOGRAPHER, { id: photographerId });
              }}
              className="w-full"
            />
          </View>

          {/* Pictures Gallery Section */}
          {pictures.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t("Global.photos") || "Photos"}
              </Text>
              <PictureGallery 
                pictures={pictures.map((url, index) => ({ id: index, url }))} 
              />
            </View>
          )}

          {/* Description Section */}
          {photographer?.description && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t("Global.description") || "Description"}
              </Text>
              <Text style={styles.descriptionText}>
                {photographer.description}
              </Text>
            </View>
          )}

          {/* Packages Section */}
          {packages.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t("Global.packages") || "Packages"}
              </Text>
              {packages.map((pkg: PhotographerPackage, index: number) => (
                <View key={pkg._id || index} style={styles.packageContainer}>
                  <View style={styles.packageHeader}>
                    <Text style={styles.packageNumber}>
                      {t("Global.package") || "Package"} {index + 1}
                    </Text>
                  </View>
                  <View style={styles.packageContent}>
                    <View style={styles.packageInfo}>
                      <Text style={styles.packageLabel}>
                        {pkg.number} {t("Global.photos") || "photos"}
                      </Text>
                      <Text style={styles.packagePrice}>
                        {pkg.price} {t("Global.currency") || "EGP"}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Stables (Studs) Section */}
          {/* {stables.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t("Global.stables") || "Stables"} ({t("Global.select_stud") || "Select Stud"})
              </Text>
              <FlatList
                numColumns={2}
                data={stables}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item._id.toString()}
                columnWrapperStyle={styles.stableRow}
                contentContainerStyle={styles.stableContainer}
                scrollEnabled={false}
                renderItem={({ item }) => (
                  <View style={styles.stableCardWrapper}>
                    <StableCard
                      id={item._id}
                      image={item.picUrl}
                      name={item.name}
                      type={item.region}
                      rating={item.totalRating}
                      status={item.status}
                      onPressStart={() => {
                        navigate(navigationEnums.STABLE_SERVICES_DETAILS, { id: item._id });
                      }}
                    />
                  </View>
                )}
              />
            </View>
          )} */}

          {/* Empty State */}
          {pictures.length === 0 && !photographer?.description && packages.length === 0 && stables.length === 0 && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {t("Global.no_data") || "No data available"}
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
    </LoaderBoundary>
  );
};

// ========== Styles ==========
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 100
  },
  section: {
    marginTop: 25,
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#444"
  },
  descriptionText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24
  },
  packageContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15
  },
  packageHeader: {
    marginBottom: 10
  },
  packageNumber: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#555"
  },
  packageContent: {
    marginTop: 5
  },
  packageInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  packageLabel: {
    fontSize: 14,
    color: "#666"
  },
  packagePrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444"
  },
  stableRow: {
    gap: 10,
    marginBottom: 10
  },
  stableContainer: {
    alignItems: "center",
    paddingBottom: 20
  },
  stableCardWrapper: {
    flex: 1,
    marginHorizontal: 5
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999"
  }
});

export default PhotographerDashboard;
