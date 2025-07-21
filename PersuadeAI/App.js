import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardScreen from './src/screens/DashboardScreen';
import SetupScreen from './src/screens/SetupScreen';
import AnalysisScreen from './src/screens/AnalysisScreen';
import SimulationScreen from './src/screens/SimulationScreen';
import ScorecardScreen from './src/screens/ScorecardScreen';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator>
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Setup" component={SetupScreen} />
          <Stack.Screen name="Analysis" component={AnalysisScreen} />
          <Stack.Screen name="Simulation" component={SimulationScreen} />
          <Stack.Screen name="Scorecard" component={ScorecardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
