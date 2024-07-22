import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { firestore, auth } from '../../firebase'; 
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

const Alert = () => {
  const [alertText, setAlertText] = useState('');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, 'alerts'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setAlerts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleAddAlert = async () => {
    if (alertText.trim() === '') return;

    try {
      const currentUserEmail = auth.currentUser.email;

      await addDoc(collection(firestore, 'alerts'), {
        text: alertText,
        timestamp: serverTimestamp(),
        email: currentUserEmail,
      });

      console.log('Alert added successfully');
      setAlertText('');
    } catch (error) {
      console.error('Error adding alert: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Alerts</Text>
        <TouchableOpacity onPress={handleAddAlert}>
          <View style={styles.newAlertContainer}>
            <Text style={styles.newAlertText}>New Alert</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder='Enter alert text'
        value={alertText}
        onChangeText={setAlertText}
      />

      <FlatList
        data={alerts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.alertItem}>
            <Text style={styles.alertText}>{item.text}</Text>
            <Text style={styles.alertTimestamp}>
              {item.timestamp?.toDate().toLocaleString()}, by {item.email}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  newAlertContainer: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  newAlertText: {
    color: 'white',
    fontSize: 17,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  alertItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  alertText: {
    fontSize: 18,
  },
  alertTimestamp: {
    fontSize: 12,
    color: 'gray',
  },
});
