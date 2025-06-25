// AppNavigator.tsx
 
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
 
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
 
    </Stack.Navigator>
  );
}
