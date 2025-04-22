import React from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Agenda</Text>
      <Text style={styles.subtitle}>Organize seu dia de forma eficiente</Text>
      <ActivityIndicator
        size="large"
        color="#3B82F6"
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 30
  },
  loader: {
    marginTop: 20
  }
});

export default SplashScreen;