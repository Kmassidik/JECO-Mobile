import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from "./HomeStack";
import LikeStack from "./LikeStack";

const Tab = createMaterialBottomTabNavigator();

export default function TabStacks() {
  return (
    <Tab.Navigator
      initialRouteName='Feed'
      activeColor='#E94F37'
      barStyle={{ backgroundColor: "#F6F7EB" }}>
      <Tab.Screen
        name='Home'
        component={HomeStack}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Like'
        component={LikeStack}
        options={{
          tabBarLabel: "Like",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='heart' size={24} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
