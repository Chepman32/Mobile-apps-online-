import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  sightings: [],
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

const Camera = () => <Placeholder name="Camera" />;
const ResultCard = () => <Placeholder name="Result" />;
const Map = () => {
  const count = useStore(state => state.sightings.length);
  return (
    <View style={styles.center}>
      <Text>Map ({count} sightings)</Text>
    </View>
  );
};
const Leaderboard = () => <Placeholder name="Leaderboard" />;
const DataExport = () => <Placeholder name="Data Export" />;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Camera" component={Camera} />
        <Tab.Screen name="Result" component={ResultCard} />
        <Tab.Screen name="Map" component={Map} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
        <Tab.Screen name="Export" component={DataExport} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
