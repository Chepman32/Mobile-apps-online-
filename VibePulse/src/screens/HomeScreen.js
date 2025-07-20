import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { addVibe } from '../store/vibeSlice';

const emotions = ['Happy', 'Calm', 'Anxious', 'Energetic'];

export default function HomeScreen() {
  const [emotion, setEmotion] = useState(emotions[0]);
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();

  const saveVibe = () => {
    dispatch(addVibe({ emotion, notes }));
    setNotes('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling?</Text>
      {emotions.map(e => (
        <Button key={e} title={e} onPress={() => setEmotion(e)} />
      ))}
      <TextInput
        style={styles.input}
        placeholder="Notes"
        value={notes}
        onChangeText={setNotes}
      />
      <Button title="Save Vibe" onPress={saveVibe} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 },
  title: { fontSize: 20, marginBottom: 8 },
  input: { borderWidth: 1, width: '100%', marginVertical: 8, padding: 8 },
});
