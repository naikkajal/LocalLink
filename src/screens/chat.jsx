import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, SectionList } from 'react-native';
import { firestore, auth } from '../../firebase'; 
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(firestore, 'chats'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(groupMessagesByDate(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
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
    }
  };

  const groupMessagesByDate = (messages) => {
    const groupedMessages = {};

    messages.forEach(message => {
      const date = message.timestamp?.toDate().toLocaleDateString();
      
      if (!groupedMessages[date]) {
        groupedMessages[date] = [];
      }
      
      groupedMessages[date].push(message);
    });

    return Object.keys(groupedMessages).map(date => ({
      title: date === new Date().toLocaleDateString() ? 'Today' : date,
      data: groupedMessages[date],
    }));
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

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SectionList
        sections={messages}
        keyExtractor={item => item.id}
        renderItem={renderMessage}
        renderSectionHeader={renderSectionHeader}
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
    marginTop:20
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
  sectionHeader: {
    backgroundColor: '#EEE',
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
