import { Icons } from '@/assets/icons/icons';
import { navigationEnums } from '@/provider/navigationEnums';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import React from 'react';
import { FlatList, View } from 'react-native';
import SettingsListItem from '../../Profile/components/SettingsListItem';




const MyStableMenu = () => {
  const { navigate } = useGlobalNavigation()
  const menuItems = [
    { key: 'stableOverview', label: 'Stable Overview', icon: Icons.homeOutline, onPress: () => { navigate(navigationEnums.STABLE_OVERVIEW) } },
    { key: 'horseDetails', label: 'Horse Details', icon: Icons.horse, onPress: () => { navigate(navigationEnums.HORSE_DETAIL) } },
    { key: 'myWallet', label: 'My Wallet', icon: Icons.cartProfile, onPress: () => { navigate(navigationEnums.MY_WALLET) } },

  ];
  return (
    <View
      className="flex-1 bg-transparent"
    >

      <View className="gap-0">
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.key}
          style={{ margin: 16 }}
          renderItem={({ item }) => (
            <SettingsListItem
              key={item.key}
              label={item.label}
              icon={item.icon}
              onPress={item.onPress}
              style={{ marginBottom: 16 }}
            />

          )}
          ListFooterComponent={<View className="h-80" />}
        />

      </View>
    </View>
  );
}

export default MyStableMenu;