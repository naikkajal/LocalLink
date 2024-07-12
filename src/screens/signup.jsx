import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../../firebase'; // Ensure you import auth and firestore from firebase
import MapView, { Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState(null); // State to store user's location
  const navigation = useNavigation();

  useEffect(() => {
    // Function to fetch user's current location
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

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
        navigation.navigate("Alert");
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.container}>
      {/* MapView to display the user's location */}
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
          {/* Marker to show user's current location */}
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Your Location"
            pinColor="red" // Custom red color for the marker
          />

          {/* Example Polygon to show restricted area */}
          <Polygon
            coordinates={[
              { latitude: location.coords.latitude + 0.001, longitude: location.coords.longitude + 0.001 },
              { latitude: location.coords.latitude + 0.002, longitude: location.coords.longitude + 0.002 },
              { latitude: location.coords.latitude + 0.001, longitude: location.coords.longitude - 0.001 },
            ]}
            fillColor="rgba(0, 0, 255, 0.3)"
            strokeColor="blue"
            strokeWidth={2}
          />
        </MapView>
      )}
      
      {/* Sign Up Form */}
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff', // Background color of the container
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 10, // Rounded corners for the map container
    marginBottom: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'firebrick', // Color for the title text
  },
  subtext: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 20,
    color: 'gray', // Color for the subtitle text
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'lightgrey', // Border color for input fields
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 50, // Rounded corners for input fields
  },
  button: {
    backgroundColor: 'firebrick',
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    borderRadius: 50, // Rounded corners for the button
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  registerText: {
    marginTop: 20,
    textDecorationLine: 'underline',
    color: 'blue', // Color for the register text
  },
});

export default Signup;

