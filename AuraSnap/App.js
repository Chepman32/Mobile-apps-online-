import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import create from 'zustand';

const useStore = create(set => ({
  premium: false,
  togglePremium: () => set(state => ({ premium: !state.premium }))
}));

function HomeScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Text>AuraSnap Home (Camera Placeholder)</Text>
      <Button title="Capture" onPress={() => navigation.navigate('Loading')} />
    </View>
  );
}

function LoadingScreen({ navigation }) {
  React.useEffect(() => {
    const timeout = setTimeout(() => navigation.navigate('Preview'), 1000);
    return () => clearTimeout(timeout);
  }, [navigation]);
  return (
    <View style={styles.center}>
      <Text>Reading your energy...</Text>
    </View>
  );
}

function PreviewScreen() {
  const premium = useStore(state => state.premium);
  const toggle = useStore(state => state.togglePremium);
  return (
    <View style={styles.center}>
      <Text>Preview Placeholder</Text>
      <Button title={premium ? 'Premium Active' : 'Unlock Premium'} onPress={toggle} />
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Preview" component={PreviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
