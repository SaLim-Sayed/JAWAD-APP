import { images } from '@/assets/images'
import AppHeader from '@/components/UI/AppHeader'
import AppWrapper from '@/components/UI/AppWrapper'
import AppButton from '@/components/UI/AppButton'
import AppText from '@/components/UI/AppText'
import Image from '@/components/UI/Image'
import React, { useState } from 'react'
import { FlatList, View, TouchableOpacity, Alert } from 'react-native'
 import useGlobalNavigation from '@/provider/useGlobalNavigation'
import { navigationEnums } from '@/provider/navigationEnums'
import { Icons } from '@/assets/icons/icons'
import { useHorseStore } from '@/store/useHorseStore'
import { Horse, HorseDetail } from '@/packages/Client/Services/@types/horse.types'
 
type StoredHorseCardProps = {
  horse: Horse | HorseDetail;
  isSelected: boolean;
  onPress: () => void;
  onSelect: (selected: boolean) => void;
  isSelectionMode: boolean;
};

const StoredHorseCard: React.FC<StoredHorseCardProps> = ({
  horse,
  isSelected,
  onPress,
  onSelect,
  isSelectionMode,
}) => {
  const horseName = typeof horse.name === 'string' ? horse.name : horse.name?.en || 'Horse';
  const horseImage = horse.picUrls?.[0] ? { uri: horse.picUrls[0] } : images.horseImg;

  return (
    <TouchableOpacity
      onPress={isSelectionMode ? () => onSelect(!isSelected) : onPress}
      className={`flex-row bg-[#FAFAFA] rounded-3xl overflow-hidden mb-5 ${
        isSelected ? 'border-2 border-blue-500' : ''
      }`}
      style={{
        minHeight: 140,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
      }}
    >
      {/* Selection Checkbox */}
      {isSelectionMode && (
        <View className="absolute top-3 left-3 z-10">
          <TouchableOpacity
            onPress={() => onSelect(!isSelected)}
            className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
              isSelected ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'
            }`}
          >
            {isSelected && (
              <Image
                source={Icons.add}
                style={{ width: 14, height: 14, tintColor: 'white' }}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        </View>
      )}

      {/* Left: Horse Image */}
      <View
        style={{
          flex: 1.1,
          alignItems: "center",
          justifyContent: "center",
          minHeight: 110,
          minWidth: 110,
          backgroundColor: "#FAFAFA",
        }}
      >
        <Image
          source={horseImage}
          style={{ width: 90, height: 90 }}
          resizeMode="contain"
        />
      </View>
      
      {/* Divider */}
      <View
        style={{
          width: 1,
          backgroundColor: "#F1F1F1",
          alignSelf: "stretch",
          marginVertical: 20,
        }}
      />
      
      {/* Right: Details */}
      <View className="flex-1.7 justify-center pl-6 pr-4 py-5">
        {/* Horse Name */}
        <View className="flex-row items-center mb-2">
          <Image
            source={Icons.horse}
            style={{ width: 22, height: 22, marginRight: 7 }}
            resizeMode="contain"
          />
          <AppText className="text-brownColor-400 text-base font-semibold">
            {horseName}
          </AppText>
        </View>
        
        {/* Horse Type/Level */}
        <View className="flex-row items-center mb-2">
          <Image
            source={Icons.cartProfile}
            style={{ width: 20, height: 20, marginRight: 7 }}
            resizeMode="contain"
          />
          <AppText className="text-[#AAA8A8] text-base">
            {horse.type} • {horse.level}
          </AppText>
        </View>
        
        {/* Price & Stored Date */}
        <View className="flex-row items-center">
          <Image
            source={Icons.coin}
            style={{ width: 20, height: 20, marginRight: 7 }}
            resizeMode="contain"
          />
          <AppText className="text-[#AAA8A8] text-base mr-2">
            ${horse.price}
          </AppText>
          <AppText className="ml-auto text-sm text-green-500 font-medium">
            Stored
          </AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Cart() {
  const { navigate } = useGlobalNavigation();
  const { storedHorses, removeStoredHorse, clearStoredHorses, addToCart } = useHorseStore();
  
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedHorses, setSelectedHorses] = useState<Set<string>>(new Set());

  const handleHorsePress = (horse: Horse | HorseDetail) => {
    navigate(navigationEnums.HORSE_DETAILS, { id: horse._id });
  };

  const handleHorseSelect = (horseId: string, selected: boolean) => {
    const newSelected = new Set(selectedHorses);
    if (selected) {
      newSelected.add(horseId);
    } else {
      newSelected.delete(horseId);
    }
    setSelectedHorses(newSelected);
  };

  const handleDeleteSelected = () => {
    if (selectedHorses.size === 0) {
      Alert.alert('No Selection', 'Please select horses to delete.');
      return;
    }

    Alert.alert(
      'Delete Horses',
      `Are you sure you want to delete ${selectedHorses.size} stored horse(s)?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            selectedHorses.forEach(horseId => {
              removeStoredHorse(horseId);
            });
            setSelectedHorses(new Set());
            setIsSelectionMode(false);
          }
        }
      ]
    );
  };

  const handleSelectAll = () => {
    if (selectedHorses.size === storedHorses.length) {
      // Deselect all
      setSelectedHorses(new Set());
    } else {
      // Select all
      const allIds = new Set(storedHorses.map(horse => horse._id));
      setSelectedHorses(allIds);
    }
  };

  const handleAddSelectedToCart = () => {
    if (selectedHorses.size === 0) {
      Alert.alert('No Selection', 'Please select horses to add to cart.');
      return;
    }

    selectedHorses.forEach(horseId => {
      const horse = storedHorses.find(h => h._id === horseId);
      if (horse) {
        addToCart(horse, 'Photo_session');
      }
    });

    Alert.alert(
      'Added to Cart',
      `${selectedHorses.size} horse(s) added to cart successfully!`,
      [
        {
          text: 'Continue Shopping',
          style: 'cancel'
        },
        {
          text: 'View Cart',
          onPress: () => navigate(navigationEnums.CART)
        }
      ]
    );

    setSelectedHorses(new Set());
    setIsSelectionMode(false);
  };

  const toggleSelectionMode = () => {
    setIsSelectionMode(!isSelectionMode);
    setSelectedHorses(new Set());
  };

  if (storedHorses.length === 0) {
    return (
      <AppWrapper>
        <AppHeader title="Stored Horses" showBackButton />
        <View className="flex-1 justify-center items-center px-6">
          <Image
            source={Icons.cardTick}
            style={{ width: 96, height: 96, tintColor: '#D1D5DB' }}
            resizeMode="contain"
          />
          <AppText className="text-xl font-semibold text-gray-600 mb-2 mt-4">
            No stored horses
          </AppText>
          <AppText className="text-gray-500 text-center mb-8">
            Browse horses and store your favorites for quick access
          </AppText>
          <AppButton
            title="Browse Horses"
            onPress={() => navigate(navigationEnums.HOME)}
            className="w-48"
          />
        </View>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
      <AppHeader 
        title={`Stored Horses (${storedHorses.length})`} 
       
      />

      {/* Selection Mode Header */}
      {isSelectionMode && (
        <View className="bg-blue-50 px-5 py-3 border-b border-blue-100">
          <View className="flex-row justify-between items-center">
            <TouchableOpacity onPress={handleSelectAll}>
              <AppText className="text-blue-600 font-medium">
                {selectedHorses.size === storedHorses.length ? 'Deselect All' : 'Select All'}
              </AppText>
            </TouchableOpacity>
            <AppText className="text-gray-600">
              {selectedHorses.size} of {storedHorses.length} selected
            </AppText>
          </View>
        </View>
      )}
      
      <View className="flex-1 px-5 pt-4">
        <FlatList
          data={storedHorses}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <StoredHorseCard
              horse={item}
              isSelected={selectedHorses.has(item._id)}
              onPress={() => handleHorsePress(item)}
              onSelect={(selected) => handleHorseSelect(item._id, selected)}
              isSelectionMode={isSelectionMode}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: isSelectionMode ? 120 : 20 }}
        />
      </View>

      {/* Selection Mode Actions */}
      {isSelectionMode && selectedHorses.size > 0 && (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-5">
          <View className="flex-row gap-3">
            <AppButton
              title={`Add to Cart (${selectedHorses.size})`}
              onPress={handleAddSelectedToCart}
              className="flex-1"
            />
            <AppButton
              title="Delete"
              variant="outline"
              onPress={handleDeleteSelected}
              className="flex-1"
              style={{ borderColor: '#EF4444' }}
             />
          </View>
        </View>
      )}
    </AppWrapper>
  );
}