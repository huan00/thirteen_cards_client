import {
  View,
  Text,
  Button,
  TextInput,
  SafeAreaView,
  StyleSheet
} from 'react-native'
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { baseUrl, socketConnect, socketDisconnect } from '../utilities/services'

const HomeScreen = ({ navigation }) => {
  const socket = io(baseUrl)

  useEffect(() => {
    socketConnect()

    return () => {
      socketDisconnect()
    }
  }, [])

  const handleStartGame = () => {
    navigation.navigate('JoinGame')
  }

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to the Game</Text>
        <Text style={styles.startButton} onPress={handleStartGame}>
          Start game
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: '2rem'
  },
  startButton: {
    width: '80%',
    textAlign: 'center',
    fontSize: '2rem',
    borderRadius: 50,
    color: 'white',
    backgroundColor: 'black',
    padding: (10, 15)
  }
})
