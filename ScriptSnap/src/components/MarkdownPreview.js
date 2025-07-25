import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MarkdownPreview({ text }) {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 }
});
