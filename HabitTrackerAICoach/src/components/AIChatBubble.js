import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AIChatBubble({ text, isUser }) {
  return (
    <View style={[styles.bubble, isUser ? styles.user : styles.ai]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    padding: 12,
    marginVertical: 4,
    maxWidth: '80%',
    borderRadius: 12,
  },
  ai: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  user: {
    backgroundColor: '#4e9bde',
    alignSelf: 'flex-end',
  },
  text: {
    color: '#000',
  },
});
