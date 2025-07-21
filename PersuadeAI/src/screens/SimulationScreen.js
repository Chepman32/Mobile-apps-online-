import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store/useAppStore';

export default function SimulationScreen() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const sendMessage = () => {
    setMessages(prev => [...prev, { id: Date.now().toString(), text: input }]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <Text style={styles.msg}>{item.text}</Text>}
      />
      <TextInput
        style={styles.input}
        placeholder="Type your response..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Send" onPress={sendMessage} disabled={!input} />
      <Button title="Finish" onPress={() => navigation.navigate('Scorecard')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  list: { flex: 1, marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8 },
  msg: { marginBottom: 4 }
});
