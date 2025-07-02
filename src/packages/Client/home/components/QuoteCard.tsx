import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "@/components/UI/AppText";
import Image from "@/components/UI/Image";
import { images } from "@/assets/images";

const QuoteCard: React.FC = () => (
  <View style={styles.outer}>
    <Image source={images.horseRider2} style={styles.bgImage} background>
      <View style={styles.quoteCard}>
           <View style={styles.innerOverlay}>
            <AppText className="text-white text-base font-semibold mb-2">
              No hour of life is wasted that is spent in the saddle.
            </AppText>
            <AppText className="text-white text-xs italic">- Winston Churchill</AppText>
          </View>
       </View>
    </Image>
  </View>
);

const styles = StyleSheet.create({
  outer: { width: "100%", alignItems: "center",justifyContent:"center",    },
  bgImage: { width: "100%", height: 230, position: "relative", direction: "ltr", borderRadius: 20 },
  quoteCard: { borderRadius: 18, overflow: "hidden", width: "100%", height: 149, marginTop: 112, position: "absolute", bottom: 0, left: 0, right: 0 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(119, 77, 4,0.38)" },
  innerOverlay: { padding: 16, ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(119, 77, 4,0.38)", justifyContent: "center" },
});

export default QuoteCard;