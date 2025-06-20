// AppNavigator.tsx
 
import HomeScreen from '@/screens/HomeScreen/HomeScreen';
import liveTV from '@/screens/Live/LiveTV';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
 
 
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="LiveTV" component={liveTV} />

    </Stack.Navigator>
  );
}
