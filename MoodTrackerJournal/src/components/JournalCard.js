import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const emojis = ['','😞','😕','😐','🙂','😁'];

export default function JournalCard({ entry }) {
  const date = new Date(entry.date).toLocaleDateString();
  return (
    <View style={styles.card}>
      <Text style={styles.emoji}>{emojis[entry.mood]}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emoji: { fontSize: 24, marginRight: 12 },
  date: { fontSize: 16 },
});
