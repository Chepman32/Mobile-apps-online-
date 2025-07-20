import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Haptics from 'expo-haptics';

const BadgeCard = ({ badge, isUnlocked = false, onPress }) => {
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const opacityAnim = useRef(new Animated.Value(0.6)).current;

  useEffect(() => {
    if (isUnlocked) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          tension: 100,
          friction: 8,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]).start();
      
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, [isUnlocked, scaleAnim, opacityAnim]);

  const getBadgeIcon = () => {
    switch (badge.type) {
      case 'streak': return 'fire';
      case 'distance': return 'map-marker-distance';
      case 'calories': return 'lightning-bolt';
      case 'workouts': return 'dumbbell';
      case 'challenge': return 'trophy';
      case 'social': return 'account-group';
      case 'strength': return 'arm-flex';
      case 'endurance': return 'heart-pulse';
      default: return 'star';
    }
  };

  const getBadgeColors = () => {
    switch (badge.rarity) {
      case 'common': return ['#4CAF50', '#45a049'];
      case 'rare': return ['#2196F3', '#1976D2'];
      case 'epic': return ['#9C27B0', '#7B1FA2'];
      case 'legendary': return ['#FF9800', '#F57C00'];
      default: return ['#757575', '#616161'];
    }
  };

  const getBadgeGlow = () => {
    if (badge.rarity === 'legendary') {
      return {
        shadowColor: '#FF9800',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 8,
      };
    }
    return {};
  };

  return (
    <TouchableOpacity
      style={[styles.container, getBadgeGlow()]}
      onPress={onPress}
      disabled={!isUnlocked}
    >
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            transform: [{ scale: scaleAnim }],
            opacity: opacityAnim,
          },
        ]}
      >
        <LinearGradient
          colors={isUnlocked ? getBadgeColors() : ['#E0E0E0', '#BDBDBD']}
          style={styles.gradient}
        >
          <View style={styles.iconContainer}>
            <Icon 
              name={getBadgeIcon()} 
              size={32} 
              color={isUnlocked ? 'white' : '#9E9E9E'} 
            />
          </View>
          
          <Text style={[styles.title, !isUnlocked && styles.lockedText]}>
            {badge.title}
          </Text>
          
          <Text style={[styles.description, !isUnlocked && styles.lockedText]}>
            {badge.description}
          </Text>
          
          {isUnlocked && (
            <View style={styles.unlockedIndicator}>
              <Icon name="check-circle" size={16} color="white" />
              <Text style={styles.unlockedText}>Unlocked</Text>
            </View>
          )}
          
          {!isUnlocked && (
            <View style={styles.lockedIndicator}>
              <Icon name="lock" size={16} color="#9E9E9E" />
              <Text style={styles.lockedText}>Locked</Text>
            </View>
          )}
          
          {badge.progress && (
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${Math.min((badge.progress.current / badge.progress.target) * 100, 100)}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {badge.progress.current}/{badge.progress.target}
              </Text>
            </View>
          )}
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  animatedContainer: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  gradient: {
    padding: 16,
    alignItems: 'center',
    minHeight: 120,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginBottom: 8,
  },
  unlockedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unlockedText: {
    fontSize: 10,
    color: 'white',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  lockedIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(158,158,158,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  lockedText: {
    fontSize: 10,
    color: '#9E9E9E',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '100%',
    marginTop: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
});

export default BadgeCard;