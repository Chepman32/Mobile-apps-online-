import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RemixEditor() {
  return (
    <View style={styles.editor}>
      <Text>Remix Editor Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  editor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
