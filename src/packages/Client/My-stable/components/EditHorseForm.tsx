import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ImageBackground,
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
import { useEffect, useState } from "react";
import { HorseForm, horseSchema } from "./horseSchema";
import AppSelect from "@/components/UI/AppSelect";
import { useAuthStore } from "@/store/useAuthStore";
import useGlobalNavigation from "@/provider/useGlobalNavigation";
import useAppRouteParams from "@/provider/useAppRouteParams";
import { usePutMutation } from "@/hooks/usePutMutation";
import { useApiQuery } from "@/hooks";
import { GetHorseDetailResponse } from "../../Services/@types/horse.types";
import { navigationEnums } from "@/provider/navigationEnums";
import { Icons } from "@/constants";
import { useLanguage } from "@/store";

export const genders = [
  { ar: "ذكر", en: "Male" },
  { ar: "أنثى", en: "Female" },
];

export const levels = [
  { ar: "مبتدئ", en: "Beginner" },
  { ar: "متوسط", en: "Intermediate" },
   { ar: "محترف", en: "Professional" },
];



const EditHorseForm = () => {
  const { navigate ,goBack} = useGlobalNavigation();
  const { id } = useAppRouteParams("HORSE_EDIT");
  const [uploading, setUploading] = useState(false);
const {language}=useLanguage()
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

  const { data } = useApiQuery<GetHorseDetailResponse>({
    url: apiKeys.horse.horseDetail(id),
    key: [apiKeys.horse.horseDetail(id)],
  });

  const { mutate, isPending } = usePutMutation({
    endpoint: apiKeys.horse.updateHorse(id),
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

    mutate(formData, {
      onSuccess: () => {
        goBack()
      },
    });
    setUploading(false);
  };

  useEffect(() => {
    if (data) {
      setValue("enName", data?.horse?.name);
      setValue("arName", data?.horse?.name);
      setValue("enDescription", data?.horse?.description);
      setValue("arDescription", data?.horse?.description);
      setValue("enGender", data?.horse?.gender);
      setValue("arGender", data?.horse?.gender);
      setValue("enPrice", data?.horse?.price.toString());
      setValue("arPrice", data?.horse?.price.toString());
      setValue("enLevel", data?.horse?.level);
      setValue("arLevel", data?.horse?.level);
      setValue("enType", data?.horse?.type);
      setValue("arType", data?.horse?.type);
      setValue("enFeature", data?.horse?.feature);
      setValue("arFeature", data?.horse?.feature);
      setValue("color", data?.horse?.color);
      setValue("images", data?.horse?.picUrls?.slice(0, 2)?.map((url, i) => ({
        uri: url,
        name: `image-${i}.jpg`,
        type: "image/jpeg",
      })) || []);
    }
  }, [data]);

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
          name={language === "ar" ? "arGender" : "enGender"}
          render={({ field: { value, onChange } }) => (
            <AppSelect
              label="الجنس"
              value={value}
              onChange={(selected) => {
                const selectedGender = genders.find((g) => g[language] === selected);
                if (selectedGender) {
                  onChange(selectedGender[language]);
                  setValue(language === "ar" ? "enGender" : "arGender", selectedGender[language]);
                }
              }}
              options={genders.map((g) => ({
                label: g[language] + " - " + g[language === "ar" ? "en" : "ar"],
                value: g[language],
              }))}
              dropdownWidth="90%"
            />
          )}
        />

        <Controller
          control={control}
          name={language === "ar" ? "arLevel" : "enLevel"}
          render={({ field: { value, onChange } }) => (
            <AppSelect
              label="المستوى"
              value={value}
              onChange={(selected) => {
                const selectedLevel = levels.find((l) => l[language] === selected);
                if (selectedLevel) {
                  onChange(selectedLevel[language]);
                  setValue(language === "ar" ? "enLevel" : "arLevel", selectedLevel[language]);
                }
              }}
              options={levels.map((l) => ({
                label: l[language] + " - " + l[language === "ar" ? "en" : "ar"],
                value: l[language],
              }))}
              dropdownWidth="90%"
            />
          )}
        />

        <View style={styles.section}>
          <TouchableOpacity style={styles.uploadBtn} onPress={pickImages}>
            <Text>Select Images</Text>
          </TouchableOpacity>
          <View style={styles.imageGrid}>
            {watch("images").map((img, index) => (
              <View key={index} style={styles.imageWrapper}>
                <ImageBackground source={{ uri: img.uri }} style={styles.image} >
               
                  <View className="absolute bottom-0 left-0 right-0 bg-white/80 p-2">
                    <View className="flex-row items-end justify-between">
                      <TouchableOpacity onPress={() => { }}>
                        <Icons.addtoStable />
                      </TouchableOpacity>

                      <TouchableOpacity onPress={() => removeImage(index)} style={styles.removeBtn}>
                        <Icons.trash width={24} height={24} />
                      </TouchableOpacity>

                     </View>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </View>
          {errors.images && <Text style={styles.error}>{errors.images.message}</Text>}
        </View>
      </ScrollView>

      <AppButton
        title="update Horse"
        loading={uploading || isPending}
        onPress={handleSubmit(onSubmit)}
        style={styles.submit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scroll: { padding: 20, paddingBottom: 150 },
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
    width: 90,
    height: 90,
    borderRadius: 6,
    overflow: "hidden",
  },
  removeBtn: {
    position: "absolute",
    bottom: 2,
    right: 6,
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

export default EditHorseForm;

