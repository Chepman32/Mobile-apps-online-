import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ExportPickerScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Export Picker Placeholder</Text>
      <Button title="History" onPress={() => navigation.navigate('History')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, alignItems:'center', justifyContent:'center' },
  text:{ fontSize:18 }
});
