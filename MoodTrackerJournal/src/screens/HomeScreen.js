import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addEntry } from '../store/moodSlice';
import MoodPicker from '../components/MoodPicker';

export default function HomeScreen({ navigation }) {
  const [mood, setMood] = useState(null);
  const dispatch = useDispatch();

  const save = () => {
    if (mood) {
      dispatch(addEntry(mood));
      setMood(null);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <MoodPicker onSelect={setMood} />
      <Button title="Save Mood" onPress={save} />
      <Button title="Journal" onPress={() => navigation.navigate('Journal')} />
      <Button title="Insights" onPress={() => navigation.navigate('Insights')} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}
