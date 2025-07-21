import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen({ navigation }) {
  return (
    <View style={styles.center}>
      <Button title="Capture Meal" onPress={() => navigation.replace('Dashboard')} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
