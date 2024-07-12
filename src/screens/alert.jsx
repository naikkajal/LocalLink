import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Alert = () => {
  return (
    <View>
      <Text style={styles.alerttext}>Alert</Text>
    </View>
  )
}

export default Alert

const styles = StyleSheet.create({
  alerttext:{
    marginTop:30,
    fontSize:30
  }
})