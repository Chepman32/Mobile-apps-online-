import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { View, Text, Button, StyleSheet } from 'react-native';

const storiesSlice = createSlice({
  name: 'stories',
  initialState: [],
  reducers: {
    addStory: (state, action) => { state.push(action.payload); }
  }
});

const store = configureStore({ reducer: { stories: storiesSlice.reducer } });

function HomeScreen({ navigation }) {
  const stories = useSelector(state => state.stories);
  return (
    <View style={styles.center}>
      <Button title="New Story" onPress={() => navigation.navigate('Create')} />
      {stories.map((s,i) => (<Text key={i}>{s}</Text>))}
    </View>
  );
}

function CreateScreen({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View style={styles.center}>
      <Button title="Add Sample Story" onPress={() => { dispatch(storiesSlice.actions.addStory('My Story')); navigation.goBack(); }} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function AppInner() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Create" component={CreateScreen} />
      </Stack.Navigator>
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
