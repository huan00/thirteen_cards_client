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

const HomeScreen = () => {
  const [roomId, setRoomId] = useState('')
  const socket = io('http://localhost:3001')

  useEffect(() => {
    socket.on('connection', () => {
      console.log('connected')
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  const handlePress = () => {}
  const createGame = () => {
    console.log('click')
    socket.emit('room', { game: 'gameId' })
  }

  socket.on('roomId', (id) => {
    console.log(id)
  })
  return (
    <SafeAreaView>
      <Text>Welcome to the Game</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder="Room Id"
          onChangeText={setRoomId}
          value={roomId}
        />
        <Button title="Join" onPress={handlePress} />
      </View>
      <View>
        <Text>Create a New Game</Text>
        <Button title="Create Game" onPress={createGame} />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10
  }
})
