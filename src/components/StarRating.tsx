import { Icons } from '@/constants';
import React from 'react';
import { View } from 'react-native';
 
interface StarRatingProps {
  rating: any; // 0–10 scale
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const maxStars = 5;
  const stars = (rating / 10) * maxStars;
  const fullStars = Math.floor(stars);
  const hasHalfStar = stars - fullStars >= 0.5;

  return (
    <View className='flex flex-row justify-center w-full gap-4'  >
      {Array.from({ length: maxStars }, (_, index) => {
        if (index < fullStars) {
          return (
            <Icons.star
              key={index}
              color="yellow"
              fill="yellow"
              width={20}
              height={20}
            />
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <Icons.starhalf
              key={index}
               color="white"
              fill="white"
              width={20}
              height={20}
            />
          );
        } else {
          return (
            <Icons.staroutline
              key={index}
              color="white"
              fill="white"
              width={20}
              height={20}
            />
          );
        }
      })}
    </View>
  );
};

export default StarRating;
