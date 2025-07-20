import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import CameraScreen from './src/screens/CameraScreen';
import SuggestionsScreen from './src/screens/SuggestionsScreen';
import PurchasesScreen from './src/screens/PurchasesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Camera" component={CameraScreen} />
          <Tab.Screen name="Suggestions" component={SuggestionsScreen} />
          <Tab.Screen name="Purchases" component={PurchasesScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
