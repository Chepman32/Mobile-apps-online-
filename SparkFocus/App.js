import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import useStore from './src/store';
import HomeScreen from './src/screens/HomeScreen';
import FriendsScreen from './src/screens/FriendsScreen';
import ShopScreen from './src/screens/ShopScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { StatusBar } from 'expo-status-bar';

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Friends" component={FriendsScreen} />
      <Tab.Screen name="Shop" component={ShopScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const onboarded = useStore(state => state.onboarded);
  const completeOnboarding = useStore(state => state.completeOnboarding);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          {!onboarded ? (
            <RootStack.Screen name="Onboarding" component={OnboardingScreen} />
          ) : null}
          <RootStack.Screen name="Main" component={MainTabs} />
        </RootStack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  );
}
