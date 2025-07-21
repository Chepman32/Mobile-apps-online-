import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function EditorScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Editor Placeholder</Text>
      <Button title="Export" onPress={() => navigation.navigate('ExportPicker')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, alignItems:'center', justifyContent:'center' },
  text:{ fontSize:18 }
});
