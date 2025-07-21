import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';

export default function DashboardScreen({ navigation }) {
  const scenario = useAppStore(state => state.scenario);
  return (
    <View style={styles.center}>
      <Text style={styles.title}>PersuadeAI</Text>
      {scenario ? <Text>Last scenario: {scenario.topic}</Text> : <Text>No scenarios yet.</Text>}
      <Button title="New Scenario" onPress={() => navigation.navigate('Setup')} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 24, marginBottom: 16 },
});
