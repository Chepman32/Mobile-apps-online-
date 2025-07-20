import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({ discoveries: [] }));

function MapScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Text>Map Placeholder</Text>
      <Button title="Scan" onPress={() => navigation.navigate('Scan')} />
    </View>
  );
}

function ScanScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Text>Camera Scan Placeholder</Text>
      <Button title="Identify" onPress={() => navigation.navigate('Dex')} />
    </View>
  );
}

function DexScreen() {
  const discoveries = useStore(state => state.discoveries);
  return (
    <View style={styles.center}>
      <Text>CritterDex ({discoveries.length})</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
        <Stack.Screen name="Dex" component={DexScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
