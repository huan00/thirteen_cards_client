import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { useState } from 'react'
import { handleJoinGame, createGame, getNumPlayer } from '../utilities/services'
import CustomButton from '../components/Button'
import back from '../assets/log-out.png'
import { socket } from '../utilities/services'

const JoinGameScreen = ({ navigation }) => {
  const [roomId, setRoomId] = useState('')
  const [clientId, setClientId] = useState('')

  socket.on('joinRoom', (num) => {
    setRoomId(num.room)
    setClientId(num.player)

    navigation.navigate(`GameScreen`, { id: num.room, player: num.player })
  })

  return (
    <View style={styles.constainer}>
      <View style={styles.nav}>
        <CustomButton imgUrl={back} />
      </View>
      <View style={styles.main}>
        <View>
          <Button
            style={styles.newGame}
            title="Create Game"
            onPress={createGame}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Room Id"
            onChangeText={setRoomId}
            value={roomId}
          />
          <Button title="Join" onPress={handleJoinGame} />
        </View>
      </View>
    </View>
  )
}

export default JoinGameScreen

const styles = StyleSheet.create({
  constainer: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'green'
  },
  nav: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  main: {
    display: 'flex',
    justifyContent: 'space-around',
    height: '100%'
  },
  newGame: {},
  input: {
    height: 40,
    width: '100%',
    outlineStyle: 'none',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  }
})
