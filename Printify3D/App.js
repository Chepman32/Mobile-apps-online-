import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  models: [],
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

const Catalog = () => {
  const count = useStore(state => state.models.length);
  return (
    <View style={styles.center}>
      <Text>Catalog ({count})</Text>
    </View>
  );
};
const ModelDetail = () => <Placeholder name="Model Detail" />;
const ARViewer = () => <Placeholder name="AR Viewer" />;
const PrintOrder = () => <Placeholder name="Print Order" />;
const SellerDashboard = () => <Placeholder name="Seller Dashboard" />;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Catalog" component={Catalog} />
        <Tab.Screen name="Detail" component={ModelDetail} />
        <Tab.Screen name="AR" component={ARViewer} />
        <Tab.Screen name="Print" component={PrintOrder} />
        <Tab.Screen name="Seller" component={SellerDashboard} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
