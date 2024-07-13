// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from './src/screens/signup';
import Login from './src/screens/login';
import Alert from './src/screens/alert';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'
      screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" 
        component={Login} />
        <Stack.Screen name="Signup" 
        component={Signup} />
        <Stack.Screen name="Alert" 
        component={Alert} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;