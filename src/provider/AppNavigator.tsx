// AppNavigator.tsx
 
import HomeScreen from '@/packages/Client/home/screens/Home';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
 
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
 
    </Stack.Navigator>
  );
}
