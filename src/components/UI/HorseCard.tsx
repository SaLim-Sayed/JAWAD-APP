import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

interface HorseCardProps {
    image: any;
    name: string;
    type: string;
    price: number;
    category: string;
    onPressStart?: () => void;
}

const HorseCard: React.FC<HorseCardProps> = ({
    image,
    name,
    type,
    price,
    category,
    onPressStart,
}) => (
    <TouchableOpacity onPress={onPressStart} style={styles.card} className="rounded-xl border border-gray-600/30 overflow-hidden" >
        <Image className="rounded-t-2xl" source={image} style={styles.image} />
        <Col className="p-2" gap={4}>
            <Row items="center" gap={4}>
                <Image source={Icons.stable} style={styles.icon} />
                <AppText className="font-bold tajawal-semibold-20 text-brownColor-400 mt-2">{name}</AppText>
            </Row>
            <Row items="center" gap={4}>
                <Image source={Icons.hashtag1} style={styles.icon} />
                <AppText className="text-brownColor-300">{type}</AppText>
            </Row>
            <Row items="center" gap={4}>
                <Image source={Icons.coin} style={styles.icon} />
                <AppText className="text-brownColor-300">{price}</AppText>
            </Row>
            <Row items="center" gap={4}>
                <Image source={Icons.likeTag} style={styles.icon} />
                <AppText className="text-brownColor-300">{category}</AppText>
            </Row>
             
        </Col>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
         width: 182,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        alignItems: "flex-start",
        overflow: "hidden",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",

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

export default HorseCard;