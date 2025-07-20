import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function ProgressChart({ data }) {
  const screenWidth = Dimensions.get('window').width - 32;
  return (
    <LineChart
      data={{ labels: data.map((_, i) => i + 1), datasets: [{ data }] }}
      width={screenWidth}
      height={220}
      chartConfig={{
        backgroundColor: '#fff',
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(74,144,226, ${opacity})`,
      }}
    />
  );
}
