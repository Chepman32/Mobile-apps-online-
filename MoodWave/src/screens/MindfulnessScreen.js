import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MindfulnessScreen() {
  return (
    <View style={styles.container}>
      <Text>Mindfulness Exercises Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
