import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Color from '../../constants/Color';

const Loading = () => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size='large' color={Color.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Loading;
