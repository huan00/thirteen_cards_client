import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native'
import { useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { socket } from '../utilities/services'
import { background, white } from '../constants/theme'
import Navbar from '../components/Navbar'
import horizontalCover from '../assets/horizontalCover.png'
import verticalLeft from '../assets/verticalLeft.png'
import verticalRight from '../assets/verticalRight.png'
import Avatar from '../components/Avatar'

const PlayScreen = ({ navigation }) => {
  const [playerHand, setPlayerHand] = useState(null)
  const route = useRoute()
  const { roomId, player } = route.params

  const handleBack = () => {
    navigation.goBack()
  }

  socket.on(player, (hand) => {
    setPlayerHand(hand)
    console.log(hand)
  })
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Navbar timer={2} roomId={roomId} handlePress={handleBack} />
        <View style={styles.otherPlayer}>
          <Image style={styles.topHand} source={horizontalCover} />
          <Image style={styles.leftHand} source={verticalLeft} />
          <Image style={styles.rightHand} source={verticalRight} />
          <View style={styles.ad}>
            <Text>Ad</Text>
          </View>
        </View>
        <View style={styles.cardPlacement}>
          <View style={styles.cardPlacementRow}>
            <View style={styles.singleCard}></View>
            <View style={styles.singleCard}></View>
            <View style={styles.singleCard}></View>
          </View>
          <View style={styles.cardPlacementRow}>
            <View style={styles.singleCard}></View>
            <View style={styles.singleCard}></View>
            <View style={styles.singleCard}></View>
            <View style={styles.singleCard}></View>
            <View style={styles.singleCard}></View>
          </View>
          <View style={styles.cardPlacementRow}>
            <View style={styles.singleCard}></View>
            <View style={styles.singleCard}></View>
            <View style={styles.singleCard}></View>
            <View style={styles.singleCard}></View>
            <View style={styles.singleCard}></View>
          </View>
        </View>
        <View style={styles.playerHand}>
          <View></View>
          <Avatar />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default PlayScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: background
  },
  wrapper: {
    flex: 1,
    position: 'relative'
  },
  otherPlayer: {
    flex: 1
  },
  topHand: {
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: -Dimensions.get('window').width / 4 }]
  },
  leftHand: {
    position: 'absolute',
    top: 100
  },
  rightHand: {
    position: 'absolute',
    right: 0,
    top: 100
  },
  ad: {
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
    backgroundColor: white,
    position: 'absolute',
    left: '50%',
    top: 100,
    transform: [{ translateX: -Dimensions.get('window').width / 4 }]
  },
  cardPlacement: {
    flex: 1
  },
  cardPlacementRow: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  singleCard: {
    width: 60,
    height: 90,
    backgroundColor: 'rgba(0,0,0, .2)',
    marginHorizontal: 5
  },
  playerHand: {
    flex: 0.4,
    backgroundColor: 'rgba(255,0,0, .5)'
  }
})
