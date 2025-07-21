import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import create from 'zustand';

const useStore = create(set => ({ user: null, setUser: user => set({ user }) }));

function Placeholder({ title }) {
  return (
    <View style={styles.center}>
      <Text>{title}</Text>
    </View>
  );
}

// Auth Flow
function SplashScreen() { return <Placeholder title="Splash" />; }
function WelcomeScreen() { return <Placeholder title="Welcome" />; }
function AuthScreen() { return <Placeholder title="Auth" />; }

// Main Tabs
function DashboardScreen() { return <Placeholder title="Dashboard" />; }
function ChoreListScreen() { return <Placeholder title="Chore List" />; }
function LeaderboardScreen() { return <Placeholder title="Leaderboard" />; }
function ProfileScreen() { return <Placeholder title="Profile" />; }

const AuthStack = createNativeStackNavigator();
function AuthNavigator() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Splash" component={SplashScreen} />
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <AuthStack.Screen name="Auth" component={AuthScreen} />
    </AuthStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={DashboardScreen} />
      <Tab.Screen name="Chores" component={ChoreListScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const user = useStore(state => state.user);
  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthNavigator />}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});
