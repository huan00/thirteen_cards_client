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
import { background } from '../constants/theme'

const HomeScreen = ({ navigation: { navigate } }) => {
  // const socket = io(baseUrl)

  useEffect(() => {
    socketConnect()

    return () => {
      socketDisconnect()
    }
  }, [])

  const handleStartGame = () => {
    navigate('JoinGame')
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
    flex: 1,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: background
  },
  welcomeText: {
    fontSize: 16
  },
  startButton: {
    width: '80%',
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 50,
    color: 'white',
    backgroundColor: 'black',
    padding: (10, 15)
  }
})
