import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function WorkoutScreen() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.timer}>{time}s</Text>
      <Button title={running ? 'Stop' : 'Start'} onPress={() => setRunning(!running)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  timer: { fontSize: 48, marginBottom: 16 },
});
