import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../../firebase';  
import { signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
        navigation.navigate("MainTabs");
      })
      .catch(error => alert(error.message));
  };

  return (
    <View style={styles.welcontainer}>
      <Image source={require('../images/connectt.png')} style={styles.connect} />
      <Text style={styles.weltext}>Welcome</Text>
      <Text style={styles.logtext}>Sign in to your Account</Text>
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
      <TouchableOpacity onPress={handleLogin} style={styles.signinbutton}>
        <Text style={styles.signintext}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.createtext}>
          Don't have an Account?<Text style={{ textDecorationLine: "underline" }}> Create</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  welcontainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  weltext: {
    textAlign: "center",
    marginTop: 120,
    fontSize: 35,
    fontWeight: "bold",
    color:"darkblue"
  },
  logtext: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },   
  usercontainer: {
    backgroundColor: "lightgrey",
    flexDirection: "row",
    marginTop: 50,
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
    backgroundColor: "darkblue",
    height: 50,
    marginTop: 30,
    marginHorizontal: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: 'center'
  },
  signintext: {
    color: "white",
    fontSize: 20,
  },
  createtext: {
    textAlign: "center",
    marginTop: 30,
  },
  connect: {
    width: 430,
    height: 225,
    position: "absolute",
    top: 40
  }
});
