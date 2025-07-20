import React from 'react';
import { View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import JournalCard from '../components/JournalCard';

export default function JournalScreen() {
  const entries = useSelector(state => state.mood);
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={entries}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <JournalCard entry={item} />}
      />
    </View>
  );
}
