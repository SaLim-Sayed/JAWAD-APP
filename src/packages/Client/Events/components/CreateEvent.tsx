import { zodResolver } from "@hookform/resolvers/zod";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
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
import { HelperText, TextInput } from "react-native-paper";

import AppButton from "@/components/UI/AppButton";
import AppSelect from "@/components/UI/AppSelect";
import { Icons } from "@/constants";
import { cities } from "@/constants/data";
import { apiKeys } from "@/hooks/apiKeys";
import { showGlobalToast } from "@/hooks/useGlobalToast";
import { usePostMutation } from "@/hooks/usePostMutation";
import { t } from "@/lib";
import { EventForm, eventSchema } from "./eventSchema";

const CreateEvent = () => {
  const [uploading, setUploading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EventForm>({
    resolver: zodResolver(eventSchema),

  });

  const { mutate, isPending } = usePostMutation({
    endpoint: apiKeys.event.addEvent,
    onSuccess: () => {
      showGlobalToast({
        type: "success",
        title: "Event Added",
        body: "Event created successfully",
      });
    },
    onError: (err) => {
      showGlobalToast({ type: "error", title: "Error", body: err.message });
    },
  });

  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo", selectionLimit: 1 }, (res) => {
      if (res?.assets?.length) {
        const newImg = {
          uri: res.assets[0].uri!,
          name: res.assets[0].fileName || `event-${Date.now()}.jpg`,
          type: res.assets[0].type || "image/jpeg",
        };
        setValue("image", [newImg]);
      }
    });
  };

  const removeImage = () => {
    setValue("image", []);
  };

  const onSubmit = (data: EventForm) => {
    setUploading(true);
    const formData = new FormData();

    if (data.image.length > 0) {
      formData.append("image", data.image[0] as any);
    }

    Object.entries(data).forEach(([key, value]) => {
      if (key !== "image") formData.append(key, value as any);
    });

    mutate(formData);
    setUploading(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* نصوص إنجليزية وعربية */}
        {[
          "enName",
          "arName",
          "enDescription",
          "arDescription",
          "enRegion",
          "arRegion",
          "enAddress",
          "arAddress",
          "location",
          "price",
        ].map((field) => (
          <Controller
            key={field}
            control={control}
            name={field as keyof EventForm}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <TextInput
                  mode="outlined"
                  label={t(`Global.${field}`)}
                  // @ts-ignore
                  value={value}
                  onChangeText={onChange}
                  error={!!errors[field as keyof EventForm]}
                  style={styles.input}
                />
                <HelperText type="error" visible={!!errors[field as keyof EventForm]}>
                  {(errors[field as keyof EventForm] as any)?.message}
                </HelperText>
              </View>
            )}
          />
        ))}

        {/* City Select */}
        <Controller
          name="arCity"
          control={control}
          render={({ field: { value, onChange } }) => (
            <AppSelect
              label="City"
              // @ts-ignore
              value={value}
              onChange={(selectedAr) => {
                const selectedCity = cities.find((c) => c.ar === selectedAr);
                if (selectedCity) {
                  onChange(selectedCity.ar);
                  setValue("enCity", selectedCity.en);
                }
              }}
              options={cities.map((city) => ({
                label: city.ar + " - " + city.en,
                value: city.ar,
              }))}
              dropdownWidth="80%"
            />
          )}
        />
        {errors.arCity && <Text style={styles.error}>{errors.arCity.message}</Text>}

      {/* Date Picker */}
<AppButton
  title={`${t("booking.date")}: ${
    watch("date") ? watch("date") : t("booking.select_date")
  }`}
  onPress={() => setShowDatePicker(true)}
  variant="outline"
  endIcon={<Icons.calendar />}
/>
{showDatePicker && (
  <DateTimePicker
  value={watch("date") ? new Date(watch("date")) : new Date()}
  mode="date"
  display="default"
  onChange={(_, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setValue("date", formattedDate, { shouldValidate: true });
    }
  }}
/>

)}


        {/* Upload Image */}
        <View style={styles.section}>
          <Text style={styles.label}>Image</Text>
          {watch("image").length === 0 ? (
            <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
              <Text>Select Image</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.imageWrapper}>
              <Image source={{ uri: watch("image")[0].uri }} style={styles.image} />
              <TouchableOpacity onPress={removeImage} style={styles.removeBtn}>
                <Text style={styles.removeText}>X</Text>
              </TouchableOpacity>
            </View>
          )}
          {errors.image && <Text style={styles.error}>{errors.image.message}</Text>}
        </View>
      </ScrollView>

      <AppButton
        title="Add Event"
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
  input: { backgroundColor: "#fff" },
  section: { marginTop: 20 },
  label: { fontWeight: "600", marginBottom: 6 },
  uploadBtn: {
    borderWidth: 1,
    borderStyle: "dashed",
    padding: 10,
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 10,
  },
  imageWrapper: { position: "relative", marginBottom: 10 },
  image: { width: 120, height: 120, borderRadius: 6 },
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
  removeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  error: { color: "red", fontSize: 12 },
  submit: { width: "90%", alignSelf: "center", marginVertical: 20 },
});

export default CreateEvent;
