import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import React from 'react'
import Navbar from '../components/Navbar'
import cardback from '../assets/back.png'
import Avatar from '../components/Avatar'
import { background } from '../constants/theme'
import { getHand } from '../utilities/services'

const GameScreen = ({ navigation }) => {
  const route = useRoute()
  const { id, player } = route.params
  console.log(route.params)

  const handleStartGame = () => {
    getHand(id)
    navigation.navigate('PlayScreen', { roomId: id, player: player })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Navbar roomId={id} handlePress={() => navigation.goBack()} />
        <View style={styles.cardContainer}>
          <Image
            style={styles.cardImage}
            source={cardback}
            resizeMode="cover"
          />
        </View>
        <View>
          <Button title="Start" onPress={handleStartGame} />
          <Avatar />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default GameScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  wrapper: { flex: 1, display: 'flex', justifyContent: 'space-between' },
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  cardImage: {
    width: 200,
    height: 400,
    borderRadius: 10
  }
})
