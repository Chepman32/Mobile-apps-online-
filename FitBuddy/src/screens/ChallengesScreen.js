import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  RefreshControl,
  Alert,
  Modal
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { fetchChallenges, joinChallenge } from '../store/challengeSlice';
import ChallengeCard from '../components/ChallengeCard';
import StatsCard from '../components/StatsCard';

const ChallengesScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { challenges, userChallenges, isLoading } = useSelector(state => state.challenges);
  const { user } = useSelector(state => state.user);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(fetchChallenges());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchChallenges());
    setRefreshing(false);
  };

  const handleJoinChallenge = (challengeId) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    dispatch(joinChallenge({ challengeId, userId: user?.id || 1 }));
    Alert.alert('Success', 'You have joined the challenge!');
  };

  const handleChallengePress = (challenge) => {
    setSelectedChallenge(challenge);
    setShowModal(true);
  };

  const handleCreateChallenge = () => {
    Alert.alert(
      'Create Challenge',
      'This feature will be available soon!',
      [{ text: 'OK' }]
    );
  };

  const getChallengeStats = () => {
    const totalChallenges = challenges.length;
    const activeChallenges = userChallenges.length;
    const completedChallenges = userChallenges.filter(c => 
      c.current >= c.goal
    ).length;
    const winRate = totalChallenges > 0 ? (completedChallenges / totalChallenges) * 100 : 0;

    return { totalChallenges, activeChallenges, completedChallenges, winRate };
  };

  const stats = getChallengeStats();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Challenges</Text>
          <TouchableOpacity 
            style={styles.createButton}
            onPress={handleCreateChallenge}
          >
            <MaterialIcons name="add" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Challenge Stats */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Challenge Stats</Text>
          <View style={styles.statsGrid}>
            <StatsCard
              title="Active"
              value={stats.activeChallenges}
              subtitle="challenges"
              icon="trending-up"
              color="#4CAF50"
            />
            <StatsCard
              title="Completed"
              value={stats.completedChallenges}
              subtitle="challenges"
              icon="check-circle"
              color="#FF9800"
            />
            <StatsCard
              title="Win Rate"
              value={stats.winRate}
              subtitle="percentage"
              icon="emoji-events"
              color="#9C27B0"
            />
            <StatsCard
              title="Total"
              value={stats.totalChallenges}
              subtitle="challenges"
              icon="list"
              color="#607D8B"
            />
          </View>
        </View>

        {/* Available Challenges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Challenges</Text>
          {challenges.filter(c => !userChallenges.find(uc => uc.id === c.id)).map(challenge => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onPress={() => handleChallengePress(challenge)}
              onJoin={() => handleJoinChallenge(challenge.id)}
              isJoined={false}
            />
          ))}
          {challenges.filter(c => !userChallenges.find(uc => uc.id === c.id)).length === 0 && (
            <View style={styles.emptyState}>
              <MaterialIcons name="emoji-events" size={48} color="#ccc" />
              <Text style={styles.emptyStateText}>No new challenges available</Text>
              <Text style={styles.emptyStateSubtext}>Check back later for new challenges!</Text>
            </View>
          )}
        </View>

        {/* Your Active Challenges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Active Challenges</Text>
          {userChallenges.map(challenge => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              onPress={() => handleChallengePress(challenge)}
              isJoined={true}
            />
          ))}
          {userChallenges.length === 0 && (
            <View style={styles.emptyState}>
              <MaterialIcons name="fitness-center" size={48} color="#ccc" />
              <Text style={styles.emptyStateText}>No active challenges</Text>
              <Text style={styles.emptyStateSubtext}>Join a challenge to get started!</Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Challenge Detail Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedChallenge && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedChallenge.title}</Text>
                  <TouchableOpacity 
                    style={styles.closeButton}
                    onPress={() => setShowModal(false)}
                  >
                    <MaterialIcons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalBody}>
                  <Text style={styles.modalDescription}>
                    {selectedChallenge.description}
                  </Text>

                  <View style={styles.modalStats}>
                    <View style={styles.modalStat}>
                      <Text style={styles.modalStatLabel}>Goal</Text>
                      <Text style={styles.modalStatValue}>{selectedChallenge.goal}</Text>
                    </View>
                    <View style={styles.modalStat}>
                      <Text style={styles.modalStatLabel}>Progress</Text>
                      <Text style={styles.modalStatValue}>{selectedChallenge.current}</Text>
                    </View>
                    <View style={styles.modalStat}>
                      <Text style={styles.modalStatLabel}>Participants</Text>
                      <Text style={styles.modalStatValue}>{selectedChallenge.participants.length}</Text>
                    </View>
                  </View>

                  <View style={styles.progressContainer}>
                    <View style={styles.progressBar}>
                      <View 
                        style={[
                          styles.progressFill, 
                          { width: `${Math.min((selectedChallenge.current / selectedChallenge.goal) * 100, 100)}%` }
                        ]} 
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {selectedChallenge.current} / {selectedChallenge.goal}
                    </Text>
                  </View>

                  <View style={styles.rewardContainer}>
                    <Text style={styles.rewardTitle}>Reward</Text>
                    <View style={styles.rewardItem}>
                      <Text style={styles.rewardIcon}>
                        {selectedChallenge.reward.type === 'badge' ? '🏆' : '⭐'}
                      </Text>
                      <Text style={styles.rewardText}>
                        {selectedChallenge.reward.type === 'badge' 
                          ? selectedChallenge.reward.name 
                          : `${selectedChallenge.reward.amount} XP`
                        }
                      </Text>
                    </View>
                  </View>

                  <View style={styles.participantsContainer}>
                    <Text style={styles.participantsTitle}>Participants</Text>
                    {selectedChallenge.participants.map((participant, index) => (
                      <View key={participant.id} style={styles.participantItem}>
                        <Text style={styles.participantRank}>#{index + 1}</Text>
                        <Text style={styles.participantName}>{participant.name}</Text>
                        <Text style={styles.participantProgress}>
                          {participant.progress} / {selectedChallenge.goal}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>

                <View style={styles.modalFooter}>
                  {!userChallenges.find(uc => uc.id === selectedChallenge.id) ? (
                    <TouchableOpacity 
                      style={styles.joinModalButton}
                      onPress={() => {
                        handleJoinChallenge(selectedChallenge.id);
                        setShowModal(false);
                      }}
                    >
                      <LinearGradient
                        colors={['#4CAF50', '#66BB6A']}
                        style={styles.joinModalButtonGradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      >
                        <Text style={styles.joinModalButtonText}>Join Challenge</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity 
                      style={styles.viewLeaderboardButton}
                      onPress={() => {
                        setShowModal(false);
                        navigation.navigate('Leaderboard');
                      }}
                    >
                      <Text style={styles.viewLeaderboardButtonText}>View Leaderboard</Text>
                    </TouchableOpacity>
                  )}
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
  createButton: {
    padding: 8,
  },
  content: {
    flex: 1,
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  emptyStateText: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
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
    width: '90%',
    maxHeight: '80%',
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
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  modalStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  modalStat: {
    alignItems: 'center',
  },
  modalStatLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  modalStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  progressContainer: {
    marginBottom: 20,
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
  rewardContainer: {
    marginBottom: 20,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  rewardIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  rewardText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  participantsContainer: {
    marginBottom: 20,
  },
  participantsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  participantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  participantRank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#667eea',
    width: 40,
  },
  participantName: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
  },
  participantProgress: {
    fontSize: 14,
    color: '#666',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  joinModalButton: {
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  joinModalButtonGradient: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  joinModalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewLeaderboardButton: {
    backgroundColor: '#667eea',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  viewLeaderboardButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChallengesScreen;
