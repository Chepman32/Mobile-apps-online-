import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  habits: [],
  addHabit: title => set(state => ({ habits: [...state.habits, { id: Date.now().toString(), title }] })),
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

function Gallery() {
  return <Placeholder name="Gallery" />;
}
function Camera() {
  return <Placeholder name="Camera" />;
}
function Challenges() {
  return <Placeholder name="Challenges" />;
}
function Profile() {
  return <Placeholder name="Profile" />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Gallery" component={Gallery} />
        <Tab.Screen name="Camera" component={Camera} />
        <Tab.Screen name="Challenges" component={Challenges} />
        <Tab.Screen name="Profile" component={Profile} />
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
