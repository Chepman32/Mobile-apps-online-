import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addHabit } from '../store/habitsSlice';

export default function AddHabitScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const add = () => {
    if (title.trim()) {
      dispatch(addHabit(title));
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Habit name"
        value={title}
        onChangeText={setTitle}
        style={{ borderBottomWidth: 1, marginBottom: 16 }}
      />
      <Button title="Save" onPress={add} />
    </View>
  );
}
