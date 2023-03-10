import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

import back from '../assets/log-out.png'
import CustomButton from './Button'
import { useRoute } from '@react-navigation/native'

const Navbar = ({ handlePress, timer = false, roomId = false }) => {
  return (
    <View style={styles.container}>
      <CustomButton imgUrl={back} handlePress={handlePress} />
      {timer && <Text>Timer: {timer}</Text>}
      {roomId && <Text>Room: {roomId}</Text>}
    </View>
  )
}

export default Navbar

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  }
})
