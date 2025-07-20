import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useBudgetStore } from '../store/budgetStore';

export default function HomeScreen({ navigation }) {
  const budgets = useBudgetStore(state => state.budgets);
  return (
    <View style={styles.container}>
      <Button title="Add Budget" onPress={() => navigation.navigate('Budget')} />
      <FlatList
        data={budgets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.title}: ${item.amount}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No budgets yet</Text>}
      />
      <Button title="Reports" onPress={() => navigation.navigate('Reports')} />
      <Button title="Goals" onPress={() => navigation.navigate('Goals')} />
      <Button title="Store" onPress={() => navigation.navigate('Store')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    paddingVertical: 8,
  },
});
