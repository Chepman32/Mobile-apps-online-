import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import create from 'zustand';
import OnboardingWizard from './screens/OnboardingWizard';
import CameraScreen from './screens/CameraScreen';
import Dashboard from './screens/Dashboard';
import PlanDetail from './screens/PlanDetail';
import SocialTab from './screens/SocialTab';
import Settings from './screens/Settings';

const useStore = create(set => ({
  user: null,
  setUser: user => set({ user })
}));

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  const user = useStore(state => state.user);
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Onboarding" component={OnboardingWizard} />
        ) : (
          <>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Camera" component={CameraScreen} />
            <Stack.Screen name="Plan" component={PlanDetail} />
            <Stack.Screen name="Social" component={SocialTab} />
            <Stack.Screen name="Settings" component={Settings} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
