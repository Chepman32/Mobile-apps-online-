import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const friends = [
  { id: '1', name: 'Alice', streak: 5 },
  { id: '2', name: 'Bob', streak: 3 }
];

export default function SocialTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Friends</Text>
      <FlatList
        data={friends}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text style={styles.item}>{`${item.name}: ${item.streak} days`}</Text>
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
