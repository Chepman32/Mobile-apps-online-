import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useMoodStore } from '../store/moodStore';

const moods = ['Happy', 'Sad', 'Anxious', 'Excited'];

export default function HomeScreen() {
  const [selected, setSelected] = useState(moods[0]);
  const [notes, setNotes] = useState('');
  const addMood = useMoodStore(state => state.addMood);

  const save = () => {
    addMood({ date: new Date().toISOString(), mood: selected, notes });
    setNotes('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Mood</Text>
      {moods.map(m => (
        <Button key={m} title={m} onPress={() => setSelected(m)} />
      ))}
      <TextInput style={styles.input} placeholder="Notes" value={notes} onChangeText={setNotes} />
      <Button title="Save" onPress={save} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 20, marginBottom: 8 },
  input: { borderWidth: 1, width: '100%', marginVertical: 8, padding: 8 },
});
