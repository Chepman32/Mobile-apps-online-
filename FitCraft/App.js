import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, useColorScheme, StyleSheet } from 'react-native';
import create from 'zustand';

// Simple zustand store for theme preference
const useStore = create(set => ({
  darkMode: false,
  toggleTheme: () => set(state => ({ darkMode: !state.darkMode })),
}));

function PlaceholderScreen({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

function MapScreen() {
  return <PlaceholderScreen name="Map" />;
}

function SplashScreen() {
  return <PlaceholderScreen name="Splash" />;
}

function DetailScreen() {
  return <PlaceholderScreen name="Detail" />;
}

function CreateEditScreen() {
  return <PlaceholderScreen name="Create/Edit" />;
}

function PurchaseScreen() {
  return <PlaceholderScreen name="Purchase" />;
}

function OnboardingScreen() {
  return <PlaceholderScreen name="Onboarding" />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  const scheme = useColorScheme();
  const darkMode = useStore(state => state.darkMode);
  return (
    <NavigationContainer theme={darkMode || scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Detail" component={DetailScreen} />
        <Tab.Screen name="Create" component={CreateEditScreen} />
        <Tab.Screen name="Purchase" component={PurchaseScreen} />
        <Tab.Screen name="Onboarding" component={OnboardingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
