import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMoodStore } from '../store/moodStore';

export default function ProfileScreen() {
  const moods = useMoodStore(state => state.moods);

  return (
    <View style={styles.container}>
      <Text>Entries: {moods.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
