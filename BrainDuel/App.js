import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { View, Text, StyleSheet } from 'react-native';

const store = configureStore({ reducer: {} });

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

function Home() {
  return <Placeholder name="Home" />;
}
function Games() {
  return <Placeholder name="Games" />;
}
function Leaderboard() {
  return <Placeholder name="Leaderboard" />;
}
function Shop() {
  return <Placeholder name="Shop" />;
}
function Profile() {
  return <Placeholder name="Profile" />;
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Games" component={Games} />
          <Tab.Screen name="Leaderboard" component={Leaderboard} />
          <Tab.Screen name="Shop" component={Shop} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
