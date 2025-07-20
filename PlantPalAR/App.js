import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { makeAutoObservable } from 'mobx';
import { Observer } from 'mobx-react-lite';

class PlantStore {
  plants = [];
  constructor() {
    makeAutoObservable(this);
  }
}
const store = new PlantStore();

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

function Garden() {
  return <Placeholder name="Garden" />;
}
function Scanner() {
  return <Placeholder name="Scanner" />;
}
function Social() {
  return <Placeholder name="Social" />;
}
function Encyclopedia() {
  return <Placeholder name="Encyclopedia" />;
}
function Profile() {
  return <Placeholder name="Profile" />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Observer>
      {() => (
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Garden" component={Garden} />
            <Tab.Screen name="Scanner" component={Scanner} />
            <Tab.Screen name="Social" component={Social} />
            <Tab.Screen name="Encyclopedia" component={Encyclopedia} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </NavigationContainer>
      )}
    </Observer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
