import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  FlatList,
  Image 
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

const LeaderboardScreen = ({ navigation }) => {
  const currentUser = useSelector(state => state.user.currentUser);
  const [selectedCategory, setSelectedCategory] = useState('overall');
  const [timeFilter, setTimeFilter] = useState('week');

  const categories = [
    { id: 'overall', name: 'Overall', icon: 'trophy' },
    { id: 'calories', name: 'Calories', icon: 'fire' },
    { id: 'distance', name: 'Distance', icon: 'map-marker-distance' },
    { id: 'streak', name: 'Streak', icon: 'lightning-bolt' },
    { id: 'workouts', name: 'Workouts', icon: 'dumbbell' },
  ];

  const timeFilters = [
    { id: 'week', name: 'This Week' },
    { id: 'month', name: 'This Month' },
    { id: 'year', name: 'This Year' },
    { id: 'all', name: 'All Time' },
  ];

  // Mock leaderboard data - in real app, this would come from Firebase
  const getLeaderboardData = () => {
    const mockUsers = [
      {
        id: '1',
        name: 'Alex Johnson',
        avatar: null,
        rank: 1,
        score: 1250,
        unit: selectedCategory === 'calories' ? 'cal' : selectedCategory === 'distance' ? 'km' : '',
        streak: 15,
        workouts: 28,
      },
      {
        id: '2',
        name: 'Sarah Chen',
        avatar: null,
        rank: 2,
        score: 1180,
        unit: selectedCategory === 'calories' ? 'cal' : selectedCategory === 'distance' ? 'km' : '',
        streak: 12,
        workouts: 25,
      },
      {
        id: '3',
        name: 'Mike Rodriguez',
        avatar: null,
        rank: 3,
        score: 1100,
        unit: selectedCategory === 'calories' ? 'cal' : selectedCategory === 'distance' ? 'km' : '',
        streak: 10,
        workouts: 22,
      },
      {
        id: '4',
        name: 'Emma Wilson',
        avatar: null,
        rank: 4,
        score: 1050,
        unit: selectedCategory === 'calories' ? 'cal' : selectedCategory === 'distance' ? 'km' : '',
        streak: 8,
        workouts: 20,
      },
      {
        id: '5',
        name: 'David Kim',
        avatar: null,
        rank: 5,
        score: 980,
        unit: selectedCategory === 'calories' ? 'cal' : selectedCategory === 'distance' ? 'km' : '',
        streak: 7,
        workouts: 18,
      },
    ];

    // Add current user if not in top 5
    if (currentUser && !mockUsers.find(user => user.id === currentUser.id)) {
      const userScore = selectedCategory === 'calories' ? currentUser.totalCalories :
                       selectedCategory === 'distance' ? currentUser.totalDistance :
                       selectedCategory === 'streak' ? currentUser.currentStreak :
                       selectedCategory === 'workouts' ? currentUser.totalWorkouts :
                       currentUser.totalCalories; // overall

      mockUsers.push({
        id: currentUser.id,
        name: currentUser.name,
        avatar: currentUser.avatar,
        rank: mockUsers.length + 1,
        score: userScore,
        unit: selectedCategory === 'calories' ? 'cal' : selectedCategory === 'distance' ? 'km' : '',
        streak: currentUser.currentStreak,
        workouts: currentUser.totalWorkouts,
        isCurrentUser: true,
      });
    }

    return mockUsers.sort((a, b) => b.score - a.score);
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return { name: 'trophy', color: '#FFD700' };
      case 2: return { name: 'medal', color: '#C0C0C0' };
      case 3: return { name: 'medal', color: '#CD7F32' };
      default: return null;
    }
  };

  const renderLeaderboardItem = ({ item, index }) => {
    const rankIcon = getRankIcon(item.rank);
    const isCurrentUser = item.isCurrentUser;

    return (
      <TouchableOpacity
        style={[
          styles.leaderboardItem,
          isCurrentUser && styles.currentUserItem
        ]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          // Navigate to user profile
        }}
      >
        <View style={styles.rankContainer}>
          {rankIcon ? (
            <Icon name={rankIcon.name} size={24} color={rankIcon.color} />
          ) : (
            <Text style={styles.rankText}>#{item.rank}</Text>
          )}
        </View>

        <View style={styles.userInfo}>
          <View style={styles.avatarContainer}>
            {item.avatar ? (
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Icon name="account" size={20} color="#666" />
              </View>
            )}
          </View>
          
          <View style={styles.userDetails}>
            <Text style={[styles.userName, isCurrentUser && styles.currentUserName]}>
              {item.name}
            </Text>
            <View style={styles.userStats}>
              <Text style={styles.userStat}>
                {item.streak} day streak
              </Text>
              <Text style={styles.userStat}>
                {item.workouts} workouts
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.scoreContainer}>
          <Text style={[styles.scoreText, isCurrentUser && styles.currentUserScore]}>
            {item.score}{item.unit}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <Text style={styles.headerSubtitle}>See how you rank</Text>
      </LinearGradient>

      {/* Category Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              selectedCategory === category.id && styles.selectedCategoryTab
            ]}
            onPress={() => {
              setSelectedCategory(category.id);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Icon 
              name={category.icon} 
              size={20} 
              color={selectedCategory === category.id ? 'white' : '#667eea'} 
            />
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.selectedCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Time Filter */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.timeFilter}
      >
        {timeFilters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.timeFilterTab,
              timeFilter === filter.id && styles.selectedTimeFilter
            ]}
            onPress={() => {
              setTimeFilter(filter.id);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Text style={[
              styles.timeFilterText,
              timeFilter === filter.id && styles.selectedTimeFilterText
            ]}>
              {filter.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Current User Position */}
      {currentUser && (
        <View style={styles.currentUserCard}>
          <View style={styles.currentUserHeader}>
            <Icon name="account-circle" size={20} color="#667eea" />
            <Text style={styles.currentUserTitle}>Your Position</Text>
          </View>
          
          <View style={styles.currentUserStats}>
            <View style={styles.currentUserStat}>
              <Text style={styles.currentUserStatLabel}>Rank</Text>
              <Text style={styles.currentUserStatValue}>
                #{getLeaderboardData().findIndex(user => user.id === currentUser.id) + 1}
              </Text>
            </View>
            
            <View style={styles.currentUserStat}>
              <Text style={styles.currentUserStatLabel}>Score</Text>
              <Text style={styles.currentUserStatValue}>
                {selectedCategory === 'calories' ? currentUser.totalCalories :
                 selectedCategory === 'distance' ? currentUser.totalDistance?.toFixed(1) :
                 selectedCategory === 'streak' ? currentUser.currentStreak :
                 selectedCategory === 'workouts' ? currentUser.totalWorkouts :
                 currentUser.totalCalories}
                {selectedCategory === 'calories' ? ' cal' : 
                 selectedCategory === 'distance' ? ' km' : ''}
              </Text>
            </View>
            
            <View style={styles.currentUserStat}>
              <Text style={styles.currentUserStatLabel}>Streak</Text>
              <Text style={styles.currentUserStatValue}>
                {currentUser.currentStreak} days
              </Text>
            </View>
          </View>
        </View>
      )}

      {/* Leaderboard List */}
      <View style={styles.leaderboardContainer}>
        <Text style={styles.leaderboardTitle}>Top Performers</Text>
        
        <FlatList
          data={getLeaderboardData()}
          renderItem={renderLeaderboardItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.leaderboardList}
        />
      </View>

      {/* Invite Friends */}
      <TouchableOpacity
        style={styles.inviteButton}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          // Share invite link
        }}
      >
        <Icon name="account-plus" size={24} color="white" />
        <Text style={styles.inviteButtonText}>Invite Friends</Text>
      </TouchableOpacity>
    </View>
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
  categoryTabs: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  selectedCategoryTab: {
    backgroundColor: '#667eea',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#667eea',
    marginLeft: 6,
  },
  selectedCategoryText: {
    color: 'white',
  },
  timeFilter: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  timeFilterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
  },
  selectedTimeFilter: {
    backgroundColor: '#667eea',
    borderRadius: 16,
  },
  timeFilterText: {
    fontSize: 14,
    color: '#666',
  },
  selectedTimeFilterText: {
    color: 'white',
    fontWeight: '600',
  },
  currentUserCard: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  currentUserHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  currentUserTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  currentUserStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  currentUserStat: {
    alignItems: 'center',
  },
  currentUserStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  currentUserStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#667eea',
  },
  leaderboardContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  leaderboardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  leaderboardList: {
    paddingBottom: 16,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  currentUserItem: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    marginHorizontal: -8,
    paddingHorizontal: 8,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  avatarPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  currentUserName: {
    color: '#667eea',
  },
  userStats: {
    flexDirection: 'row',
  },
  userStat: {
    fontSize: 12,
    color: '#666',
    marginRight: 12,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  currentUserScore: {
    color: '#667eea',
  },
  inviteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inviteButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default LeaderboardScreen;
