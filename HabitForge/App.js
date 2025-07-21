import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

// Simple Zustand store for avatar progression
const useStore = create(set => ({
  level: 1,
  xp: 0,
  gold: 0,
  addXp: amount => set(state => {
    const newXp = state.xp + amount;
    const newLevel = state.level + Math.floor(newXp / 100);
    return { xp: newXp % 100, level: newLevel };
  }),
  addGold: amount => set(state => ({ gold: state.gold + amount })),
}));

function Placeholder({ name }) {
  const level = useStore(state => state.level);
  const xp = useStore(state => state.xp);
  const gold = useStore(state => state.gold);
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
      <Text style={styles.info}>Lvl {level} | XP {xp} | Gold {gold}</Text>
    </View>
  );
}

function Dashboard() {
  return <Placeholder name="Dashboard" />;
}
function Avatar() {
  return <Placeholder name="Avatar" />;
}
function Shop() {
  return <Placeholder name="Shop" />;
}
function Quests() {
  return <Placeholder name="Quests" />;
}
function Settings() {
  return <Placeholder name="Settings" />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Dashboard} />
        <Tab.Screen name="Avatar" component={Avatar} />
        <Tab.Screen name="Shop" component={Shop} />
        <Tab.Screen name="Quests" component={Quests} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  info: { marginTop: 8 },
});
