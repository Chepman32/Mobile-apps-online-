import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { View, Text, StyleSheet } from 'react-native';

const moodSlice = createSlice({
  name: 'mood',
  initialState: {},
  reducers: {
    addEntry: (state, action) => {
      // placeholder reducer
    },
  },
});

const store = configureStore({
  reducer: {
    mood: moodSlice.reducer,
  },
});

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

function Dashboard() {
  return <Placeholder name="Dashboard" />;
}
function Insights() {
  return <Placeholder name="Insights" />;
}
function Friends() {
  return <Placeholder name="Friends" />;
}
function Journal() {
  return <Placeholder name="Journal" />;
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
          <Tab.Screen name="Home" component={Dashboard} />
          <Tab.Screen name="Insights" component={Insights} />
          <Tab.Screen name="Friends" component={Friends} />
          <Tab.Screen name="Journal" component={Journal} />
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
