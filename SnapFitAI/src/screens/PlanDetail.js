import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const mockPlan = [
  { id: '1', name: 'Push Ups', sets: 3, reps: 10 },
  { id: '2', name: 'Squats', sets: 3, reps: 15 }
];

export default function PlanDetail() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Today's Plan</Text>
      <FlatList
        data={mockPlan}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{`${item.name} x${item.reps} (${item.sets} sets)`}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16 },
  item: { padding: 12, borderBottomWidth: 1, borderColor: '#ccc' }
});
