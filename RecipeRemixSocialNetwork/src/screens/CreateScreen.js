import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { addRecipe } from '../store';
import RemixEditor from '../components/RemixEditor';

export default function CreateScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (title.trim()) {
      dispatch(addRecipe(title.trim()));
      setTitle('');
      navigation.goBack();
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <TextInput
        placeholder="Recipe title"
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, padding: 8, marginBottom: 12 }}
      />
      <RemixEditor />
      <Button title="Save" onPress={handleAdd} />
    </View>
  );
}
