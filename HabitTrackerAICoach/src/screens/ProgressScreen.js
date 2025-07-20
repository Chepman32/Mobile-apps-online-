import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import ProgressChart from '../components/ProgressChart';

export default function ProgressScreen() {
  const habits = useSelector(state => state.habits);
  const data = habits.map(h => h.streak);

  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
      <ProgressChart data={data} />
    </View>
  );
}
