import React from 'react';
import { View, FlatList, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import HabitCard from '../components/HabitCard';
import { toggleHabit } from '../store/habitsSlice';

export default function HomeScreen({ navigation }) {
  const habits = useSelector(state => state.habits);
  const dispatch = useDispatch();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Add Habit" onPress={() => navigation.navigate('AddHabit')} />
      <FlatList
        data={habits}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <HabitCard habit={item} onToggle={() => dispatch(toggleHabit(item.id))} />
        )}
      />
      <Button title="Progress" onPress={() => navigation.navigate('Progress')} />
      <Button title="AI Coach" onPress={() => navigation.navigate('AICoach')} />
    </View>
  );
}
