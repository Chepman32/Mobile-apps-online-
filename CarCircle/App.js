import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  rides: [],
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

const Dashboard = () => <Placeholder name="Circle Dashboard" />;
const RouteMap = () => <Placeholder name="Route Map" />;
const CostSplit = () => <Placeholder name="Cost Split" />;
const RatingModal = () => <Placeholder name="Rating" />;
const Stats = () => {
  const count = useStore(state => state.rides.length);
  return (
    <View style={styles.center}>
      <Text>Stats ({count} rides)</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Route" component={RouteMap} />
        <Tab.Screen name="Costs" component={CostSplit} />
        <Tab.Screen name="Rating" component={RatingModal} />
        <Tab.Screen name="Stats" component={Stats} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
