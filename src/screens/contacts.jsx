// src/screens/EmergencyContactsScreen.js
import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';

const EmergencyContactsScreen = () => {
  const categories = [
    {
      title: 'National Emergency Numbers',
      contacts: [
        { name: 'National Emergency Number', number: '112' },
        { name: 'Police', number: '100 or 112' },
        { name: 'Fire', number: '101' },
        { name: 'Ambulance', number: '102' },
      ]
    },
    {
      title: 'Disaster Management',
      contacts: [
        { name: 'Disaster Management Services', number: '108' },
        { name: 'Earthquake / Flood / Disaster (N.D.R.F Headquarters)', number: '011-24363260, 9711077372' },
        { name: 'Disaster Management (N.D.M.A)', number: '1078, 01126701728' },
      ]
    },
    {
      title: 'Women and Child Helplines',
      contacts: [
        { name: 'Women Helpline', number: '1091' },
        { name: 'Women Helpline - Domestic Abuse', number: '181' },
        { name: 'Children In Difficult Situation', number: '1098' },
      ]
    },
    {
      title: 'Medical and Health Services',
      contacts: [
        { name: 'Medical Emergency', number: '+1 234 567 892' },
        { name: 'Air Ambulance', number: '9540161344' },
        { name: 'Aids Helpline', number: '1097' },
        { name: 'Anti Poison (New Delhi)', number: '1066 or 011-1066' },
        { name: 'ORBO Centre, AIIMS (For Donation Of Organ) Delhi', number: '1060' },
        { name: 'National Poisons Information Centre - AIIMS New Delhi (24x7)', number: '1800116117, 011-26593677, 26589391' },
        { name: 'Poison Information Centre (CMC, Vellore)', number: '18004251213' },
        { name: 'Medical Helpline in Andhra Pradesh, Gujarat, Uttarakhand, Goa, Tamil Nadu, Rajasthan, Karnataka, Assam, Meghalaya, M.P and U.P', number: '108' },
        { name: 'KIRAN Mental Health Helpline', number: '18005990019' },
      ]
    },
    {
      title: 'Emergency Services',
      contacts: [
        { name: 'Railway Enquiry', number: '139' },
        { name: 'Railway Accident Emergency Service', number: '1072' },
        { name: 'Road Accident Emergency Service', number: '1073' },
        { name: 'Road Accident Emergency Service On National Highway For Private Operators', number: '1033' },
        { name: 'Senior Citizen Helpline', number: '14567' },
        { name: 'Disaster Management Services', number: '108' },
        { name: 'Tourist Helpline', number: '1363 or 1800111363' },
        { name: 'LPG Leak Helpline', number: '1906' },
        { name: 'Cyber Crime Helpline', number: '155620' },
        { name: 'COVID-19 Helpline', number: '011-23978046 or 1075' },
      ]
    },
    {
      title: 'Other Services',
      contacts: [
        { name: 'Kisan Call Centre', number: '18001801551' },
        { name: 'Relief Commissioner For Natural Calamities', number: '1070' },
        { name: 'Children In Difficult Situation', number: '1098' },
        { name: 'National Poisons Information Centre - AIIMS New Delhi (24x7)', number: '1800116117, 011-26593677, 26589391' },
        { name: 'Poison Information Centre (CMC, Vellore)', number: '18004251213' },
      ]
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {categories.map((category, index) => (
          <View key={index} style={styles.category}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            {category.contacts.map((contact, idx) => (
              <View key={idx} style={styles.contact}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmergencyContactsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
    marginTop:25
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  category: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    color:"darkblue",
    textDecorationLine:"underline"
  },
  contact: {
    marginBottom: 10,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16,
    color: 'gray',
  },
});
