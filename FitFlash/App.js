import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  xp: 0,
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

const DeckSwipe = () => <Placeholder name="Deck Swipe" />;
const RepCounter = () => <Placeholder name="Rep Counter" />;
const Summary = () => <Placeholder name="Summary" />;
const XPTracker = () => {
  const xp = useStore(state => state.xp);
  return (
    <View style={styles.center}>
      <Text>XP: {xp}</Text>
    </View>
  );
};
const Store = () => <Placeholder name="Store" />;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Deck" component={DeckSwipe} />
        <Tab.Screen name="Counter" component={RepCounter} />
        <Tab.Screen name="Summary" component={Summary} />
        <Tab.Screen name="XP" component={XPTracker} />
        <Tab.Screen name="Store" component={Store} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
