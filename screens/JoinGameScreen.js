import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native'
import { useState } from 'react'
import { handleJoinGame, createGame, getNumPlayer } from '../utilities/services'
import CustomButton from '../components/Button'
import back from '../assets/log-out.png'
import { socket } from '../utilities/services'
import { background } from '../constants/theme'

const JoinGameScreen = ({ navigation }) => {
  const [roomId, setRoomId] = useState('')
  const [clientId, setClientId] = useState('')

  socket.on('joinRoom', (num) => {
    setRoomId(num.room)
    setClientId(num.player)

    navigation.navigate(`GameScreen`, { id: num.room, player: num.player })
  })

  return (
    <SafeAreaView style={styles.constainer}>
      <View style={styles.nav}>
        <CustomButton imgUrl={back} handlePress={() => navigation.goBack()} />
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
          <Button title="Join" onPress={() => handleJoinGame(roomId)} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default JoinGameScreen

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    backgroundColor: background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
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
    // outlineStyle: 'none',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10
  }
})
