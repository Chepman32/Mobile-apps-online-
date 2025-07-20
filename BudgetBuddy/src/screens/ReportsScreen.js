import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useBudgetStore } from '../store/budgetStore';

export default function ReportsScreen() {
  const budgets = useBudgetStore(state => state.budgets);
  const screenWidth = Dimensions.get('window').width - 32;
  const data = budgets.map(b => b.amount);

  return (
    <View style={styles.container}>
      <LineChart
        data={{ labels: budgets.map(b => b.title), datasets: [{ data }] }}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: (opacity = 1) => `rgba(0,0,0,${opacity})`,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
