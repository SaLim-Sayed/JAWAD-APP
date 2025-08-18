import AppButton from "@/components/UI/AppButton";
import AppText from "@/components/UI/AppText";
import Col from "@/components/UI/Col";
import Image from "@/components/UI/Image";
import Row from "@/components/UI/Row";
import { Icons } from "@/constants";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Photographer } from "@/packages/Client/Photo-session/@types/photography.types";
import { isRTL } from "@/provider/constant";
import { useTranslation } from "react-i18next";
import { StarRatingDisplay } from "react-native-star-rating-widget";

interface PhotographyCardProps {
  Photography: Photographer;
  onStart?: () => void;
}

const PhotographyCard: React.FC<PhotographyCardProps> = ({ Photography, onStart }) => {
  const { t } = useTranslation()
  console.log({Photography})
  return (
    <View style={styles.card} className="bg-white relative rounded-2xl flex-1 mx-4 gap-4 w-[90%] flex-row mb-4 shadow items-start">
      <Image
        source={Photography.picUrls[0]}
        className="rounded-l-2xl"
        style={{ width: 164, height: 160 }}
      />

      <Col gap={4} className="flex-1 pt-2  pr-4 ">
        <Col gap={8}>
          <Row items="center" gap={4}>
            <Icons.location color="#5E3E2C" width={14} height={14} />
            <AppText className="font-bold text-brownColor-400">{Photography.name}</AppText>
          </Row>
          <Row items="center" gap={4}>
            <Icons.calendar color="#5E3E2C" width={14} height={14} />
            <AppText className="ml-1 text-brownColor-400">{Photography.city}</AppText>
          </Row>
          <Row items="center" gap={4}>
            <StarRatingDisplay
            rating={Photography.totalRating}
            starStyle={{ width: 12, height: 12 }}
            starSize={20}
            color="#FEAF48"
          />
          </Row>
        </Col>
      </Col>

      <AppButton
        title={t("Global.start_now")}
        className="absolute bottom-0 right-2 py-1 h-10 w-[30%] border border-brownColor-50 rounded-2xl"
        textClassName="text-brownColor-400"
        variant="outline"
        endIcon={<Icons.arrowRightFill
          style={{
            transform: [{ rotate: `${isRTL ? 180 : 0}deg` }],
          }}
          className="rotate-90 " />}
        onPress={onStart}
      />

    </View>
  );
}

const styles = StyleSheet.create({
    card: {
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    }
});
export default PhotographyCard;
