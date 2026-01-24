import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
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
import { t } from "@/lib";
import { TextInput } from "react-native-paper";
import { Input } from "@/components";
import AppLayout from "@/components/UI/AppLayout";

export const genders = [
  { ar: "ذكر", en: "Male" },
  { ar: "أنثى", en: "Female" },
];

export const levels = [
  { ar: "مبتدئ", en: "Beginner" },
  { ar: "متوسط", en: "Intermediate" },
   { ar: "محترف", en: "Professional" },
];

export const types=[
  {ar:"جمل",en:"camel"},
  {ar:"حصان",en:"horse"},
  {ar:"حصان عربي",en:"arabian horse"}
  
]
export const features=[
  {ar:"جري",en:"running"},
  {ar:"رقص",en:"dancing"}
  
]


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
      color: "",
      video: ""
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
    <AppLayout footer={
    <AppButton
      title="Add Horse" 
      onPress={handleSubmit(onSubmit)}
      loading={uploading || isPending}
    />  } title={t("Global.add_horse")} showBackButton >
         {[
          "enName", "arName", "enDescription", "arDescription",
          "enPrice", "arPrice",
           "color"
        ].map((field) => (
          <Controller
            key={field}
            control={control}
            name={field as keyof HorseForm}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Input
                  label={t(`Global.${field}`)}
                  name={field}
                  control={control}
                  // @ts-ignore
                  value={value}
                  onChangeText={onChange}
                  style={styles.input}
                />
                
              </View>
            )}
          />
        ))}

        <Controller
          control={control}
          name="arFeature"
          render={({ field: { value, onChange } }) => (
            <AppSelect
              label={t("Global.feature")}
              value={value}
              onChange={(selected) => {
                const selectedType = features.find((g) => g.ar === selected);
                if (selectedType) {
                  onChange(selectedType.ar);
                  setValue("enFeature", selectedType.en);
                }
              }}
              options={features.map((g) => ({
                label: g.ar + " - " + g.en,
                value: g.ar,
              }))}
              dropdownWidth="90%"
            />
          )}
        />
        <Controller
          control={control}
          name="arType"
          render={({ field: { value, onChange } }) => (
            <AppSelect
              label={t("Global.type")}
              value={value}
              onChange={(selected) => {
                const selectedType = types.find((g) => g.ar === selected);
                if (selectedType) {
                  onChange(selectedType.ar);
                  setValue("enType", selectedType.en);
                }
              }}
              options={types.map((g) => ({
                label: g.ar + " - " + g.en,
                value: g.ar,
              }))}
              dropdownWidth="90%"
            />
          )}
        />
        <Controller
          control={control}
          name="arGender"
          render={({ field: { value, onChange } }) => (
            <AppSelect
              label={t("Global.gender")}
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
              label={t("Global.level")}
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
        
        <Controller
          control={control}
          name="video"
          render={({ field: { value, onChange } }) => (
            <Input
              label="Video"
              name="video"
              control={control}
              value={value}
              onChangeText={onChange}
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
      </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 20, paddingBottom: 300 },
  inputContainer: { marginBottom: 12 },
  label: { fontWeight: "600", marginBottom: 6 },
  input: { backgroundColor: "#fff" },

  section: { marginTop: 20 },
  uploadBtn: {
    borderWidth: 1,
    backgroundColor:"#999",
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

