import React from 'react';
import { View, Text, Button } from 'react-native';
import { useStore } from '../store/useStore';

export default function StatsScreen({ navigation }) {
  const stats = useStore(state => state.stats);

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:24, marginBottom:16 }}>Sessions Completed: {stats.sessions}</Text>
      <Button title="Create New Bubble" onPress={() => navigation.navigate('Create')} />
    </View>
  );
}
