import React from 'react';
import { View, Text, Button } from 'react-native';
import useStore from '../store';

export default function OnboardingScreen() {
  const completeOnboarding = useStore(state => state.completeOnboarding);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to SparkFocus!</Text>
      <Button title="Get Started" onPress={completeOnboarding} />
    </View>
  );
}
