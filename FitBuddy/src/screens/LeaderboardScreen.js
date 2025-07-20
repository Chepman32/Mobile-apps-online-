import React, { useState, useEffect } from 'react';
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

const LeaderboardScreen = ({ navigation }) => {
  const { user } = useSelector(state => state.user);
  const { challenges } = useSelector(state => state.challenges);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState('global');
  const [timeFilter, setTimeFilter] = useState('week');

  // Mock leaderboard data
  const [leaderboardData, setLeaderboardData] = useState([
    {
      id: 1,
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      level: 18,
      xp: 1850,
      workouts: 52,
      calories: 14200,
      rank: 1,
      isCurrentUser: false
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
      level: 16,
      xp: 1650,
      workouts: 48,
      calories: 13800,
      rank: 2,
      isCurrentUser: false
    },
    {
      id: 3,
      name: 'Alex Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      level: 15,
      xp: 1250,
      workouts: 47,
      calories: 12500,
      rank: 3,
      isCurrentUser: true
    },
    {
      id: 4,
      name: 'Emma Wilson',
      avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
      level: 12,
      xp: 980,
      workouts: 35,
      calories: 9800,
      rank: 4,
      isCurrentUser: false
    },
    {
      id: 5,
      name: 'David Kim',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      level: 14,
      xp: 1150,
      workouts: 42,
      calories: 11200,
      rank: 5,
      isCurrentUser: false
    }
  ]);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleInviteFriends = () => {
    Alert.alert(
      'Invite Friends',
      'Invite your friends to join the leaderboard!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Invite', onPress: () => console.log('Invite friends') }
      ]
    );
  };

  const handleShareRanking = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert(
      'Share Ranking',
      'Share your ranking on social media!',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log('Share ranking') }
      ]
    );
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `#${rank}`;
    }
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return '#FFD700';
      case 2: return '#C0C0C0';
      case 3: return '#CD7F32';
      default: return '#667eea';
    }
  };

  const renderLeaderboardItem = (item, index) => (
    <TouchableOpacity
      key={item.id}
      style={[
        styles.leaderboardItem,
        item.isCurrentUser && styles.currentUserItem
      ]}
      onPress={() => {
        if (item.isCurrentUser) {
          navigation.navigate('Profile');
        }
      }}
    >
      <View style={styles.rankContainer}>
        <Text style={[
          styles.rankText,
          { color: getRankColor(item.rank) }
        ]}>
          {getRankIcon(item.rank)}
        </Text>
      </View>

      <Image source={{ uri: item.avatar }} style={styles.userAvatar} />
      
      <View style={styles.userInfo}>
        <Text style={[
          styles.userName,
          item.isCurrentUser && styles.currentUserName
        ]}>
          {item.name}
          {item.isCurrentUser && ' (You)'}
        </Text>
        <Text style={styles.userLevel}>Level {item.level} • {item.xp} XP</Text>
      </View>

      <View style={styles.userStats}>
        <Text style={styles.statValue}>{item.workouts}</Text>
        <Text style={styles.statLabel}>Workouts</Text>
      </View>

      <View style={styles.userStats}>
        <Text style={styles.statValue}>{item.calories.toLocaleString()}</Text>
        <Text style={styles.statLabel}>Calories</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Leaderboard</Text>
          <TouchableOpacity 
            style={styles.inviteButton}
            onPress={handleInviteFriends}
          >
            <MaterialIcons name="person-add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'global' && styles.activeTabButton
          ]}
          onPress={() => setSelectedTab('global')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'global' && styles.activeTabText
          ]}>
            Global
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'friends' && styles.activeTabButton
          ]}
          onPress={() => setSelectedTab('friends')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'friends' && styles.activeTabText
          ]}>
            Friends
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tabButton,
            selectedTab === 'challenges' && styles.activeTabButton
          ]}
          onPress={() => setSelectedTab('challenges')}
        >
          <Text style={[
            styles.tabText,
            selectedTab === 'challenges' && styles.activeTabText
          ]}>
            Challenges
          </Text>
        </TouchableOpacity>
      </View>

      {/* Time Filter */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['week', 'month', 'year', 'all'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                timeFilter === filter && styles.activeFilterButton
              ]}
              onPress={() => setTimeFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                timeFilter === filter && styles.activeFilterText
              ]}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Current User Highlight */}
        <View style={styles.currentUserSection}>
          <Text style={styles.sectionTitle}>Your Ranking</Text>
          {leaderboardData.filter(item => item.isCurrentUser).map(renderLeaderboardItem)}
        </View>

        {/* Top Performers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Performers</Text>
          {leaderboardData
            .filter(item => !item.isCurrentUser)
            .slice(0, 10)
            .map(renderLeaderboardItem)
          }
        </View>

        {/* Challenge Leaderboards */}
        {selectedTab === 'challenges' && challenges.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Challenge Rankings</Text>
            {challenges.map(challenge => (
              <TouchableOpacity
                key={challenge.id}
                style={styles.challengeCard}
                onPress={() => navigation.navigate('Challenges')}
              >
                <View style={styles.challengeHeader}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeParticipants}>
                    {challenge.participants.length} participants
                  </Text>
                </View>
                
                <View style={styles.challengeProgress}>
                  <View style={styles.progressBar}>
                    <View 
                      style={[
                        styles.progressFill, 
                        { width: `${Math.min((challenge.current / challenge.goal) * 100, 100)}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressText}>
                    {challenge.current} / {challenge.goal}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Share Button */}
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={handleShareRanking}
        >
          <LinearGradient
            colors={['#4CAF50', '#66BB6A']}
            style={styles.shareButtonGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialIcons name="share" size={20} color="white" />
            <Text style={styles.shareButtonText}>Share My Ranking</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  inviteButton: {
    padding: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#667eea',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: 'white',
  },
  filterContainer: {
    backgroundColor: 'white',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    borderRadius: 20,
    backgroundColor: '#f8f9fa',
  },
  activeFilterButton: {
    backgroundColor: '#667eea',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: 'white',
  },
  content: {
    flex: 1,
  },
  currentUserSection: {
    marginVertical: 16,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  currentUserItem: {
    backgroundColor: '#f0f8ff',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  currentUserName: {
    color: '#667eea',
  },
  userLevel: {
    fontSize: 12,
    color: '#666',
  },
  userStats: {
    alignItems: 'center',
    marginLeft: 12,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  statLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  challengeCard: {
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
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  challengeParticipants: {
    fontSize: 12,
    color: '#666',
  },
  challengeProgress: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 6,
    backgroundColor: '#e9ecef',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#667eea',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  shareButton: {
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  shareButtonGradient: {
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default LeaderboardScreen;
