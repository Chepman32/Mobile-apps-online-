import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PurchasesScreen() {
  return (
    <View style={styles.container}>
      <Text>Purchase History Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
