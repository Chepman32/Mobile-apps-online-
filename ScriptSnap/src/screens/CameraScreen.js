import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function CameraScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Camera Placeholder</Text>
      <Button title="Next" onPress={() => navigation.navigate('ParsePreview')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, alignItems:'center', justifyContent:'center' },
  text: { fontSize:18 }
});
