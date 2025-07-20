import React from 'react';
import { View, FlatList, Button } from 'react-native';
import { useSelector } from 'react-redux';
import RecipeCard from '../components/RecipeCard';

export default function FeedScreen({ navigation }) {
  const recipes = useSelector(state => state.recipes);

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Create" onPress={() => navigation.navigate('Create')} />
      <FlatList
        data={recipes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <RecipeCard recipe={item} />}
      />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
      <Button title="Search" onPress={() => navigation.navigate('Search')} />
    </View>
  );
}
