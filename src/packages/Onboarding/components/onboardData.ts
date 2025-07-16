import { images } from "@/assets/images";
import { OnboardItem } from "../@types/OnboardItem";

export const onboardData: OnboardItem[] = [
    {
      title: 'Discover The Best Stables Near You',
      description:
        "Explore Top-Rated Stables For Horse Riding, All in One Place. Whether You're A Beginner Or An Experienced Rider, Find The Perfect Stable To Suit Your Needs.",
      image: images.onboard1,
      buttons: [
        { text: 'Back', action: 'back', disabled: true },
        { text: 'Next', action: 'next' },
      ],
    },
  
    {
      title: 'Find Your Perfect Riding Experience',
      description:
        "Explore Top-Rated Stables For Horse Riding, All in One Place. Whether You're A Beginner Or An Experienced Rider, Find The Perfect Stable To Suit Your Needs.",
      image: images.onboard3,
      buttons: [
        { text: 'Back', action: 'back' },
        { text: 'Start', action: 'next' },
      ],
    },
    {
      title: '',
      description: '',
      image: images.onboard3,
      buttons: [],
    },
  ]; 