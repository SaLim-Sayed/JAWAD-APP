import React, { useState, useRef } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

interface Picture {
  id: string | number;
  url: string;
}

interface PictureGalleryProps {
  pictures: Picture[];
}

const ITEM_WIDTH = 380;
const MARGIN_HORIZONTAL = 5;

const PictureGallery: React.FC<PictureGalleryProps> = ({ pictures }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList<Picture>>(null);

  // Handle scroll and update activeIndex
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    const itemWidth = ITEM_WIDTH + MARGIN_HORIZONTAL * 2;
    const index = Math.round(offsetX / itemWidth);
    setActiveIndex(index);
  };

  // Pagination bullets
  const Pagination = () => (
    <View style={styles.paginationContainer}>
      {pictures?.map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.paginationBullet,
            index === activeIndex && styles.activeBullet,
          ]}
          onPress={() => {
            flatListRef.current?.scrollToIndex({ index, animated: true });
          }}
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
        data={pictures}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image
              style={styles.image}
              source={{ uri: item.url }}
              resizeMode="stretch"
            />
          </View>
        )}
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
    overflow: 'hidden',
  },
  image: {
    height: 184,
    width: ITEM_WIDTH,
    borderRadius: 8,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  activeBullet: {
    backgroundColor: '#000',
  },
});

export default PictureGallery;