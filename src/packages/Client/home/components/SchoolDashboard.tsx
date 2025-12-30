import AppButton from "@/components/UI/AppButton";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import PictureGallery from "@/components/UI/PictureGallery";
import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Divider from "@/components/UI/Divider";
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
            <View className="mx-1 p-3 bg-[#FAF7F5] rounded-xl">
              {/* Name */}
              {school?.name && (
                <>
                  <Col>
                    <AppText className="text-brownColor-300 tajawal-semibold-16">
                      {t('Global.name') || 'Name'}
                    </AppText>
                    <AppText className="text-brownColor-100 tajawal-light-16">
                      {school.name}
                    </AppText>
                  </Col>
                  <Divider />
                </>
              )}

              {/* Description */}
              {school?.description && (
                <>
                  <Col>
                    <AppText className="text-brownColor-300 tajawal-semibold-16">
                      {t('Global.description') || 'Description'}
                    </AppText>
                    <AppText className="text-brownColor-100 tajawal-light-16">
                      {school.description}
                    </AppText>
                  </Col>
                  <View style={styles.dividerWithIcon}>
                    <Divider />
                    <View style={styles.circularIcon}>
                      <View style={styles.circularIconInner}>
                        <View style={styles.circularIconCenter} />
                      </View>
                    </View>
                  </View>
                </>
              )}

              {/* Address */}
              {school?.address && (
                <>
                  <Col>
                    <AppText className="text-brownColor-300 tajawal-semibold-16">
                      {t('Global.address') || 'Address'}
                    </AppText>
                    <AppText className="text-brownColor-100 tajawal-light-16">
                      {school.address}
                    </AppText>
                  </Col>
                  <Divider />
                </>
              )}

              {/* Region */}
              {school?.region && (
                <>
                  <Col>
                    <AppText className="text-brownColor-300 tajawal-semibold-16">
                      {t('Global.region') || 'Region'}
                    </AppText>
                    <AppText className="text-brownColor-100 tajawal-light-16">
                      {school.region}
                    </AppText>
                  </Col>
                  <Divider />
                </>
              )}

              {/* City */}
              {school?.city && (
                <>
                  <Col>
                    <AppText className="text-brownColor-300 tajawal-semibold-16">
                      {t('Global.city') || 'City'}
                    </AppText>
                    <AppText className="text-brownColor-100 tajawal-light-16">
                      {school.city}
                    </AppText>
                  </Col>
                </>
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
  dividerWithIcon: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8
  },
  circularIcon: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#0D9488",
    borderWidth: 3,
    borderColor: "#FAF7F5",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  circularIconInner: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#14B8A6",
    borderWidth: 2,
    borderColor: "#FAF7F5",
    alignItems: "center",
    justifyContent: "center"
  },
  circularIconCenter: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0D9488"
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

