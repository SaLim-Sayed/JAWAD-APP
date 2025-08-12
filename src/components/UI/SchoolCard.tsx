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

interface SchoolCardProps {
    image: any;
    name: string;
    rating: number;
    onPressStart?: () => void;
}

const SchoolCard: React.FC<SchoolCardProps> = ({
    image,
    name,
    rating,
    onPressStart,
}) => {
    const { t } = useTranslation()
    return (

        <TouchableOpacity onPress={onPressStart} style={styles.card}>
            <Image className="rounded-t-2xl" source={image} style={styles.image} />
            <Col className="p-2" gap={4}>
                <Row items="center" gap={4}>
                    <Image source={Icons.location} style={styles.icon} />
                    <AppText className="font-bold tajawal-semibold-20 text-brownColor-400 mt-2">{name}</AppText>
                </Row>

                <Row gap={2} className="my-2">
                    <StarRatingDisplay
                        rating={rating}
                        starStyle={{ width: 20, height: 14 }}
                        color="#FEAF48"
                    />
                    <AppText className="pt-4 text-brownColor-400 text-sm">{rating}</AppText>
                </Row>
                <Row gap={2} items="center" className="my-2 gap-2">
                    <NavButton
                        className="w-32 h-8"
                        text={t("Global.start_now")}
                        onPress={() => onPressStart?.()}
                        iconLeft={
                            <View className="flex items-center justify-center h-8 p-2 w-8 rounded-full bg-amber-950">
                                <Icons.arrowRight style={{ transform: [{ rotate: `${isRTL ? 180 : 0}deg` }] }} width={20} height={20}  className="text-white" />
                            </View>
                        }
                    />
                    {/* <Image source={Icons.horse} style={styles.icon} /> */}
                </Row>
            </Col>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: "#E7E7E74D",
        borderRadius: 16,
        maxWidth: 182,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        alignItems: "flex-start",
    },
    image: {
        width: "100%",
        height: 108,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    icon: {
        width: 24,
        height: 24,
        borderRadius: 12,
    },
});

export default SchoolCard;