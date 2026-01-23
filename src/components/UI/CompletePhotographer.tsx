import AppButton from "@/components/UI/AppButton";
import AppSelect from "@/components/UI/AppSelect";
import { cities } from "@/constants/data";
import { apiKeys } from "@/hooks/apiKeys";
import { showGlobalToast } from "@/hooks/useGlobalToast";
import { usePutMutation } from "@/hooks/usePutMutation";
import { navigationEnums } from "@/provider/navigationEnums";
import useAppRouteParams from "@/provider/useAppRouteParams";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { z } from "zod";
import AppHeader from "./AppHeader";
import AppWrapper from "./AppWrapper";
import { Input } from "./Input";

// ========== Validation Schema ==========
export const photographerSchema = z.object({
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

export type PhotographerForm = z.infer<typeof photographerSchema>;

 const CompletePhotographer = ({ onClose }: { onClose?: () => void }) => {
  const { authData } = useAuthStore();
  const { navigate } = useGlobalNavigation();
  const { id } = useAppRouteParams("COMPLETE_PHOTOGRAPHER");
  const [uploading, setUploading] = useState(false);
  const { mutate, isPending } = usePutMutation({
    endpoint: apiKeys.photographer.completed(id),
    onSuccess: () => {
      showGlobalToast({
        type: "success",
        title: "Update Success",
        body: "Photographer completed successfully"
      });
      navigate(navigationEnums.LOGIN_SCREEN, { role: authData.role });
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
  } = useForm<PhotographerForm>({
    resolver: zodResolver(photographerSchema),
    defaultValues: {
      arCity: "",
      enCity: "",
      images: [],
      packages: [{ number: "", price: "" }]
    },
  });

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

  const onSubmit = (data: PhotographerForm) => {
    setUploading(true);
    const formData = new FormData();

    // Append text fields
    formData.append("arCity", data.arCity);
    formData.append("enCity", data.enCity);

    // Append images
    data.images.forEach((image, index) => {
      formData.append("image", {
        uri: image.uri,
        name: image.name,
        type: image.type
      } as any);
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
        <AppHeader title="Complete Photographer Profile" showBackButton onBack={onClose} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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


          {/* Images Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upload Photos</Text>
            <TouchableOpacity style={styles.uploadButton} onPress={pickImages}>
              <Text>Select Images</Text>
            </TouchableOpacity>

            <View style={styles.imageGrid}>
              {imageFields.map((image, index) => (
                <View key={image.id} style={styles.imageItem}>
                  <Image source={{ uri: image.uri }} style={styles.thumbnail} />
                  <TouchableOpacity
                    style={styles.deleteImageButton}
                    onPress={() => removeImage(index)}
                  >
                    <Text style={styles.deleteText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            {errors.images && <Text style={styles.errorText}>{errors.images.message}</Text>}
          </View>

          {/* Packages Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Packages</Text>
            {fields.map((field, index) => (
              <View key={field.id} style={styles.packageContainer}>
                <View style={styles.packageHeader}>
                  <Text style={styles.packageNumber}>Package {index + 1}</Text>
                  {index > 0 && (
                    <TouchableOpacity onPress={() => remove(index)}>
                      <Text style={styles.removePackage}>Remove</Text>
                    </TouchableOpacity>
                  )}
                </View>

                <Controller
                  name={`packages.${index}.number`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <View style={styles.inputContainer}>
                       <Input
                        control={control}
                        name={`packages.${index}.number`}
                        label="Number of Photos"
                        placeholder="20"
                        keyboardType="numeric"
                        value={value}
                        onChangeText={onChange}
                      />
                      
                    </View>
                  )}
                />

                <Controller
                  name={`packages.${index}.price`}
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <View style={styles.inputContainer}>
                      <Input
                        control={control}
                        name={`packages.${index}.price`}
                        label="Price"
                        placeholder="1000"
                        keyboardType="numeric"
                        value={value}
                        onChangeText={onChange}
                      />
                    </View>
                  )}
                />
              </View>
            ))}

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => append({ number: "", price: "" })}
            >
              <Text style={styles.addButtonText}>+ Add Another Package</Text>
            </TouchableOpacity>
            {errors.packages && <Text style={styles.errorText}>{errors.packages.message}</Text>}
          </View>
        </ScrollView>

        <AppButton
          loading={isPending || uploading}
          disabled={isPending || uploading}
          title="Complete Profile"
          onPress={handleSubmit(onSubmit)}
          style={styles.submitButton}
        />
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

export default CompletePhotographer;