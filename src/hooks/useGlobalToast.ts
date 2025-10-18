import Toast from 'react-native-toast-message';

type ShowGlobalToastParams = {
  type: 'info' | 'success' | 'error' | 'warning';
  title: string;
  body?: string;
} & Partial<Omit<Parameters<typeof Toast.show>[0], 'type' | 'text1' | 'text2'>>;

export function showGlobalToast({
    type,
    title,
    body,
    ...rest
  }: ShowGlobalToastParams) {
    Toast.show({
      type,
      visibilityTime: 2000,
      text1: title,
      text2: body,

      position: 'top',
      autoHide: true,
      topOffset: 50,
      swipeable: true,
      
      
      ...rest,  
      text1Style: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
        flexWrap: 'wrap',      

      },
      
      text2Style: {
        color: '#000',
        fontSize: 16,
        flexWrap: 'wrap',   

      },
    });
  }

