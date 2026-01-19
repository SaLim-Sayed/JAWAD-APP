import { Icons } from '@/assets/icons/icons';
import AppText from '@/components/UI/AppText';
import Image from '@/components/UI/Image';
import LogoutConfirmModal from '@/components/UI/LogoutConfirmModal';
import { navigationEnums } from '@/provider/navigationEnums';
import useGlobalNavigation from '@/provider/useGlobalNavigation';
import React from 'react';
import { FlatList, View } from 'react-native';
import SettingsListItem from './SettingsListItem';
import { useApiQuery } from '@/hooks';
import { useLanguage } from '@/store';
import { useAuthStore } from '@/store/useAuthStore';
import { apiKeys } from '@/hooks/apiKeys';
import { GetPhotographersResponse } from '../../Photo-session/@types/photography.types';
import { GetStableDetailsResponse } from '../../Services/@types/horse.types';
import { GetSchoolDetailsResponse } from '../../home/@types/stable.type';
import { t } from '@/lib';

const user = {
  avatar: 'https://images.icon-icons.com/1993/PNG/512/account_avatar_face_man_people_profile_user_icon_123197.png', // Replace with real avatar or local asset
  role: 'Knight',
  name: 'Alex Marshall',
};

 
const ProfileMenu: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const { navigate } = useGlobalNavigation()
  const { language } = useLanguage()
    const { authData } = useAuthStore();
   
    const { data, isLoading } = useApiQuery<GetPhotographersResponse>({
      url: apiKeys.photographer.getPhotograoher,
      key: ["getPhotograoher"],
    });
  
    const { data: userDetails, isLoading: userDetailsLoading } = useApiQuery({
      url: apiKeys.auth.getUserDetails,
      key: ["getUserDetails"],
    });
  
    const { data: stableData, isLoading: stableLoading } = useApiQuery<GetStableDetailsResponse>({
      url: apiKeys.stable.stableDetail(authData.id),
      key: ["getPhotograoherDetails"],
    });
  
    const { data: schoolData, isLoading: schoolLoading } = useApiQuery<GetSchoolDetailsResponse>({
      url: apiKeys.school.getSchoolDetail(authData.id),
      key: ["getSchoolDetails", authData.id],
      enabled: authData.role === "school" && !!authData.id,
    });
  
    const isStable = authData.role === "stable";
    const isPhotographer = authData.role === "photographer";
    const isAuth = authData.role === "auth";
    const isSchool = authData.role === "school";
  
    const userName = isStable 
      ? stableData?.stable.name[language] 
      : isPhotographer 
        ? data?.photographers.find((photographer) => photographer._id === authData.id)?.name 
        : isAuth 
          ? userDetails?.details?.name 
          : isSchool
            ? schoolData?.school.name
            : "Guest";
   
   
  const [visible, setVisible] = React.useState(false);
  const onCancel = () => setVisible(false);
  const onConfirm = () => {
    setVisible(false);
    onLogout();
  };
  const menuItems = [
    {
      key: 'profile',
      label: t('ProfileMenu.profile'),
      icon: Icons.profileOutline,
      onPress: () => {
        if (isPhotographer) {
          navigate(navigationEnums.UPDATE_PHOTOGRAPHER, {id: authData.id});
        } else if (isSchool) {
          navigate(navigationEnums.PROFILE_USER);
        } else {
          navigate(navigationEnums.PROFILE_USER);
        }
      },
    },

    {
      key: 'cart',
      label: t('ProfileMenu.cart'),
      icon: Icons.shoppingProfile,
      onPress: () => {
        navigate(navigationEnums.CART);
      },
    },
    {
      key: 'history',
      label: t('ProfileMenu.history'),
      icon: Icons.card8Profile,
      onPress: () => {
        navigate(navigationEnums.BOOKING_HISTORY);
      },
    },

    {
      key: 'contact',
      label: t('ProfileMenu.contact'),
      icon: Icons.telephon,
      onPress: () => {
        navigate(navigationEnums.CONTACT_US);
      },
    },
    {
      key: 'about',
      label: t('ProfileMenu.about'),
      icon: Icons.building2,
      onPress: () => {
        navigate(navigationEnums.ABOUT_US);
      },
    },
    {
      key: 'terms',
      label: t('ProfileMenu.terms'),
      icon: Icons.clipboardTick,
      onPress: () => {
        navigate(navigationEnums.TERMS);
      },
    },
    // { key: 'language', label: t("ProfileMenu.language"), icon: Icons.lang, onPress: () => { navigate(navigationEnums.LANGUAGE) } },
    {
      key: 'logout',
      label: t('ProfileMenu.logout'),
      icon: Icons.logout2,
      onPress: () => {
        setVisible(true);
      },
    },
  ];
  return (
    <View className="flex-1 bg-transparent">
      <View className="bg-white rounded-3xl mx-2 mt-20  pb-1">
        {/* Profile Header */}
        <View className="items-end gap-2 border-b border-gray-200 pb-4 -mt-20 flex-row pt-6 ">
          <Image
            source={
              isStable
                ? stableData?.stable.picUrl
                : isPhotographer
                ? data?.photographers[0]?.picUrls[0]
                : isAuth
                ? userDetails?.details?.picUrl || user.avatar
                : isSchool
                ? schoolData?.school.picUrl || user.avatar
                : user.avatar
            }
            className="w-12 h-12 rounded-full"
          />
          <AppText className=" text-lg">
            <AppText className="text-black text-2xl font-bold">
              {' '}
              {userName || t('ProfileMenu.guest')}
            </AppText>
          </AppText>
        </View>
        <View className="gap-0">
          <FlatList
            data={menuItems}
            keyExtractor={item => item.key}
            style={{marginBottom: 1200,marginTop: 16}}
            showsVerticalScrollIndicator={false}
            renderItem={({item}) => (
              <SettingsListItem
                key={item.key}
                label={item.label}
                icon={item.icon}
                onPress={item.onPress}
                style={{marginBottom: 16}}
              />
            )}
            contentContainerStyle={{ paddingBottom: 120 }}
            ListFooterComponent={<View className="h-[200px]" />}
          />
        </View>
      </View>
      <LogoutConfirmModal
        visible={visible}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </View>
  );
}

export default ProfileMenu;