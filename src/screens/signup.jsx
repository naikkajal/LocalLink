import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';  

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.navigate("Login"); 
  };

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with:', user.email);
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.createcontainer}>
      <Text style={styles.createtext}>Create Account</Text>
      <Text style={styles.startedtext}>Just a few quick things to get started</Text>
      <View style={styles.usercontainer}>
        <TextInput
          style={styles.usertext}
          placeholder='Email'
          placeholderTextColor={"black"}
          onChangeText={text => setEmail(text)}
          value={email}
        />
      </View>
      <View style={styles.passcontainer}>
        <TextInput
          style={styles.usertext}
          secureTextEntry
          placeholder='Password'
          placeholderTextColor={"black"}
          onChangeText={text => setPassword(text)}
          value={password}
        />
      </View>
      <Text style={styles.forgottext}>Forgot Password?</Text>
      <View style={styles.signinbutton}>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signintext}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity onPress={handleRegister}>
          <Text style={styles.alreadytext}>
            Already have an Account?<Text style={{ textDecorationLine: "underline" }}> Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Signup;

const styles = StyleSheet.create({
  createcontainer: { alignContent: "center" },
  createtext: {
    textAlign: "center",
    marginTop: 160,
    fontSize: 35,
    fontWeight: "bold"
  },
  startedtext: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  usercontainer: {
    backgroundColor: "lightgrey",
    flexDirection: "row",
    marginTop: 70,
    height: 60,
    marginHorizontal: 50,
    borderRadius: 50
  },
  usertext: {
    marginLeft: 30,
    flex: 1
  },
  passcontainer: {
    backgroundColor: "lightgrey",
    flexDirection: "row",
    marginTop: 40,
    height: 60,
    marginHorizontal: 50,
    borderRadius: 50
  },
  forgottext: {
    textAlign: "right",
    marginRight: 60,
    marginTop: 15,
    color: "darkblue"
  },
  signinbutton: {
    backgroundColor: "firebrick",
    height: 50,
    marginTop: 30,
    marginHorizontal: 50,
    borderRadius: 50,
    alignItems: "center",
  },
  signintext: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
    marginVertical: 10
  },
  alreadytext: {
    textAlign: "center",
    marginTop: 200
  }
});