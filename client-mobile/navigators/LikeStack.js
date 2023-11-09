import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LikeScreen from '../screens/LikeScreen';

const Stack = createNativeStackNavigator();

export default function LikeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Like List" component={LikeScreen} />
    </Stack.Navigator>
  );
}
