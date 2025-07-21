import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  transactions: [],
  blocks: 0,
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

function Dashboard() {
  const blocks = useStore(state => state.blocks);
  return (
    <View style={styles.center}>
      <Text>Dashboard - Blocks: {blocks}</Text>
    </View>
  );
}

function Transactions() {
  const txs = useStore(state => state.transactions);
  return (
    <View style={styles.center}>
      <Text>Transactions ({txs.length})</Text>
    </View>
  );
}

const AutoRules = () => <Placeholder name="Auto Rules" />;
const PDFExport = () => <Placeholder name="PDF Export" />;
const Settings = () => <Placeholder name="Settings" />;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Transactions" component={Transactions} />
        <Tab.Screen name="Rules" component={AutoRules} />
        <Tab.Screen name="Export" component={PDFExport} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
