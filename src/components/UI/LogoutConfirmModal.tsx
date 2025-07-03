import React from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import AppText from '@/components/UI/AppText';
import Image from '@/components/UI/Image';
import { Icons } from '@/assets/icons/icons';

type LogoutConfirmModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  visible,
  onCancel,
  onConfirm,
}) => (
  <Modal
    animationType="fade"
    transparent
    visible={visible}
    onRequestClose={onCancel}
  >
    <View className="flex-1 items-center justify-center bg-black/40">
      <View
        style={{
          borderRadius: 32,
        }}
        className="bg-white w-[90%] py-10 px-4 items-center"
      >
        <AppText className="text-2xl font-bold text-brownColor-400 mb-2 text-center">
          Are you sure you want to loge out ?
        </AppText>
        <AppText className=" tajawal-light-16 text-brownColor-300 mb-6 text-center">
          By Clicking Yes You Will Be Logged Out
        </AppText>
        <View className="mb-8">
          <View className="bg-[#F9EDED] rounded-2xl p-6 items-center justify-center">
            <Image
              source={Icons.logout}
              resizeMode="contain"
            />
          </View>
        </View>
        <View className="flex-row w-full justify-between px-2 mt-3">
          <TouchableOpacity
            onPress={onCancel}
            style={{
              flex: 1,
              backgroundColor: '#EEFCEB',
              borderRadius: 24,
              borderWidth: 2,
              borderColor: '#B2EBAA',
              marginRight: 8,
              minHeight: 64,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            focusable={false}
             activeOpacity={0.8}
          >
            <AppText className="text-green-500 text-xl font-semibold">Cancel</AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onConfirm}
            style={{
              flex: 1,
              backgroundColor: '#E64F3C',
              borderRadius: 24,
              marginLeft: 8,
              minHeight: 64,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#E64F3C',
              shadowOpacity: 0.1,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
            }}
            activeOpacity={0.8}
          >
            <AppText className="text-white text-xl font-semibold">Yes</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default LogoutConfirmModal;