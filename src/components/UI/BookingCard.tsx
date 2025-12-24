import { Icons } from "@/assets/icons/icons";
import { images } from "@/assets/images";
import AppText from "@/components/UI/AppText";
import Image from "@/components/UI/Image";
import { TBooking } from "@/packages/Client/Profile/@types/booking.";
import dayjs from "dayjs";
import React from "react";
import { TouchableOpacity, View } from "react-native";

const BookingCard: React.FC<TBooking & { onPress: () => void }> = ({
  _id,
  startTime,
  endTime,
  date,
  bookingId,
  totalPrice,
  service,
  stable,
  customer,
  createdAt,
  onPress,
}) => {
  const time = `${startTime} - ${endTime}`;
  const formattedDate = dayjs(date).format("YYYY-MM-DD");

  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row bg-[#FAFAFA] rounded-3xl overflow-hidden mb-5"
      style={{
        minHeight: 140,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.03,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 8,
        margin: 10,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          minHeight: 110,
          minWidth: 110,
          backgroundColor: "#FAFAFA",
        }}
      >
        <Image
          source={stable?.picUrl || images.villarreal}
          style={{ width: 200, height: 200 }}
          resizeMode="cover"
        />
      </View>

      <View
        style={{
          width: 1,
          backgroundColor: "#F1F1F1",
          alignSelf: "stretch",
          marginVertical: 20,
        }}
      />

      <View className="flex-1 justify-center pl-6 pr-4 py-5">
        <View className="flex-row items-center mb-2">
          <Image
            source={Icons.location}
            style={{ width: 22, height: 22, marginRight: 7 }}
            resizeMode="cover"
          />
          <AppText className="text-brownColor-400 text-base font-semibold">
            {bookingId}
          </AppText>
        </View>

        <View className="flex-row items-center mb-2">
          <Image
            source={Icons.calendar}
            style={{ width: 20, height: 20, marginRight: 7 }}
            resizeMode="cover"
          />
          <AppText className="text-[#AAA8A8] text-base">{formattedDate}</AppText>
        </View>
        <View className="flex-row items-center mb-2">
          <Image
            source={Icons.calendar}
            style={{ width: 20, height: 20, marginRight: 7 }}
            resizeMode="cover"
          />
          <AppText className="ml-auto text-base font-bold text-[#AAA8A8]">
            {time}
          </AppText>     
             </View>

        <View className="flex-row items-center">
          <Image
            source={Icons.coin}
            style={{ width: 20, height: 20, marginRight: 7 }}
            resizeMode="cover"
          />
          <AppText className="text-[#AAA8A8] text-base mr-2">
            {totalPrice} EGP
          </AppText>

        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingCard;
