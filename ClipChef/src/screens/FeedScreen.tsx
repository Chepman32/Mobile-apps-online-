import React from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getRecipes } from '../api/recipes';
import { useNavigation } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/RootNavigator';
import type { StackNavigationProp } from '@react-navigation/stack';

export default function FeedScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { data, error, isLoading } = useQuery(['recipes'], getRecipes);

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>Error loading recipes</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate('RecipeDetail', { id: item.id })}>
          <View style={{ padding: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
