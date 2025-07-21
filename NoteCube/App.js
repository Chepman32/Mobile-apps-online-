import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  cubes: [],
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

const CubeView = () => {
  const count = useStore(state => state.cubes.length);
  return (
    <View style={styles.center}>
      <Text>Cube View ({count})</Text>
    </View>
  );
};
const CardEditor = () => <Placeholder name="Card Editor" />;
const Navigator = () => <Placeholder name="Navigator" />;
const Export = () => <Placeholder name="Export" />;
const ThemeStore = () => <Placeholder name="Theme Store" />;

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Cube" component={CubeView} />
        <Tab.Screen name="Editor" component={CardEditor} />
        <Tab.Screen name="Navigator" component={Navigator} />
        <Tab.Screen name="Export" component={Export} />
        <Tab.Screen name="Themes" component={ThemeStore} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
