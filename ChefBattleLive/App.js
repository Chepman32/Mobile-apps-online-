import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  battles: [],
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

const Lobby = () => <Placeholder name="Lobby" />;
const LivePlayer = () => <Placeholder name="Live Player" />;
const TipWallet = () => <Placeholder name="Tip Wallet" />;
const ReplayFeed = () => <Placeholder name="Replay Feed" />;
const HostDashboard = () => {
  const count = useStore(state => state.battles.length);
  return (
    <View style={styles.center}>
      <Text>Host Dashboard ({count})</Text>
    </View>
  );
};

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Lobby" component={Lobby} />
        <Tab.Screen name="Live" component={LivePlayer} />
        <Tab.Screen name="Wallet" component={TipWallet} />
        <Tab.Screen name="Replays" component={ReplayFeed} />
        <Tab.Screen name="Host" component={HostDashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
