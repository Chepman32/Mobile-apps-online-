import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Image,
  RefreshControl,
  Alert
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { fetchUserProfile, fetchChallenges } from '../store/userSlice';
import { fetchChallenges as fetchChallengesAction } from '../store/challengeSlice';
import WorkoutCard from '../components/WorkoutCard';
import ChallengeCard from '../components/ChallengeCard';
import StatsCard from '../components/StatsCard';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, isLoading, currentWorkout } = useSelector(state => state.user);
  const { challenges, userChallenges } = useSelector(state => state.challenges);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile(1)); // Simulate user ID 1
    }
    dispatch(fetchChallengesAction());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([
      dispatch(fetchUserProfile(1)),
      dispatch(fetchChallengesAction())
    ]);
    setRefreshing(false);
  };

  const handleStartWorkout = (type) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Workout', { type });
  };

  const handleInviteFriends = () => {
    Alert.alert(
      'Invite Friends',
      'Share FitBuddy with your friends and start competing together!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log('Share pressed') }
      ]
    );
  };

  const handleChallengePress = (challenge) => {
    navigation.navigate('Challenges', { challengeId: challenge.id });
  };

  const handleJoinChallenge = (challengeId) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Dispatch join challenge action
    console.log('Joining challenge:', challengeId);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading your fitness journey...</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load user data</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <View style={styles.userInfo}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <View style={styles.userText}>
              <Text style={styles.greeting}>Good morning, {user.name.split(' ')[0]}!</Text>
              <Text style={styles.level}>Level {user.level} • {user.xp} XP</Text>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.notificationButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <MaterialIcons name="notifications" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleStartWorkout('running')}
        >
          <LinearGradient
            colors={['#FF6B6B', '#FF8E8E']}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.actionIcon}>🏃</Text>
            <Text style={styles.actionText}>Start Run</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleStartWorkout('strength')}
        >
          <LinearGradient
            colors={['#96CEB4', '#B8E0C8']}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.actionIcon}>💪</Text>
            <Text style={styles.actionText}>Workout</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={handleInviteFriends}
        >
          <LinearGradient
            colors={['#4ECDC4', '#6EE7DF']}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.actionIcon}>👥</Text>
            <Text style={styles.actionText}>Invite</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Weekly Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Weekly Progress</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${(user.weeklyProgress / user.weeklyGoal) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {user.weeklyProgress} / {user.weeklyGoal} minutes
          </Text>
        </View>
      </View>

      {/* Stats Grid */}
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

      {/* Current Challenges */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Active Challenges</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Challenges')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {userChallenges.length > 0 ? (
          userChallenges.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onPress={() => handleChallengePress(challenge)}
              onJoin={() => handleJoinChallenge(challenge.id)}
              isJoined={true}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No active challenges</Text>
            <TouchableOpacity 
              style={styles.joinChallengeButton}
              onPress={() => navigation.navigate('Challenges')}
            >
              <Text style={styles.joinChallengeButtonText}>Join a Challenge</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Recent Workouts */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Workouts</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {/* Mock recent workouts */}
          <WorkoutCard
            workout={{
              type: 'running',
              duration: 45,
              calories: 320,
              distance: 5.2,
              date: '2024-01-21T08:30:00Z'
            }}
            style={{ width: 280 }}
          />
          <WorkoutCard
            workout={{
              type: 'strength',
              duration: 30,
              calories: 180,
              distance: 0,
              date: '2024-01-20T19:00:00Z'
            }}
            style={{ width: 280 }}
          />
        </ScrollView>
      </View>
    </ScrollView>
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userText: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  level: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  notificationButton: {
    padding: 8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  actionGradient: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
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
  progressContainer: {
    paddingHorizontal: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  joinChallengeButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  joinChallengeButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;
