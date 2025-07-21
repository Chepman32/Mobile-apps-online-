import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAppStore } from '../state/useAppStore';
import { fetchMeals, addMeal } from '../api/meals';

export default function DashboardScreen({ navigation }) {
  const session = useAppStore(state => state.session);
  const { data, error, isLoading } = useQuery(['meals', session?.user.id], () => fetchMeals(session.user.id), { enabled: !!session });

  const mutation = useMutation(newMeal => addMeal(newMeal));

  if (!session) {
    return (
      <View style={styles.center}>
        <Text>Please sign in.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button title="Log Meal" onPress={() => navigation.navigate('Camera')} />
      {isLoading && <Text>Loading...</Text>}
      {error && <Text>Error loading meals</Text>}
      <FlatList
        data={data || []}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.captured_at} - {item.total_calories} cal</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  item: { paddingVertical: 8 },
});
