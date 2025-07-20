import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import useStore from '../store';

export default function Settings() {
  const darkMode = useStore(state => state.darkMode);
  const toggleTheme = useStore(state => state.toggleTheme);
  return (
    <View style={styles.container}>
      <Text style={styles.item}>Dark Mode</Text>
      <Switch value={darkMode} onValueChange={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { fontSize: 18, marginBottom: 12 }
});
