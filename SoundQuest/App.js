import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  badges: [],
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

const QuestMap = () => <Placeholder name="Quest Map" />;
const Recorder = () => <Placeholder name="Recorder" />;
const Album = () => {
  const count = useStore(state => state.badges.length);
  return (
    <View style={styles.center}>
      <Text>Badge Album ({count})</Text>
    </View>
  );
};
const TradeChat = () => <Placeholder name="Trade Chat" />;
const Leaderboard = () => <Placeholder name="Leaderboard" />;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Map" component={QuestMap} />
        <Tab.Screen name="Record" component={Recorder} />
        <Tab.Screen name="Album" component={Album} />
        <Tab.Screen name="Trade" component={TradeChat} />
        <Tab.Screen name="Leaderboard" component={Leaderboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
