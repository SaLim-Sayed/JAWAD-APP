import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './navigation';

const useGlobalNavigation = () => {
  return  useNavigation<NativeStackNavigationProp<RootStackParamList>>();

};

export default useGlobalNavigation;