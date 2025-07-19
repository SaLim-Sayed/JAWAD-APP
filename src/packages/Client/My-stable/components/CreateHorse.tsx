import { zodResolver } from "@hookform/resolvers/zod";
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

import AppButton from "@/components/UI/AppButton";

import { apiKeys } from "@/hooks/apiKeys";
import { showGlobalToast } from "@/hooks/useGlobalToast";
import { usePostMutation } from "@/hooks/usePostMutation";
import { useState } from "react";
import { HorseForm, horseSchema } from "./horseSchema";
import AppSelect from "@/components/UI/AppSelect";
import { useAuthStore } from "@/store/useAuthStore";

export const genders = [
    { ar: "ذكر", en: "Male" },
    { ar: "أنثى", en: "Female" },
];

export const levels = [
    { ar: "مبتدئ", en: "Beginner" },
    { ar: "متوسط", en: "Intermediate" },
    { ar: "متقدم", en: "Advanced" },
    { ar: "محترف", en: "Professional" },
];


 
const CreateHorse = () => {
    const [uploading, setUploading] = useState(false);
  
    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<HorseForm>({
      resolver: zodResolver(horseSchema),
      defaultValues: {
        images: [],
        enName: "", arName: "",
        enDescription: "", arDescription: "",
        enPrice: "", arPrice: "",
        enLevel: "", arLevel: "",
        enType: "", arType: "",
        enFeature: "", arFeature: "",
        color: ""
      },
    });
  
    const { authData } = useAuthStore();
  
    const { mutate, isPending } = usePostMutation({
      endpoint: apiKeys.horse.addHorse(authData?.id),
      onSuccess: () => {
        showGlobalToast({ type: "success", title: "Horse Added", body: "Horse created successfully" });
      },
      onError: (err) => {
        showGlobalToast({ type: "error", title: "Error", body: err.message });
      },
    });
  
    const pickImages = () => {
      launchImageLibrary({ mediaType: "photo", selectionLimit: 5 }, (res) => {
        if (res?.assets?.length) {
          const newImages = res.assets.map((asset) => ({
            uri: asset.uri!,
            name: asset.fileName || `photo-${Date.now()}.jpg`,
            type: asset.type || "image/jpeg",
          }));
          setValue("images", [...watch("images"), ...newImages]);
        }
      });
    };
  
    const removeImage = (index: number) => {
      const updatedImages = [...watch("images")];
      updatedImages.splice(index, 1);
      setValue("images", updatedImages);
    };
  
    const onSubmit = (data: HorseForm) => {
      setUploading(true);
  
      const formData = new FormData();
      data.images.forEach((img) => {
        formData.append("image", img as any);
      });
  
      Object.entries(data).forEach(([key, value]) => {
        if (key !== "images") formData.append(key, value);
      });
  
      mutate(formData);
      setUploading(false);
    };
  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
          {[
            "enName", "arName", "enDescription", "arDescription",
            "enPrice", "arPrice",
            "enType", "arType",
            "enFeature", "arFeature", "color"
          ].map((field) => (
            <Controller
              key={field}
              control={control}
              name={field as keyof HorseForm}
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>{field}</Text>
                  <TextInput
                    // @ts-ignore
                    value={value}
                    onChangeText={onChange}
                    style={styles.input}
                    placeholder={field}
                  />
                  {errors[field as keyof HorseForm] && (
                    <Text style={styles.error}>{(errors[field as keyof HorseForm] as any)?.message}</Text>
                  )}
                </View>
              )}
            />
          ))}
  
          <Controller
            control={control}
            name="arGender"
            render={({ field: { value, onChange } }) => (
              <AppSelect
                label="الجنس"
                value={value}
                onChange={(selected) => {
                  const selectedGender = genders.find((g) => g.ar === selected);
                  if (selectedGender) {
                    onChange(selectedGender.ar);
                    setValue("enGender", selectedGender.en);
                  }
                }}
                options={genders.map((g) => ({
                  label: g.ar + " - " + g.en,
                  value: g.ar,
                }))}
                dropdownWidth="90%"
              />
            )}
          />
  
          <Controller
            control={control}
            name="arLevel"
            render={({ field: { value, onChange } }) => (
              <AppSelect
                label="المستوى"
                value={value}
                onChange={(selected) => {
                  const selectedLevel = levels.find((l) => l.ar === selected);
                  if (selectedLevel) {
                    onChange(selectedLevel.ar);
                    setValue("enLevel", selectedLevel.en);
                  }
                }}
                options={levels.map((l) => ({
                  label: l.ar + " - " + l.en,
                  value: l.ar,
                }))}
                dropdownWidth="90%"
              />
            )}
          />
  
           <View style={styles.section}>
            <Text style={styles.label}>Images</Text>
            <TouchableOpacity style={styles.uploadBtn} onPress={pickImages}>
              <Text>Select Images</Text>
            </TouchableOpacity>
            <View style={styles.imageGrid}>
              {watch("images").map((img, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: img.uri }} style={styles.image} />
                  <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeBtn}>
                    <Text style={styles.removeText}>X</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            {errors.images && <Text style={styles.error}>{errors.images.message}</Text>}
          </View>
        </ScrollView>
  
        <AppButton
          title="Add Horse"
          loading={uploading || isPending}
          onPress={handleSubmit(onSubmit)}
          style={styles.submit}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    scroll: { padding: 20, paddingBottom: 50 },
    inputContainer: { marginBottom: 12 },
    label: { fontWeight: "600", marginBottom: 6 },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      padding: 10,
      borderRadius: 8,
    },
    section: { marginTop: 20 },
    uploadBtn: {
      borderWidth: 1,
      borderStyle: "dashed",
      padding: 10,
      alignItems: "center",
      borderRadius: 6,
      marginBottom: 10,
    },
    imageGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    imageWrapper: {
      position: "relative",
      marginRight: 10,
      marginBottom: 10,
    },
    image: {
      width: 80,
      height: 80,
      borderRadius: 6,
    },
    removeBtn: {
      position: "absolute",
      top: -6,
      right: -6,
      backgroundColor: "red",
      borderRadius: 10,
      padding: 2,
      width: 20,
      height: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    removeText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "bold",
    },
    error: { color: "red", fontSize: 12 },
    submit: {
      width: "90%",
      alignSelf: "center",
      marginVertical: 20,
    },
  });
  
  export default CreateHorse;
  
 