import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const ChallengeCard = ({ challenge, onPress, onJoin, isJoined = false }) => {
  const getProgressPercentage = () => {
    return Math.min((challenge.current / challenge.goal) * 100, 100);
  };

  const getStatusColor = () => {
    const percentage = getProgressPercentage();
    if (percentage >= 100) return ['#4CAF50', '#66BB6A'];
    if (percentage >= 50) return ['#FF9800', '#FFB74D'];
    return ['#F44336', '#EF5350'];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRewardIcon = (reward) => {
    if (reward.type === 'badge') return '🏆';
    if (reward.type === 'xp') return '⭐';
    return '🎁';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <LinearGradient
        colors={getStatusColor()}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{challenge.title}</Text>
            <Text style={styles.description}>{challenge.description}</Text>
          </View>
          <View style={styles.rewardContainer}>
            <Text style={styles.rewardIcon}>{getRewardIcon(challenge.reward)}</Text>
            <Text style={styles.rewardText}>
              {challenge.reward.type === 'badge' ? challenge.reward.name : `${challenge.reward.amount} XP`}
            </Text>
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
            {challenge.current} / {challenge.goal}
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.participants}>
            <Text style={styles.participantsText}>
              {challenge.participants.length} participants
            </Text>
            <View style={styles.avatars}>
              {challenge.participants.slice(0, 3).map((participant, index) => (
                <Image
                  key={participant.id}
                  source={{ uri: participant.avatar }}
                  style={[styles.avatar, { zIndex: 3 - index }]}
                />
              ))}
            </View>
          </View>
          
          <View style={styles.dateContainer}>
            <MaterialIcons name="event" size={16} color="white" />
            <Text style={styles.dateText}>
              {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
            </Text>
          </View>
        </View>

        {!isJoined && (
          <TouchableOpacity style={styles.joinButton} onPress={onJoin}>
            <Text style={styles.joinButtonText}>Join Challenge</Text>
          </TouchableOpacity>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  gradient: {
    padding: 20,
    borderRadius: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
  rewardContainer: {
    alignItems: 'center',
  },
  rewardIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  rewardText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 4,
  },
  progressText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  participants: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  participantsText: {
    color: 'white',
    fontSize: 12,
    marginRight: 8,
  },
  avatars: {
    flexDirection: 'row',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'white',
    marginLeft: -8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
  },
  joinButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 12,
  },
  joinButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ChallengeCard;