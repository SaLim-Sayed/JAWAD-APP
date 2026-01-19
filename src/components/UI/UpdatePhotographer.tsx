import AppButton from "@/components/UI/AppButton";
import AppSelect from "@/components/UI/AppSelect";
import { cities } from "@/constants/data";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { showGlobalToast } from "@/hooks/useGlobalToast";
import { usePutMutation } from "@/hooks/usePutMutation";
import { GetPhotographerOwnDataResponse, GetPhotographersResponse } from "@/packages/Client/Photo-session/@types/photography.types";
import useAppRouteParams from "@/provider/useAppRouteParams";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { z } from "zod";
import AppHeader from "./AppHeader";
import AppWrapper from "./AppWrapper";
import LoaderBoundary from "./LoaderBoundary";
import { Input } from "./Input";

// ========== Validation Schema ==========
export const photographerUpdateSchema = z.object({
  description: z.string().optional(),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  arName: z.string().min(1, "Arabic name is required"),
  enName: z.string().min(1, "English name is required"),
  arCity: z.string().min(1, "Arabic city is required"),
  enCity: z.string().min(1, "English city is required"),
  images: z.array(z.object({
    uri: z.string(),
    name: z.string(),
    type: z.string()
  })).min(1, "At least one image is required"),
  packages: z.array(z.object({
    number: z.string().min(1, "Number is required"),
    price: z.string().min(1, "Price is required")
  })).min(1, "At least one package is required")
});

export type PhotographerUpdateForm = z.infer<typeof photographerUpdateSchema>;

const UpdatePhotographer = ({ onClose }: { onClose?: () => void }) => {
  const { goBack } = useGlobalNavigation();
  const { id } = useAppRouteParams("UPDATE_PHOTOGRAPHER");
  const [uploading, setUploading] = useState(false);

   const { data: photographerData, isLoading: isLoadingData ,refetch} = useApiQuery<GetPhotographerOwnDataResponse | GetPhotographersResponse>({
    url: apiKeys.photographer.getPhotograoher,
    key: ["getPhotographerForUpdate", id],
    enabled: !!id,
  });

   let existingPhotographer: any = null;
  if (photographerData) {
    if ('photographer' in photographerData) {
      existingPhotographer = photographerData.photographer;
    } else if ('_id' in photographerData) {
      existingPhotographer = photographerData;
    } else if ('photographers' in photographerData) {
      existingPhotographer = photographerData.photographers?.find((p: any) => p._id === id);
    }
  }

  const { mutate, isPending } = usePutMutation({
    endpoint: apiKeys.photographer.update(id),
    
    onSuccess: () => {
      showGlobalToast({
        type: "success",
        title: "Update Success",
        body: "Photographer updated successfully"
      });
      refetch();
      goBack();
    },
    onError: (error) => {
      console.error("Update failed:", error);
      showGlobalToast({
        type: "error",
        title: "Update Failed",
        body: error.message
      });
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PhotographerUpdateForm>({
    resolver: zodResolver(photographerUpdateSchema),
    defaultValues: {
      email: "",
      arName: "",
      enName: "",
      arCity: "",
      enCity: "",
      description: "",
      images: [],
      packages: [{ number: "", price: "" }]
    },
  });

   useEffect(() => {
    if (existingPhotographer) {
       if (existingPhotographer.email) {
        setValue("email", existingPhotographer.email);
      }

       if (existingPhotographer.name) {
        if (typeof existingPhotographer.name === 'string') {
           setValue("arName", existingPhotographer.name);
          setValue("enName", existingPhotographer.name);
        } else if (typeof existingPhotographer.name === 'object') {
           setValue("arName", existingPhotographer.name.ar || "");
          setValue("enName", existingPhotographer.name.en || "");
        }
      }

       if (existingPhotographer.city) {
        const cityData = typeof existingPhotographer.city === 'string' 
          ? cities.find(c => c.ar === existingPhotographer.city || c.en === existingPhotographer.city)
          : null;
        
        if (cityData) {
          setValue("arCity", cityData.ar);
          setValue("enCity", cityData.en);
        } else if (typeof existingPhotographer.city === 'string') {
           const foundCity = cities.find(c => 
            c.ar.includes(existingPhotographer.city) || 
            c.en.includes(existingPhotographer.city)
          );
          if (foundCity) {
            setValue("arCity", foundCity.ar);
            setValue("enCity", foundCity.en);
          }
        }
      }

       if (existingPhotographer.picUrls && existingPhotographer.picUrls.length > 0) {
        const imageFields = existingPhotographer.picUrls.map((url: string, index: number) => ({
          uri: url,
          name: `existing-image-${index}.jpg`,
          type: "image/jpeg"
        }));
        setValue("images", imageFields);
      }

       if (existingPhotographer.packages && existingPhotographer.packages.length > 0) {
        const packageFields = existingPhotographer.packages.map((pkg: any) => ({
          number: pkg.number?.toString() || "",
          price: pkg.price?.toString() || ""
        }));
        setValue("packages", packageFields);
      } else {
        setValue("packages", [{ number: "", price: "" }]);
      }
    }
  }, [existingPhotographer, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "packages"
  });

  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({
    control,
    name: "images"
  });

  const pickImages = async () => {
    launchImageLibrary(
      { mediaType: "photo", selectionLimit: 10, quality: 1 },
      (response) => {
        if (response?.assets?.length) {
          const newImages = response.assets.map(asset => ({
            uri: asset.uri!,
            name: asset.fileName || `photo_${Date.now()}.jpg`,
            type: asset.type || 'image/jpeg'
          }));
          appendImage(newImages);
        }
      }
    );
  };

  const onSubmit = (data: PhotographerUpdateForm) => {
    setUploading(true);
    const formData = new FormData();

    // Append text fields
    formData.append("email", data.email);
    formData.append("arName", data.arName);
    formData.append("enName", data.enName);
    formData.append("arCity", data.arCity);
    formData.append("enCity", data.enCity);

     data.images.forEach((image) => {
       if (image.uri.startsWith('file://') || !image.uri.startsWith('http')) {
        formData.append("image", {
          uri: image.uri,
          name: image.name,
          type: image.type
        } as any);
      }
    });

    data.packages.forEach((pkg, index) => {
      formData.append(`packages[${index}][number]`, pkg.number);
      formData.append(`packages[${index}][price]`, pkg.price);
    });

    console.log({ formData })
    mutate(formData);
    setUploading(false);
  };

  return (
    <AppWrapper>
      <View style={styles.container}>
        <AppHeader
          title="Update Photographer Profile"
          showBackButton
          onBack={onClose}
        />
        <LoaderBoundary isLoading={isLoadingData}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Email Field */}
            <Controller
              name="email"
              control={control}
              render={({field: {value, onChange}}) => (
                <Input
                  name="email"
                  control={control}
                  label="Email"
                  value={value}
                  onChangeText={onChange}
                  placeholder="example@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              )}
            />

            {/* Arabic Name Field */}
            <Controller
              name="arName"
              control={control}
              render={({field: {value, onChange}}) => (
                <Input
                  name="arName"
                  control={control}
                  label="Arabic Name"
                  value={value}
                  onChangeText={onChange}
                  placeholder="الاسم بالعربية"
                />
              )}
            />

            {/* English Name Field */}
            <Controller
              name="enName"
              control={control}
              render={({field: {value, onChange}}) => (
                <Input
                  name="enName"
                  control={control}
                  label="English Name"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Name in English"
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({field: {value, onChange}}) => (
                <Input
                  name="description"
                  control={control}
                  label="Description"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Description"
                />
              )}
            />

            {/* City Fields */}
            <Controller
              name="arCity"
              control={control}
              render={({field: {value, onChange}}) => (
                <View style={styles.inputContainer}>
                  <AppSelect
                    label="City"
                    value={value}
                    onChange={selectedAr => {
                      const selectedCity = cities.find(
                        c => c.ar === selectedAr,
                      );
                      if (selectedCity) {
                        onChange(selectedCity.ar);
                        setValue('enCity', selectedCity.en);
                      }
                    }}
                    options={cities.map(city => ({
                      label: city.ar + ' - ' + city.en,
                      value: city.ar,
                    }))}
                    dropdownWidth="90%"
                  />
                  {errors.arCity && (
                    <Text style={styles.errorText}>
                      {errors.arCity.message}
                    </Text>
                  )}
                </View>
              )}
            />

            {/* Images Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upload Photos</Text>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={pickImages}>
                <Text>Select Images</Text>
              </TouchableOpacity>

              <View style={styles.imageGrid}>
                {imageFields.map((image, index) => (
                  <View key={image.id} style={styles.imageItem}>
                    <Image source={{uri: image.uri}} style={styles.thumbnail} />
                    <TouchableOpacity
                      style={styles.deleteImageButton}
                      onPress={() => removeImage(index)}>
                      <Text style={styles.deleteText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
              {errors.images && (
                <Text style={styles.errorText}>{errors.images.message}</Text>
              )}
            </View>

            {/* Packages Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Packages</Text>
              {fields.map((field, index) => (
                <View key={field.id} style={styles.packageContainer}>
                  <View style={styles.packageHeader}>
                    <Text style={styles.packageNumber}>
                      Package {index + 1}
                    </Text>
                    {index > 0 && (
                      <TouchableOpacity onPress={() => remove(index)}>
                        <Text style={styles.removePackage}>Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <Controller
                    name={`packages.${index}.number`}
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>Number of Photos</Text>
                        <Input
                          name={`packages.${index}.number`}
                          control={control}
                          label="Number of Photos"
                          value={value}
                          onChangeText={onChange}
                          placeholder="20"
                          keyboardType="numeric"
                        />
                      </View>
                    )}
                  />

                  <Controller
                    name={`packages.${index}.price`}
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>Price</Text>
                        <Input
                          name={`packages.${index}.price`}
                          control={control}
                          label="Price"
                          value={value}
                          onChangeText={onChange}
                          placeholder="1000"
                          keyboardType="numeric"
                        />
                        {errors.packages?.[index]?.price && (
                          <Text style={styles.errorText}>
                            {errors.packages[index]?.price?.message}
                          </Text>
                        )}
                      </View>
                    )}
                  />
                </View>
              ))}

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => append({number: '', price: ''})}>
                <Text style={styles.addButtonText}>+ Add Another Package</Text>
              </TouchableOpacity>
              {errors.packages && (
                <Text style={styles.errorText}>{errors.packages.message}</Text>
              )}
            </View>
          </ScrollView>
          <AppButton
            loading={isPending || uploading}
            disabled={isPending || uploading}
            title="Update Profile"
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}
          />
        </LoaderBoundary>
      </View>
    </AppWrapper>
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
  inputContainer: {
    marginBottom: 15
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2
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
  uploadButton: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderStyle: "dashed"
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  imageItem: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative"
  },
  thumbnail: {
    width: "100%",
    height: "100%"
  },
  deleteImageButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(255,0,0,0.7)",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  deleteText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2
  },
  packageContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15
  },
  packageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  packageNumber: {
    fontWeight: "bold",
    color: "#555"
  },
  removePackage: {
    color: "red",
    fontSize: 12
  },
  addButton: {
    backgroundColor: "#e3f2fd",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },
  addButtonText: {
    color: "#1976d2",
    fontWeight: "500"
  },
  submitButton: {
    width: "90%",
    marginHorizontal: 20,
    marginVertical: 20
  }
});

export default UpdatePhotographer;
