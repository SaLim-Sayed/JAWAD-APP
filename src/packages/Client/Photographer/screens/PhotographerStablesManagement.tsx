import AppButton from "@/components/UI/AppButton";
import AppHeader from "@/components/UI/AppHeader";
import AppText from "@/components/UI/AppText";
import AppWrapper from "@/components/UI/AppWrapper";
import LoaderBoundary from "@/components/UI/LoaderBoundary";
import AppLoader from "@/components/UI/AppLoader";
import StableCard from "@/components/UI/StableCard";
import SearchInput from "@/components/UI/SearchInput";
import Image from "@/components/UI/Image";
import { Icons } from "@/constants";
import { isRTL } from "@/provider/constant";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { API_URL } from "@/hooks/api";
import { showGlobalToast } from "@/hooks/useGlobalToast";
import { navigationEnums } from "@/provider/navigationEnums";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useAuthStore } from "@/store/useAuthStore";
import { useLanguage } from "@/store";
import { GetStablesResponse } from "../../home/@types/stable.type";
import { GetPhotographerOwnDataResponse, GetPhotographersResponse } from "../../Photo-session/@types/photography.types";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { FlatList, ScrollView, TouchableOpacity, View, Modal, TextInput, StyleSheet } from "react-native";
import { t } from "i18next";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import { Input } from "@/components";

// Form schema for adding to stable
const addToStableSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

type AddToStableForm = z.infer<typeof addToStableSchema>;

const PhotographerStablesManagement = () => {
  const { navigate } = useGlobalNavigation();
  const { authData } = useAuthStore();
  const { language } = useLanguage();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"registered" | "available">("registered");
  const [isRemoving, setIsRemoving] = useState(false);
  const [selectedStable, setSelectedStable] = useState<{ id: string; name: string } | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch photographer details to get email
  const { data: photographerData } = useApiQuery<GetPhotographerOwnDataResponse | GetPhotographersResponse>({
    url: apiKeys.photographer.getPhotograoher,
    key: ["getPhotographerEmail", authData.id],
    enabled: !!authData.id,
  });

  // Extract email from photographer data
  let photographerEmail: string = "";
  if (photographerData) {
    if ('photographer' in photographerData && photographerData.photographer?.email) {
      photographerEmail = photographerData.photographer.email;
    } else if ('email' in photographerData && photographerData.email) {
      photographerEmail = photographerData.email as string;
    } else if ('photographers' in photographerData) {
      const found = photographerData.photographers?.find((p) => p._id === authData.id);
      if (found && 'email' in found) {
        photographerEmail = (found.email as string) || "";
      }
    }
  }

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AddToStableForm>({
    resolver: zodResolver(addToStableSchema),
    defaultValues: {
      email: photographerEmail || "",
      password: "",
    },
  });

  // Update email when photographer data loads
  useEffect(() => {
    if (photographerEmail) {
      setValue("email", photographerEmail);
    }
  }, [photographerEmail, setValue]);

  // Fetch registered stables (stables photographer is registered to)
  const { data: registeredStablesData, isLoading: registeredLoading, refetch: refetchRegistered } = useApiQuery<GetStablesResponse>({
    url: apiKeys.photographer.getStables(authData.id),
    key: ["getPhotographerStables", authData.id],
    enabled: !!authData.id && activeTab === "registered",
  });

  // Fetch all stables (for available tab)
  const { data: allStablesData, isLoading: allStablesLoading, refetch: refetchAll } = useApiQuery<GetStablesResponse>({
    url: `${apiKeys.stable.getStable}?page=1${search ? `&search=${search}` : ""}`,
    key: ["getAllStables", search, activeTab],
    enabled: activeTab === "available",
  });

  // Show all stables in available tab (not filtering out registered ones)
  const allStables = allStablesData?.stables || [];

  // Refetch data when tab changes
  useEffect(() => {
    if (activeTab === "available") {
      refetchAll();
    } else if (activeTab === "registered") {
      refetchRegistered();
    }
  }, [activeTab]);

  const handleStableSelect = async (stableId: string, stableName: string) => {
    setSelectedStable({ id: stableId, name: stableName });
    setValue("email", photographerEmail || "");
    setValue("password", "");
    setIsSubmitting(true);
    try {
      // API expects stable ID in path
      const response = await axios.post(
        `${API_URL}${apiKeys.photographer.addToStable(stableId)}`,
        {},
        {
          headers: {
            'accept-language': language,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            authorization: `jawJQ${authData.token}`,
          },
        },
      );

      showGlobalToast({
        type: 'success',
        title: 'Success',
        body: 'Added to stable successfully',
      });
      handleCloseForm();
      refetchRegistered();
      refetchAll();
    } catch (error: any) {
      showGlobalToast({
        type: 'error',
        title: 'Error',
        body:
          error.response?.data?.message ||
          error.message ||
          'Failed to add to stable',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setSelectedStable(null);
    reset();
  };

  const onSubmitAddToStable = async (data: AddToStableForm) => {
    if (!selectedStable) return;

    setIsSubmitting(true);
    try {
      // API expects stable ID in path
      const response = await axios.post(
        `${API_URL}${apiKeys.photographer.addToStable(selectedStable.id)}`,
        { 
          email: data.email, 
          password: data.password,
        },
        {
          headers: {
            'accept-language': language,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `jawJQ${authData.token}`,
          },
        }
      );
      
      showGlobalToast({
        type: "success",
        title: "Success",
        body: "Added to stable successfully"
      });
      handleCloseForm();
      refetchRegistered();
      refetchAll();
    } catch (error: any) {
      showGlobalToast({
        type: "error",
        title: "Error",
        body: error.response?.data?.message || error.message || "Failed to add to stable"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveFromStable = async (stableId: string) => {
    setIsRemoving(true);
    try {
      // API expects stable ID in path
      const response = await axios.delete(
        `${API_URL}${apiKeys.photographer.removeFromStable(stableId)}`,
        {
          headers: {
            'accept-language': language,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'authorization': `jawJQ${authData.token}`,
          },
          data: { 
            email: photographerEmail || "", 
            password: "",
          },
        }
      );
      
      showGlobalToast({
        type: "success",
        title: "Success",
        body: "Removed from stable successfully"
      });
      refetchRegistered();
      refetchAll();
    } catch (error: any) {
      showGlobalToast({
        type: "error",
        title: "Error",
        body: error.response?.data?.message || error.message || "Failed to remove from stable"
      });
    } finally {
      setIsRemoving(false);
    }
  };

  const registeredStables = registeredStablesData?.stables || [];
  const isLoading = activeTab === "registered" ? registeredLoading : allStablesLoading;

  // Helper function to get stable name (handle both string and object formats)
  const getStableName = (stable: any): string => {
    if (!stable?.name) return "";
    if (typeof stable.name === "string") return stable.name;
    if (typeof stable.name === "object" && stable.name[language]) {
      return stable.name[language];
    }
    return stable.name.ar || stable.name.en || "";
  };

  return (
    <AppWrapper>
      <AppHeader
        title={t('Global.my_stables') || 'My Stables'}
        showBackButton
      />
      <View className="bg-white flex-1">
        {/* Tab Switcher */}
        <View className="flex-row px-4 pt-4 pb-2 border-b border-gray-200">
          <TouchableOpacity
            onPress={() => setActiveTab('registered')}
            className={`flex-1 py-3 px-4 rounded-lg mr-2 ${
              activeTab === 'registered' ? 'bg-brownColor-400' : 'bg-gray-100'
            }`}>
            <AppText
              className={`text-center font-semibold ${
                activeTab === 'registered' ? 'text-white' : 'text-gray-600'
              }`}>
              {t('Global.registered_stables') || 'Registered Stables'}
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab('available')}
            className={`flex-1 py-3 px-4 rounded-lg ml-2 ${
              activeTab === 'available' ? 'bg-brownColor-400' : 'bg-gray-100'
            }`}>
            <AppText
              className={`text-center font-semibold ${
                activeTab === 'available' ? 'text-white' : 'text-gray-600'
              }`}>
              {t('Global.available_stables') || 'Available Stables'}
            </AppText>
          </TouchableOpacity>
        </View>

        <LoaderBoundary isLoading={isLoading || isRemoving}>
          {activeTab === 'registered' ? (
            <>
              {registeredStables.length > 0 ? (
                <FlatList
                  data={registeredStables}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item._id.toString()}
                  contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 100,
                  }}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigate(navigationEnums.STABLE_SERVICES_DETAILS, {
                          id: item._id,
                        });
                      }}
                      activeOpacity={0.7}
                      style={styles.menuItem}>
                      <View className="flex-row justify-center flex-1 items-center w-full bg-[#FBF8F6] rounded-3xl py-2">
                        <View className="rounded-xl gap-2 flex-row items-center  flex-1">
                          <Image
                            source={item.picUrl}
                            style={{width: 50, height: 50, borderRadius: 8}}
                            resizeMode="cover"
                          />
                          <AppText className="text-black text-xl tajawal-medium">
                            {getStableName(item)}
                          </AppText>
                        </View>

                        <TouchableOpacity
                          className="bg-brownColor-400  flex-row items-center justify-center rounded-full px-4 py-2"
                          onPress={e => {
                            e.stopPropagation();
                            handleRemoveFromStable(item._id);
                          }}>
                          <AppText className="text-white text-lg font-semibold ">
                            {t('Global.remove') || 'Remove'}
                          </AppText>
                        </TouchableOpacity>
                      </View>
                    </TouchableOpacity>
                  )}
                  ItemSeparatorComponent={() => <View style={{height: 12}} />}
                />
              ) : (
                <View className="flex-1 items-center justify-center py-20">
                  <AppText className="text-gray-400 text-base">
                    {t('Global.no_registered_stables') ||
                      'No registered stables'}
                  </AppText>
                </View>
              )}
            </>
          ) : (
            <>
              {allStables.length > 0 ? (
                <FlatList
                  data={allStables}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item._id.toString()}
                  contentContainerStyle={{
                    padding: 16,
                    paddingBottom: 100,
                  }}
                  renderItem={({item}) => {
                    const stableName = getStableName(item);
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          handleStableSelect(item._id, stableName);
                        }}
                        activeOpacity={0.7}
                        style={styles.menuItem}>
                        <View
                          style={{
                            flexDirection: 'row',
                            height: 80,
                            alignItems: 'center',
                            position: 'relative',
                          }}
                          className="flex-row flex-1 items-center w-full bg-[#FBF8F6] rounded-3xl px-2 py-2">
                          <View className="bg-white rounded-xl w-16 h-16 items-center justify-center mr-4">
                            <Image
                              source={item.picUrl}
                              style={{width: 50, height: 50, borderRadius: 8}}
                              resizeMode="cover"
                            />
                          </View>
                          <View className="flex-1 items-start justify-start">
                            <AppText className="text-black text-xl text-center">
                              {stableName}
                            </AppText>
                          </View>
                          <View style={{width: 24}}>
                            <Image
                              source={Icons.arrow}
                              style={{
                                transform: [{rotate: `${isRTL ? 180 : 0}deg`}],
                              }}
                              resizeMode="cover"
                            />
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  ItemSeparatorComponent={() => <View style={{height: 12}} />}
                />
              ) : (
                <View className="flex-1 items-center justify-center py-20">
                  <AppText className="text-gray-400 text-base">
                    {t('Global.no_available_stables') || 'No available stables'}
                  </AppText>
                </View>
              )}
            </>
          )}
        </LoaderBoundary>
        
        {/* Overlay Loader for submitting */}
        {isSubmitting && (
          <View style={styles.loaderOverlay}>
            <AppLoader />
          </View>
        )}
      </View>

      {/* Add to Stable Form Modal */}
      <Modal
        visible={showAddForm}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseForm}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <AppHeader
              title={
                selectedStable
                  ? `Add to ${selectedStable.name}`
                  : 'Add to Stable'
              }
              showBackButton
              onBack={handleCloseForm}
            />
            <ScrollView
              contentContainerStyle={styles.formContainer}
              keyboardShouldPersistTaps="handled">
              <AppText className="text-brownColor-400 text-lg font-semibold mb-4">
                {t('Global.enter_credentials') || 'Enter your credentials'}
              </AppText>

              <Controller
                control={control}
                name="email"
                render={({field: {onChange, value}}) => (
                  <View style={styles.inputWrapper}>
                    <Input
                      name="email"
                      control={control}
                      label={t('Global.email') || 'Email'}
                      placeholder={t('Global.email_placeholder') || 'Enter your email'}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      editable={false}
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />

              <Controller
                control={control}
                name="password"
                render={({field: {onChange, value}}) => (
                  <View style={styles.inputWrapper}>
                    <Input
                      name="password"
                      control={control}
                      label={t('Global.password') || 'Password'}
                      placeholder={t('Global.password_placeholder') || 'Enter your password'}
                      keyboardType="default"
                      autoCapitalize="none"
                      secureTextEntry
                      value={value}
                      onChangeText={onChange}
                    />
                  </View>
                )}
              />

              <AppButton
                title={t('Global.add_to_stable') || 'Add to Stable'}
                onPress={handleSubmit(onSubmitAddToStable)}
                loading={isSubmitting}
                disabled={isSubmitting}
                className="mt-4"
              />

              <AppButton
                title={t('Global.cancel') || 'Cancel'}
                onPress={handleCloseForm}
                variant="outline"
                className="mt-2"
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </AppWrapper>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    marginBottom: 16,
    height: 80,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
    paddingBottom: 20,
  },
  formContainer: {
    padding: 20,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: "#000",
  },
  loaderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
});

export default PhotographerStablesManagement;
