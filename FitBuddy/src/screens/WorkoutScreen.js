import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal,
  TextInput,
  Alert 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { startWorkout, endWorkout } from '../store/workoutSlice';
import WorkoutTimer from '../components/WorkoutTimer';
import * as Haptics from 'expo-haptics';

const WorkoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const currentWorkout = useSelector(state => state.workout.currentWorkout);
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [selectedWorkoutType, setSelectedWorkoutType] = useState(null);
  const [workoutDuration, setWorkoutDuration] = useState(30);
  const [workoutGoal, setWorkoutGoal] = useState('');

  const workoutTypes = [
    { id: 'running', name: 'Running', icon: 'run', color: '#4CAF50' },
    { id: 'cycling', name: 'Cycling', icon: 'bike', color: '#2196F3' },
    { id: 'swimming', name: 'Swimming', icon: 'swim', color: '#00BCD4' },
    { id: 'strength', name: 'Strength Training', icon: 'dumbbell', color: '#FF9800' },
    { id: 'yoga', name: 'Yoga', icon: 'yoga', color: '#9C27B0' },
    { id: 'walking', name: 'Walking', icon: 'walk', color: '#607D8B' },
    { id: 'hiit', name: 'HIIT', icon: 'lightning-bolt', color: '#F44336' },
    { id: 'pilates', name: 'Pilates', icon: 'human-handsup', color: '#795548' },
  ];

  const durationOptions = [15, 30, 45, 60, 90, 120];

  const handleStartWorkout = () => {
    if (!selectedWorkoutType) {
      Alert.alert('Error', 'Please select a workout type');
      return;
    }

    if (!workoutGoal.trim()) {
      Alert.alert('Error', 'Please set a workout goal');
      return;
    }

    dispatch(startWorkout({
      userId: currentUser.id,
      workoutType: selectedWorkoutType,
      duration: workoutDuration,
      goal: workoutGoal,
    }));

    setShowWorkoutModal(false);
    setSelectedWorkoutType(null);
    setWorkoutGoal('');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleEndWorkout = () => {
    if (currentWorkout) {
      const finalStats = {
        duration: currentWorkout.currentTime || 0,
        calories: currentWorkout.calories || 0,
        distance: currentWorkout.distance || 0,
        averageHeartRate: currentWorkout.heartRate?.length > 0 
          ? currentWorkout.heartRate.reduce((a, b) => a + b, 0) / currentWorkout.heartRate.length 
          : 0,
        totalSteps: currentWorkout.steps || 0,
        averagePace: currentWorkout.pace || 0,
        achievements: currentWorkout.achievements || [],
      };

      dispatch(endWorkout({
        workoutId: currentWorkout.id,
        finalStats,
      }));

      Alert.alert(
        'Workout Complete!',
        `Great job! You burned ${finalStats.calories} calories and worked out for ${Math.floor(finalStats.duration / 60)} minutes.`,
        [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
      );
    }
  };

  const getWorkoutStats = () => {
    if (!currentWorkout) return null;

    return {
      time: currentWorkout.currentTime || 0,
      calories: currentWorkout.calories || 0,
      distance: currentWorkout.distance || 0,
      heartRate: currentWorkout.heartRate?.[currentWorkout.heartRate.length - 1] || 0,
      steps: currentWorkout.steps || 0,
      pace: currentWorkout.pace || 0,
    };
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Workout</Text>
        <Text style={styles.headerSubtitle}>
          {currentWorkout ? 'Track your progress' : 'Choose your workout'}
        </Text>
      </LinearGradient>

      {/* Current Workout */}
      {currentWorkout ? (
        <View style={styles.currentWorkoutContainer}>
          <WorkoutTimer workout={currentWorkout} />
          
          <View style={styles.workoutStats}>
            <Text style={styles.statsTitle}>Live Stats</Text>
            <View style={styles.statsGrid}>
              {Object.entries(getWorkoutStats()).map(([key, value]) => (
                <View key={key} style={styles.statItem}>
                  <Text style={styles.statLabel}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                  <Text style={styles.statValue}>
                    {key === 'time' ? `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, '0')}` :
                     key === 'distance' ? `${value.toFixed(2)} km` :
                     key === 'heartRate' ? `${value} bpm` :
                     key === 'pace' ? `${value} min/km` :
                     value}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.endWorkoutButton}
            onPress={handleEndWorkout}
          >
            <Icon name="stop-circle" size={24} color="white" />
            <Text style={styles.endWorkoutText}>End Workout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Workout Selection */
        <View style={styles.workoutSelection}>
          <Text style={styles.sectionTitle}>Choose Workout Type</Text>
          
          <View style={styles.workoutTypesGrid}>
            {workoutTypes.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.workoutTypeCard,
                  selectedWorkoutType === type.id && styles.selectedWorkoutType
                ]}
                onPress={() => {
                  setSelectedWorkoutType(type.id);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <View style={[styles.workoutIcon, { backgroundColor: type.color }]}>
                  <Icon name={type.icon} size={32} color="white" />
                </View>
                <Text style={styles.workoutTypeName}>{type.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.startWorkoutButton}
            onPress={() => setShowWorkoutModal(true)}
            disabled={!selectedWorkoutType}
          >
            <Text style={styles.startWorkoutText}>Start Workout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Workout Setup Modal */}
      <Modal
        visible={showWorkoutModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Workout Setup</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Duration (minutes)</Text>
              <View style={styles.durationOptions}>
                {durationOptions.map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.durationOption,
                      workoutDuration === duration && styles.selectedDuration
                    ]}
                    onPress={() => setWorkoutDuration(duration)}
                  >
                    <Text style={[
                      styles.durationText,
                      workoutDuration === duration && styles.selectedDurationText
                    ]}>
                      {duration}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Goal</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Run 5km, Burn 300 calories"
                value={workoutGoal}
                onChangeText={setWorkoutGoal}
                multiline
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowWorkoutModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleStartWorkout}
              >
                <Text style={styles.confirmButtonText}>Start</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  currentWorkoutContainer: {
    padding: 16,
  },
  workoutStats: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  endWorkoutButton: {
    backgroundColor: '#F44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  endWorkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  workoutSelection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  workoutTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  workoutTypeCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedWorkoutType: {
    borderWidth: 2,
    borderColor: '#667eea',
  },
  workoutIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  workoutTypeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  startWorkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startWorkoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  durationOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  durationOption: {
    width: '30%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedDuration: {
    backgroundColor: '#667eea',
  },
  durationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  selectedDurationText: {
    color: 'white',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 8,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default WorkoutScreen;
