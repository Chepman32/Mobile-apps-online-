import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ParsePreviewScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Parse Preview Placeholder</Text>
      <Button title="Edit" onPress={() => navigation.navigate('Editor')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{ flex:1, alignItems:'center', justifyContent:'center' },
  text:{ fontSize:18 }
});
