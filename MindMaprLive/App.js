import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import create from 'zustand';

const useStore = create(set => ({
  nodes: [],
  addNode: (x, y) => set(state => ({ nodes: [...state.nodes, { id: Date.now(), x, y }] })),
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

function Dashboard() {
  return <Placeholder name="Dashboard" />;
}

function MapCanvas() {
  // Would render nodes and lines via Skia
  return (
    <View style={styles.center}>
      <Text>Map Canvas</Text>
    </View>
  );
}

function History() {
  return <Placeholder name="History" />;
}

function Settings() {
  return <Placeholder name="Settings" />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Canvas" component={MapCanvas} />
        <Tab.Screen name="History" component={History} />
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
