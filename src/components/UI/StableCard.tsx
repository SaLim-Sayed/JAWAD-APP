import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AppText from "@/components/UI/AppText";
import Row from "@/components/UI/Row";
import Col from "@/components/UI/Col";
import Image from "@/components/UI/Image";
import { Icons } from "@/constants";
import { StarRatingDisplay } from "react-native-star-rating-widget";
import NavButton from "@/packages/Onboarding/components/NavbarButton";
import { isRTL } from "@/provider/constant";
import { useTranslation } from "react-i18next";

interface StableCardProps {
    id: string;
    image: any;
    name: string;
    type: string;
    rating: number;
    onPressStart?: () => void;
    status?: "Open" | "Closed";
}

const StableCard: React.FC<StableCardProps> = ({
    id,
    image,
    name,
    type,
    rating,
    onPressStart,
    status = "Open",
}) => {
    const { t } = useTranslation();

    const isOpen = status === "Open";

    return (
        <TouchableOpacity 
            onPress={onPressStart} 
            style={styles.card}
         >
            <Image 
                className="rounded-t-2xl" 
                source={image} 
                resizeMode="cover" 
                style={styles.image} 
                background
            >
                {!isOpen && (
                    <View style={styles.overlay}>
                        <AppText className="text-white text-center">
                            {t("Global.closed")}
                        </AppText>
                    </View>
                )}
                {isOpen && (
                    <View style={styles.openLabel}>
                        <AppText className="text-white text-xs font-bold">
                            {t("Global.open")}
                        </AppText>
                    </View>
                )}
            </Image>
            
            <Col className="p-2" gap={4}>
                <Row items="center" gap={12}>
                    <Image source={Icons.location} style={styles.icon} />
                    <AppText className="font-bold tajawal-semibold-20 text-brownColor-400">{name}</AppText>
                </Row>
                <Row items="center" gap={12}>
                    <Image source={Icons.stable} style={styles.icon} />
                    <AppText className="text-brownColor-300">{type}</AppText>
                </Row>
                <Row gap={12} className="my-2">
                    <StarRatingDisplay
                        rating={rating}
                        starStyle={{ width: 15, height: 14 }}
                        color="#FEAF48"
                        starSize={20}
                    />
                </Row>
                <Row gap={2} items="center" className="my-2 gap-2">
                    <NavButton
                        className="w-32 h-8"
                        text={t("Global.start_now")}
                        onPress={() => onPressStart?.()}
                         iconLeft={
                            <View className="flex items-center justify-center h-8 p-2 w-8 rounded-full bg-amber-950">
                                <Icons.arrowRight
                                    style={{
                                        transform: [{ rotate: `${isRTL ? 180 : 0}deg` }],
                                    }}
                                    className="text-white"
                                    width={20}
                                    height={20}
                                />
                            </View>
                        }
                    />
                    <Image source={Icons.camera} style={styles.icon} />
                </Row>
            </Col>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#E7E7E74D",
        borderRadius: 16,
        maxWidth: 170,
        marginHorizontal: 6,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        alignItems: "flex-start",
        overflow: "hidden",
        position: "relative",
    },
    image: {
        width: "100%",
        height: 108,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    icon: {},
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
    openLabel: {
        position: "absolute",
        top: 6,
        right: 6,
        backgroundColor: "green",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
    },
});

export default StableCard;
