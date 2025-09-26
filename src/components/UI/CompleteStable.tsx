import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
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
import DateTimePicker from '@react-native-community/datetimepicker';

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
import AppHeader from "./AppHeader";
import AppWrapper from "./AppWrapper";

// ========== Validation Schema ==========
export const horseSchema = z.object({
  arCity: z.string().optional(),
  enCity: z.string().optional(),
  gender: z.string().min(1, "Gender is required"),
  arRegion: z.string().optional(),
  enRegion: z.string().optional(),
  arAddress: z.string().optional(),
  enAddress: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  sessionPercentage: z.string().min(1, "Session percentage is required"),
  openTime: z.string().optional(), // "08:00"
  closeTime: z.string().optional(), // "22:00"
  image: z.string().optional(),
});

export type HorseForm = z.infer<typeof horseSchema>;

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

// ========== Main Component ==========
const CompleteStable = ({ onClose }: { onClose?: () => void }) => {
  const { authData } = useAuthStore();
  const { navigate } = useGlobalNavigation()
  const params = useAppRouteParams("COMPLETE_STABLE")
  const { mutate, isPending } = usePutMutation({
    endpoint: apiKeys.stable.completeStable(params?.id),
    onSuccess: () => {
      console.log("تم التحديث بنجاح");
      showGlobalToast({
        type: "success",
        title: "Update Success",
        body: "Stable updated successfully"
      })
      navigate(navigationEnums.LOGIN_SCREEN, { role: authData.role })
    },
    onError: (error) => {
      console.error("فشل التحديث:", error);
      showGlobalToast({
        type: "error",
        title: "Update Failed",
        body: error.message
      })

    },
  });

    const [showOpenPicker, setShowOpenPicker] = React.useState(false);
    const [showClosePicker, setShowClosePicker] = React.useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<HorseForm>({
    resolver: zodResolver(horseSchema),
    defaultValues: {
      arCity: "",
      enCity: "",
      gender: "",
      arRegion: "",
      enRegion: "",
      arAddress: "",
      enAddress: "",
      location: "",
      sessionPercentage: "",
      openTime: "",
      closeTime: "",
      image: undefined,
    },
  });

  const image = watch("image");

  const pickImage = async () => {
    launchImageLibrary({ mediaType: "photo", quality: 1 }, (response) => {
      if (response?.assets?.length) {
        const uri = response.assets[0]?.uri;
        if (uri) {
          setValue("image", uri);
        }
      }
    });
  };

  const removeImage = () => {
    setValue("image", undefined);
  };

  const onSubmit = (data: HorseForm) => {
    const formData = new FormData();

    // إرفاق الحقول النصية
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });


    // إرفاق الصورة - تأكد من أنها بصيغة صحيحة
    if (image) {
      formData.append("image", {
        uri: image,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
    }

    // إرسال الطلب
    mutate(formData);
  };


  return (
    <AppWrapper>
      <View style={styles.container}>
        <AppHeader title="Edit Stable" showBackButton onBack={onClose} />
        <ScrollView contentContainerStyle={{
          flexGrow: 0.9,
          padding: 20
        }}>
          <Controller
            name="arCity"
            control={control}
            render={({ field: { value, onChange } }) => (
              <AppSelect
                label="City"
                //@ts-ignore
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
            )
            }
          />
          {[

            "arRegion",
            "enRegion",
            "arAddress",
            "enAddress",
            "location",
            "sessionPercentage",
          ].map((field) => (
            <Controller
              key={field}
              name={field as keyof HorseForm}
              control={control}
              render={({ field: { value, onChange } }) => (
                <View>
                  <Text style={styles.label}>{field}</Text>
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    placeholder={`Enter ${field}`}
                    style={styles.input}
                  />
                  {errors[field as keyof HorseForm] && (
                    <Text style={styles.errorText}>
                      {errors[field as keyof HorseForm]?.message?.toString()}
                    </Text>
                  )}
                </View>
              )}
            />
          ))}
          <Controller
            name="openTime"
            control={control}
            render={({ field: { value, onChange } }) => (
              <View>
                <Text style={styles.label}>Open Time</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowOpenPicker(true)}
                >
                  <Text style={styles.inputText}>{value || "Select Open Time"}</Text>
                </TouchableOpacity>
                {showOpenPicker && (
                  <DateTimePicker
                    value={value ? new Date(`1970-01-01T${value}:00`) : new Date()}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={(_, selectedDate) => {
                      setShowOpenPicker(false);
                      if (selectedDate) {
                        const formatted = selectedDate.toTimeString().slice(0, 5); // HH:mm
                        onChange(formatted);
                      }
                    }}
                  />
                )}
              </View>
            )}
          />


          <Controller
            name="closeTime"
            control={control}
            render={({ field: { value, onChange } }) => (
              <View>
                <Text style={styles.label}>Close Time</Text>
                <TouchableOpacity
                  style={styles.input}
                  onPress={() => setShowClosePicker(true)}
                >
                  <Text style={styles.inputText}>{value || "Select Close Time"}</Text>
                </TouchableOpacity>
                {showClosePicker && (
                  <DateTimePicker
                    value={value ? new Date(`1970-01-01T${value}:00`) : new Date()}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={(_, selectedDate) => {
                      setShowClosePicker(false);
                      if (selectedDate) {
                        const formatted = selectedDate.toTimeString().slice(0, 5); // HH:mm
                        onChange(formatted);
                      }
                    }}
                  />
                )}
              </View>
            )}
          />

          {/* Gender Select */}
          <Controller
            name="gender"
            control={control}
            render={({ field: { value, onChange } }) => (
              <AppSelect
                label="Gender"
                value={value}
                onChange={onChange}
                options={genderOptions}
                dropdownWidth="100%"
              />
            )}
          />
          {errors.gender && <Text style={styles.errorText}>{errors.gender.message}</Text>}

          {/* Image Preview */}
          {image ? (
            <View style={styles.imageBox}>
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity onPress={removeImage}>
                <Text style={styles.deleteIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text>Add photo ⬆️</Text>
            </TouchableOpacity>
          )}
        </ScrollView>

        <AppButton
          loading={isPending}
          disabled={isPending}
          title="Save changes"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </AppWrapper>
  );
};

export default CompleteStable;

// ========== Styles ==========
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingBottom: 40 },
  formContainer: { padding: 20 },
  label: { fontWeight: "bold", marginTop: 10, marginBottom: 4, color: "#603c2b" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    color: "#603c2b",
    padding: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  imageBox: { position: "relative", alignSelf: "flex-start", marginVertical: 12 },
  image: { width: 100, height: 100, borderRadius: 8 },
  inputText: { color: "#603c2b" },
  deleteIcon: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 12,
  },
  uploadButton: {
    backgroundColor: "#f7f7f7",
    borderRadius: 12,
    padding: 12,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 4,
  },
});
