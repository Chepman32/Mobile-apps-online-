import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ExercisePlayer() {
  return (
    <View style={styles.container}>
      <Text>Exercise Player Placeholder</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
