import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { firestore, auth } from '../../firebase'; 
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

const Alert = () => {
  const [alertText, setAlertText] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [showInput, setShowInput] = useState(false);

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
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error('No user is logged in');
        return;
      }

      await addDoc(collection(firestore, 'alerts'), {
        text: alertText,
        timestamp: serverTimestamp(),
        email: currentUser.email,
      });

      console.log('Alert added successfully');
      setAlertText('');
      setShowInput(false);
    } catch (error) {
      console.error('Error adding alert: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Alerts</Text>
        <TouchableOpacity onPress={() => setShowInput(true)}>
          <View style={styles.newAlertContainer}>
            <Text style={styles.newAlertText}>New Alert</Text>
          </View>
        </TouchableOpacity>
      </View>

      {showInput && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Enter alert text'
            value={alertText}
            onChangeText={setAlertText}
            placeholderTextColor="#999"
          />
          <TouchableOpacity onPress={handleAddAlert}>
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
        </View>
      )}

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f4f8',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  newAlertContainer: {
    backgroundColor: '#1a73e8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  newAlertText: {
    color: '#fff',
    fontSize: 17,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: '#1a73e8',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#d9e2ff',
  },
  addButton: {
    marginLeft: 10,
    fontSize: 30,
    color: '#1a73e8',
  },
  alertItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#d9e2ff',
    borderRadius: 5,
    marginBottom: 10,
  },
  alertText: {
    fontSize: 18,
    color: '#000',
  },
  alertTimestamp: {
    fontSize: 12,
    color: 'gray',
  },
});

export default Alert;
