import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateWorkoutStats } from '../store/workoutSlice';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

const WorkoutTimer = ({ workout, onComplete }) => {
  const dispatch = useDispatch();
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const intervalRef = useRef(null);
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          
          // Update calories (rough estimate: 10 calories per minute)
          const newCalories = Math.floor(newTime / 60 * 10);
          setCalories(newCalories);
          
          // Update distance (rough estimate: 0.1 km per minute)
          const newDistance = Math.floor(newTime / 60 * 0.1 * 100) / 100;
          setDistance(newDistance);
          
          // Simulate heart rate (120-180 bpm range)
          const newHeartRate = 120 + Math.floor(Math.random() * 60);
          setHeartRate(newHeartRate);
          
          // Update progress animation
          const progress = (newTime / (workout.duration * 60)) * 100;
          Animated.timing(progressAnim, {
            toValue: progress,
            duration: 1000,
            useNativeDriver: false,
          }).start();
          
          // Haptic feedback every minute
          if (newTime % 60 === 0) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          
          // Update Redux store
          dispatch(updateWorkoutStats({
            currentTime: newTime,
            calories: newCalories,
            distance: newDistance,
            heartRate: newHeartRate,
          }));
          
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, workout.duration, dispatch, progressAnim]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDistance = (km) => {
    return `${km.toFixed(2)} km`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>Workout Time</Text>
          <Text style={styles.timerText}>{formatTime(time)}</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 100],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {Math.floor((time / (workout.duration * 60)) * 100)}% Complete
            </Text>
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Calories</Text>
            <Text style={styles.statValue}>{calories}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Distance</Text>
            <Text style={styles.statValue}>{formatDistance(distance)}</Text>
          </View>
          
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Heart Rate</Text>
            <Text style={styles.statValue}>{heartRate} bpm</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.controlButton, isActive ? styles.pauseButton : styles.playButton]}
          onPress={toggleTimer}
        >
          <Text style={styles.controlButtonText}>
            {isActive ? 'PAUSE' : 'START'}
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    margin: 16,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  gradient: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  timerContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  timerLabel: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  timerText: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'monospace',
  },
  progressContainer: {
    width: '100%',
    marginTop: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  statItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 16,
    borderRadius: 12,
    minWidth: 80,
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  controlButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default WorkoutTimer;