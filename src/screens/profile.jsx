import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { auth } from '../../firebase';
import { MaterialIcons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const user = {
    displayName: 'Kajal Naik',
    email: 'kajalnaik36@gmail.com',
    photoURL: 'https://randomuser.me/api/portraits/men/1.jpg',
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <View style={styles.separator} />
        <View style={styles.options}>
          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="edit" size={24} color="black" />
            <Text style={styles.optionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="lock" size={24} color="black" />
            <Text style={styles.optionText}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="settings" size={24} color="black" />
            <Text style={styles.optionText}>Account Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="help" size={24} color="black" />
            <Text style={styles.optionText}>Help Center</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="phone" size={24} color="black" />
            <Text style={styles.optionText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('EmergencyContacts')}>
            <MaterialIcons name="contacts" size={24} color="black" />
            <Text style={styles.optionText}>Emergency Contacts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="perm-device-information" size={24} color="black" />
            <Text style={styles.optionText}>Device Permissions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <MaterialIcons name="info" size={24} color="black" />
            <Text style={styles.optionText}>About</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f8f8f8',
    marginTop: 20,
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
    marginBottom: 20,
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
  separator: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 20,
  },
  options: {
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f8f8f8',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
});
