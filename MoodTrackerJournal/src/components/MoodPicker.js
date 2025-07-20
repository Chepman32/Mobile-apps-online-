import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const moods = [
  { id: 1, emoji: '😞' },
  { id: 2, emoji: '😕' },
  { id: 3, emoji: '😐' },
  { id: 4, emoji: '🙂' },
  { id: 5, emoji: '😁' },
];

export default function MoodPicker({ onSelect }) {
  const [selected, setSelected] = useState(null);
  return (
    <View style={styles.container}>
      {moods.map(m => (
        <TouchableOpacity
          key={m.id}
          style={[styles.mood, selected === m.id && styles.selected]}
          onPress={() => {
            setSelected(m.id);
            onSelect(m.id);
          }}
        >
          <Text style={styles.emoji}>{m.emoji}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 16 },
  mood: { padding: 8, borderRadius: 8 },
  selected: { backgroundColor: '#ddefff' },
  emoji: { fontSize: 32 },
});
