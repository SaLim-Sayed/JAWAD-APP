import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
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

import AppButton from "@/components/UI/AppButton";
import { useApiQuery } from "@/hooks";
import { apiKeys } from "@/hooks/apiKeys";
import { showGlobalToast } from "@/hooks/useGlobalToast";
import { usePutMutation } from "@/hooks/usePutMutation";
import { useAuthStore } from "@/store/useAuthStore";
import { GetStableDetailsResponse } from "../../Services/@types/horse.types";
import { useLanguage } from "@/store";
import AppSelect from "@/components/UI/AppSelect";
import { cities } from "@/constants/data";
import DateTimePicker from '@react-native-community/datetimepicker';

// ========== Schema ==========
const stableSchema = z.object({
    arCity: z.string().optional(),
    enCity: z.string().optional(),
    arRegion: z.string().optional(),
    enRegion: z.string().optional(),
    arAddress: z.string().optional(),
    enAddress: z.string().optional(),
    location: z.string().optional(),
    sessionPercentage: z.string().optional(),
    stableName: z.string().optional(),
    description: z.string().optional(),
    phone: z.string().optional(),
    logo: z.string().optional(),
    openTime: z.string().optional(), // "08:00"
    closeTime: z.string().optional(), // "22:00"
});

type StableForm = z.infer<typeof stableSchema>;

// ========== Main ==========
const StableOverviews = () => {
    const [logo, setLogo] = useState<string | undefined>();
    const [showOpenPicker, setShowOpenPicker] = useState(false);
    const [showClosePicker, setShowClosePicker] = useState(false);

    const { authData } = useAuthStore();
    const { data } = useApiQuery<GetStableDetailsResponse>({
        url: apiKeys.stable.stableDetail(authData?.id as string),
        key: [apiKeys.stable.stableDetail(authData?.id as string)],
    });

    const { mutate, isPending } = usePutMutation({
        endpoint: apiKeys.stable.updateStable(authData?.id),
        onSuccess: () => {
            showGlobalToast({
                type: "success",
                title: "Saved",
                body: "Stable updated.",
            });
        },
        onError: (error) => {
            showGlobalToast({
                type: "error",
                title: "Error",
                body: error.message,
            });
        },
    });

    const { language } = useLanguage();
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<StableForm>({
        resolver: zodResolver(stableSchema),
        defaultValues: {
            stableName: data?.stable.name[language],
            description: data?.stable.address[language],
            phone: data?.stable.phone,
            location: data?.stable.location,
            logo: data?.stable.picUrl,
            arCity: data?.stable.city["ar"],
            enCity: data?.stable.city["en"],
            arRegion: data?.stable.region["ar"],
            enRegion: data?.stable.region["en"],
            arAddress: data?.stable.address["ar"],
            enAddress: data?.stable.address["en"],
            sessionPercentage: data?.stable.sessionPercentage.toString(),
            openTime: data?.stable.openTime,
            closeTime: data?.stable.closeTime,
        },
    });

    useEffect(() => {
        if (data?.stable) {
            const stable = data.stable;
            setValue("stableName", stable.name[language] || "");
            setValue("description", stable.address[language] || "");
            setValue("phone", stable.phone || "");
            setValue("location", stable.location || "");
            setValue("logo", stable.picUrl || undefined);
            setValue("arCity", stable.city["ar"] || "");
            setValue("enCity", stable.city["en"] || "");
            setValue("arRegion", stable.region["ar"] || "");
            setValue("enRegion", stable.region["en"] || "");
            setValue("arAddress", stable.address["ar"] || "");
            setValue("enAddress", stable.address["en"] || "");
            setValue("sessionPercentage", stable.sessionPercentage.toString());
            setValue("openTime", stable.openTime || "");
            setValue("closeTime", stable.closeTime || "");

            if (stable.picUrl) setLogo(stable.picUrl);
        }
    }, [data, reset]);

    const pickLogo = () => {
        launchImageLibrary({ mediaType: "photo" }, (res) => {
            const uri = res?.assets?.[0]?.uri;
            if (uri) {
                setLogo(uri);
                setValue("logo", uri);
            }
        });
    };

    const onSubmit = (data: StableForm) => {
        const formData = new FormData();

        formData.append("phone", data.phone || "");
        formData.append("location", data.location || "");
        formData.append("arCity", data.arCity || "");
        formData.append("enCity", data.enCity || "");
        formData.append("arRegion", data.arRegion || "");
        formData.append("enRegion", data.enRegion || "");
        formData.append("arAddress", data.arAddress || "");
        formData.append("enAddress", data.enAddress || "");
        formData.append("sessionPercentage", data.sessionPercentage?.toString() || "");
        formData.append("openTime", data.openTime || "");
        formData.append("closeTime", data.closeTime || "");

        if (logo) {
            formData.append("image", {
                uri: logo,
                name: "logo.jpg",
                type: "image/jpeg",
            } as any);
        }

        mutate(formData);
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 200 }}>
                {/* Logo Upload */}
                <Text style={styles.label}>Add Logo</Text>
                <TouchableOpacity onPress={pickLogo} style={styles.logoContainer}>
                    {logo ? (
                        <Image source={{ uri: logo }} style={styles.logoImage} />
                    ) : (
                        <View style={styles.logoPlaceholder}>
                            <Text>+</Text>
                        </View>
                    )}
                    <View style={styles.editIcon}>
                        <Text style={{ fontSize: 12 }}>✏️</Text>
                    </View>
                </TouchableOpacity>

                {/* Text Inputs */}
                <Controller
                    name="stableName"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <>
                            <Text style={styles.label}>Stable Name</Text>
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Enter Your Stable Name"
                                style={styles.input}
                            />
                            {errors.stableName && (
                                <Text style={styles.errorText}>{errors.stableName.message}</Text>
                            )}
                        </>
                    )}
                />

                <Controller
                    name="description"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <>
                            <Text style={styles.label}>Description</Text>
                            <TextInput
                                value={value}
                                onChangeText={onChange}
                                placeholder="Enter Your Stable Description"
                                style={styles.input}
                            />
                            {errors.description && (
                                <Text style={styles.errorText}>{errors.description.message}</Text>
                            )}
                        </>
                    )}
                />

                <Controller
                    name="phone"
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <>
                            <Text style={styles.label}>Mobile Number</Text>
                            <TextInput
                                keyboardType="phone-pad"
                                value={value}
                                onChangeText={onChange}
                                placeholder="Enter Your Mobile Number"
                                style={styles.input}
                            />
                            {errors.phone && (
                                <Text style={styles.errorText}>{errors.phone.message}</Text>
                            )}
                        </>
                    )}
                />

                {/* City Select */}
                <Controller
                    name={language === "ar" ? "arCity" : "enCity"}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                        <AppSelect
                            label="City"
                            //@ts-ignore
                            value={value}
                            onChange={(selectedAr) => {
                                const selectedCity = cities.find(
                                    (c) => c[language] === selectedAr
                                );
                                if (selectedCity) {
                                    onChange(selectedCity[language]);
                                    setValue(
                                        language === "ar" ? "enCity" : "arCity",
                                        selectedCity[language === "ar" ? "en" : "ar"]
                                    );
                                }
                            }}
                            options={cities.map((city) => ({
                                label:
                                    city[language] +
                                    " - " +
                                    city[language === "ar" ? "en" : "ar"],
                                value: city[language],
                            }))}
                            dropdownWidth="80%"
                        />
                    )}
                />

                {/* Other text fields */}
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
                        name={field as keyof StableForm}
                        control={control}
                        render={({ field: { value, onChange } }) => (
                            <View>
                                <Text style={styles.label}>{field}</Text>
                                <TextInput
                                    //@ts-ignore
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder={`Enter ${field}`}
                                    style={styles.input}
                                />
                                {errors[field as keyof StableForm] && (
                                    <Text style={styles.errorText}>
                                        {errors[field as keyof StableForm]?.message?.toString()}
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
            </ScrollView>

            <AppButton
                title="Save changes"
                onPress={handleSubmit(onSubmit)}
                loading={isPending}
                disabled={isPending}
            />
        </View>
    );
};

export default StableOverviews;

// ========== Styles ==========
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingBottom: 40,
    },
    inputText: {
        color: "#603c2b",
    },
    label: {
        fontWeight: "bold",
        marginTop: 12,
        marginBottom: 6,
        color: "#603c2b",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 10,
        marginBottom: 8,
        color: "#603c2b",
    },
    errorText: {
        color: "red",
        fontSize: 12,
        marginBottom: 4,
    },
    logoContainer: {
        alignSelf: "center",
        position: "relative",
        width: 100,
        height: 100,
    },
    logoImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    logoPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#d5eafd",
        alignItems: "center",
        justifyContent: "center",
    },
    editIcon: {
        position: "absolute",
        bottom: 0,
        right: 0,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 4,
    },
});
