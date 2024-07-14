import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase';

const ProfileScreen = () => {
  // Replace with actual user data retrieval logic
  const user = {
    displayName: 'Kajal Naik',
    email: 'naikkajal0603@gmail.com',
    photoURL: 'https://randomuser.me/api/portraits/men/1.jpg', // Example image
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully');
      // You can navigate to the login screen or another appropriate action after logout
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileHeaderText}>Profile</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profileContent}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>{user.displayName.charAt(0)}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{user.displayName}</Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:30,
    marginTop:20,
    backgroundColor: '#fff',
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
});
