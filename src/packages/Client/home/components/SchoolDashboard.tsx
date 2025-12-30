import AppButton from "@/components/UI/AppButton";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import PictureGallery from "@/components/UI/PictureGallery";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { t } from "i18next";
import React from "react";
import { Dimensions, FlatList, ImageBackground, ScrollView, StyleSheet, Text, View } from "react-native";
import { GetSchoolDetailsResponse } from "../@types/stable.type";

interface SchoolDashboardProps {
  schoolId: string;
}

const SchoolDashboard: React.FC<SchoolDashboardProps> = ({ schoolId }) => {
  const { navigate } = useGlobalNavigation();
 
  const { data: schoolData, isLoading: schoolLoading } = useApiQuery<GetSchoolDetailsResponse>({
    url: apiKeys.school.getSchoolDetail(schoolId),
    key: ["getSchoolDetails", schoolId],
    enabled: !!schoolId,
  });

  const school = schoolData?.school;
  const prices = school?.price || [];
  const images = school?.picUrls && school.picUrls.length > 0 
    ? school.picUrls 
    : school?.picUrl 
      ? [school.picUrl] 
      : [];

  return (
    <LoaderBoundary isLoading={schoolLoading}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Update Profile Button */}
          <View style={styles.section}>
            <AppButton
              title={t('Global.update_profile') || 'Update Profile'}
              onPress={() => {
                navigate(navigationEnums.UPDATE_SCHOOL, {id: schoolId});
              }}
              className="w-full"
            />
          </View>

          {/* School Images Gallery */}
          {images.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('Global.photos') || 'Photos'}
              </Text>
              <PictureGallery
                pictures={images.map((url, index) => ({
                  id: index.toString(),
                  url,
                }))}
              />
            </View>
          )}

          {/* School Info Card */}
          <View style={styles.section}>
            <View style={styles.infoCard}>
              {/* Rating Section */}

              {/* School Info */}
              <View style={styles.infoContainer}>
                {school?.name && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      {t('Global.name') || 'Name'}:
                    </Text>
                    <Text style={styles.infoValue}>{school.name}</Text>
                  </View>
                )}
                {school?.email && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      {t('Global.email') || 'Email'}:
                    </Text>
                    <Text style={styles.infoValue}>{school.email}</Text>
                  </View>
                )}
                {school?.phone && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      {t('Global.phone') || 'Phone'}:
                    </Text>
                    <Text style={styles.infoValue}>{school.phone}</Text>
                  </View>
                )}
                {school?.city && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      {t('Global.city') || 'City'}:
                    </Text>
                    <Text style={styles.infoValue}>{school.city}</Text>
                  </View>
                )}
                {school?.region && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      {t('Global.region') || 'Region'}:
                    </Text>
                    <Text style={styles.infoValue}>{school.region}</Text>
                  </View>
                )}
                {school?.address && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>
                      {t('Global.address') || 'Address'}:
                    </Text>
                    <Text style={styles.infoValue}>{school.address}</Text>
                  </View>
                )}
              </View>
              {school?.totalRating !== undefined && (
                <View style={styles.ratingSection}>
                  <Text style={styles.ratingLabel}>
                    {t('Global.rating') || 'Rating'}
                  </Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>
                      {school.totalRating.toFixed(1)}
                    </Text>
                    <Text style={styles.ratingStar}>⭐</Text>
                  </View>
                </View>
              )}
              {/* Description Section */}
              {school?.description && (
                <View style={styles.descriptionSection}>
                  <Text style={styles.descriptionTitle}>
                    {t('Global.description') || 'Description'}
                  </Text>
                  <Text style={styles.descriptionText}>
                    {school.description}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Prices Section */}
          {prices.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('Global.prices') || 'Prices'}
              </Text>
              <FlatList
                data={prices}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => item._id || index.toString()}
                contentContainerStyle={styles.priceSliderContainer}
                renderItem={({item, index}) => {
                  return (
                    <ImageBackground
                      //@ts-ignore
                      source={{uri: school?.picUrl}}
                      style={styles.priceCard}
                      imageStyle={styles.priceCardImage}>
                      {/* Overlay */}
                      <View style={styles.priceCardOverlay} />
                      {/* Content */}
                      <View style={styles.priceCardContent}>
                        <View style={styles.priceHeader}>
                          <Text style={styles.priceNumber}>
                            {t('Global.price') || 'Price'} {index + 1}
                          </Text>
                        </View>
                        <View style={styles.priceContent}>
                          <Text style={styles.priceLabel}>{item.name}</Text>
                          <Text style={styles.priceValue}>
                            {item.cost} {t('Global.currency') || 'EGP'}
                          </Text>
                        </View>
                      </View>
                    </ImageBackground>
                  );
                }}
              />
            </View>
          )}

          {/* Empty State */}
          {!school && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>
                {t('Global.no_data') || 'No data available'}
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
  schoolImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 10
  },
  infoCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ratingSection: {
     borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#e0e0e0"
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFA500"
  },
  ratingStar: {
    fontSize: 24
  },
  infoContainer: {
    marginBottom: 20
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0"
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    flex: 1
  },
  infoValue: {
    fontSize: 14,
    color: "#333",
    flex: 2,
    textAlign: "right"
  },
  descriptionSection: {
    marginTop: 10,
    paddingTop: 20,
    },
  descriptionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 12
  },
  descriptionText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 24
  },
  priceSliderContainer: {
    paddingVertical: 10,
    paddingRight: 20
  },
  priceCard: {
    borderRadius: 12,
    marginRight: 15,
    width: Dimensions.get('window').width * 0.75,
    minHeight: 180,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  priceCardImage: {
    borderRadius: 12,
    resizeMode: "cover",
  },
  priceCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8) ",
    borderRadius: 12,
  },
  priceCardContent: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    zIndex: 1,
  },
  priceHeader: {
    marginBottom: 10
  },
  priceNumber: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff"
  },
  priceContent: {
    marginTop: 5
  },
  priceLabel: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "600"
  },
  priceValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff"
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

export default SchoolDashboard;

