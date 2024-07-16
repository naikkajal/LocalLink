import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, FlatList, Alert } from 'react-native';
import { firestore, auth } from '../../firebase'; 
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, deleteDoc, doc } from 'firebase/firestore';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, 'chats'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === '') return;

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error('No user is logged in');
        return;
      }

      await addDoc(collection(firestore, 'chats'), {
        text: message,
        timestamp: serverTimestamp(),
        email: currentUser.email,
      });

      console.log('Message sent successfully');
      setMessage('');
    } catch (error) {
      console.error('Error sending message: ', error);
      Alert.alert('Error', 'Failed to send message. Please try again.');
    }
  };

  const handleLongPressMessage = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'chats', id));
      console.log('Message deleted successfully');
    } catch (error) {
      console.error('Error deleting message: ', error);
      Alert.alert('Error', 'Failed to delete message. Please try again.');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={styles.messageItem}>
      <Text style={styles.messageUser}>{item.email}</Text>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTimestamp}>
        {item.timestamp?.toDate().toLocaleTimeString()}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today</Text>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Enter message'
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#ECE5DD',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  sendButton: {
    backgroundColor: '#25D366',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
  },
  messageItem: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
    maxWidth: '80%',
  },
  messageUser: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  messageTimestamp: {
    fontSize: 10,
    color: 'gray',
    textAlign: 'right',
    marginTop: 5,
  },
});

