import { isRTL, useLanguage } from "@/store";
import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableOpacity,
  StatusBar,
  Text,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import YoutubePlayer from "react-native-youtube-iframe";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from "react-native-reanimated";

interface Picture {
  id: string | number;
  url: string;
}

interface PictureGalleryProps {
  pictures: Picture[];
  videoUrl?: string; 
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ITEM_WIDTH = SCREEN_WIDTH - 78;
const MARGIN_HORIZONTAL = 5;

const getYouTubeId = (url: string) => {
  const match = url.match(
    /(?:youtube\.com\/.*v=|youtu\.be\/|embed\/)([^"&?/ ]{11})/
  );
  return match ? match[1] : null;
};


const ZoomableImage: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  // Reset zoom when image changes
  React.useEffect(() => {
    scale.value = 1;
    savedScale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
    savedTranslateX.value = 0;
    savedTranslateY.value = 0;
  }, [imageUrl]);

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
      if (scale.value < 1) {
        scale.value = withTiming(1);
        savedScale.value = 1;
      }
      if (scale.value > 4) {
        scale.value = withTiming(4);
        savedScale.value = 4;
      }
    });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (scale.value > 1) {
        translateX.value = savedTranslateX.value + e.translationX;
        translateY.value = savedTranslateY.value + e.translationY;
      }
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    });

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1) {
        scale.value = withTiming(1);
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        savedScale.value = 1;
        savedTranslateX.value = 0;
        savedTranslateY.value = 0;
      } else {
        scale.value = withTiming(2);
        savedScale.value = 2;
      }
    });

  const composedGesture = Gesture.Simultaneous(
    pinchGesture,
    panGesture,
    doubleTapGesture
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={styles.gestureContainer}>
      <GestureDetector gesture={composedGesture}>
        <Animated.View style={[styles.zoomContainer, animatedStyle]}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.zoomImage}
            resizeMode="cover"
          />
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const ImageZoomModal: React.FC<{
  visible: boolean;
  images: (Picture & { type?: string })[];
  initialIndex: number;
  onClose: () => void;
}> = ({ visible, images, initialIndex, onClose }) => {
  const { language } = useLanguage();
  const swiperRef = React.useRef<any>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  // Filter out videos, only show images in modal
  const imageData = images.filter((item) => !('type' in item) || item.type !== "video");

  React.useEffect(() => {
    if (visible && swiperRef.current) {
      // Scroll to initial index when modal opens
      setTimeout(() => {
        swiperRef.current?.scrollToIndex({ index: initialIndex, animated: false });
      }, 100);
    }
  }, [visible, initialIndex]);

  const handleClose = () => {
    onClose();
  };

  const handleIndexChange = ({ index }: { index: number; prevIndex: number }) => {
    setCurrentIndex(index);
  };

  if (imageData.length === 0) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
    >
      <StatusBar backgroundColor="rgba(0,0,0,0.9)" barStyle="light-content" />
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={handleClose}
          activeOpacity={0.7}
        >
          <View style={styles.closeButtonInner}>
            <View style={{ width: 20, height: 20, justifyContent: "center", alignItems: "center" }}>
              <View style={[styles.closeIcon, { transform: [{ rotate: "45deg" }] }]} />
              <View style={[styles.closeIcon, { transform: [{ rotate: "-45deg" }], position: "absolute" }]} />
            </View>
          </View>
        </TouchableOpacity>
        
        <SwiperFlatList
          ref={swiperRef}
          data={imageData}
          renderItem={({ item }) => <ZoomableImage imageUrl={item.url} />}
          keyExtractor={(item, index) => item.id?.toString() || `modal-item-${index}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          inverted={language === 'ar'}
          onChangeIndex={handleIndexChange}
          index={initialIndex}
        />
        
        {imageData.length > 1 && (
          <View style={styles.modalPagination}>
            <View style={styles.paginationInfo}>
              <View style={styles.paginationTextContainer}>
                <Text style={styles.paginationText}>
                  {currentIndex + 1} / {imageData.length}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

const PictureGallery: React.FC<PictureGalleryProps> = ({ pictures, videoUrl }) => {
  // Combine pictures + optional video
  const {language} = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const data = videoUrl
    ? [...pictures, { id: "video", url: videoUrl, type: "video" }]
    : pictures;

  // Get only image indices (exclude videos)
  const imageIndices = data
    .map((item, index) => (!('type' in item) || item.type !== "video") ? index : null)
    .filter((index) => index !== null) as number[];

  const handleImagePress = (index: number) => {
    // Find the index in the image-only array
    const imageOnlyIndex = imageIndices.indexOf(index);
    if (imageOnlyIndex !== -1) {
      setSelectedImageIndex(imageOnlyIndex);
    }
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <View>
      <SwiperFlatList
        data={data}
        renderItem={({item, index}: {item: Picture & {type?: string}, index: number}) => {
          if ('type' in item && item.type === 'video') {
            const videoId = getYouTubeId(item.url);
            return (
              <View style={styles.itemContainer}>
                <YoutubePlayer
                  height={190}
                  width={ITEM_WIDTH}
                  play={false}
                  videoId={videoId || ''}
                />
              </View>
            );
          }
          return (
            <TouchableOpacity
              style={styles.itemContainer}
              activeOpacity={0.9}
              onPress={() => handleImagePress(index)}
            >
              <Image
                style={styles.image}
                source={{uri: item.url}}
                resizeMode="cover"
              />
            </TouchableOpacity>
          );
        }}
        showPagination
        inverted={language === 'ar'}
        autoplay
        autoplayDelay={2000}
        paginationDefaultColor="#ccc"
        paginationActiveColor="#000"
        paginationStyle={styles.paginationContainer}
        paginationStyleItem={styles.paginationBullet}
        paginationStyleItemActive={styles.activeBullet}
        paginationStyleItemInactive={styles.paginationBullet}
        keyExtractor={(item: Picture & {type?: string}, index: number) =>
          item.id?.toString() || `item-${index}`
        }
      />
      {selectedImageIndex !== null && (
        <ImageZoomModal
          visible={selectedImageIndex !== null}
          images={data}
          initialIndex={selectedImageIndex}
          onClose={handleCloseModal}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH + MARGIN_HORIZONTAL * 2 + 10,
    height: 190,
    marginHorizontal: MARGIN_HORIZONTAL,
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    height: '100%',
    width: ITEM_WIDTH,
    borderRadius: 8,
  },
  paginationContainer: {
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
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    justifyContent: "center",
    alignItems: "center",
  },
  gestureContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  zoomContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  zoomImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 1000,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  closeIconRow: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  closeIcon: {
    width: 20,
    height: 2,
    backgroundColor: "#fff",
  },
  modalPagination: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
    zIndex: 1000,
  },
  paginationInfo: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  paginationTextContainer: {
    alignItems: "center",
  },
  paginationText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600" as const,
  },
});

export default PictureGallery;
