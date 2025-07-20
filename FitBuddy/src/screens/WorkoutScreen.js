import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Alert,
  Animated,
  PanGestureHandler,
  State
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { startWorkout, updateMetrics, endWorkout, resetWorkout } from '../store/workoutSlice';
import { updateUserStats } from '../store/userSlice';

const { width, height } = Dimensions.get('window');

const WorkoutScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { currentWorkout, workoutTypes } = useSelector(state => state.workout);
  const [isActive, setIsActive] = useState(false);
  const [duration, setDuration] = useState(0);
  const [calories, setCalories] = useState(0);
  const [distance, setDistance] = useState(0);
  const [heartRate, setHeartRate] = useState(0);
  const [pace, setPace] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const workoutType = route.params?.type || 'running';
  const workoutConfig = workoutTypes.find(w => w.id === workoutType);
  
  const timerRef = useRef(null);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const pulseAnimation = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!currentWorkout) {
      dispatch(startWorkout({ type: workoutType }));
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          const newDuration = prev + 1;
          // Simulate calorie burn (varies by workout type)
          const calorieRate = workoutType === 'running' ? 8 : 
                            workoutType === 'cycling' ? 6 : 
                            workoutType === 'strength' ? 4 : 3;
          setCalories(prev => prev + calorieRate);
          
          // Simulate distance for cardio workouts
          if (['running', 'cycling', 'walking'].includes(workoutType)) {
            const distanceRate = workoutType === 'running' ? 0.002 : 
                               workoutType === 'cycling' ? 0.005 : 0.001;
            setDistance(prev => prev + distanceRate);
          }
          
          // Simulate heart rate
          setHeartRate(120 + Math.floor(Math.random() * 40));
          
          // Update pace
          if (distance > 0) {
            setPace(duration / distance);
          }
          
          return newDuration;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused, workoutType]);

  useEffect(() => {
    if (isActive) {
      // Pulse animation for active workout
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnimation, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnimation.setValue(1);
    }
  }, [isActive]);

  const startWorkoutSession = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    setIsActive(true);
    setIsPaused(false);
    
    // Animate progress bar
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const pauseWorkout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPaused(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resumeWorkout = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPaused(false);
  };

  const endWorkoutSession = () => {
    Alert.alert(
      'End Workout',
      'Are you sure you want to end this workout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'End Workout', 
          style: 'destructive',
          onPress: () => {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            
            const workoutData = {
              duration,
              calories,
              distance,
              heartRate,
              pace,
              xp: Math.floor(calories / 10) + Math.floor(duration / 2)
            };
            
            dispatch(endWorkout(workoutData));
            dispatch(updateUserStats(workoutData));
            dispatch(resetWorkout());
            
            navigation.navigate('Home');
          }
        }
      ]
    );
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatPace = (paceValue) => {
    if (paceValue === 0) return '--:--';
    const minutes = Math.floor(paceValue);
    const seconds = Math.floor((paceValue - minutes) * 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <View style={styles.workoutInfo}>
            <Text style={styles.workoutType}>
              {workoutConfig?.icon} {workoutConfig?.name}
            </Text>
            <Text style={styles.workoutStatus}>
              {!isActive ? 'Ready to start' : isPaused ? 'Paused' : 'Active'}
            </Text>
          </View>
          
          <TouchableOpacity 
            style={styles.endButton}
            onPress={endWorkoutSession}
          >
            <MaterialIcons name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        {/* Timer Display */}
        <Animated.View 
          style={[
            styles.timerContainer,
            { transform: [{ scale: pulseAnimation }] }
          ]}
        >
          <Text style={styles.timer}>{formatTime(duration)}</Text>
          <Text style={styles.timerLabel}>Duration</Text>
        </Animated.View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill,
                { 
                  width: progressAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%']
                  })
                }
              ]} 
            />
          </View>
        </View>

        {/* Metrics Grid */}
        <View style={styles.metricsGrid}>
          <View style={styles.metricCard}>
            <MaterialIcons name="local-fire-department" size={24} color="#FF6B6B" />
            <Text style={styles.metricValue}>{calories}</Text>
            <Text style={styles.metricLabel}>Calories</Text>
          </View>
          
          <View style={styles.metricCard}>
            <MaterialIcons name="straighten" size={24} color="#4ECDC4" />
            <Text style={styles.metricValue}>{distance.toFixed(2)}</Text>
            <Text style={styles.metricLabel}>Distance (km)</Text>
          </View>
          
          <View style={styles.metricCard}>
            <MaterialIcons name="favorite" size={24} color="#FF6B6B" />
            <Text style={styles.metricValue}>{heartRate}</Text>
            <Text style={styles.metricLabel}>Heart Rate</Text>
          </View>
          
          <View style={styles.metricCard}>
            <MaterialIcons name="speed" size={24} color="#96CEB4" />
            <Text style={styles.metricValue}>{formatPace(pace)}</Text>
            <Text style={styles.metricLabel}>Pace /km</Text>
          </View>
        </View>

        {/* Control Buttons */}
        <View style={styles.controls}>
          {!isActive ? (
            <TouchableOpacity 
              style={styles.startButton}
              onPress={startWorkoutSession}
            >
              <LinearGradient
                colors={['#4CAF50', '#66BB6A']}
                style={styles.startButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <MaterialIcons name="play-arrow" size={32} color="white" />
                <Text style={styles.startButtonText}>Start Workout</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={styles.controlButtons}>
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={isPaused ? resumeWorkout : pauseWorkout}
              >
                <LinearGradient
                  colors={isPaused ? ['#4CAF50', '#66BB6A'] : ['#FF9800', '#FFB74D']}
                  style={styles.controlButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <MaterialIcons 
                    name={isPaused ? "play-arrow" : "pause"} 
                    size={24} 
                    color="white" 
                  />
                  <Text style={styles.controlButtonText}>
                    {isPaused ? 'Resume' : 'Pause'}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.controlButton}
                onPress={endWorkoutSession}
              >
                <LinearGradient
                  colors={['#F44336', '#EF5350']}
                  style={styles.controlButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <MaterialIcons name="stop" size={24} color="white" />
                  <Text style={styles.controlButtonText}>End</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backButton: {
    padding: 8,
  },
  workoutInfo: {
    flex: 1,
    alignItems: 'center',
  },
  workoutType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  workoutStatus: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  endButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  timerContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#2c3e50',
    fontFamily: 'monospace',
  },
  timerLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  progressContainer: {
    marginVertical: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 4,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  metricCard: {
    width: (width - 60) / 2,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginTop: 8,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  controls: {
    marginTop: 20,
  },
  startButton: {
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  startButtonGradient: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  controlButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  controlButtonGradient: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default WorkoutScreen;
