import React, { useState, useRef } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

interface Picture {
  id: string | number;
  url: string;
}

interface PictureGalleryProps {
  pictures: Picture[];
  videoUrl?: string; 
}

const ITEM_WIDTH = Dimensions.get("window").width - 78;
const MARGIN_HORIZONTAL = 5;

const getYouTubeId = (url: string) => {
  const match = url.match(
    /(?:youtube\.com\/.*v=|youtu\.be\/|embed\/)([^"&?/ ]{11})/
  );
  return match ? match[1] : null;
};

const PictureGallery: React.FC<PictureGalleryProps> = ({ pictures, videoUrl }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);

  // Combine pictures + optional video
  const data = videoUrl
    ? [...pictures, { id: "video", url: videoUrl, type: "video" }]
    : pictures;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const itemWidth = ITEM_WIDTH + MARGIN_HORIZONTAL * 2;
    const index = Math.round(offsetX / itemWidth);
    setActiveIndex(index);
  };

  const Pagination = () => (
    <View style={styles.paginationContainer}>
      {data.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.paginationBullet,
            index === activeIndex && styles.activeBullet,
          ]}
          onPress={() =>
            flatListRef.current?.scrollToIndex({ index, animated: true })
          }
        />
      ))}
    </View>
  );

  return (
    <View>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item, index) => item.id?.toString() || `item-${index}`}
        renderItem={({ item }) => {
          if (item.type === "video") {
            const videoId = getYouTubeId(item.url);
            return (
              <View style={styles.itemContainer}>
                <YoutubePlayer
                  height={190}
                  width={ITEM_WIDTH}
                  play={false}
                  videoId={videoId || ""}
                />
              </View>
            );
          }
          return (
            <View style={styles.itemContainer}>
              <Image style={styles.image} source={{ uri: item.url }} resizeMode="contain" />
            </View>
          );
        }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      />
      <Pagination />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: 190,
    marginHorizontal: MARGIN_HORIZONTAL,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#000",
  },
  image: {
    height: '100%',
    width: ITEM_WIDTH,
    borderRadius: 8,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  paginationBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },
  activeBullet: {
    backgroundColor: "#000",
  },
});

export default PictureGallery;
