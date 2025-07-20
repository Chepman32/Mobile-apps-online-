import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const WorkoutCard = ({ workout, onPress, style }) => {
  const getWorkoutIcon = (type) => {
    const icons = {
      running: '🏃',
      cycling: '🚴',
      walking: '🚶',
      strength: '💪',
      yoga: '🧘',
      swimming: '🏊'
    };
    return icons[type] || '🏃';
  };

  const getWorkoutColor = (type) => {
    const colors = {
      running: ['#FF6B6B', '#FF8E8E'],
      cycling: ['#4ECDC4', '#6EE7DF'],
      walking: ['#45B7D1', '#67C9E3'],
      strength: ['#96CEB4', '#B8E0C8'],
      yoga: ['#FFEAA7', '#FFF2C7'],
      swimming: ['#DDA0DD', '#E8B5E8']
    };
    return colors[type] || ['#FF6B6B', '#FF8E8E'];
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDistance = (distance) => {
    return distance > 0 ? `${distance.toFixed(1)} km` : 'N/A';
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <LinearGradient
        colors={getWorkoutColor(workout.type)}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <Text style={styles.icon}>{getWorkoutIcon(workout.type)}</Text>
          <Text style={styles.type}>{workout.type.charAt(0).toUpperCase() + workout.type.slice(1)}</Text>
        </View>
        
        <View style={styles.metrics}>
          <View style={styles.metric}>
            <MaterialIcons name="timer" size={16} color="white" />
            <Text style={styles.metricText}>{formatDuration(workout.duration)}</Text>
          </View>
          
          <View style={styles.metric}>
            <MaterialIcons name="local-fire-department" size={16} color="white" />
            <Text style={styles.metricText}>{workout.calories} cal</Text>
          </View>
          
          {workout.distance > 0 && (
            <View style={styles.metric}>
              <MaterialIcons name="straighten" size={16} color="white" />
              <Text style={styles.metricText}>{formatDistance(workout.distance)}</Text>
            </View>
          )}
        </View>
        
        {workout.date && (
          <Text style={styles.date}>
            {new Date(workout.date).toLocaleDateString()}
          </Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  gradient: {
    padding: 20,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    fontSize: 24,
    marginRight: 8,
  },
  type: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  metrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metric: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  date: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    textAlign: 'right',
  },
});

export default WorkoutCard;