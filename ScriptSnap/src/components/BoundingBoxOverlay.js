import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function BoundingBoxOverlay() {
  return <View style={styles.box} />;
}

const styles = StyleSheet.create({
  box: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: 'red'
  }
});
