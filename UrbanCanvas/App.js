import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  walls: [],
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

const ARPaint = () => <Placeholder name="AR Paint" />;
const WallFeed = () => {
  const count = useStore(state => state.walls.length);
  return (
    <View style={styles.center}>
      <Text>Wall Feed ({count})</Text>
    </View>
  );
};
const ReplayPlayer = () => <Placeholder name="Replay" />;
const Store = () => <Placeholder name="Store" />;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Paint" component={ARPaint} />
        <Tab.Screen name="Feed" component={WallFeed} />
        <Tab.Screen name="Replay" component={ReplayPlayer} />
        <Tab.Screen name="Store" component={Store} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
