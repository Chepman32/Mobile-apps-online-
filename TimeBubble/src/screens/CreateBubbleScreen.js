import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useStore } from '../store/useStore';

export default function CreateBubbleScreen({ navigation }) {
  const [duration, setDuration] = useState('25');
  const addBubble = useStore(state => state.addBubble);

  const create = () => {
    addBubble({ id: Date.now().toString(), duration: parseInt(duration, 10) });
    navigation.navigate('Timer', { duration: parseInt(duration, 10) });
  };

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center', padding:16 }}>
      <TextInput
        style={{ borderWidth:1, width:'80%', padding:8, marginBottom:16 }}
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <Button title="Start Bubble" onPress={create} />
    </View>
  );
}
