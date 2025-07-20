import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useStore from '../store';

export default function OnboardingWizard() {
  const navigation = useNavigation();
  const setUser = useStore(state => state.setUser);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SnapFit AI</Text>
      <Text style={styles.subtitle}>Upload a photo to generate your plan.</Text>
      <Button title="Get Started" onPress={() => setUser({ uid: 'demo' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold' },
  subtitle: { marginVertical: 16 }
});
