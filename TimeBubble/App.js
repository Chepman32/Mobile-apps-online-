import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateBubbleScreen from './src/screens/CreateBubbleScreen';
import TimerScreen from './src/screens/TimerScreen';
import StatsScreen from './src/screens/StatsScreen';
import ShopScreen from './src/screens/ShopScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Create" component={CreateBubbleScreen} />
        <Stack.Screen name="Timer" component={TimerScreen} />
        <Stack.Screen name="Stats" component={StatsScreen} />
        <Stack.Screen name="Shop" component={ShopScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
