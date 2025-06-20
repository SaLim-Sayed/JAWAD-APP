// declarations.d.ts or global.d.ts
declare module '*.png' {
  const value: any;
  export default value;
}
declare module '*.svg' {
     import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
 
declare module '@react-native-picker/picker' {
  import { Picker as RNPicker } from 'react-native';
  export { RNPicker as Picker };
}
declare module 'react-native-select-dropdown';

declare module 'react-native-vector-icons';
declare module 'react-native-vector-icons/FontAwesome';
declare module 'react-native-vector-icons/Ionicons';
declare module 'react-native-vector-icons/MaterialIcons';
declare module 'react-native-vector-icons/Feather';
declare module 'react-native-vector-icons/Entypo';
declare module 'react-native-vector-icons/AntDesign';

