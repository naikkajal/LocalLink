import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import MapView, { Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState(null);
  const navigation = useNavigation();
  
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  const handleRegister = () => {
    navigation.navigate("Login");
  };

  const handleSignUp = async () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered successfully');
      navigation.navigate("MainTabs"); // Navigate to the main tabs
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {location && (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Your Location"
              pinColor="red"
            />
            <Polygon
              coordinates={[
                { latitude: location.coords.latitude + 0.0045, longitude: location.coords.longitude + 0.0045 },
                { latitude: location.coords.latitude + 0.0045, longitude: location.coords.longitude - 0.0045 },
                { latitude: location.coords.latitude - 0.0045, longitude: location.coords.longitude - 0.0045 },
                { latitude: location.coords.latitude - 0.0045, longitude: location.coords.longitude + 0.0045 },
              ]}
              fillColor="rgba(0, 0, 255, 0.3)"
              strokeColor="blue"
              strokeWidth={2}
            />
          </MapView>
        )}
        
        <Text style={styles.text}>Create Account</Text>
        <Text style={styles.subtext}>Just a few quick things to get started</Text>
        <TextInput
          style={styles.input}
          placeholder='Email'
          onChangeText={text => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          secureTextEntry
          placeholder='Password'
          onChangeText={text => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.registerText}>Already have an Account? Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E6F7FF', // Light blue background color
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0', // Light blue background color
    paddingHorizontal: 20,
  },
  map: {
    width: 422,
    height: 230,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 140,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'darkblue',
  },
  subtext: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    color: 'black',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 50,
    marginTop: 20,
  },
  button: {
    backgroundColor: 'darkblue',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 50,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerText: {
    marginTop: 150,
    textDecorationLine: 'underline',
    color: 'blue',
    marginBottom: 250,
  },
});

export default Signup;
