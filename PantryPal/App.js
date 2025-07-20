import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { View, Text, Button, StyleSheet } from 'react-native';

const pantrySlice = (state = [], action) => state;
const store = configureStore({ reducer: { pantry: pantrySlice } });

function PantryScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Text>Pantry List Placeholder</Text>
      <Button title="Scan" onPress={() => navigation.navigate('Scan')} />
    </View>
  );
}

function ScanScreen() {
  return (
    <View style={styles.center}>
      <Text>Receipt Scan Placeholder</Text>
    </View>
  );
}

function RecipesScreen() {
  return (
    <View style={styles.center}>
      <Text>Recipes Placeholder</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.center}>
      <Text>Settings Placeholder</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function AppInner() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Pantry" component={PantryScreen} />
        <Tab.Screen name="Scan" component={ScanScreen} />
        <Tab.Screen name="Recipes" component={RecipesScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
