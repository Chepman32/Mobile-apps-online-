import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import create from 'zustand';

const useStore = create(set => ({
  lessons: [],
  addLesson: title => set(state => ({ lessons: [...state.lessons, { id: Date.now().toString(), title }] })),
}));

function Placeholder({ name }) {
  return (
    <View style={styles.center}>
      <Text>{name} Screen</Text>
    </View>
  );
}

const OnboardingScreen = () => <Placeholder name="Onboarding" />;
const HomeScreen = () => <Placeholder name="Home" />;
const CaptureScreen = () => <Placeholder name="Capture" />;
const RecognitionScreen = () => <Placeholder name="Recognition" />;
const LessonScreen = () => <Placeholder name="Lesson" />;
const DashboardScreen = () => <Placeholder name="Dashboard" />;

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Capture" component={CaptureScreen} />
        <Stack.Screen name="Recognition" component={RecognitionScreen} />
        <Stack.Screen name="Lesson" component={LessonScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
