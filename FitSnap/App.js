import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import create from 'zustand';

const useStore = create(set => ({
  trophies: [],
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

function MapScreen() {
  return <Placeholder name="Map" />;
}

function CaptureModal() {
  return <Placeholder name="Capture" />;
}

function Inventory() {
  return <Placeholder name="Inventory" />;
}

function Leaderboard() {
  return <Placeholder name="Leaderboard" />;
}

function Profile() {
  return <Placeholder name="Profile" />;
}

function Settings() {
  return <Placeholder name="Settings" />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Inventory" component={Inventory} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Settings" component={Settings} />
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
