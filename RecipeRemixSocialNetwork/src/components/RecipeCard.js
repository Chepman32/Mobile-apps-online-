import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RecipeCard({ recipe }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{recipe.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
