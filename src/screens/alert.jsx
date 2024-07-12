import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Alert = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Alerts</Text>
        <TouchableOpacity>
         <View style={styles.newAlertContainer}>
           <Text style={styles.newAlertText}>New Alert</Text>
         </View>
         </TouchableOpacity>
       </View>
      <View style={styles.SusContainer}>
        <Text style={styles.SusText}>Suspicious Activity</Text>
      </View>
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
  },
  header: {
    marginTop: 40,
    fontSize: 30,
    fontWeight: 'bold',
  },
  newAlertContainer: {
    backgroundColor: 'blue',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
  },
  newAlertText: {
    color: 'white',
    fontSize: 17,
  },
  SusContainer: {
    marginTop: 60,
  },
  SusText: {
    fontSize: 18,
    fontWeight:"700"
  },
});
