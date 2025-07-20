import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  Modal,
  TextInput,
  Alert 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateUserProfile, signOutUser } from '../store/userSlice';
import BadgeCard from '../components/BadgeCard';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const workoutStats = useSelector(state => state.workout.stats);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    if (currentUser) {
      setEditName(currentUser.name);
      setEditEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleUpdateProfile = () => {
    if (!editName.trim()) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }

    dispatch(updateUserProfile({
      userId: currentUser.id,
      updates: {
        name: editName.trim(),
        email: editEmail.trim(),
      },
    }));

    setShowEditModal(false);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: () => dispatch(signOutUser()) },
      ]
    );
  };

  const handleShareProfile = async () => {
    const shareText = `Check out my FitBuddy profile! I've completed ${currentUser.totalWorkouts} workouts and burned ${currentUser.totalCalories} calories!`;
    
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(shareText);
    }
  };

  const getAllBadges = () => [
    {
      id: '1',
      title: 'First Workout',
      description: 'Complete your first workout',
      type: 'workouts',
      rarity: 'common',
      isUnlocked: currentUser?.totalWorkouts > 0,
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintain a 7-day streak',
      type: 'streak',
      rarity: 'rare',
      isUnlocked: currentUser?.currentStreak >= 7,
      progress: {
        current: currentUser?.currentStreak || 0,
        target: 7,
      },
    },
    {
      id: '3',
      title: 'Calorie Burner',
      description: 'Burn 1000 total calories',
      type: 'calories',
      rarity: 'epic',
      isUnlocked: (currentUser?.totalCalories || 0) >= 1000,
      progress: {
        current: currentUser?.totalCalories || 0,
        target: 1000,
      },
    },
    {
      id: '4',
      title: 'Distance Runner',
      description: 'Run 50km total',
      type: 'distance',
      rarity: 'rare',
      isUnlocked: (currentUser?.totalDistance || 0) >= 50,
      progress: {
        current: currentUser?.totalDistance || 0,
        target: 50,
      },
    },
    {
      id: '5',
      title: 'Social Butterfly',
      description: 'Join 5 challenges',
      type: 'social',
      rarity: 'epic',
      isUnlocked: false,
      progress: {
        current: 0,
        target: 5,
      },
    },
    {
      id: '6',
      title: 'Legendary Athlete',
      description: 'Complete 100 workouts',
      type: 'workouts',
      rarity: 'legendary',
      isUnlocked: (currentUser?.totalWorkouts || 0) >= 100,
      progress: {
        current: currentUser?.totalWorkouts || 0,
        target: 100,
      },
    },
  ];

  const getLevelProgress = () => {
    const experience = currentUser?.experience || 0;
    const level = currentUser?.level || 1;
    const experienceForNextLevel = level * 100;
    const progress = (experience % experienceForNextLevel) / experienceForNextLevel * 100;
    return progress;
  };

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Please sign in to view profile</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {currentUser.avatar ? (
              <Image source={{ uri: currentUser.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="account" size={40} color="white" />
              </View>
            )}
            <TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="camera" size={16} color="white" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{currentUser.name}</Text>
            <Text style={styles.userEmail}>{currentUser.email}</Text>
            
            <View style={styles.levelContainer}>
              <Text style={styles.levelText}>Level {currentUser.level}</Text>
              <View style={styles.levelProgressBar}>
                <View 
                  style={[styles.levelProgressFill, { width: `${getLevelProgress()}%` }]} 
                />
              </View>
              <Text style={styles.experienceText}>
                {currentUser.experience} XP
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Icon name="fire" size={24} color="#FF5722" />
          <Text style={styles.statValue}>{currentUser.totalCalories}</Text>
          <Text style={styles.statLabel}>Calories Burned</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="map-marker-distance" size={24} color="#2196F3" />
          <Text style={styles.statValue}>{currentUser.totalDistance?.toFixed(1) || 0}</Text>
          <Text style={styles.statLabel}>Distance (km)</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="clock-outline" size={24} color="#4CAF50" />
          <Text style={styles.statValue}>{Math.floor((currentUser.totalTime || 0) / 60)}</Text>
          <Text style={styles.statLabel}>Minutes</Text>
        </View>
        
        <View style={styles.statCard}>
          <Icon name="trophy" size={24} color="#FF9800" />
          <Text style={styles.statValue}>{currentUser.currentStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      {/* Badges */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Badges & Achievements</Text>
          <Text style={styles.badgeCount}>
            {getAllBadges().filter(badge => badge.isUnlocked).length}/{getAllBadges().length}
          </Text>
        </View>
        
        <View style={styles.badgesGrid}>
          {getAllBadges().map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              isUnlocked={badge.isUnlocked}
              onPress={() => {}}
            />
          ))}
        </View>
      </View>

      {/* Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowEditModal(true)}
        >
          <Icon name="account-edit" size={24} color="#667eea" />
          <Text style={styles.actionText}>Edit Profile</Text>
          <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleShareProfile}
        >
          <Icon name="share-variant" size={24} color="#4CAF50" />
          <Text style={styles.actionText}>Share Profile</Text>
          <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Settings')}
        >
          <Icon name="cog" size={24} color="#FF9800" />
          <Text style={styles.actionText}>Settings</Text>
          <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleSignOut}
        >
          <Icon name="logout" size={24} color="#F44336" />
          <Text style={[styles.actionText, { color: '#F44336' }]}>Sign Out</Text>
          <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditModal}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput
                style={styles.textInput}
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter your name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={editEmail}
                onChangeText={setEditEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleUpdateProfile}
              >
                <Text style={styles.confirmButtonText}>Save</Text>
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
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#667eea',
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 12,
  },
  levelContainer: {
    marginTop: 8,
  },
  levelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  levelProgressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  levelProgressFill: {
    height: '100%',
    backgroundColor: '#FFD700',
    borderRadius: 3,
  },
  experienceText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  statsSection: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: -20,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  badgeCount: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
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
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
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
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
    color: '#666',
  },
});

export default ProfileScreen;
