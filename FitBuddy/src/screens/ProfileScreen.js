import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export default function ProfileScreen() {
  const user = useSelector(state => state.user);

  return (
    <View style={styles.container}>
      <Text>{user.name || 'Guest'}</Text>
      <Text>Badges: {user.badges.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
