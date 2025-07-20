import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

const huddlesSlice = createSlice({
  name: 'huddles',
  initialState: [],
  reducers: {
    addHuddle: (state, action) => { state.push(action.payload); }
  }
});

const store = configureStore({ reducer: { huddles: huddlesSlice.reducer } });

function HomeScreen({ navigation }) {
  const huddles = useSelector(state => state.huddles);
  return (
    <View style={styles.center}>
      <Button title="Create" onPress={() => navigation.navigate('Create')} />
      <FlatList data={huddles} keyExtractor={(item,i) => i.toString()} renderItem={({item}) => (
        <Text>{item}</Text>
      )}/>
    </View>
  );
}

function CreateScreen({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View style={styles.center}>
      <Button title="Add Sample Huddle" onPress={() => { dispatch(huddlesSlice.actions.addHuddle('My Huddle')); navigation.goBack(); }} />
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
