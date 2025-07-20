import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { joinChallenge } from '../store/challengeSlice';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ChallengeCard = ({ challenge, onPress }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user.currentUser);
  const isParticipant = challenge.participants?.some(p => p.id === currentUser?.id);

  const handleJoinChallenge = () => {
    if (!isParticipant && currentUser) {
      dispatch(joinChallenge({
        challengeId: challenge.id,
        userId: currentUser.id,
        userName: currentUser.name,
      }));
    }
  };

  const getProgressPercentage = () => {
    if (!challenge.participants || challenge.participants.length === 0) return 0;
    const totalProgress = challenge.participants.reduce((sum, p) => sum + (p.progress || 0), 0);
    return Math.floor((totalProgress / challenge.participants.length / challenge.goal) * 100);
  };

  const getTimeRemaining = () => {
    const endDate = new Date(challenge.endDate);
    const now = new Date();
    const diff = endDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h`;
    return 'Ending soon';
  };

  const getChallengeIcon = () => {
    switch (challenge.type) {
      case 'running': return 'run';
      case 'cycling': return 'bike';
      case 'swimming': return 'swim';
      case 'strength': return 'dumbbell';
      case 'yoga': return 'yoga';
      default: return 'trophy';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.gradient}
      >
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Icon name={getChallengeIcon()} size={24} color="white" />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{challenge.title}</Text>
            <Text style={styles.description}>{challenge.description}</Text>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              {isParticipant ? 'JOINED' : 'JOIN'}
            </Text>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <View style={styles.detailItem}>
            <Icon name="target" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.detailText}>Goal: {challenge.goal}</Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon name="account-group" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.detailText}>
              {challenge.totalParticipants || 0} participants
            </Text>
          </View>
          
          <View style={styles.detailItem}>
            <Icon name="clock-outline" size={16} color="rgba(255,255,255,0.8)" />
            <Text style={styles.detailText}>{getTimeRemaining()}</Text>
          </View>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${getProgressPercentage()}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {getProgressPercentage()}% Complete
          </Text>
        </View>

        {!isParticipant && (
          <TouchableOpacity
            style={styles.joinButton}
            onPress={handleJoinChallenge}
          >
            <Text style={styles.joinButtonText}>Join Challenge</Text>
          </TouchableOpacity>
        )}

        {challenge.leaderboard && challenge.leaderboard.length > 0 && (
          <View style={styles.leaderboardPreview}>
            <Text style={styles.leaderboardTitle}>Top 3</Text>
            {challenge.leaderboard.slice(0, 3).map((participant, index) => (
              <View key={participant.id} style={styles.leaderboardItem}>
                <Text style={styles.rankText}>#{index + 1}</Text>
                <Text style={styles.participantName}>{participant.name}</Text>
                <Text style={styles.participantProgress}>{participant.progress || 0}</Text>
              </View>
            ))}
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  gradient: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  statusContainer: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
  detailsContainer: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 8,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  leaderboardPreview: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 12,
  },
  leaderboardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFD700',
    width: 30,
  },
  participantName: {
    flex: 1,
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  participantProgress: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ChallengeCard;