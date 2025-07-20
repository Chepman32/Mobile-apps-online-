import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GroceryScreen() {
  return (
    <View style={styles.container}>
      <Text>Grocery List Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
