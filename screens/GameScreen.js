import { View, Text, Button, Image, StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import io from 'socket.io-client'
import Navbar from '../components/Navbar'
import cardback from '../assets/Back_Blue.png'
import Avatar from '../components/Avatar'

const socket = io('http://localhost:3001')

const GameScreen = ({ navigation }) => {
  const route = useRoute()
  const { id, player } = route.params
  console.log(route.params)

  const handlePress = () => {
    navigation.navigate('PlayScreen', { id: id, player: player })
  }

  socket.on(player, (msg) => {
    console.log(msg)
  })
  return (
    <View style={styles.container}>
      <Navbar roomId={id} />
      <View style={styles.cardContainer}>
        <Image style={styles.cardImage} source={cardback} resizeMode="fill" />
      </View>
      <View>
        <Button title="Start" onPress={handlePress} />
      </View>
      <Avatar />
    </View>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    backgroundColor: 'green'
  },
  cardContainer: {
    margin: (0, 'auto'),
    borderRadius: 10
  },
  cardImage: {
    width: 200,
    height: 400,
    borderRadius: 10
  }
})
