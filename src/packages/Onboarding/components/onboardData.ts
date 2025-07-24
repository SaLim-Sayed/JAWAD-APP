import { images } from "@/assets/images";
import { OnboardItem } from "../@types/OnboardItem";
import { useTranslation } from "react-i18next";

  
  export const useOnboardData = (): OnboardItem[] => {
    const { t } = useTranslation();
  
    return [
      
      {
        title: t("Onboard.slide2_title"),
        description: t("Onboard.slide2_description"),
        image: images.onboard3,
        buttons: [
          { text: t("Onboard.back"), action: "back", disabled: true },
          { text: t("Onboard.start"), action: "next" },
        ],
      },
      {
        title: "",
        description: "",
        image: images.onboard3,
        buttons: [],
      },
    ];
  };
  