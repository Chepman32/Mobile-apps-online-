import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  decks: [],
  addDeck: name => set(state => ({ decks: [...state.decks, { name }] })),
}));

function Placeholder({ label, navigation, to }) {
  return (
    <View style={styles.center}>
      <Text>{label} Screen</Text>
      {to && <Button title="Open" onPress={() => navigation.navigate(to)} />}
    </View>
  );
}

function DecksScreen({ navigation }) {
  const add = useStore(state => state.addDeck);
  return (
    <View style={styles.center}>
      <Text>Decks Screen</Text>
      <Button title="New Deck" onPress={() => { add('New Deck'); navigation.navigate('NoteEditor'); }} />
    </View>
  );
}

function ReviewScreen() {
  return <Placeholder label="Review" />;
}

function StatsScreen() {
  return <Placeholder label="Stats" />;
}

function SettingsScreen() {
  return <Placeholder label="Settings" />;
}

function NoteEditorScreen({ navigation }) {
  return <Placeholder label="Note Editor" navigation={navigation} to="DeckDetail" />;
}

function DeckDetailScreen({ navigation }) {
  return <Placeholder label="Deck Detail" navigation={navigation} to="StudySession" />;
}

function StudySessionScreen() {
  return <Placeholder label="Study Session" />;
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Decks" component={DecksScreen} />
      <Tab.Screen name="Review" component={ReviewScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="NoteEditor" component={NoteEditorScreen} />
        <Stack.Screen name="DeckDetail" component={DeckDetailScreen} />
        <Stack.Screen name="StudySession" component={StudySessionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
