import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.replace('AuthStack'); 
      }, 1000); // Display for 2 seconds
  
      return () => clearTimeout(timer); 
    }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../images/locallinklogo.jpeg')} style={styles.logo} />
      <View style={styles.footer}>
        <Text style={styles.subtitle}>Connect, Collaborate, Stay Informed</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black', 
  },
  subtitle: {
    fontSize: 13,
    color: '#E6F7FF', // Dark blue text color
    textAlign: 'center',
  },
  footer:{
    position:"absolute",
    bottom:80
  },
  logo:{
    width:180,
    height:180
  }
});

