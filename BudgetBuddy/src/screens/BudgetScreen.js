import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useBudgetStore } from '../store/budgetStore';

export default function BudgetScreen({ navigation }) {
  const addBudget = useBudgetStore(state => state.addBudget);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleAdd = () => {
    if (!title || !amount) return;
    addBudget(title, parseFloat(amount));
    setTitle('');
    setAmount('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Budget title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Button title="Save" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 12,
  },
});
