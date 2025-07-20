import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  RefreshControl,
  Alert,
  Modal
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { fetchUserProfile } from '../store/userSlice';
import StatsCard from '../components/StatsCard';
import WorkoutCard from '../components/WorkoutCard';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, isLoading, achievements } = useSelector(state => state.user);
  const { workoutHistory } = useSelector(state => state.workout);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile(1));
    }
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchUserProfile(1));
    setRefreshing(false);
  };

  const handleBadgePress = (badge) => {
    setSelectedBadge(badge);
    setShowBadgeModal(true);
  };

  const handleSettings = () => {
    Alert.alert('Settings', 'Settings feature coming soon!');
  };

  const handleShareProfile = () => {
    Alert.alert(
      'Share Profile',
      'Share your FitBuddy profile with friends!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log('Share profile') }
      ]
    );
  };

  const handleInviteFriends = () => {
    Alert.alert(
      'Invite Friends',
      'Invite your friends to join FitBuddy and compete together!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Invite', onPress: () => console.log('Invite friends') }
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load profile</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Profile Header */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.profileHeader}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.profileInfo}>
            <Image source={{ uri: user.avatar }} style={styles.profileAvatar} />
            <View style={styles.profileDetails}>
              <Text style={styles.profileName}>{user.name}</Text>
              <Text style={styles.profileLevel}>Level {user.level} • {user.xp} XP</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>
          </View>
          
          <View style={styles.profileActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleShareProfile}>
              <MaterialIcons name="share" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handleSettings}>
              <MaterialIcons name="settings" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Stats Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Stats</Text>
          <View style={styles.statsGrid}>
            <StatsCard
              title="Total Workouts"
              value={user.totalWorkouts}
              subtitle="sessions"
              icon="fitness-center"
              color="#FF6B6B"
            />
            <StatsCard
              title="Calories Burned"
              value={user.totalCalories}
              subtitle="calories"
              icon="local-fire-department"
              color="#4ECDC4"
            />
            <StatsCard
              title="Distance"
              value={user.totalDistance}
              subtitle="distance"
              icon="straighten"
              color="#96CEB4"
            />
            <StatsCard
              title="Active Time"
              value={user.totalTime}
              subtitle="duration"
              icon="timer"
              color="#FFEAA7"
            />
          </View>
        </View>

        {/* Streak Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Streak</Text>
          <View style={styles.streakContainer}>
            <LinearGradient
              colors={['#FF6B6B', '#FF8E8E']}
              style={styles.streakCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.streakInfo}>
                <Text style={styles.streakNumber}>{user.currentStreak}</Text>
                <Text style={styles.streakLabel}>Current Streak</Text>
              </View>
              <View style={styles.streakInfo}>
                <Text style={styles.streakNumber}>{user.longestStreak}</Text>
                <Text style={styles.streakLabel}>Longest Streak</Text>
              </View>
            </LinearGradient>
          </View>
        </View>

        {/* Badges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badgesGrid}>
            {user.badges.map((badge, index) => (
              <TouchableOpacity
                key={badge.id}
                style={[
                  styles.badgeItem,
                  !badge.unlocked && styles.badgeLocked
                ]}
                onPress={() => handleBadgePress(badge)}
              >
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
                <Text style={[
                  styles.badgeName,
                  !badge.unlocked && styles.badgeNameLocked
                ]}>
                  {badge.name}
                </Text>
                {!badge.unlocked && (
                  <MaterialIcons name="lock" size={16} color="#ccc" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        {achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>
            {achievements.slice(0, 3).map((achievement, index) => (
              <View key={achievement.id} style={styles.achievementItem}>
                <View style={styles.achievementIcon}>
                  <MaterialIcons 
                    name={achievement.type === 'level_up' ? 'trending-up' : 'emoji-events'} 
                    size={24} 
                    color="#FF6B6B" 
                  />
                </View>
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                  <Text style={styles.achievementDate}>
                    {new Date(achievement.timestamp).toLocaleDateString()}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Friends */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Friends</Text>
            <TouchableOpacity onPress={handleInviteFriends}>
              <Text style={styles.seeAllText}>Invite</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {user.friends.map((friend, index) => (
              <View key={friend.id} style={styles.friendItem}>
                <Image source={{ uri: friend.avatar }} style={styles.friendAvatar} />
                <Text style={styles.friendName}>{friend.name}</Text>
                <Text style={styles.friendLevel}>Level {friend.level}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Recent Workouts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {workoutHistory.slice(0, 3).map((workout, index) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                style={{ width: 280, marginRight: 16 }}
              />
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Badge Detail Modal */}
      <Modal
        visible={showBadgeModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowBadgeModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedBadge && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Badge Details</Text>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setShowBadgeModal(false)}
                  >
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.badgeDetail}>
                    <Text style={styles.badgeDetailIcon}>{selectedBadge.icon}</Text>
                    <Text style={styles.badgeDetailName}>{selectedBadge.name}</Text>
                    <Text style={styles.badgeDetailStatus}>
                      {selectedBadge.unlocked ? 'Unlocked' : 'Locked'}
                    </Text>
                  </View>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  errorText: {
    fontSize: 16,
    color: '#ff6b6b',
  },
  content: {
    flex: 1,
  },
  profileHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileDetails: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  profileLevel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  profileActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
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
    color: '#2c3e50',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  streakContainer: {
    paddingHorizontal: 20,
  },
  streakCard: {
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  streakInfo: {
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  streakLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 4,
  },
  badgesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  badgeItem: {
    width: '30%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: '1.66%',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  badgeLocked: {
    opacity: 0.5,
  },
  badgeIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  badgeNameLocked: {
    color: '#ccc',
  },
  achievementItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: '#999',
  },
  friendItem: {
    alignItems: 'center',
    marginHorizontal: 12,
    marginBottom: 8,
  },
  friendAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  friendName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
  },
  friendLevel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '80%',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    padding: 20,
    alignItems: 'center',
  },
  badgeDetail: {
    alignItems: 'center',
  },
  badgeDetailIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  badgeDetailName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  badgeDetailStatus: {
    fontSize: 16,
    color: '#666',
  },
});

export default ProfileScreen;
