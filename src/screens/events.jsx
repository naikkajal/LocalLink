import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList } from 'react-native';
import { firestore, auth } from '../../firebase'; 
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

const EventScreen = () => {
  const [eventText, setEventText] = useState('');
  const [events, setEvents] = useState([]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const q = query(collection(firestore, 'events'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleAddEvent = async () => {
    if (eventText.trim() === '') return;

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error('No user is logged in');
        return;
      }

      await addDoc(collection(firestore, 'events'), {
        text: eventText,
        timestamp: serverTimestamp(),
        email: currentUser.email,
      });

      console.log('Event added successfully');
      setEventText('');
      setShowInput(false);
    } catch (error) {
      console.error('Error adding event: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Events</Text>
        <TouchableOpacity onPress={() => setShowInput(true)}>
          <View style={styles.newEventContainer}>
            <Text style={styles.newEventText}>New Event</Text>
          </View>
        </TouchableOpacity>
      </View>

      {showInput && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder='Enter event text'
            value={eventText}
            onChangeText={setEventText}
          />
          <TouchableOpacity onPress={handleAddEvent}>
            <Text style={styles.addButton}>+</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventText}>{item.text}</Text>
            <Text style={styles.eventTimestamp}>
              {item.timestamp?.toDate().toLocaleString()}, by {item.email}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default EventScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  newEventContainer: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  newEventText: {
    color: 'white',
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
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 20,
  },
  addButton: {
    marginLeft: 10,
    fontSize: 30,
    color: '#4CAF50',
  },
  eventItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventText: {
    fontSize: 18,
  },
  eventTimestamp: {
    fontSize: 12,
    color: 'gray',
  },
});
