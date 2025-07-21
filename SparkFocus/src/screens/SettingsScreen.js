import React from 'react';
import { View, Text } from 'react-native';
import useStore from '../store';

export default function SettingsScreen() {
  const xp = useStore(state => state.xp);
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings</Text>
      <Text>Total XP: {xp}</Text>
    </View>
  );
}
