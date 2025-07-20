import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function BudgetBar({ title, amount }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={[styles.bar, { width: Math.min(amount / 1000, 1) * 200 }]} />
      <Text>${amount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  title: {
    fontWeight: 'bold',
  },
  bar: {
    height: 10,
    backgroundColor: '#4a90e2',
    marginVertical: 4,
  },
});
