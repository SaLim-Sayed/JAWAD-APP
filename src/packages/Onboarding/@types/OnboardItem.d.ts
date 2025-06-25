export type OnboardItem = {
    title: string;
    description: string;
    image: any;
    buttons: { text: string; action: 'back' | 'next'; disabled?: boolean }[];
  };
  
 export type OnboardBoxProps = {
    item: OnboardItem;
    handleNext: () => void;
    handleBack: () => void;
    currentButtons: {text: string; action: 'back' | 'next'; disabled?: boolean}[];
  };
  