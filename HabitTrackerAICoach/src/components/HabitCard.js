import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function HabitCard({ habit, onToggle }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onToggle}>
      <Text style={styles.title}>{habit.title}</Text>
      <Text style={styles.streak}>Streak: {habit.streak}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  streak: {
    marginTop: 4,
    color: '#888',
  },
});
