import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const StatsCard = ({ title, value, subtitle, icon, color, gradient = true }) => {
  const getGradientColors = (baseColor) => {
    return [baseColor, `${baseColor}CC`];
  };

  const formatValue = (val, type) => {
    switch (type) {
      case 'duration':
        const hours = Math.floor(val / 60);
        const mins = val % 60;
        return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
      case 'distance':
        return `${val.toFixed(1)} km`;
      case 'calories':
        return `${val.toLocaleString()}`;
      case 'percentage':
        return `${val}%`;
      default:
        return val;
    }
  };

  const CardContent = () => (
    <View style={styles.content}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialIcons name={icon} size={24} color="white" />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <Text style={styles.value}>{formatValue(value, subtitle)}</Text>
      
      {subtitle && (
        <Text style={styles.subtitle}>{subtitle}</Text>
      )}
    </View>
  );

  if (gradient) {
    return (
      <LinearGradient
        colors={getGradientColors(color)}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <CardContent />
      </LinearGradient>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <CardContent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    minHeight: 120,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    flex: 1,
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

export default StatsCard;