import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default function RecipesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.title}</Text>}
        ListEmptyComponent={<Text>No recipes yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});
