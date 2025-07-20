import React, { useState } from 'react';
import { View, TextInput, Button, FlatList } from 'react-native';
import AIChatBubble from '../components/AIChatBubble';

export default function AICoachScreen() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { text: input, isUser: true }]);
    setMessages(m => [...m, { text: 'Great job! Keep it up!', isUser: false }]);
    setInput('');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <AIChatBubble {...item} />}
      />
      <TextInput
        placeholder="Message"
        value={input}
        onChangeText={setInput}
        style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 4, padding: 8 }}
      />
      <Button title="Send" onPress={send} />
    </View>
  );
}
