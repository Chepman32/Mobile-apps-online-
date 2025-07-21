import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useStore } from '../store/useStore';

export default function TimerScreen({ route, navigation }) {
  const [secondsLeft, setSecondsLeft] = useState(route.params.duration * 60);
  const incrementSessions = useStore(state => state.incrementSessions);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          clearInterval(interval);
          incrementSessions();
          navigation.navigate('Stats');
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
      <Text style={{ fontSize:48 }}>{Math.floor(secondsLeft/60)}:{('0'+secondsLeft%60).slice(-2)}</Text>
    </View>
  );
}
