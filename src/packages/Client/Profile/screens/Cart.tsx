import { images } from '@/assets/images'
import AppHeader from '@/components/UI/AppHeader'
import AppWrapper from '@/components/UI/AppWrapper'
import AppButton from '@/components/UI/AppButton'
import React from 'react'
import { FlatList, View, Text, Image, Alert } from 'react-native'
import { useHorseStore } from '@/store/useHorseStore'
import useGlobalNavigation from '@/provider/useGlobalNavigation'
import { navigationEnums } from '@/provider/navigationEnums'
import { TouchableOpacity } from 'react-native'
import { Icons } from '@/constants'

interface CartItemCardProps {
  item: any;
  onUpdateQuantity: (horseId: string, type: string, quantity: number) => void;
  onRemove: (horseId: string, type: string) => void;
  onPress: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({ item, onUpdateQuantity, onRemove, onPress }) => {
  const horseName = typeof item.horse.name === 'string' ? item.horse.name : item.horse.name?.en || 'Horse';
  const horseImage = item.horse.picUrls?.[0] || images.horseImg;

  return (
    <TouchableOpacity onPress={onPress} className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-100">
      <View className="flex-row">
        <Image 
          source={{ uri: horseImage }} 
          className="w-20 h-20 rounded-lg"
          defaultSource={images.horseImg}
        />
        
        <View className="flex-1 ml-4">
          <Text className="text-lg font-semibold text-gray-800">{horseName}</Text>
          <Text className="text-sm text-gray-500 mt-1">{item.type}</Text>
          
          {item.sessionDate && (
            <Text className="text-sm text-gray-600 mt-1">Date: {item.sessionDate}</Text>
          )}
          
          {item.sessionTime && (
            <Text className="text-sm text-gray-600">Time: {item.sessionTime}</Text>
          )}
          
          <Text className="text-lg font-bold text-primary mt-2">${item.horse.price}</Text>
        </View>
        
        <View className="items-end justify-between">
          <TouchableOpacity 
            onPress={() => onRemove(item.horse._id, item.type)}
            className="p-2"
          >
            <Icons.trash className="w-5 h-5 text-red-500" />
          </TouchableOpacity>
          
          <View className="flex-row items-center bg-gray-100 rounded-lg">
            <TouchableOpacity 
              onPress={() => onUpdateQuantity(item.horse._id, item.type, item.quantity - 1)}
              className="p-2 px-3"
            >
              <Text className="text-lg font-bold text-gray-600">-</Text>
            </TouchableOpacity>
            
            <Text className="px-4 py-2 font-semibold">{item.quantity}</Text>
            
            <TouchableOpacity 
              onPress={() => onUpdateQuantity(item.horse._id, item.type, item.quantity + 1)}
              className="p-2 px-3"
            >
              <Text className="text-lg font-bold text-gray-600">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function Cart() {
  const { navigate } = useGlobalNavigation();
  const { 
    cartItems, 
    updateCartItemQuantity, 
    removeFromCart, 
    clearCart, 
    getCartTotal,
    getCartItemsCount 
  } = useHorseStore();

  const handleUpdateQuantity = (horseId: string, type: string, quantity: number) => {
    updateCartItemQuantity(horseId, type, quantity);
  };

  const handleRemoveItem = (horseId: string, type: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Remove', 
          style: 'destructive',
          onPress: () => removeFromCart(horseId, type)
        }
      ]
    );
  };

  const handleClearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to remove all items from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: () => clearCart()
        }
      ]
    );
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Alert.alert('Empty Cart', 'Please add some items to your cart first.');
      return;
    }
    
    // Navigate to checkout or booking confirmation
    navigate(navigationEnums.EVENT_BOOKING, { cartItems });
  };

  const handleItemPress = (item: any) => {
    // Navigate to horse details
    navigate(navigationEnums.HORSE_DETAILS, { id: item.horse._id });
  };

  const totalAmount = getCartTotal();
  const totalItems = getCartItemsCount();

  if (cartItems.length === 0) {
    return (
      <AppWrapper>
        <AppHeader title="Cart" showBackButton />
        <View className="flex-1 justify-center items-center px-6">
          <Icons.shoppingCart className="w-24 h-24 text-gray-300 mb-4" />
          <Text className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</Text>
          <Text className="text-gray-500 text-center mb-8">
            Browse horses and add them to your cart to get started
          </Text>
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
        title={`Cart (${totalItems})`} 
        showBackButton 
       
      />
      
      <View className="flex-1 px-5 pt-4">
        <FlatList
          data={cartItems}
          keyExtractor={(item) => `${item.horse._id}-${item.type}`}
          renderItem={({ item }) => (
            <CartItemCard
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
              onPress={() => handleItemPress(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 120 }}
        />
      </View>

      {/* Cart Summary Footer */}
      <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-5">
        <View className="flex-row justify-between items-center mb-4">
          <View>
            <Text className="text-gray-600">Total Items: {totalItems}</Text>
            <Text className="text-2xl font-bold text-gray-800">${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
        
        <AppButton
          title="Proceed to Checkout"
          onPress={handleCheckout}
          className="w-full"
        />
      </View>
    </AppWrapper>
  );
}