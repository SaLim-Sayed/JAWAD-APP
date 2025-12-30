import AppButton from "@/components/UI/AppButton";
import AppSelect from "@/components/UI/AppSelect";
import { cities } from "@/constants/data";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { showGlobalToast } from "@/hooks/useGlobalToast";
import { usePutMutation } from "@/hooks/usePutMutation";
import { GetSchoolDetailsResponse } from "@/packages/Client/home/@types/stable.type";
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
import { Input } from "@/components";

// ========== Validation Schema ==========
export const schoolUpdateSchema = z.object({
  images: z.array(z.object({
    uri: z.string(),
    name: z.string(),
    type: z.string()
  })).optional(),
  arCity: z.string().min(1, "Arabic city is required"),
  enCity: z.string().min(1, "English city is required"),
  arRegion: z.string().optional(),
  enRegion: z.string().optional(),
  arAddress: z.string().optional(),
  enAddress: z.string().optional(),
  location: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  enDescription: z.string().optional(),
  arDescription: z.string().optional(),
  enName: z.string().optional(),
  arName: z.string().optional(),
  price: z.array(z.object({
    name: z.string().min(1, "Price name is required"),
    cost: z.string().min(1, "Cost is required")
  })).min(1, "At least one price is required")
});

export type SchoolUpdateForm = z.infer<typeof schoolUpdateSchema>;

const UpdateSchool = ({ onClose, schoolId }: { onClose?: () => void; schoolId?: string }) => {
  const { goBack } = useGlobalNavigation();
  const routeParams = useAppRouteParams("UPDATE_SCHOOL");
  const routeId = routeParams?.id;
  const id = schoolId || routeId;
  const [uploading, setUploading] = useState(false);

  const { data: schoolData, isLoading: isLoadingData, refetch } = useApiQuery<GetSchoolDetailsResponse>({
    url: apiKeys.school.getSchoolDetail(id),
    key: ["getSchoolForUpdate", id],
    enabled: !!id,
  });

  const existingSchool = schoolData?.school;

  const { mutate, isPending } = usePutMutation({
    endpoint: apiKeys.school.updateSchool(id),
    onSuccess: () => {
      showGlobalToast({
        type: "success",
        title: "Update Success",
        body: "School updated successfully"
      });
      refetch();
      if (onClose) {
        // If used inline (home screen), just close callback
        onClose();
      } else {
        // If used as navigation screen, go back
        goBack();
      }
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
    watch,
    formState: { errors },
  } = useForm<SchoolUpdateForm>({
    resolver: zodResolver(schoolUpdateSchema),
    defaultValues: {
      images: [],
      arCity: "",
      enCity: "",
      arRegion: "",
      enRegion: "",
      arAddress: "",
      enAddress: "",
      location: "",
      email: "",
      phone: "",
      enDescription: "",
      arDescription: "",
      enName: "",
      arName: "",
      price: [{ name: "", cost: "" }]
    },
  });

  useEffect(() => {
    if (existingSchool) {
      if (existingSchool.email) {
        setValue("email", existingSchool.email);
      }
      if (existingSchool.phone) {
        setValue("phone", existingSchool.phone);
      }
      if (existingSchool.name) {
        setValue("arName", existingSchool.name);
        setValue("enName", existingSchool.name);
      }
      if (existingSchool.city) {
        const cityData = cities.find(c => c.ar === existingSchool.city || c.en === existingSchool.city);
        if (cityData) {
          setValue("arCity", cityData.ar);
          setValue("enCity", cityData.en);
        } else {
          setValue("arCity", existingSchool.city);
          setValue("enCity", existingSchool.city);
        }
      }
      if (existingSchool.region) {
        setValue("arRegion", existingSchool.region);
        setValue("enRegion", existingSchool.region);
      }
      if (existingSchool.address) {
        setValue("arAddress", existingSchool.address);
        setValue("enAddress", existingSchool.address);
      }
      if (existingSchool.description) {
        setValue("arDescription", existingSchool.description);
        setValue("enDescription", existingSchool.description);
      }
      if (existingSchool.location) {
        setValue("location", existingSchool.location);
      }
      if (existingSchool.picUrls && existingSchool.picUrls.length > 0) {
        // If there are multiple picUrls, add them all
        const imageFields = existingSchool.picUrls.map((url: string, index: number) => ({
          uri: url,
          name: `school-image-${index}.jpg`,
          type: "image/jpeg"
        }));
        setValue("images", imageFields);
      } else if (existingSchool.picUrl) {
        // If there's a single picUrl, add it as an image
        setValue("images", [{
          uri: existingSchool.picUrl,
          name: `school-image-${Date.now()}.jpg`,
          type: "image/jpeg"
        }]);
      }
      if (existingSchool.price && existingSchool.price.length > 0) {
        const priceFields = existingSchool.price.map((p) => ({
          name: p.name || "",
          cost: p.cost?.toString() || ""
        }));
        setValue("price", priceFields);
      } else {
        setValue("price", [{ name: "", cost: "" }]);
      }
    }
  }, [existingSchool, setValue]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "price"
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

  const onSubmit = (data: SchoolUpdateForm) => {
    setUploading(true);
    const formData = new FormData();

    // Append text fields
    if (data.arCity) formData.append("arCity", data.arCity);
    if (data.enCity) formData.append("enCity", data.enCity);
    if (data.arRegion) formData.append("arRegion", data.arRegion);
    if (data.enRegion) formData.append("enRegion", data.enRegion);
    if (data.arAddress) formData.append("arAddress", data.arAddress);
    if (data.enAddress) formData.append("enAddress", data.enAddress);
    if (data.location) formData.append("location", data.location);
    if (data.email) formData.append("email", data.email);
    if (data.phone) formData.append("phone", data.phone);
    if (data.enDescription) formData.append("enDescription", data.enDescription);
    if (data.arDescription) formData.append("arDescription", data.arDescription);
    if (data.enName) formData.append("enName", data.enName);
    if (data.arName) formData.append("arName", data.arName);

    // Append images
    data.images?.forEach((image) => {
      if (image.uri.startsWith('file://') || !image.uri.startsWith('http')) {
        formData.append("image", {
          uri: image.uri,
          name: image.name,
          type: image.type
        } as any);
      }
    });

    // Append prices
    data.price.forEach((priceItem, index) => {
      formData.append(`price[${index}][name]`, priceItem.name);
      formData.append(`price[${index}][cost]`, priceItem.cost);
    });

    mutate(formData);
    setUploading(false);
  };

  const FormContent = () => (
    <LoaderBoundary isLoading={isLoadingData}>
      <View style={styles.container}>
        {!schoolId && <AppHeader title="Update School Profile" showBackButton onBack={onClose} />}
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Images Section */}
            <View style={styles.section}>
              <Text style={styles.label}>School Images</Text>
              {imageFields.length > 0 && (
                <View style={styles.imageGrid}>
                  {imageFields.map((field, index) => (
                    <View key={field.id} style={styles.imageItem}>
                      <Image
                        source={{ uri: field.uri }}
                        style={styles.thumbnail}
                        resizeMode="cover"
                      />
                      <TouchableOpacity
                        style={styles.deleteImageButton}
                        onPress={() => removeImage(index)}
                      >
                        <Text style={styles.deleteText}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
              <TouchableOpacity style={styles.uploadButton} onPress={pickImages}>
                <Text>Add photos ⬆️</Text>
              </TouchableOpacity>
            </View>

            {/* City Fields */}
            <Controller
              name="arCity"
              control={control}
              render={({ field: { value, onChange } }) => (
                <View style={styles.inputContainer}>
                  <AppSelect
                    label="City"
                    value={value}
                    onChange={(selectedAr) => {
                      const selectedCity = cities.find((c) => c.ar === selectedAr);
                      if (selectedCity) {
                        onChange(selectedCity.ar);
                        setValue("enCity", selectedCity.en);
                      }
                    }}
                    options={cities.map((city) => ({ label: city.ar + " - " + city.en, value: city.ar }))}
                    dropdownWidth="90%"
                  />
                  {errors.arCity && <Text style={styles.errorText}>{errors.arCity.message}</Text>}
                </View>
              )}
            />

            {/* Name Fields */}
            <Controller
              name="arName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  control={control}
                  name="arName"
                  label="Arabic Name"
                  placeholder="Enter Arabic name"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              name="enName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  control={control}
                  name="enName"
                  label="English Name"
                  placeholder="Enter English name"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            {/* Region Fields */}
            <Controller
              name="arRegion"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  control={control}
                  name="arRegion"
                  label="Arabic Region"
                  placeholder="Enter Arabic region"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              name="enRegion"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  control={control}
                  name="enRegion"
                  label="English Region"
                  placeholder="Enter English region"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            {/* Address Fields */}
            <Controller
              name="arAddress"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  control={control}
                  name="arAddress"
                  label="Arabic Address"
                  placeholder="Enter Arabic address"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            <Controller
              name="enAddress"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  control={control}
                  name="enAddress"
                  label="English Address"
                  placeholder="Enter English address"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            {/* Location */}
            <Controller
              name="location"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  control={control}
                  name="location"
                  label="Location (Google Maps URL)"
                  placeholder="Enter Google Maps URL"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  control={control}
                  name="email"
                  label="Email"
                  placeholder="Enter email"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="email-address"
                />
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  control={control}
                  name="phone"
                  label="Phone"
                  placeholder="Enter phone number"
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                />
              )}
            />

            {/* Description Fields */}
            <Controller
              name="arDescription"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Arabic Description</Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter Arabic description"
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                  />
                </View>
              )}
            />

            <Controller
              name="enDescription"
              control={control}
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>English Description</Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder="Enter English description"
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                  />
                </View>
              )}
            />

            {/* Prices Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Prices</Text>
              {fields.map((field, index) => (
                <View key={field.id} style={styles.priceContainer}>
                  <View style={styles.priceHeader}>
                    <Text style={styles.priceNumber}>Price {index + 1}</Text>
                    {index > 0 && (
                      <TouchableOpacity onPress={() => remove(index)}>
                        <Text style={styles.removePrice}>Remove</Text>
                      </TouchableOpacity>
                    )}
                  </View>

                  <Controller
                    name={`price.${index}.name`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>Price Name</Text>
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="e.g., ركوب خيل"
                          style={styles.input}
                        />
                        {errors.price?.[index]?.name && (
                          <Text style={styles.errorText}>{errors.price[index]?.name?.message}</Text>
                        )}
                      </View>
                    )}
                  />

                  <Controller
                    name={`price.${index}.cost`}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>Cost</Text>
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          placeholder="1000"
                          keyboardType="numeric"
                          style={styles.input}
                        />
                        {errors.price?.[index]?.cost && (
                          <Text style={styles.errorText}>{errors.price[index]?.cost?.message}</Text>
                        )}
                      </View>
                    )}
                  />
                </View>
              ))}

              <TouchableOpacity
                style={styles.addButton}
                onPress={() => append({ name: "", cost: "" })}
              >
                <Text style={styles.addButtonText}>+ Add Another Price</Text>
              </TouchableOpacity>
              {errors.price && <Text style={styles.errorText}>{errors.price.message}</Text>}
            </View>
          </ScrollView>

          <AppButton
            loading={isPending || uploading}
            disabled={isPending || uploading}
            title="Update School"
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}
          />
        </View>
      </LoaderBoundary>
    );

  // If used inline (with schoolId prop), return form without wrapper
  if (schoolId) {
    return <FormContent />;
  }

  // If used as navigation screen, return with AppWrapper
  return (
    <AppWrapper>
      <FormContent />
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
  section: {
    marginTop: 15,
    marginBottom: 15
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#444"
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
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: "top"
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 2
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
    gap: 10,
    marginBottom: 15
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
  priceContainer: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15
  },
  priceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10
  },
  priceNumber: {
    fontWeight: "bold",
    color: "#555"
  },
  removePrice: {
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

export default UpdateSchool;

