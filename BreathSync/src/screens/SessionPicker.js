import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function SessionPicker({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Start Breathing" onPress={() => navigation.navigate('Exercise')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
