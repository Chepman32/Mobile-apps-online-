import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  coins: 0,
  addCoins: amount => set(state => ({ coins: state.coins + amount }))
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
function Challenges() {
  return <Placeholder name="Challenges" />;
}
function Store() {
  return <Placeholder name="Theme Store" />;
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
        <Tab.Screen name="Challenges" component={Challenges} />
        <Tab.Screen name="Store" component={Store} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
