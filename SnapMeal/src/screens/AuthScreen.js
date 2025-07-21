import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import { useAppStore } from '../state/useAppStore';

export default function AuthScreen({ navigation }) {
  const setSession = useAppStore(state => state.setSession);

  async function signIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) console.log('Sign in error', error);
    else setSession(data.session);
    navigation.replace('Dashboard');
  }

  return (
    <View style={styles.center}>
      <Button title="Sign In with Google" onPress={signIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});
