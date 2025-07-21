import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { getRecipe } from '../api/recipes';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';

export default function RecipeDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'RecipeDetail'>>();
  const { data, error, isLoading } = useQuery(['recipe', route.params.id], () => getRecipe(route.params.id));

  if (isLoading) return <ActivityIndicator />;
  if (error || !data) return <Text>Error loading recipe</Text>;

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{data.title}</Text>
      <Text>Duration: {data.duration} sec</Text>
    </View>
  );
}
