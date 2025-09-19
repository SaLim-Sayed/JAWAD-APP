import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import AppText from "@/components/UI/AppText";
import Image from "@/components/UI/Image";
import { images } from "@/assets/images";

const QuoteCard: React.FC = () => {
  const { width, height } = useWindowDimensions();
  
  // Responsive sizing based on screen dimensions
  const cardWidth = Math.min(width * 0.9, 400); // 90% of screen width or max 400px
  const cardHeight = height * 0.25; // 25% of screen height
  const imageAspectRatio = 16 / 9; // Adjust based on your image aspect ratio

  return (
    <View style={[styles.container, { width: cardWidth }]}>
      <View style={[styles.card, { height: cardHeight }]}>
        <Image 
          source={images.heroImage} 
          style={[
            styles.bgImage, 
            { 
              width: cardWidth - 32, // Account for padding
              height: cardHeight - 32, // Account for padding
              aspectRatio: imageAspectRatio 
            }
          ]} 
          resizeMode="cover"  
        />
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    alignSelf: "center", // Center horizontally
  },
  card: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: "#fff",
   
    
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  bgImage: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
  },
  quoteText: {
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});

export default QuoteCard;