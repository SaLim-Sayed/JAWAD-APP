import React from "react";
import { TouchableOpacity, View } from "react-native";
import AppText from "@/components/UI/AppText";
import Image from "@/components/UI/Image";
// Import your icons, e.g. calendar, location, dollar, horse images
import { Icons } from "@/assets/icons/icons";

type BookingCardProps = {
  horseImage: any; // image source
  location: string;
  date: string;
  price: string;
  time?: string;
  highlightTime?: boolean;
    onPress?: () => void;
};

const BookingCard: React.FC<BookingCardProps> = ({
  horseImage,
  location,
  date,
  price,
  time,
  highlightTime,
  onPress,
}) => (
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
    }}
  >
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
      {/* Location */}
      <View className="flex-row items-center mb-2">
        <Image
          source={Icons.location}
          style={{ width: 22, height: 22, marginRight: 7 }}
          resizeMode="contain"
        />
        <AppText className="text-brownColor-400 text-base font-semibold">
          {location}
        </AppText>
      </View>
      {/* Date */}
      <View className="flex-row items-center mb-2">
        <Image
          source={Icons.calendar}
          style={{ width: 20, height: 20, marginRight: 7 }}
          resizeMode="contain"
        />
        <AppText className="text-[#AAA8A8] text-base">{date}</AppText>
      </View>
      {/* Price & Time */}
      <View className="flex-row items-center">
      <Image
          source={Icons.coin}
          style={{ width: 20, height: 20, marginRight: 7 }}
          resizeMode="contain"
        />        <AppText className="text-[#AAA8A8] text-base mr-2">{price}</AppText>
        {time && (
          <AppText
            className={`ml-auto text-base font-bold ${
              highlightTime ? "text-green-500" : "text-[#AAA8A8]"
            }`}
          >
            {time}
          </AppText>
        )}
      </View>
    </View>
  </TouchableOpacity>
);

export default BookingCard;