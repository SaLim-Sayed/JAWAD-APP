import React from "react";
import { View } from "react-native";
import AppText from "@/components/UI/AppText";
import Row from "@/components/UI/Row";
import Col from "@/components/UI/Col";
import Image from "./Image";

interface UserCardProps {
  role: string;
  name: string;
  phone: string;
  avatar: string;
}

const UserCard: React.FC<UserCardProps> = ({ role, name, phone, avatar }) => {
  const user = {
    avatar: 'https://images.icon-icons.com/1993/PNG/512/account_avatar_face_man_people_profile_user_icon_123197.png', // Replace with real avatar or local asset

  };
  return (
    <View className="bg-[#FAFAFA] rounded-2xl p-4 w-full">
      <Row gap={12} items="center">
        <Image
          source={user.avatar}
          className="w-16 h-16 rounded-full"
        />

        <Col gap={2}>
          <Row>
            <AppText className="font-bold text-black ml-1">{name}</AppText>
          </Row>

          <AppText className="text-[#B0B0B0]">{phone}</AppText>
        </Col>
      </Row>
    </View>
  );
};

export default UserCard;
