import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';

export default function SetupScreen({ navigation }) {
  const [topic, setTopic] = useState('');
  const setScenario = useAppStore(state => state.setScenario);

  const handleNext = () => {
    setScenario({ topic });
    navigation.navigate('Analysis');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Conversation Topic</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Asking for a raise"
        value={topic}
        onChangeText={setTopic}
      />
      <Button title="Analyze" onPress={handleNext} disabled={!topic} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
  },
});
