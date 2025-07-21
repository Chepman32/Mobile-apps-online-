import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ExportChip({ label }) {
  return (
    <TouchableOpacity style={styles.chip}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: '#ddd',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 4
  },
  text: { fontSize: 14 }
});
