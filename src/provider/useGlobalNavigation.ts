import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamsList } from './NavigationParamsList';

const useGlobalNavigation = () => {
  return useNavigation<NativeStackNavigationProp<NavigationParamsList>>();
};

export default useGlobalNavigation;