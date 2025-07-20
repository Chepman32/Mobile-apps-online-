import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl,
  Dimensions 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchChallenges } from '../store/challengeSlice';
import { fetchUserWorkouts } from '../store/workoutSlice';
import WorkoutTimer from '../components/WorkoutTimer';
import ChallengeCard from '../components/ChallengeCard';
import BadgeCard from '../components/BadgeCard';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const challenges = useSelector(state => state.challenges.challenges);
  const workoutStats = useSelector(state => state.workout.stats);
  const currentWorkout = useSelector(state => state.workout.currentWorkout);
  const loading = useSelector(state => state.challenges.loading);

  useEffect(() => {
    if (currentUser) {
      dispatch(fetchChallenges(currentUser.id));
      dispatch(fetchUserWorkouts(currentUser.id));
    }
  }, [dispatch, currentUser]);

  const onRefresh = () => {
    if (currentUser) {
      dispatch(fetchChallenges(currentUser.id));
      dispatch(fetchUserWorkouts(currentUser.id));
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getQuickActions = () => [
    {
      title: 'Start Workout',
      icon: 'play-circle',
      color: '#4CAF50',
      onPress: () => navigation.navigate('Workout'),
    },
    {
      title: 'Join Challenge',
      icon: 'trophy',
      color: '#FF9800',
      onPress: () => navigation.navigate('Challenges'),
    },
    {
      title: 'View Leaderboard',
      icon: 'chart-line',
      color: '#2196F3',
      onPress: () => navigation.navigate('Leaderboard'),
    },
    {
      title: 'Invite Friends',
      icon: 'account-plus',
      color: '#9C27B0',
      onPress: () => navigation.navigate('Profile'),
    },
  ];

  const getRecentBadges = () => [
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
  ];

  if (!currentUser) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Please sign in to continue</Text>
      </View>
    );
  }

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
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.userName}>{currentUser.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Icon name="account-circle" size={40} color="white" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentUser.totalWorkouts}</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentUser.currentStreak}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{currentUser.level}</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Current Workout */}
      {currentWorkout && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Workout</Text>
          <WorkoutTimer workout={currentWorkout} />
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {getQuickActions().map((action, index) => (
            <TouchableOpacity
              key={index}
              style={styles.quickActionButton}
              onPress={action.onPress}
            >
              <View style={[styles.actionIcon, { backgroundColor: action.color }]}>
                <Icon name={action.icon} size={24} color="white" />
              </View>
              <Text style={styles.actionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Daily Challenges */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Daily Challenges</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Challenges')}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        {challenges.slice(0, 2).map((challenge) => (
          <ChallengeCard
            key={challenge.id}
            challenge={challenge}
            onPress={() => navigation.navigate('Challenges')}
          />
        ))}
      </View>

      {/* Recent Badges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Badges</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {getRecentBadges().map((badge) => (
            <BadgeCard
              key={badge.id}
              badge={badge}
              isUnlocked={badge.isUnlocked}
              onPress={() => navigation.navigate('Profile')}
            />
          ))}
        </ScrollView>
      </View>

      {/* Workout Stats */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>This Week's Progress</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Icon name="fire" size={24} color="#FF5722" />
            <Text style={styles.statCardValue}>{workoutStats.totalCalories}</Text>
            <Text style={styles.statCardLabel}>Calories</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="map-marker-distance" size={24} color="#2196F3" />
            <Text style={styles.statCardValue}>{workoutStats.totalDistance.toFixed(1)}</Text>
            <Text style={styles.statCardLabel}>Distance (km)</Text>
          </View>
          <View style={styles.statCard}>
            <Icon name="clock-outline" size={24} color="#4CAF50" />
            <Text style={styles.statCardValue}>{Math.floor(workoutStats.totalTime / 60)}</Text>
            <Text style={styles.statCardLabel}>Minutes</Text>
          </View>
        </View>
      </View>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileButton: {
    padding: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
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
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '600',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  quickActionButton: {
    width: (width - 60) / 2,
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
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  statCardLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
    color: '#666',
  },
});

export default HomeScreen;
