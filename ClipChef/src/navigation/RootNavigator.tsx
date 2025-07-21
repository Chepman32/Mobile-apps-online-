import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAppStore } from '../state/useAppStore';
import FeedScreen from '../screens/FeedScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';

export type RootStackParamList = {
  Feed: undefined;
  RecipeDetail: { id: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const session = useAppStore(state => state.session);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
