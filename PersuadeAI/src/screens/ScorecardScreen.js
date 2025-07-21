import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store/useAppStore';

export default function ScorecardScreen() {
  const navigation = useNavigation();
  const analysis = useAppStore(state => state.analysis);

  return (
    <View style={styles.center}>
      <Text style={styles.title}>Scorecard</Text>
      {analysis ? <Text>{analysis}</Text> : <Text>No analysis available.</Text>}
      <Button title="Back to Dashboard" onPress={() => navigation.popToTop()} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex:1, alignItems:'center', justifyContent:'center' },
  title: { fontSize:20, marginBottom:16 }
});
