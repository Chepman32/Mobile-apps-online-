import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import useStore from '../store';

export default function HomeScreen() {
  const [count, setCount] = useState(25);
  const addSession = useStore(state => state.addSession);

  const startSession = () => {
    // simple placeholder for timer logic
    setTimeout(() => {
      addSession(count);
    }, 1000);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Focus for {count} minutes</Text>
      <Button title="Start" onPress={startSession} />
    </View>
  );
}
