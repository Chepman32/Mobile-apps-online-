import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text>Camera permission is required.</Text>
        <Button title="Grant" onPress={requestPermission} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} />
      <View style={styles.overlay}>
        <Text style={styles.text}>Pose within the frame</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { position: 'absolute', top: 40, left: 0, right: 0, alignItems: 'center' },
  text: { color: '#fff' }
});
