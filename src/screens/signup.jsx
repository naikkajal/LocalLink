import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../../firebase';
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

  const handleSignUp = () => {
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredentials) => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);

        if (location) {
          await firestore.collection('users').doc(user.uid).set({
            email: user.email,
            location: {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          });
        } else {
          await firestore.collection('users').doc(user.uid).set({
            email: user.email,
          });
        }

        navigation.navigate("Alert");
      })
      .catch(error => alert(error.message));
  };

  return (
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
      <TextInput style={styles.input} placeholder='Name'/>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'firebrick',
  },
  subtext: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    color: 'gray',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'lightgrey',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 50,
  },
  button: {
    backgroundColor: 'firebrick',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 50,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerText: {
    marginTop: 20,
    textDecorationLine: 'underline',
    color: 'blue',
  },
});

export default Signup;

