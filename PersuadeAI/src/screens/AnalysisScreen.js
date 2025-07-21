import React, { useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAppStore } from '../store/useAppStore';
import { useQuery } from '@tanstack/react-query';

function fetchAnalysis(topic) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`Suggested counter-arguments for "${topic}"`);
    }, 1000);
  });
}

export default function AnalysisScreen() {
  const navigation = useNavigation();
  const scenario = useAppStore(state => state.scenario);
  const setAnalysis = useAppStore(state => state.setAnalysis);

  const { data, isLoading } = useQuery(['analysis', scenario?.topic], () => fetchAnalysis(scenario.topic));

  useEffect(() => {
    if (data) {
      setAnalysis(data);
    }
  }, [data]);

  if (!scenario) {
    return (
      <View style={styles.center}><Text>No scenario.</Text></View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>AI Analysis</Text>
      {isLoading ? <ActivityIndicator /> : <Text>{data}</Text>}
      <Button title="Start Simulation" onPress={() => navigation.navigate('Simulation')} disabled={!data}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: { fontSize: 20, marginBottom: 16 },
  center: { flex:1, alignItems:'center', justifyContent:'center' }
});
