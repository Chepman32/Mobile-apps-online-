import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  alerts: [],
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

const Accounts = () => <Placeholder name="Accounts" />;
const TrendGraph = () => <Placeholder name="Trend Graph" />;
const AlertFeed = () => {
  const count = useStore(state => state.alerts.length);
  return (
    <View style={styles.center}>
      <Text>Alert Feed ({count})</Text>
    </View>
  );
};
const SponsorCalc = () => <Placeholder name="Sponsor Calc" />;
const Subscription = () => <Placeholder name="Subscription" />;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Accounts" component={Accounts} />
        <Tab.Screen name="Trends" component={TrendGraph} />
        <Tab.Screen name="Alerts" component={AlertFeed} />
        <Tab.Screen name="Sponsors" component={SponsorCalc} />
        <Tab.Screen name="Subscription" component={Subscription} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
