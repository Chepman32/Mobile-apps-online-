import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import ChartComponent from '../components/ChartComponent';

export default function InsightsScreen() {
  const entries = useSelector(state => state.mood);
  const data = entries.map(e => e.mood);
  return (
    <View style={{ flex: 1, alignItems: 'center', padding: 16 }}>
      <ChartComponent data={data} />
    </View>
  );
}
