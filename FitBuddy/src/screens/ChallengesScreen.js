import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Modal,
  TextInput,
  Alert,
  RefreshControl 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createChallenge, fetchChallenges } from '../store/challengeSlice';
import ChallengeCard from '../components/ChallengeCard';
import * as Haptics from 'expo-haptics';

const ChallengesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const challenges = useSelector(state => state.challenges.challenges);
  const loading = useSelector(state => state.challenges.loading);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedChallengeType, setSelectedChallengeType] = useState(null);
  const [challengeTitle, setChallengeTitle] = useState('');
  const [challengeDescription, setChallengeDescription] = useState('');
  const [challengeGoal, setChallengeGoal] = useState('');
  const [challengeDuration, setChallengeDuration] = useState(7);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchChallenges(currentUser.id));
    }
  }, [dispatch, currentUser]);

  const challengeTypes = [
    { id: 'running', name: 'Running', icon: 'run', color: '#4CAF50' },
    { id: 'cycling', name: 'Cycling', icon: 'bike', color: '#2196F3' },
    { id: 'swimming', name: 'Swimming', icon: 'swim', color: '#00BCD4' },
    { id: 'strength', name: 'Strength Training', icon: 'dumbbell', color: '#FF9800' },
    { id: 'yoga', name: 'Yoga', icon: 'yoga', color: '#9C27B0' },
    { id: 'walking', name: 'Walking', icon: 'walk', color: '#607D8B' },
  ];

  const durationOptions = [3, 7, 14, 30];

  const handleCreateChallenge = () => {
    if (!selectedChallengeType) {
      Alert.alert('Error', 'Please select a challenge type');
      return;
    }

    if (!challengeTitle.trim()) {
      Alert.alert('Error', 'Please enter a challenge title');
      return;
    }

    if (!challengeGoal.trim()) {
      Alert.alert('Error', 'Please set a challenge goal');
      return;
    }

    dispatch(createChallenge({
      title: challengeTitle,
      description: challengeDescription,
      goal: challengeGoal,
      type: selectedChallengeType,
      duration: challengeDuration,
      participants: [{ id: currentUser.id, name: currentUser.name, progress: 0 }],
    }));

    setShowCreateModal(false);
    setSelectedChallengeType(null);
    setChallengeTitle('');
    setChallengeDescription('');
    setChallengeGoal('');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const onRefresh = () => {
    if (currentUser) {
      dispatch(fetchChallenges(currentUser.id));
    }
  };

  const getMyChallenges = () => {
    return challenges.filter(challenge => 
      challenge.participants?.some(p => p.id === currentUser?.id)
    );
  };

  const getAvailableChallenges = () => {
    return challenges.filter(challenge => 
      !challenge.participants?.some(p => p.id === currentUser?.id)
    );
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Challenges</Text>
        <Text style={styles.headerSubtitle}>Compete with friends</Text>
        
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => setShowCreateModal(true)}
        >
          <Icon name="plus" size={24} color="white" />
          <Text style={styles.createButtonText}>Create Challenge</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* My Challenges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>My Challenges</Text>
        {getMyChallenges().length > 0 ? (
          getMyChallenges().map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onPress={() => navigation.navigate('ChallengeDetail', { challenge })}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="trophy-outline" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No challenges yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Create or join a challenge to get started
            </Text>
          </View>
        )}
      </View>

      {/* Available Challenges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Challenges</Text>
        {getAvailableChallenges().length > 0 ? (
          getAvailableChallenges().map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onPress={() => navigation.navigate('ChallengeDetail', { challenge })}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Icon name="account-group-outline" size={48} color="#ccc" />
            <Text style={styles.emptyStateText}>No available challenges</Text>
            <Text style={styles.emptyStateSubtext}>
              Create a new challenge to invite friends
            </Text>
          </View>
        )}
      </View>

      {/* Create Challenge Modal */}
      <Modal
        visible={showCreateModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create Challenge</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Challenge Type</Text>
              <View style={styles.challengeTypesGrid}>
                {challengeTypes.map((type) => (
                  <TouchableOpacity
                    key={type.id}
                    style={[
                      styles.challengeTypeCard,
                      selectedChallengeType === type.id && styles.selectedChallengeType
                    ]}
                    onPress={() => {
                      setSelectedChallengeType(type.id);
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }}
                  >
                    <View style={[styles.challengeTypeIcon, { backgroundColor: type.color }]}>
                      <Icon name={type.icon} size={24} color="white" />
                    </View>
                    <Text style={styles.challengeTypeName}>{type.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., 30-Day Running Challenge"
                value={challengeTitle}
                onChangeText={setChallengeTitle}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={[styles.textInput, { minHeight: 80 }]}
                placeholder="Describe your challenge..."
                value={challengeDescription}
                onChangeText={setChallengeDescription}
                multiline
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Goal</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., Run 100km, Burn 5000 calories"
                value={challengeGoal}
                onChangeText={setChallengeGoal}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Duration (days)</Text>
              <View style={styles.durationOptions}>
                {durationOptions.map((duration) => (
                  <TouchableOpacity
                    key={duration}
                    style={[
                      styles.durationOption,
                      challengeDuration === duration && styles.selectedDuration
                    ]}
                    onPress={() => setChallengeDuration(duration)}
                  >
                    <Text style={[
                      styles.durationText,
                      challengeDuration === duration && styles.selectedDurationText
                    ]}>
                      {duration}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowCreateModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleCreateChallenge}
              >
                <Text style={styles.confirmButtonText}>Create</Text>
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
    marginBottom: 20,
  },
  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginTop: 12,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
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
    maxHeight: '80%',
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
  challengeTypesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  challengeTypeCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedChallengeType: {
    backgroundColor: '#667eea',
  },
  challengeTypeIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  challengeTypeName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  durationOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  durationOption: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
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

export default ChallengesScreen;
