import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';
import create from 'zustand';
import { StatusBar } from 'expo-status-bar';

const useStore = create(set => ({ dreams: [], addDream: d => set(state => ({ dreams: [...state.dreams, d] })) }));

function HomeScreen({ navigation }) {
  const dreams = useStore(state => state.dreams);
  return (
    <View style={styles.center}>
      <Text>DreamWeaver AI</Text>
      <Button title="Add Dream" onPress={() => navigation.navigate('Entry')} />
      {dreams.map((d, i) => (
        <Text key={i}>{d.slice(0,20)}...</Text>
      ))}

    </View>
  );
}

function EntryScreen({ navigation }) {
  const addDream = useStore(state => state.addDream);
  return (
    <View style={styles.center}>
      <Text>Dream Entry Placeholder</Text>
      <Button title="Save" onPress={() => { addDream('My dream'); navigation.goBack(); }} />
    </View>
  );
}

function DictionaryScreen() {
  return (
    <View style={styles.center}>
      <Text>Dream Dictionary Placeholder</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Entry" component={EntryScreen} />
        <Stack.Screen name="Dictionary" component={DictionaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
