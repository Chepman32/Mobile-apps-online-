import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function HistoryScreen() {
  const vibes = useSelector(state => state.vibe);

  return (
    <View style={styles.container}>
      <FlatList
        data={vibes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.emotion}>{item.emotion}</Text>
            {item.notes ? <Text>{item.notes}</Text> : null}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  item: { padding: 12, borderBottomWidth: 1 },
  emotion: { fontWeight: 'bold' },
});
